import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [monthKey, setMonthKey] = useState("");
  const [formData, setFormData] = useState({
    id: Date.now().toString(),
    itemName: "",
    quantity: "",
    price: "",
  });
  const [editMode, setEditMode] = useState(false);

  const fetchItems = async (key) => {
    try {
      const res = await axios.get(`https://hostel-backend-zyws.onrender.com/api/inventory/${key}`);
      setItems(res.data);
    } catch (err) {
      console.error("❌ Error fetching items:", err);
    }
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonthKey(selectedMonth);
    fetchItems(selectedMonth);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!monthKey) {
      alert("⚠️ Please select a month first!");
      return;
    }

    const newItem = {
      ...formData,
      totalPrice: formData.quantity * formData.price,
      monthKey,
    };

    try {
      if (editMode) {
        await axios.put(
          `https://hostel-backend-zyws.onrender.com/api/inventory/${formData.id}`,
          newItem
        );
        alert("✏️ Item updated!");
        setEditMode(false);
      } else {
        newItem.id = Date.now().toString();
        await axios.post("https://hostel-backend-zyws.onrender.com/api/inventory", newItem);
        alert("✅ Item added!");
      }
      setFormData({
        id: Date.now().toString(),
        itemName: "",
        quantity: "",
        price: "",
      });
      fetchItems(monthKey);
    } catch (err) {
      console.error(err);
      alert("❌ Error saving item");
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`https://hostel-backend-zyws.onrender.com/api/inventory/${id}`);
        alert("🗑️ Item deleted");
        fetchItems(monthKey);
      } catch (err) {
        console.error(err);
        alert("❌ Error deleting item");
      }
    }
  };

  const editItem = (item) => {
    setFormData({
      id: item.id,
      itemName: item.itemName,
      quantity: item.quantity,
      price: item.price,
    });
    setEditMode(true);
  };

  const total = items.reduce((sum, i) => sum + (i.totalPrice || 0), 0);

  return (
    <div className="inventory-container">
      <h2>📦 Inventory Management</h2>

      <label>Select Month (YYYY-MM): </label>
      <input type="month" value={monthKey} onChange={handleMonthChange} />

      <form onSubmit={handleSubmit} className="inventory-form">
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit">{editMode ? "Update Item" : "Add Item"}</button>
      </form>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td data-label="Item Name">{item.itemName}</td>
                <td data-label="Quantity">{item.quantity}</td>
                <td data-label="Price">₹{item.price}</td>
                <td data-label="Total Price">₹{item.totalPrice}</td>
                <td data-label="Action">
                  <button className="edit-btn" onClick={() => editItem(item)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No items found for this month
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3 className="inventory-total">🧾 Monthly Total: ₹{total}</h3>
    </div>
  );
};

export default Inventory;
