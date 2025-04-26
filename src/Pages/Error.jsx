import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (role === "student") {
      navigate("/StudentDashboard");
    } else if (role === "educator") {
      navigate("/InstructorDashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-black  min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="typing-text text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ">
        404 - Page Not Found
      </h1>

      <div
        onClick={handleRedirect}
        className="fade-in-up card-glow cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors duration-300 text-white text-base sm:text-lg md:text-xl px-6 py-4 rounded-xl shadow-md max-w-md"
      >
        Sorry Mate, the page you're looking for doesn't exist.
        <div className="mt-2 text-sm text-gray-400">Click here to go back</div>
      </div>
    </div>
  );
}
