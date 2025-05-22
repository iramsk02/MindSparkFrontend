

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../icons/Logo";
import LoadingScreen from "./Loading";
import { Menu, X, Home, Users, BookOpen, UserPlus, LogIn, Star, ChevronRight } from "lucide-react"; // Removed Clock
import toast from "react-hot-toast";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCourse, setHoveredCourse] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => navigate("/Signup");

  useEffect(() => {
    getAllCourses();
  }, []);

  async function getAllCourses() {
    try {
      const response = await fetch(`https://mindspark-backend.onrender.com/api/courses/Allcourses`);
      // const response = await fetch(`http://64.227.171.122:5000/api/courses/Allcourses`);
      const data = await response.json();
      if (response.ok) {
        setCourses(data);
      } else {
        toast.error(`Failed to fetch courses: ${data.message}`);
      }
    } catch (error) {
      toast.error('An error occurred while retrieving courses.');
    } finally {
      setLoading(false);
    }
  }

  // if (loading) return <LoadingScreen />;

  return (
    <>
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
            <a href="/Instructors" className="hover:text-white transition flex items-center gap-1">
              <Users size={18} />
              <span>Our Instructors</span>
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
            
            <a href="/Instructors" className="hover:text-white transition flex items-center gap-2 py-2">
              <Users size={18} />
              <span>Our Instructors</span>
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
      <section className="pt-24 pb-12 px-6 lg:px-20 bg-blue-950 text-white flex flex-col-reverse md:flex-row justify-between items-center gap-10">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <div className="inline-block px-3 py-1 bg-blue-800 rounded-full text-sm font-medium mb-2">
            Start your learning journey today
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Discover a New Way of <span className="text-blue-400">Learning</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl">
            Expand your skills with expert-led courses. Join thousands of students already learning on MindSpark.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all">
              Get Started <ChevronRight size={18} />
            </button>
            <a href="/Courses" className="border border-gray-400 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-900 transition-all">
              Explore Lectures
            </a>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
            <div className="flex -space-x-2">
              {[1, 2].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-blue-950 bg-blue-${i*100 + 300}`}>
                  <img className={`w-8 h-8 rounded-full border-2 border-blue-950 bg-blue-${i*100 + 300}`} src="assets\pexels-photo-17.jpeg" alt="" />
                </div>
              ))}
            </div>
            <p className="text-sm">Join <span className="font-bold">2,000+</span> students</p>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="src/assets/Courseimg.png" 
            alt="Course" 
            className="w-80 h-80 rounded-2xl shadow-2xl border-4 border-blue-900 transform hover:scale-102 transition-transform duration-300" 
          />
        </div>
      </section>

      {/* Courses Section */}
      <section className="px-6 py-12 lg:px-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-center md:text-left">
              <span className="border-b-4 border-blue-600 pb-2">Trending</span> Lectures
            </h2>
            <div className="mt-4 md:mt-0 flex gap-2">
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-900 px-4 py-2 rounded-lg font-medium">
                All
              </button>
              <button className="hover:bg-blue-50 text-gray-600 px-4 py-2 rounded-lg font-medium">
                Popular
              </button>
              <button className="hover:bg-blue-50 text-gray-600 px-4 py-2 rounded-lg font-medium">
                Newest
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                onClick={handleClick}
                onMouseEnter={() => setHoveredCourse(index)}
                onMouseLeave={() => setHoveredCourse(null)}
                className="cursor-pointer bg-white hover:bg-blue-50 p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 relative overflow-hidden group"
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <video
                    className="w-full h-48 object-cover rounded-lg mb-2 border transform group-hover:scale-105 transition-transform duration-300"
                    poster={course.thumbnailUrl}
                    controls={false}
                  >
                    <source src={course.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* {hoveredCourse === index && (
                    <div className="absolute inset-0 bg-blue-900 bg-opacity-70 flex items-center justify-center">
                      <button className="bg-white text-blue-900 px-4 py-2 rounded-lg font-medium">
                        Preview Cou
                      </button>
                    </div>
                  )} */}
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs">
                    Featured
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {['Beginner', 'Intermediate', 'Advanced'][index % 3]}
                  </span>
                  <div className="flex items-center text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs ml-1">4.{8 - (index % 3)}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2 line-clamp-2">{course.title}</h3>
                {/* Time and lessons details removed as requested */}
                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-bold text-blue-900">${(19 + index * 5).toFixed(2)}</span>
                    {index % 2 === 0 && (
                      <span className="text-gray-500 line-through ml-2">${(29 + index * 5).toFixed(2)}</span>
                    )}
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium inline-flex items-center">
              View All Lectures <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}