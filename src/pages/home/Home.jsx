import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/appointments");
  };

  return (
    <div className="homeDiv">
      <div className="openingImageMedicareDiv">
        <img
          className="openingImageMedicare"
          src="images\light blue creative modern medical clinic presentation.png"
          alt=""
        />
      </div>
      <div className="containerForWelcome">
        <h1 className="welcomeTextMedicare">Welcome to MediCare</h1>
        <div className="contentContainer">
          <div className="welcomeContainer">
            <div className="welcomeDescription">
              <p>
                At MediCare, we prioritize your health and well-being. Our team
                is dedicated to providing comprehensive medical care and
                personalized treatment plans tailored to your needs.
              </p>
              <p>
                Whether you're managing a chronic condition or in need of
                routine check-ups, we're here to support you every step of the
                way.
              </p>
            </div>
          </div>
          <div className="buttonContainer">
            <div className="appointmentButtonContainer">
              <p className="appointmentText">
                Ready to schedule an appointment?
              </p>
              <button
                className="appointmentButton"
                onClick={handleBookAppointment}
              >
                Book Appointment
              </button>
            </div>
          </div>
          <img
            className="backShapeImage"
            src="images\backShape.png"
            alt="Back Shape Image"
          />
        </div>
      </div>
      <div>
        <img className="imageWhyUs" src="images\WhyUs.png" alt="Why Us Image" />
      </div>
    </div>
  );
}

export default Home;
