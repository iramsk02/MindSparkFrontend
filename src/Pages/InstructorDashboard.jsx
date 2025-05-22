
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Home, Book, Plus, Award, Users, Star, ListChecks,User } from "lucide-react"; // Added more icons
import Logo from "../icons/Logo";
import LoadingScreen from "./Loading";
import VideoGrid from "../Components/VideoGrid";
import toast from "react-hot-toast";

export default function InstructorDashboard() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");
    const avatar = localStorage.getItem("avatar");
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

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
            const response = await fetch(`https://mindspark-backend.onrender.com/api/courses/educatorCourses/${userId}`, {
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
                toast.error(`Failed to fetch instructor's courses: ${data.message}`);
            }
        } catch (error) {
            console.error('Error fetching instructor courses:', error);
            toast.error('An error occurred while retrieving instructor courses.');
        } finally {
            setLoading(false);
        }
    }

    async function getAllCourses() {
        try {
            const response = await fetch('https://mindspark-backend.onrender.com/api/courses/Allcourses', {
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
                toast.error(`Failed to fetch all courses: ${data.message}`);
            }
        } catch (error) {
            console.error('Error fetching all courses:', error);
            toast.error('An error occurred while retrieving all courses.');
        } finally {
            setLoading(false);
        }
    }

    // if (loading) return <LoadingScreen />;

    return (
        <div className="min-h-screen ">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-lg">
                <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Logo navigateto={"/InstructorDashboard"} />
                        <span className="font-bold text-xl tracking-tight">MindSpark</span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6 text-gray-200 text-md">
                        {/* <a href="/InstructorDashboard" className="flex items-center gap-1 hover:text-white transition font-medium">
                            <Home size={18} />
                            <span>Dashboard</span>
                        </a> */}
                        <a href="/Createquiz" className="flex items-center gap-1 hover:text-white transition font-medium">
                            <ListChecks size={18} />
                            <span>Create Quiz</span>
                        </a>
                        <a href="/Createcourse" className="flex items-center gap-1 hover:text-white transition font-medium">
                            <Book size={18} />
                            <span>Create Lecture</span>
                        </a>
                        <div className="ml-2">
                            {role === "student" ? (
                                <a href="/StudentProfile" className="flex items-center">
                                    {/* <User size={18}/> */}
                                    <img 
                                        className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm transition transform hover:scale-105" 
                                        src={avatar} 
                                        alt="Profile"
                                    />
                                </a>
                            ) : (
                                <a href="/InstructorProfile" className="flex items-center">
                                      {/* <User size={18}/> */}
                                    <img 
                                        className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm transition transform hover:scale-105" 
                                        src={avatar} 
                                        alt="Profile" 
                                    />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-1 rounded-md hover:bg-indigo-700 transition"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Links */}
                {isOpen && (
                    <div className="md:hidden px-6 pb-4 pt-2 bg-primary text-gray-200 flex flex-col gap-4 text-md animate-fadeIn">
                        <a href="/InstructorDashboard" className="flex items-center gap-2 py-2 hover:text-white transition">
                            <Home size={18} />
                            <span>Dashboard</span>
                        </a>
                        <a href="/Createquiz" className="flex items-center gap-2 py-2 hover:text-white transition">
                            <ListChecks size={18} />
                            <span>Create Quiz</span>
                        </a>
                        <a href="/Createcourse" className="flex items-center gap-2 py-2 hover:text-white transition">
                            <Book size={18} />
                            <span>Create Lecture</span>
                        </a>
                        <a href="/InstructorProfile" className="flex items-center gap-2 py-2 hover:text-white transition">
                            {/* <img 
                                className="w-8 h-8 rounded-full border-2 border-white" 
                                src={avatar} 
                                alt="Profile" 
                            /> */}
                              <User size={18}/>
                            <span>Profile</span>
                        </a>
                    </div>
                )}
            </nav>

            <main className="pt-24 px-6 md:px-12 max-w-7xl mx-auto pb-16">
                {/* Welcome Section */}
                <section className="mb-10 bg-gradient-to-r from-indigo-100 to-white rounded-2xl p-6 md:p-10 shadow-md">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">Welcome Back 👋</h1>
                            <p className="text-gray-600 text-sm md:text-base max-w-lg">
                                Keep empowering students with your knowledge and create engaging learning experiences.
                            </p>
                        </div>
                        <button 
                            onClick={() => navigate("/Createcourse")} 
                            className="mt-6 md:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 font-medium shadow-sm"
                        >
                            <Plus size={18} />
                            Create New Lecture
                        </button>
                    </div>
                </section>

                {/* Dashboard Stats */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white shadow-md rounded-xl p-6 flex items-center transition hover:shadow-lg border border-gray-100">
                        <div className="p-4 bg-indigo-100 rounded-lg mr-4">
                            <Book size={24} className="text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">{instructorsCourses.length}</h2>
                            <p className="text-gray-500 text-sm">Your Lectures</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-xl p-6 flex items-center transition hover:shadow-lg border border-gray-100">
                        <div className="p-4 bg-indigo-100 rounded-lg mr-4">
                            <Users size={24} className="text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">245</h2>
                            <p className="text-gray-500 text-sm">Total Enrollments</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-xl p-6 flex items-center transition hover:shadow-lg border border-gray-100">
                        <div className="p-4 bg-indigo-100 rounded-lg mr-4">
                            <Star size={24} className="text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-1 text-gray-800">4.8 ★</h2>
                            <p className="text-gray-500 text-sm">Average Rating</p>
                        </div>
                    </div>
                </section>

                {/* Created Courses */}
                <section className="mb-16">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Your Lectures</h2>
                        <a 
                            href="/Createcourse" 
                            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1"
                        >
                            View All <span className="text-lg">→</span>
                        </a>
                    </div>
                    {instructorsCourses.length > 0 ? (
                        <VideoGrid videos={instructorsCourses} />
                    ) : (
                        <div className="bg-white rounded-xl p-10 text-center shadow-md border border-gray-100">
                            <Book size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-medium text-gray-700 mb-2">No Lectures created yet</h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">Start creating engaging Lectures for your students and share your knowledge with the world.</p>
                            <button 
                                onClick={() => navigate("/Createcourse")} 
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                Create Your First Lecture
                            </button>
                        </div>
                    )}
                </section>

                {/* Trending Courses */}
                <section className="mb-20">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Trending Lectures</h2>
                        <a 
                            href="/AllCourses" 
                            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1"
                        >
                            Explore All <span className="text-lg">→</span>
                        </a>
                    </div>
                    {otherCourses.length > 0 ? (
                        <VideoGrid videos={otherCourses} />
                    ) : (
                        <div className="bg-white rounded-xl p-8 text-center shadow-md border border-gray-100">
                            <p className="text-gray-500">No trending Lectures available at the moment.</p>
                        </div>
                    )}
                </section>
            </main>
            
            {/* Footer */}
            {/* <footer className="bg-gray-100 py-8 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
                    <p>© 2025 MindSpark Learning Platform. All rights reserved.</p>
                </div>
            </footer> */}
        </div>
    );
}