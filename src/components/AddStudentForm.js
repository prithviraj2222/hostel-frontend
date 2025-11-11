import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

const AddStudentForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get("id");

  const [formData, setFormData] = useState({
    id: Date.now().toString(), // unique ID
    fullName: "",
    fatherName: "",
    mobile: "",
    aadhaar: "",
    admissionDate: "",
    monthlyFee: "",
    lastFeeDate: null,
    nextFeeDate: null,
    pendingAmount: 0,
  });

  const navigate = useNavigate();

  // Input handle with validation for mobile and aadhaar
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      // Only allow numbers, max 10 digits
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    if (name === "aadhaar") {
      // Only allow numbers, max 12 digits
      if (!/^\d*$/.test(value)) return;
      if (value.length > 12) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mobile validation
    if (formData.mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }
    // Aadhaar validation
    if (formData.aadhaar.length !== 12) {
      alert("Aadhaar number must be exactly 12 digits.");
      return;
    }

    try {
      if (studentId) {
        // Update existing student

        await axios.put(
          `https://hostel-backend-zyws.onrender.com/api/students${studentId}`,
          formData
        );

        alert("✏️ Student Updated Successfully!");
        navigate("/");
      } else {
        await axios.post(
          "https://hostel-backend-zyws.onrender.com/api/students",
          formData
        );
        alert("✅ Student Added Successfully!");
        setFormData({
          id: Date.now().toString(),
          fullName: "",
          fatherName: "",
          mobile: "",
          aadhaar: "",
          admissionDate: "",
          monthlyFee: "",
          lastFeeDate: null,
          nextFeeDate: null,
          pendingAmount: 0,
        });
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error adding student");
    }
  };

  React.useEffect(() => {
    if (studentId) {
      axios
        .get(
          `https://hostel-backend-zyws.onrender.com/api/students/${studentId}`
        )
        .then((res) => setFormData(res.data))
        .catch((err) => console.error("❌ Error fetching student:", err));
    }
  }, [studentId]);

  return (
    <div className="add-student-container">
      <h2>➕ Add New Student</h2>
      <form onSubmit={handleSubmit} className="add-student-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fatherName">Father Name</label>
          <input
            id="fatherName"
            type="text"
            name="fatherName"
            placeholder="Father Name"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            id="mobile"
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            maxLength={10}
            minLength={10}
            inputMode="numeric"
            pattern="\d{10}"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="aadhaar">Aadhaar Number</label>
          <input
            id="aadhaar"
            type="text"
            name="aadhaar"
            placeholder="Aadhaar Number"
            value={formData.aadhaar}
            onChange={handleChange}
            required
            maxLength={12}
            minLength={12}
            inputMode="numeric"
            pattern="\d{12}"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="admissionDate">Admission Date</label>
          <input
            id="admissionDate"
            type="date"
            name="admissionDate"
            value={
              formData.admissionDate
                ? new Date(formData.admissionDate).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="monthlyFee">Monthly Fee</label>
          <input
            id="monthlyFee"
            type="number"
            name="monthlyFee"
            placeholder="Monthly Fee"
            value={formData.monthlyFee}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">
          {studentId ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;
