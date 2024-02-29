// SpecialtySearch.js
import React, { useState } from "react";

function SpecialtySearch({ handleDoctorClick }) {
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token missing");
      }
      const response = await fetch(
        `http://localhost:3000/api/v1/users/specialty?specialty=${specialty}`, // Updated endpoint
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error searching for doctors:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id} onClick={() => handleDoctorClick(doctor)}>
            {doctor.fullName} - {doctor.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpecialtySearch;
