

import { useState, useEffect } from "react";
import Button from "../Components/Button";
import InstructorGrid from "../Components/InstructorGrid";
import Navbar from "../Components/Navbar";
import Logo from "../icons/Logo";
import LoadingScreen from "./Loading";

// Icons from lucide-react
import { Menu, X, Home } from "lucide-react";

export default function Instructor() {
  const [isLoading, setIsLoading] = useState(true);
  const [educators, setEducators] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getEducators();

    // Simulate loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  async function getEducators() {
    try {
      const res = await fetch(`https://mindspark-backend.onrender.com/api/users/geteducators`, {
      // const res = await fetch(`http://localhost:5000/api/users/geteducators`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const educators = await res.json();
      setEducators(educators);
      console.log(educators);
    } catch (err) {
      console.error("Error fetching educators:", err);
    }
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Logo navigateto={"/"} />
            <span className="font-bold text-xl">MindSpark</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-gray-300 text-md">
            <a href="/" className="hover:text-white transition"><Home size={20} /></a>
            <a href="/Courses" className="hover:text-white transition">Courses</a>
            <a href="/Signup" className="hover:text-white transition">Sign Up</a>
            <a href="/Signin" className="hover:text-white transition">Sign In</a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        {isOpen && (
          <div className="md:hidden px-6 pb-4 bg-primary text-gray-300 flex flex-col gap-4 text-md">
            <a href="/" className="hover:text-white transition"><Home size={20} className="inline-block mr-2" />Home</a>
            <a href="/Instructors" className="hover:text-white transition">Our Instructors</a>
            <a href="/Courses" className="hover:text-white transition">Courses</a>
            <a href="/Signup" className="hover:text-white transition">Sign Up</a>
            <a href="/Signin" className="hover:text-white transition">Sign In</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 px-4 md:px-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Meet Our Instructors</h1>
        <p className="mt-4 text-sm md:text-base max-w-3xl mx-auto text-gray-600">
          Our mission is to provide the best learning experience with guidance from industry experts.
          Learn from top professionals who bring real-world knowledge and hands-on expertise to help you succeed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <a
            href="/Courses"
            className="px-6 py-2 bg-white text-blue-800 border-2 border-blue-800 rounded-full font-semibold shadow-sm hover:bg-blue-800 hover:text-white transition duration-300"
          >
            Explore Courses
          </a>
          <a
            href="/Signup"
            className="px-6 py-2 bg-white text-blue-800 border-2 border-blue-800 rounded-full font-semibold shadow-sm hover:bg-blue-800 hover:text-white transition duration-300"
          >
            Become an Educator
          </a>
        </div>
      </section>

      {/* Instructor Grid Section */}
      <section className="px-4 sm:px-8 md:px-16 mt-12 mb-20">
        <InstructorGrid educators={educators} />
      </section>
    </>
  );
}

