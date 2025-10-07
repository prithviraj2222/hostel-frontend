import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const StudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://hostel-backend-zyws.onrender.com/api/students/${id}`)
      .then((res) => setStudent(res.data))
      .catch((err) => console.error("❌ Error fetching student:", err));
  }, [id]);

  // Delete student feature
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`https://hostel-backend-zyws.onrender.com/api/students/${id}`);
        alert("✅ Student deleted successfully!");
        navigate("/");
      } catch (err) {
        console.error("❌ Error deleting student:", err);
        alert("❌ Error deleting student");
      }
    }
  };

  if (!student) {
    return <p>Loading student details...</p>;
  }

  return (
    <div className="student-profile-container">
      <h2>👨‍🎓 Student Profile</h2>
      <div className="student-card">
        <p>
          <strong>Full Name:</strong> {student.fullName}
        </p>
        <p>
          <strong>Father's Name:</strong> {student.fatherName}
        </p>
        <p>
          <strong>Mobile:</strong> {student.mobile}
        </p>
        <p>
          <strong>Aadhaar:</strong> {student.aadhaar}
        </p>
        <p>
          <strong>Monthly Fee:</strong> ₹{student.monthlyFee}
        </p>
        <p>
          <strong>Fees Paid:</strong> ₹{student.feesPaid || 0}
        </p>
        <p>
          <strong>Pending Amount:</strong> ₹{student.pendingAmount || 0}
        </p>
        <p>
          <strong>Admission Date:</strong>{" "}
          {student.admissionDate
            ? new Date(student.admissionDate).toLocaleDateString()
            : "-"}
        </p>
        <p>
          <strong>Last Fee Date:</strong>{" "}
          {student.lastFeeDate
            ? new Date(student.lastFeeDate).toLocaleDateString()
            : "-"}
        </p>
        <p>
          <strong>Next Fee Date:</strong>{" "}
          {student.nextFeeDate
            ? new Date(student.nextFeeDate).toLocaleDateString()
            : "-"}
        </p>
      </div>

      <button className="button button-danger" onClick={handleDelete} style={{ marginBottom: "1em" }}>
        Delete Student
      </button>
      <br />
      <Link to="/" className="back-button">
        ⬅️ Back to List
      </Link>
    </div>
  );
};

export default StudentProfile;