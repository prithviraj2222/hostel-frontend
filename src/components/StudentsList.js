// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// const StudentsList = () => {
//   const [students, setStudents] = useState([]);
//   const navigate = useNavigate();

//   // ✅ Fetch students
//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get("https://hostel-backend-zyws.onrender.com/api/students");
//       setStudents(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching students:", err);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   return (
//     <div className="students-list-container">
//       <h2>🎓 Students List ({students.length})</h2>
//       <div className="table-responsive">
//         <table className="students-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Mobile</th>
//               <th>Monthly Fee</th>
//               <th>Last Fee Date</th>
//               <th>Next Fee Date</th>
//               <th>Pending Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.length > 0 ? (
//               students.map((stu) => (
//                 <tr key={stu.id}>
//                   <td
//                     data-label="Name"
//                     onClick={() => navigate(`/student/${stu.id}`)}
//                     className="student-name-link"
//                   >
//                     {stu.fullName}
//                   </td>
//                   <td data-label="Mobile">{stu.mobile}</td>
//                   <td data-label="Monthly Fee">₹{stu.monthlyFee}</td>
//                   <td data-label="Last Fee Date">
//                     {stu.lastFeeDate
//                       ? new Date(stu.lastFeeDate).toLocaleDateString()
//                       : "-"}
//                   </td>
//                   <td data-label="Next Fee Date">
//                     {stu.nextFeeDate
//                       ? new Date(stu.nextFeeDate).toLocaleDateString()
//                       : "-"}
//                   </td>
//                   <td data-label="Pending Amount">{stu.pendingAmount || 0}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="table-empty">
//                   No students found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StudentsList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// const StudentsList = () => {
//   const [students, setStudents] = useState([]);
//   const navigate = useNavigate();

//   // ✅ Fetch students
//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get("https://hostel-backend-zyws.onrender.com/api/students");
//       setStudents(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching students:", err);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   // ✅ Format date as DD/MM/YYYY
//   const formatDate = (dateStr) => {
//     if (!dateStr) return "-";
//     const date = new Date(dateStr);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // JS months 0-11
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   // ✅ Calculate next fee date (month/year logic fixed)
//   const getNextFeeDate = (admissionDate, lastFeeDate) => {
//     if (!lastFeeDate || !admissionDate) return "-";
//     try {
//       const last = new Date(lastFeeDate);
//       let nextMonth = last.getMonth() + 1; // JS: 0=Jan, 11=Dec
//       let nextYear = last.getFullYear();

//       if (nextMonth === 12) {
//         nextMonth = 0; // January
//         nextYear += 1;
//       }

//       // Use admission date's day
//       const admission = new Date(admissionDate);
//       let day = admission.getDate();

//       // Create next fee date
//       let nextDate = new Date(nextYear, nextMonth, day);

//       // If the day overflows (e.g., 31st Feb), fallback to last day of next month
//       if (nextDate.getMonth() !== nextMonth) {
//         nextDate = new Date(nextYear, nextMonth + 1, 0);
//       }

//       return formatDate(nextDate);
//     } catch {
//       return "-";
//     }
//   };

//   return (
//     <div className="students-list-container">
//       <h2>🎓 Students List ({students.length})</h2>
//       <div className="table-responsive">
//         <table className="students-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Mobile</th>
//               <th>Monthly Fee</th>
//               <th>Last Fee Date</th>
//               <th>Next Fee Date</th>
//               <th>Pending Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.length > 0 ? (
//               students.map((stu) => (
//                 <tr key={stu.id}>
//                   <td
//                     data-label="Name"
//                     onClick={() => navigate(`/student/${stu.id}`)}
//                     className="student-name-link"
//                   >
//                     {stu.fullName}
//                   </td>
//                   <td data-label="Mobile">{stu.mobile}</td>
//                   <td data-label="Monthly Fee">₹{stu.monthlyFee}</td>
//                   <td data-label="Last Fee Date">
//                     {stu.lastFeeDate
//                       ? formatDate(stu.lastFeeDate)
//                       : "-"}
//                   </td>
//                   <td data-label="Next Fee Date">
//                     {getNextFeeDate(stu.admissionDate, stu.lastFeeDate)}
//                   </td>
//                   <td data-label="Pending Amount">{stu.pendingAmount || 0}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="table-empty">
//                   No students found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StudentsList;

const StudentsList = () => {
  return (
    <h1>Ice Cream Family Pack - Chocholate</h1>
  ); 
}
export default StudentsList;
