import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';

const ExportImport = () => {
  const [importStatus, setImportStatus] = useState("");
  const [clearStatus, setClearStatus] = useState("");
  const navigate = useNavigate();

  // ✅ Export function
  const handleExport = async () => {
    try {
      const res = await axios.get("https://hostel-backend-zyws.onrender.com/api/backup/export");
      const dataStr = JSON.stringify(res.data, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "backup.json";
      link.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("❌ Error exporting data");
    }
  };

  // ✅ Import function
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      await axios.post("https://hostel-backend-zyws.onrender.com/api/backup/import", jsonData, {
        headers: { "Content-Type": "application/json" },
      });

      setImportStatus("✅ Data imported successfully!");
      navigate("/"); // Redirect to home page after successful import
    } catch (err) {
      console.error(err);
      setImportStatus("❌ Error importing data");
    }
  };

  // ✅ Clear all students data
  const handleClearStudents = async () => {
    if (!window.confirm("Are you sure you want to delete ALL students data?")) return;
    try {
      await axios.delete("https://hostel-backend-zyws.onrender.com/api/students/clear-all");
      setClearStatus("✅ All students data cleared!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setClearStatus("❌ Error clearing students data");
    }
  };

  // ✅ Clear all inventory data
  const handleClearInventory = async () => {
    if (!window.confirm("Are you sure you want to delete ALL inventory data?")) return;
    try {
      await axios.delete("https://hostel-backend-zyws.onrender.com/api/inventory/clear-all");
      setClearStatus("✅ All inventory data cleared!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setClearStatus("❌ Error clearing inventory data");
    }
  };

  return (
    <div className="export-import-container">
      <h2>⬇️ Export / ⬆️ Import Data</h2>

      <button onClick={handleExport} className="export-import-button">
        ⬇️ Export Data (Download JSON)
      </button>

      <div className="export-import-upload">
        <label>⬆️ Import Data (Upload JSON): </label>
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="export-import-input"
        />
      </div>

      {importStatus && <p className="export-import-status">{importStatus}</p>}

      <hr style={{ margin: "2rem 0" }} />

      <button
        onClick={handleClearStudents}
        className="export-import-button"
        style={{ background: "#e74c3c", color: "#fff", marginRight: "1rem" }}
      >
        🗑️ Clear All Students Data
      </button>
      <button
        onClick={handleClearInventory}
        className="export-import-button"
        style={{ background: "#e67e22", color: "#fff", marginTop: "1rem" }}
      >
        🗑️ Clear All Inventory Data
      </button>

      {clearStatus && <p className="export-import-status">{clearStatus}</p>}
    </div>
  );
};

export default ExportImport;