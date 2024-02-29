import React, { useState, useEffect, useContext } from "react";
import SpecialtySearch from "../../components/searchSpecialty/SearchSpecialty";
import DateInput from "../../components/dateInput/DateInput";
import { UserContext } from '../../context/UserContext';

function Appointments() {
  const { user } = useContext(UserContext);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState([]);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  useEffect(() => {
    if (user.role === 'doctor') {
      fetchDoctorAppointments();
    }
  }, [user]);

  const fetchDoctorAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token missing");
      }

      const response = await fetch('http://localhost:3000/api/v1/appointments/doctor-appointments', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch doctor appointments');
      }

      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
    }
  };

  const handleDoctorSearch = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div>
      <h2>Specialty Search</h2>
      <SpecialtySearch handleDoctorClick={handleDoctorSearch} />
      <h2>Date Input for Appointments</h2>
      {user.role === 'doctor' ? (
        <div>
          <h3>Doctor Appointments</h3>
          <ul>
            {appointments.map(appointment => (
              <li key={appointment._id}>
                <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p>Hour: {appointment.hour}</p>
                {appointment.patient && ( 
                  <>
                    <p>Patient: {appointment.patient.fullName}</p>
                    <p>Email: {appointment.patient.email}</p>
                  </>
                )}
                <p>Location: {appointment.location}</p>
                <p>Availability: {appointment.Availability ? 'Available' : 'Booked'}</p> 
              </li>
            ))}
          </ul>
        </div>
      ) : (
        selectedDoctor && (
          <DateInput
            doctorID={selectedDoctor._id}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )
      )}
    </div>
  );
}

export default Appointments;
