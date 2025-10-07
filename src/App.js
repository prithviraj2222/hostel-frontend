// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// // Components
// import StudentsList from "./components/StudentsList";
// import AddStudentForm from "./components/AddStudentForm";
// import UpdateFees from "./components/UpdateFees";
// import Inventory from "./components/Inventory"; // ✅ new import
// import ExportImport from "./components/ExportImport"; // ✅ (abhi bana nahi, next step me banaenge)
// import StudentProfile from "./components/StudentProfile";

// function App() {
//   return (
//     <Router>
//       {/* ✅ Navbar */}
//       <nav style={styles.navbar}>
//         <Link style={styles.link} to="/">Home</Link>
//         <Link style={styles.link} to="/add-student">Add Student</Link>
//         <Link style={styles.link} to="/update-fees">Student Fees Update</Link>
//         <Link style={styles.link} to="/inventory">Inventory</Link>
//         <Link style={styles.link} to="/backup">Export/Import</Link>
//       </nav>

//       {/* ✅ Page Routes */}
//       <div style={styles.container}>
//         <Routes>
//           <Route path="/" element={<StudentsList />} />
//           <Route path="/add-student" element={<AddStudentForm />} />
//           <Route path="/update-fees" element={<UpdateFees />} />
//           <Route path="/inventory" element={<Inventory />} />
//           <Route path="/backup" element={<ExportImport />} />
//           <Route path="/student/:id" element={<StudentProfile />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// // ✅ Inline CSS
// const styles = {
//   navbar: {
//     display: "flex",
//     gap: "15px",
//     background: "#282c34",
//     padding: "15px",
//   },
//   link: {
//     color: "white",
//     textDecoration: "none",
//     fontWeight: "bold",
//   },
//   container: {
//     padding: "20px",
//   },
// };

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// Components
import StudentsList from "./components/StudentsList";
import AddStudentForm from "./components/AddStudentForm";
import UpdateFees from "./components/UpdateFees";
import Inventory from "./components/Inventory";
import ExportImport from "./components/ExportImport";
import StudentProfile from "./components/StudentProfile";
import "./App.css";

// Navbar as a component inside App for hamburger logic
function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close nav menu on route change (mobile)
  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <button
        className={`hamburger${open ? " active" : ""}`}
        aria-label="Toggle navigation"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      <div className={`nav-links${open ? " open" : ""}`}>
        <Link className={`nav-link${location.pathname === "/" ? " active" : ""}`} to="/">Home</Link>
        <Link className={`nav-link${location.pathname === "/add-student" ? " active" : ""}`} to="/add-student">Add Student</Link>
        <Link className={`nav-link${location.pathname === "/update-fees" ? " active" : ""}`} to="/update-fees">Student Fees Update</Link>
        <Link className={`nav-link${location.pathname === "/inventory" ? " active" : ""}`} to="/inventory">Inventory</Link>
        <Link className={`nav-link${location.pathname === "/backup" ? " active" : ""}`} to="/backup">Export / Import</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">The Gurukul Premium Hostel</h1>
        <p className="app-tagline">(अप्प दीपो भव:)</p>
      </header>

      {/* Navbar with hamburger */}
      <Navbar />

      {/* Page Routes */}
      <div className="page-container">
        <Routes>
          <Route path="/" element={<StudentsList />} />
          <Route path="/add-student" element={<AddStudentForm />} />
          <Route path="/update-fees" element={<UpdateFees />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/backup" element={<ExportImport />} />
          <Route path="/student/:id" element={<StudentProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;