import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import { UserContext } from "./context/UserContext";
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appointments from "./pages/appointments/Appointments";
import LabResults from "./pages/labResults/LabResults";
import { ThemeContext } from "./context/Theme";
import Profile from "./pages/profile/Profile";
import NotFound from "./components/notFound/NotFound";
import GraphPage from "./pages/graphPage/GraphPage";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedTheme } = useContext(ThemeContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/api/v1/users/init-user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch user data");
          }
        })
        .then((userData) => {
          setUser(userData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ ...selectedTheme }}>
      <BrowserRouter>
        <div>
          <NavBar />
        </div>

        {user ? (
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/labResults" element={<LabResults userId={user.userId} />} />
            <Route path="/graph/:testName" element={<GraphPage userId={user.userId} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/appointments" element={<Home />} />
            <Route path="/labResults" element={<Home/>} />
            <Route path="/graph/:testName" element={<Home />} />
            <Route path="/profile" element={<Home />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
