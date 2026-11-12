/* ============================================================
   src/books.js — seed catalog
   ------------------------------------------------------------
   This is the SHARED catalog. It is inserted into the database
   the first time the server starts (see db.js).

   `copies` = total physical copies owned by the library.
   Availability is NOT stored here — it is computed live from
   the reservations table, so two students can never be told the
   same copy is free.
   ============================================================ */

/* ============================================================
   data.js — VERSION 1 (frontend only)
   Local catalog for the original college brief (no backend).
   Each record carries a snapshot status/available count.
   ============================================================ */

const DEPARTMENTS = [
  "Computer Science",
  "Mechanical",
  "Electronics",
  "Civil",
  "Management"
];

const BOOKS = [
  /* ---------------- Computer Science ---------------- */
  { id: "CS-001", title: "Introduction to Algorithms", author: "Thomas H. Cormen", subject: "Algorithms", department: "Computer Science", isbn: "9780262046305", edition: "4th Edition", shelf: "CS-A-12", copies: 100 },
  { id: "CS-002", title: "Clean Code", author: "Robert C. Martin", subject: "Software Engineering", department: "Computer Science", isbn: "9780132350884", edition: "1st Edition", shelf: "CS-B-04", copies: 100 },
  { id: "CS-003", title: "Database System Concepts", author: "Abraham Silberschatz", subject: "Databases", department: "Computer Science", isbn: "9780078022159", edition: "7th Edition", shelf: "CS-C-08", copies: 100 },
  { id: "CS-004", title: "Operating System Concepts", author: "Peter B. Galvin", subject: "Operating Systems", department: "Computer Science", isbn: "9781118063330", edition: "9th Edition", shelf: "CS-C-02", copies: 100 },
  { id: "CS-005", title: "Computer Networking: A Top-Down Approach", author: "James F. Kurose", subject: "Networks", department: "Computer Science", isbn: "9780133594140", edition: "7th Edition", shelf: "CS-D-11", copies: 100 },
  { id: "CS-006", title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", subject: "Artificial Intelligence", department: "Computer Science", isbn: "9780134610993", edition: "4th Edition", shelf: "CS-A-06", copies: 100 },
  { id: "CS-007", title: "The Pragmatic Programmer", author: "Andrew Hunt", subject: "Software Engineering", department: "Computer Science", isbn: "9780135957059", edition: "2nd Edition", shelf: "CS-B-09", copies: 100 },
  { id: "CS-008", title: "Computer Organization and Design", author: "David A. Patterson", subject: "Computer Architecture", department: "Computer Science", isbn: "9780128017333", edition: "5th Edition", shelf: "CS-E-03", copies: 100 },
  { id: "CS-009", title: "Data Structures Using C", author: "Reema Thareja", subject: "Data Structures", department: "Computer Science", isbn: "9780198099307", edition: "2nd Edition", shelf: "CS-A-01", copies: 100 },
  { id: "CS-010", title: "Head First Design Patterns", author: "Eric Freeman", subject: "Software Engineering", department: "Computer Science", isbn: "9781492078005", edition: "2nd Edition", shelf: "CS-B-14", copies: 100 },

  /* ---------------- Mechanical ---------------- */
  { id: "ME-001", title: "Engineering Mechanics: Dynamics", author: "J. L. Meriam", subject: "Mechanics", department: "Mechanical", isbn: "9781118885840", edition: "8th Edition", shelf: "ME-A-05", copies: 100 },
  { id: "ME-002", title: "Thermodynamics: An Engineering Approach", author: "Yunus A. Cengel", subject: "Thermodynamics", department: "Mechanical", isbn: "9781259696527", edition: "9th Edition", shelf: "ME-B-02", copies: 100 },
  { id: "ME-003", title: "Fluid Mechanics", author: "Frank M. White", subject: "Fluid Mechanics", department: "Mechanical", isbn: "9781259696534", edition: "8th Edition", shelf: "ME-B-07", copies: 100 },
  { id: "ME-004", title: "Strength of Materials", author: "R. K. Bansal", subject: "Material Science", department: "Mechanical", isbn: "9788131808146", edition: "5th Edition", shelf: "ME-C-01", copies: 100 },
  { id: "ME-005", title: "Manufacturing Engineering and Technology", author: "Serope Kalpakjian", subject: "Manufacturing", department: "Mechanical", isbn: "9789332584297", edition: "7th Edition", shelf: "ME-C-10", copies: 100 },
  { id: "ME-006", title: "Theory of Machines", author: "R. S. Khurmi", subject: "Machine Design", department: "Mechanical", isbn: "9788121925242", edition: "14th Edition", shelf: "ME-D-04", copies: 100 },
  { id: "ME-007", title: "Heat and Mass Transfer", author: "R. K. Rajput", subject: "Thermodynamics", department: "Mechanical", isbn: "9788131808320", edition: "6th Edition", shelf: "ME-B-11", copies: 100 },
  { id: "ME-008", title: "Internal Combustion Engines", author: "V. Ganesan", subject: "Automobile Engineering", department: "Mechanical", isbn: "9781259006197", edition: "4th Edition", shelf: "ME-E-06", copies: 100 },

  /* ---------------- Electronics ---------------- */
  { id: "EC-001", title: "Microelectronic Circuits", author: "Adel S. Sedra", subject: "Analog Electronics", department: "Electronics", isbn: "9780190853464", edition: "7th Edition", shelf: "EC-A-03", copies: 31 },
  { id: "EC-002", title: "Digital Design", author: "M. Morris Mano", subject: "Digital Electronics", department: "Electronics", isbn: "9780132774208", edition: "5th Edition", shelf: "EC-A-09", copies: 4 },
  { id: "EC-003", title: "Signals and Systems", author: "Alan V. Oppenheim", subject: "Signal Processing", department: "Electronics", isbn: "9780138147570", edition: "2nd Edition", shelf: "EC-B-07", copies: 2 },
  { id: "EC-004", title: "Electromagnetic Waves", author: "David J. Griffiths", subject: "Electromagnetics", department: "Electronics", isbn: "9780138053260", edition: "4th Edition", shelf: "EC-C-02", copies: 2 },
  { id: "EC-005", title: "Power Electronics", author: "M. D. Singh", subject: "Power Systems", department: "Electronics", isbn: "9780070583740", edition: "3rd Edition", shelf: "EC-D-05", copies: 3 },
  { id: "EC-006", title: "Microprocessors and Microcontrollers", author: "A. P. Godse", subject: "Embedded Systems", department: "Electronics", isbn: "9789350142172", edition: "3rd Edition", shelf: "EC-A-14", copies: 2 },
  { id: "EC-007", title: "Principles of Communication Systems", author: "Herbert Taub", subject: "Communication Systems", department: "Electronics", isbn: "9780070648111", edition: "4th Edition", shelf: "EC-B-12", copies: 2 },
  { id: "EC-008", title: "VLSI Design", author: "M. Michael Vai", subject: "VLSI", department: "Electronics", isbn: "9780849318761", edition: "2nd Edition", shelf: "EC-E-01", copies: 2 },

  /* ---------------- Civil ---------------- */
  { id: "CE-001", title: "Structural Analysis", author: "R. C. Hibbeler", subject: "Structures", department: "Civil", isbn: "9780134610672", edition: "10th Edition", shelf: "CE-A-04", copies: 3 },
  { id: "CE-002", title: "Surveying: Principles and Applications", author: "Barry F. Kavanagh", subject: "Surveying", department: "Civil", isbn: "9780137009404", edition: "9th Edition", shelf: "CE-A-11", copies: 2 },
  { id: "CE-003", title: "Concrete Technology", author: "M. S. Shetty", subject: "Construction Materials", department: "Civil", isbn: "9788121900034", edition: "8th Edition", shelf: "CE-B-03", copies: 4 },
  { id: "CE-004", title: "Geotechnical Engineering", author: "C. Venkataramaiah", subject: "Soil Mechanics", department: "Civil", isbn: "9788123904207", edition: "3rd Edition", shelf: "CE-C-06", copies: 2 },
  { id: "CE-005", title: "Fluid Mechanics and Hydraulic Machines", author: "R. K. Bansal", subject: "Hydraulics", department: "Civil", isbn: "9788131808153", edition: "9th Edition", shelf: "CE-C-12", copies: 2 },
  { id: "CE-006", title: "Transportation Engineering", author: "S. P. Bindra", subject: "Transportation", department: "Civil", isbn: "9788123912356", edition: "2nd Edition", shelf: "CE-D-02", copies: 2 },
  { id: "CE-007", title: "Environmental Engineering", author: "Howard S. Peavy", subject: "Environment", department: "Civil", isbn: "9780070491459", edition: "1st Edition", shelf: "CE-E-08", copies: 2 },

  /* ---------------- Management ---------------- */
  { id: "MG-001", title: "Principles of Marketing", author: "Philip T. Kotler", subject: "Marketing", department: "Management", isbn: "9780134492513", edition: "17th Edition", shelf: "MG-A-02", copies: 3 },
  { id: "MG-002", title: "Financial Management: Theory and Practice", author: "Eugene F. Brigham", subject: "Finance", department: "Management", isbn: "9781305632295", edition: "15th Edition", shelf: "MG-B-05", copies: 2 },
  { id: "MG-003", title: "Organizational Behavior", author: "Stephen P. Robbins", subject: "Human Resources", department: "Management", isbn: "9780135872314", edition: "18th Edition", shelf: "MG-B-10", copies: 2 },
  { id: "MG-004", title: "Operations Management", author: "Jay Heizer", subject: "Operations", department: "Management", isbn: "9780135173626", edition: "12th Edition", shelf: "MG-C-04", copies: 3 },
  { id: "MG-005", title: "Business Statistics", author: "David M. Levine", subject: "Statistics", department: "Management", isbn: "9780134705286", edition: "8th Edition", shelf: "MG-C-09", copies: 2 },
  { id: "MG-006", title: "Strategic Management", author: "Fred R. David", subject: "Strategy", department: "Management", isbn: "9780135173947", edition: "16th Edition", shelf: "MG-D-01", copies: 3 },
  { id: "MG-007", title: "Human Resource Management", author: "Gary Dessler", subject: "Human Resources", department: "Management", isbn: "9780135172780", edition: "16th Edition", shelf: "MG-D-07", copies: 2 },
  { id: "MG-008", title: "Managerial Economics", author: "Dominick Salvatore", subject: "Economics", department: "Management", isbn: "9780199467389", edition: "7th Edition", shelf: "MG-E-03", copies: 2 }
];

/* V1 has no server, so shelf status is a fixed snapshot. */
BOOKS.forEach(function (b) {
  b.copies = 100;
  b.available = 100;
  b.status = "available";
});
