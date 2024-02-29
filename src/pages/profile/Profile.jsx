import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import AppointmentItem from "../../components/appointmentItem/AppointmentItem";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token missing");
        }

        const response = await fetch(
          `http://localhost:3000/api/v1/appointments?patient=${user._id}`,
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

    fetchAppointments();
  }, [user._id]);

  const handleUpdateAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token missing");
      }

      const response = await fetch(`http://localhost:3000/api/v1/appointments/${appointmentId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Availability: true,
          patient: null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }


      setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== appointmentId));
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  return (
    <div className="profileDiv">
      <div className="profileContainer">
        <h2>Appointments</h2>
        <div className="appointmentList">
          {appointments.map((appointment) => (
            <AppointmentItem key={appointment._id} appointment={appointment} onCancelAppointment={handleUpdateAppointment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
