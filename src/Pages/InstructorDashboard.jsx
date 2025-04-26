
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import VideoGrid from "../Components/VideoGrid";
import { useEffect, useState } from "react";
import Logo from "../icons/Logo";
import LoadingScreen from "./Loading";
import { Menu, X } from "lucide-react"; // lucide-react for icons
import Home from "../icons/Home";


export default function InstructorDashboard() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");
    const avatar = localStorage.getItem("avatar");
    const role = localStorage.getItem("role");
    const navigate = useNavigate()

    const [allCourses, setAllCourses] = useState([]);
    const [instructorsCourses, setInstructorsCourses] = useState([]);
    const [otherCourses, setOtherCourses] = useState([]);
    const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        if (userId) getInstructorsCourses();
    }, [userId]);

    useEffect(() => {
        if (userId) getAllCourses();
    }, [instructorsCourses]);

    async function getInstructorsCourses() {
        try {
            const response = await fetch(`http://localhost:5000/api/courses/educatorCourses/${userId}`, {
            // const response = await fetch(`https://micro-learn-backend.onrender.com/api/courses/educatorCourses/${userId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });
            const data = await response.json();
            if (response.ok) {
                setInstructorsCourses(data);
            } else {
                alert(`Failed to fetch instructor's courses: ${data.message}`);
            }
        } catch (error) {
            console.error('Error fetching instructor courses:', error);
            alert('An error occurred while retrieving instructor courses.');
        }finally{setLoading(false)}
    }

    async function getAllCourses() {
        try {
            const response = await fetch('http://localhost:5000/api/courses/Allcourses', {
            // const response = await fetch('https://micro-learn-backend.onrender.com/api/courses/Allcourses', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });
            const data = await response.json();

            if (response.ok) {
                setAllCourses(data);
                const instructorCourseIds = new Set(instructorsCourses.map(course => course._id));
                const filteredCourses = data.filter(course => !instructorCourseIds.has(course._id));
                setOtherCourses(filteredCourses);
            } else {
                alert(`Failed to fetch all courses: ${data.message}`);
            }
        } catch (error) {
            console.error('Error fetching all courses:', error);
            alert('An error occurred while retrieving all courses.');
        }
        finally{
            setLoading(false)
        }
    }
  if (loading) return <LoadingScreen />; //  use loading screen here

    return (
        <>
            {/* Navbar */}
          
      <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Logo navigateto={"/StudentDashboard"} />
            <span className="font-bold text-xl">MindSpark</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-gray-300 text-md">
            <a href="/InstructorDashboard" className="hover:text-white transition"><Home /></a>
            <a href="/Createquiz" className="hover:text-white transition">Create Quiz</a>
            <a href="/Createcourse" className="hover:text-white transition">Create Course</a>
            {/* <a href="/Signin" className="hover:text-white transition">Sign In</a> */}
            <div className="">
              {role === "student" ? <a href="/StudentProfile"><img className=" bg-amber-300 w-[42px] h-[42px] rounded-[260px] border-amber-50 border-1" src={avatar} alt="DP" /></a> : <a href="/InstructorProfile"><img className=" bg-amber-300 w-[42px] h-[42px] rounded-[260px] border-amber-50 border-1" src={avatar} alt="DP" /></a>}

            </div>
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
            <a href="/Createquiz" className="hover:text-white transition">Create Quiz</a>
            <a href="/Createcourse" className="hover:text-white transition">Create Course</a>
            <a href="/InstructorProfile" className="hover:text-white transition">Profile</a>
          </div>
        )}
      </nav>
            <main className="pt-24 px-6 md:px-12 max-w-screen-xl mx-auto">
                {/* Welcome Section */}
                <section className="mb-10 bg-gradient-to-r from-indigo-100 to-white rounded-xl p-6 md:p-10 shadow">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back 👋</h1>
                            <p className="text-gray-600 text-sm md:text-base">
                                Keep empowering students with your knowledge!
                            </p>
                        </div>
                        <button onClick={() => navigate("/Createcourse")} className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
                            + Create New Course
                        </button>
                    </div>
                </section>

                {/* Dashboard Stats (Optional future metrics) */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h2 className="text-xl font-semibold mb-2">{instructorsCourses.length}</h2>
                        <p className="text-gray-500">Your Courses</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h2 className="text-xl font-semibold mb-2">245</h2>
                        <p className="text-gray-500">Total Enrollments</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h2 className="text-xl font-semibold mb-2">4.8 ★</h2>
                        <p className="text-gray-500">Average Rating</p>
                    </div>
                </section>

                {/* Created Courses */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Your Courses</h2>
                    <VideoGrid videos={instructorsCourses} />
                </section>

                {/* Trending Courses */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold mb-6">Trending Courses</h2>
                    <VideoGrid videos={otherCourses} />
                </section>
            </main>
        </>
    );
}
