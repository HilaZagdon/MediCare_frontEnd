import React from "react";

const AppointmentItem = ({ appointment, onCancelAppointment }) => {
  const date = new Date(appointment.date);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const handleCancelAppointment = () => {
    onCancelAppointment(appointment._id);
  };

  return (
    <div className="appointmentItem">
      <h3>Appointment Details</h3>
      <p>Doctor: {appointment.doctorID.fullName}</p>
      <p>Location: {appointment.location}</p>
      <p>Date: {formattedDate}</p>
      <p>Hour: {appointment.hour}</p>
      <button onClick={handleCancelAppointment}>Cancel Appointment</button>
    </div>
  );
};

export default AppointmentItem;
