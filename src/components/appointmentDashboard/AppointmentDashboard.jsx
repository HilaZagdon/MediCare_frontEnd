import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const AppointmentDashboard = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [availability, setAvailability] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token missing");
      }
  

      const doctorID = user._id; 
  
      const response = await fetch('http://localhost:3000/api/v1/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ location, date, hour, availability, doctorID }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create appointment');
      }
  

      setSuccessMessage('Appointment added successfully!');
      setLocation('');
      setDate('');
      setHour('');
      setAvailability(true);
  

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
  
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };
  
  
  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token missing");
      }
  
      const response = await fetch(`http://localhost:3000/api/v1/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div>
      <h2>Create Appointment</h2>
      <form onSubmit={handleCreateAppointment}>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Hour:
          <input type="time" value={hour} onChange={(e) => setHour(e.target.value)} />
        </label>
        <label>
          Availability:
          <input type="checkbox" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
        </label>
        <button type="submit">Create Appointment</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      <button onClick={() => handleDeleteAppointment(appointmentId)}>Delete Appointment</button>
    </div>
  );
};

export default AppointmentDashboard;
