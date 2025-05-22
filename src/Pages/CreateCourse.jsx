
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Logo from '../icons/Logo';
import Home from '../icons/Home';
import LoadingScreen from "./Loading";
import { Menu, X,ListChecks,Book,User } from "lucide-react"; 
import toast from 'react-hot-toast';

export default function CreateCourse() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const avatar = localStorage.getItem("avatar");
    const role = localStorage.getItem("role");
    const [isOpen, setIsOpen] = useState(false);


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        role: "educator",
        video: '',
        thumbnail: '',
        userId: user
    });

    const [isSubmitting, setIsSubmitting] = useState(false); // loading state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    [name]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...formData,
            educator: user
        };

        try {
            const response = await fetch('https://mindspark-backend.onrender.com/api/uploads/files', {
            // const response = await fetch(`http://64.227.171.122:5000/api/uploads/files`, {
                
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok) {
                // alert('Course Created Successfully');
                toast.success('Course Created successful!');

                navigate('/InstructorDashboard');
            } else {
                toast.error(`Failed to create course: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            // alert('An error occurred while creating the course.');
            toast.error("failed to create course")
        } finally {
            setIsSubmitting(false);
        }
    };
      if (isSubmitting) return <LoadingScreen />;
    

    return (
        <>
            {/* Navigation */}
           <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-lg">
                <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Logo navigateto={"/InstructorDashboard"} />
                        <span className="font-bold text-xl tracking-tight">MindSpark</span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6 text-gray-200 text-md">
                        <a href="/InstructorDashboard" className="flex items-center gap-1 hover:text-white transition font-medium">
                            <Home size={18} />
                            <span>Dashboard</span>
                        </a>
                        <a href="/Createquiz" className="flex items-center gap-1 hover:text-white transition font-medium">
                            <ListChecks size={18} />
                            <span>Create Quiz</span>
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
            {/* Main Section */}
            <main className="pt-24 px-4 md:px-10 lg:px-32 xl:px-48 bg-gray-50 min-h-screen relative">
                {isSubmitting && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-lg font-semibold text-indigo-700 animate-pulse">
                            Creating Lecture...
                        </div>
                    </div>
                )}

                <section className={`bg-white shadow-lg rounded-lg p-6 md:p-10 ${isSubmitting ? "pointer-events-none opacity-50" : ""}`}>
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create a New Lecture</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter course title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                placeholder="e.g. Web Development"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter course description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="video" className="block font-medium text-gray-700">Upload Lecture Video</label>
                            <input
                                type="file"
                                id="video"
                                name="video"
                                accept="video/*"
                                onChange={handleFileChange}
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="thumbnail" className="block font-medium text-gray-700">Upload Thumbnail</label>
                            <input
                                type="file"
                                id="thumbnail"
                                name="thumbnail"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                            />
                          
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Course'}
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
}
