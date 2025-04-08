import React, { useState, useEffect } from "react";
import "./RegistrationForm.css"; // Importing CSS file
import "./styles/form.css";
import "./styles/button.css";
import "./styles/error.css";
import "./styles/users.css";

const RegistrationForm = () => {
  const [form, setForm] = useState({
    fullname: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.gender) return setError("Please select a gender");

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.error);
      } else {
        setError("");
        fetchUsers();
        alert("User registered successfully");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="registration-container">
      <h1>Registration Form</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} />
        <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} />

        <div className="radio-group">
          <label>
            <input type="radio" name="gender" value="male" onChange={handleChange} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" onChange={handleChange} /> Female
          </label>
        </div>

        <button type="submit">Register</button>
      </form>

      <div className="user-list">
        <h3>Registered Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.fullname} - {user.email}
              {user.profileImage && <img src={`http://localhost:5000/uploads/${user.profileImage}`} alt="Profile" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RegistrationForm;
  