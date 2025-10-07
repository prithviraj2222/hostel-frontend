import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const UpdateFees = () => {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    lastFeeDate: "",
    pendingAmount: "",
  });

  const navigate = useNavigate();

  // ✅ Fetch all students for dropdown
  useEffect(() => {
    axios
      .get("https://hostel-backend-zyws.onrender.com/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("❌ Error fetching students:", err));
  }, []);

  // ✅ Handle change in form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) {
      alert("⚠️ Please select a student first");
      return;
    }

    try {
      await axios.put(
        `https://hostel-backend-zyws.onrender.com/api/students/${selectedId}/fees`,
        formData
      );
      alert("✅ Fees updated successfully!");
      setFormData({ lastFeeDate: "", pendingAmount: "" });
      setSelectedId("");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Error updating fees");
    }
  };

  return (
    <div className="update-fees-container">
      <h2>💰 Update Student Fees</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="update-select"
      >
        <option value="">-- Select Student --</option>
        {students.map((stu) => (
          <option key={stu.id} value={stu.id}>
            {stu.fullName} ({stu.fatherName})
          </option>
        ))}
      </select>

      <form onSubmit={handleSubmit} className="update-fees-form">
        <label>Last Fee Date</label>
        <input
          type="date"
          name="lastFeeDate"
          value={formData.lastFeeDate}
          onChange={handleChange}
          required
        />

        <label>Pending Amount</label>
        <input
          type="number"
          name="pendingAmount"
          value={formData.pendingAmount}
          onChange={handleChange}
          placeholder="Enter pending amount"
        />

        <button type="submit">Update Fees</button>
      </form>
    </div>
  );
};

export default UpdateFees;