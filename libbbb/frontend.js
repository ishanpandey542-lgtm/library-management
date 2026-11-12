/* global BOOKS */
(function () {
  "use strict";

  const STORAGE_KEY = "campus-library-reservations-v1";
  const state = { department: "all", status: "all", query: "", books: [] };
  const elements = {
    bookList: document.querySelector("#book-list"),
    departmentFilters: document.querySelector("#department-filters"),
    statusFilters: document.querySelector("#status-filters"),
    searchForm: document.querySelector("#search-form"),
    search: document.querySelector("#search"),
    summary: document.querySelector("#results-summary"),
    reservationsButton: document.querySelector("#reservation"),
    dialog: document.querySelector("#reservations-dialog"),
    closeDialog: document.querySelector("#close-reservations"),
    reservationList: document.querySelector("#reservation-list"),
    logout: document.querySelector("#logout"),
    toast: document.querySelector("#toast")
  };
  let toastTimer;

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character];
    });
  }

  function getReservations() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved : [];
    } catch (error) { return []; }
  }

  function saveReservations(reservations) { localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations)); }

  function buildBooks() {
    const reservationsByBook = getReservations().reduce(function (totals, reservation) {
      totals[reservation.bookId] = (totals[reservation.bookId] || 0) + 1;
      return totals;
    }, {});
    return BOOKS.map(function (book) {
      const available = Math.max(0, book.available - (reservationsByBook[book.id] || 0));
      return Object.assign({}, book, { available: available, status: available > 0 ? "available" : "checked-out" });
    });
  }

  function formatStatus(book) { return book.available === 0 ? "Checked out" : book.available + "/" + book.copies + " on shelf"; }

  function renderDepartments() {
    const departments = Array.from(new Set(BOOKS.map(function (book) { return book.department; }))).sort();
    const buttons = ["all"].concat(departments).map(function (department) {
      const active = state.department === department;
      const label = department === "all" ? "All" : department;
      return '<button class="filter-button' + (active ? " is-active" : "") + '" type="button" data-department="' + escapeHtml(department) + '" aria-pressed="' + active + '">' + escapeHtml(label) + "</button>";
    });
    elements.departmentFilters.insertAdjacentHTML("beforeend", buttons.join(""));
  }

  function getFilteredBooks() {
    const query = state.query.trim().toLowerCase();
    return state.books.filter(function (book) {
      const departmentMatches = state.department === "all" || book.department === state.department;
      const statusMatches = state.status === "all" || book.status === state.status;
      const searchable = [book.title, book.author, book.subject, book.department, book.isbn].join(" ").toLowerCase();
      return departmentMatches && statusMatches && (!query || searchable.includes(query));
    });
  }

  function renderBooks() {
    const books = getFilteredBooks();
    elements.summary.textContent = "Showing " + books.length + " of " + state.books.length + " books";
    if (!books.length) { elements.bookList.innerHTML = '<div class="empty-state">No books match your search or filters.</div>'; return; }
    elements.bookList.innerHTML = books.map(function (book) {
      const isAvailable = book.status === "available";
      return '<article class="books"><div class="book-top"><div class="book-cover" aria-hidden="true">' + escapeHtml(book.id.split("-")[0]) + '</div><div class="description"><h3>' + escapeHtml(book.title) + '</h3><p>' + escapeHtml(book.author) + '</p><p class="book-meta">' + escapeHtml(book.department) + " · " + escapeHtml(book.subject) + '</p><p class="book-meta">ISBN: ' + escapeHtml(book.isbn) + '</p></div></div><div class="book-bottom"><ul class="availability' + (isAvailable ? "" : " checkout") + '"><li>' + formatStatus(book) + '</li></ul><button class="reserve-button" type="button" data-book-id="' + escapeHtml(book.id) + '"' + (isAvailable ? "" : " disabled") + '>' + (isAvailable ? "Reserve" : "Unavailable") + "</button></div></article>";
    }).join("");
  }

  function updateActiveButtons(container, dataName, activeValue) {
    container.querySelectorAll("button[" + dataName + "]").forEach(function (button) {
      const active = button.dataset[dataName.slice(5)] === activeValue;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function refreshCatalog() { state.books = buildBooks(); renderBooks(); }
  function showToast(message) {
    clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    toastTimer = setTimeout(function () { elements.toast.classList.remove("is-visible"); }, 3200);
  }

  function reserveBook(bookId) {
    const book = state.books.find(function (candidate) { return candidate.id === bookId; });
    if (!book || book.available < 1) { showToast("That book is no longer available."); refreshCatalog(); return; }
    const reservations = getReservations();
    reservations.push({ bookId: book.id, title: book.title, createdAt: new Date().toISOString() });
    saveReservations(reservations);
    refreshCatalog();
    showToast('"' + book.title + '" has been reserved.');
  }

  function renderReservations() {
    const reservations = getReservations();
    if (!reservations.length) { elements.reservationList.innerHTML = '<p class="empty-reservations">You have no current reservations.</p>'; return; }
    elements.reservationList.innerHTML = reservations.map(function (reservation, index) {
      const date = new Date(reservation.createdAt);
      const dateText = Number.isNaN(date.valueOf()) ? "Reserved" : "Reserved " + date.toLocaleDateString();
      return '<div class="reservation-row"><div><strong>' + escapeHtml(reservation.title) + "</strong><p>" + dateText + '</p></div><button class="cancel-button" type="button" data-reservation-index="' + index + '">Cancel</button></div>';
    }).join("");
  }

  function openReservations() { renderReservations(); if (typeof elements.dialog.showModal === "function") elements.dialog.showModal(); else elements.dialog.setAttribute("open", ""); }
  function closeReservations() { if (typeof elements.dialog.close === "function") elements.dialog.close(); else elements.dialog.removeAttribute("open"); }

  function initialise() {
    if (!Array.isArray(BOOKS)) { elements.bookList.innerHTML = '<div class="empty-state">The book catalog could not be loaded.</div>'; return; }
    renderDepartments();
    refreshCatalog();
    elements.searchForm.addEventListener("submit", function (event) { event.preventDefault(); state.query = elements.search.value; renderBooks(); });
    elements.search.addEventListener("input", function () { state.query = elements.search.value; renderBooks(); });
    elements.departmentFilters.addEventListener("click", function (event) {
      const button = event.target.closest("button[data-department]");
      if (!button) return;
      state.department = button.dataset.department;
      updateActiveButtons(elements.departmentFilters, "data-department", state.department);
      renderBooks();
    });
    elements.statusFilters.addEventListener("click", function (event) {
      const button = event.target.closest("button[data-status]");
      if (!button) return;
      state.status = button.dataset.status;
      updateActiveButtons(elements.statusFilters, "data-status", state.status);
      renderBooks();
    });
    elements.bookList.addEventListener("click", function (event) { const button = event.target.closest("button[data-book-id]"); if (button) reserveBook(button.dataset.bookId); });
    elements.reservationsButton.addEventListener("click", openReservations);
    elements.closeDialog.addEventListener("click", closeReservations);
    elements.reservationList.addEventListener("click", function (event) {
      const button = event.target.closest("button[data-reservation-index]");
      if (!button) return;
      const reservations = getReservations();
      reservations.splice(Number(button.dataset.reservationIndex), 1);
      saveReservations(reservations);
      renderReservations();
      refreshCatalog();
      showToast("Reservation cancelled.");
    });
    elements.logout.addEventListener("click", function () { showToast("You have been logged out ."); });
  }
  initialise();
}());
