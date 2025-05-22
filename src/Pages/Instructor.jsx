

import { useState, useEffect } from "react";
import Button from "../Components/Button";
import InstructorGrid from "../Components/InstructorGrid";
import Navbar from "../Components/Navbar";
import Logo from "../icons/Logo";
import LoadingScreen from "./Loading";

// Icons from lucide-react
import { Menu, X, Home, Users, BookOpen, UserPlus, LogIn, ChevronRight, Award, Briefcase, Star } from "lucide-react";
import toast from "react-hot-toast";

export default function Instructor() {
  const [isLoading, setIsLoading] = useState(true);
  const [educators, setEducators] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

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
      // const res = await fetch(`http://64.227.171.122:5000/api/users/geteducators`, {
      const res = await fetch(`https://mindspark-backend.onrender.com/api/users/geteducators`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const educators = await res.json();
      setEducators(educators);
      console.log(educators);
    } catch (err) {
      toast.error("Error fetching educators:", err);
    }
  }

  // if (isLoading) return <LoadingScreen />;

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
        <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Logo navigateto={"/"} />
            <span className="font-bold text-xl cursor-pointer">MindSpark</span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex relative w-1/3">
            {/* Search commented out in original */}
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-300 text-md">
            <a href="/Courses" className="hover:text-white transition flex items-center gap-1">
              <BookOpen size={18} />
              <span>Explore Lectures</span>
            </a>
            <a href="/Signup" className="hover:text-white transition flex items-center gap-1 bg-blue-600 px-4 py-1.5 rounded-full text-white">
              <UserPlus size={18} />
              <span>Sign Up</span>
            </a>
            <a href="/Signin" className="hover:text-white transition flex items-center gap-1 border border-gray-400 px-4 py-1.5 rounded-full">
              <LogIn size={18} />
              <span>Sign In</span>
            </a>
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
            {/* Mobile Search commented out in original */}
            
            <a href="/Courses" className="hover:text-white transition flex items-center gap-2 py-2">
              <BookOpen size={18} />
              <span>Explore Lectures</span>
            </a>
            <a href="/Signup" className="hover:text-white transition flex items-center gap-2 py-2 bg-blue-600 px-4 rounded-lg text-white my-1">
              <UserPlus size={18} />
              <span>Sign Up</span>
            </a>
            <a href="/Signin" className="hover:text-white transition flex items-center gap-2 py-2 border border-gray-400 px-4 rounded-lg my-1">
              <LogIn size={18} />
              <span>Sign In</span>
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 md:px-12 bg-gradient-to-b from-blue-950 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <div className="inline-block px-3 py-1 bg-blue-800 rounded-full text-sm font-medium mb-4">
                Expert-Led Learning
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                Meet Our <span className="text-blue-400">Instructors</span>
              </h1>
              <p className="mt-4 text-gray-300 max-w-xl">
                Learn from industry experts who bring years of real-world experience to the virtual classroom. 
                Our instructors are passionate about sharing their knowledge and helping students reach their full potential.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a
                  href="/Courses"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
                >
                  Explore Lectures <ChevronRight size={18} />
                </a>
                <a
                  href="/Signup"
                  className="px-6 py-3 border border-gray-400 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-800 transition-all"
                >
                  Become an Educator
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              {/* <div className="relative z-10">
                <img 
                  src="/assets/instructor-hero.png" 
                  alt="Instructors" 
                  className="w-full rounded-xl shadow-2xl border-4 border-blue-900"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x400/123456/FFFFFF?text=Instructor+Team";
                  }}
                />
              </div> */}
              <div className="absolute -bottom-6 -right-6 bg-blue-800 rounded-lg p-4 shadow-xl border border-blue-700">
                <div className="flex items-center gap-2">
                  <Award className="text-yellow-400" size={24} />
                  <div>
                    <p className="text-sm">Trusted by</p>
                    <p className="font-bold text-xl">300+ Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-lg bg-blue-50">
              <h3 className="text-3xl font-bold text-blue-900">24+</h3>
              <p className="text-gray-600">Expert Instructors</p>
            </div>
            <div className="p-6 rounded-lg bg-blue-50">
              <h3 className="text-3xl font-bold text-blue-900">50+</h3>
              <p className="text-gray-600">Active Lectures</p>
            </div>
            <div className="p-6 rounded-lg bg-blue-50">
              <h3 className="text-3xl font-bold text-blue-900">300+</h3>
              <p className="text-gray-600">Students Enrolled</p>
            </div>
            <div className="p-6 rounded-lg bg-blue-50">
              <h3 className="text-3xl font-bold text-blue-900">4.8</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Filtering */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-center md:text-left mb-6 md:mb-0">
              <span className="border-b-4 border-blue-600 pb-2">Meet</span> Our Faculty
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {["All", "Computer Science", "Business", "Design", "Math & Science"].map((category) => (
                <button 
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === category 
                      ? "bg-blue-100 text-blue-800" 
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Instructor Grid Section - Using the existing component */}
          <div className="mt-6">
            <InstructorGrid educators={educators} />
          </div>
          
          {/* View All Button */}
          <div className="mt-12 text-center">
            <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium inline-flex items-center">
              See All Instructors <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Join Our Team Banner */}
      <section className="py-16 px-4 bg-blue-950 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Expert Educator Team</h2>
          <p className="mb-8 text-gray-300 max-w-2xl mx-auto">
            Are you passionate about teaching and sharing knowledge? Join MindSpark as an educator 
            and help shape the future of online education.
          </p>
          <a
            href="/Signup"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium inline-flex items-center gap-2"
          >
            Apply Now <ChevronRight size={18} />
          </a>
        </div>
      </section>
    </>
  );
}