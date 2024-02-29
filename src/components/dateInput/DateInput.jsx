import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";

function DateInput({ doctorID, selectedDate, setSelectedDate }) {
  const [appointments, setAppointments] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const handleAppointmentClick = async (appointmentID) => {
    const confirmed = window.confirm("Do you want to make this appointment?");
    if (confirmed) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token missing");
        }
  
        const response = await fetch(`http://localhost:3000/api/v1/appointments/${appointmentID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Availability: false, patient: user.id }), 
        });
  
        if (!response.ok) {
          throw new Error("Failed to update appointment");
        }
  

      } catch (error) {
        console.error("Error updating appointment:", error);
      }
    }
  };
  


  const handleDateChange = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token missing");
      }

      const formattedDate = new Date(selectedDate).toISOString().split("T")[0];
console.log("Date: " + formattedDate)
      const response = await fetch(
        `http://localhost:3000/api/v1/appointments/available?doctorID=${doctorID}&date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      handleDateChange();
    }
  }, [selectedDate]);

  return (
    <div>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <ul>
      {appointments.map((appointment) => (
    <li
        key={appointment._id}
        onClick={() => handleAppointmentClick(appointment._id, appointment.patient)}

    >
        {appointment.hour} -{" "}
        {appointment.Availability ? "Available" : "Not Available"}
    </li>
        ))}
      </ul>
    </div>
  );
}

export default DateInput;
