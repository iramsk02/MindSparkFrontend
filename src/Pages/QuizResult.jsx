
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import Logo from "../icons/Logo";
import Home from "../icons/Home";
import { Menu, X } from "lucide-react"; 
import { useState } from "react";


export default function QuizResult() {
    const navigate = useNavigate()
    const location = useLocation();
        const [isOpen, setIsOpen] = useState(false);
    
    const role = localStorage.getItem("role");
    const avatar = localStorage.getItem("avatar");
    const { total, attempted, correct, incorrect, xp } = location.state || {};

    return (
        <>

            <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
                <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2">
                        <Logo navigateto={"/StudentDashboard"} />
                        <span className="font-bold text-xl">MindSpark</span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-6 text-gray-300 text-md">
                        <a href="/StudentDashboard" className="hover:text-white transition"><Home /></a>
                        <a href="/StudentDashboard" className="hover:text-white transition">Home</a>
                        <a href="/LeaderBoard" className="hover:text-white transition">LeaderBoard</a>
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
                        <a href="/StudentDashboard" className="hover:text-white transition">Home</a>
                        <a href="/LeaderBoard" className="hover:text-white transition">LeaderBoard</a>
                        <a href="/StudentProfile" className="hover:text-white transition">Profile</a>
                    </div>
                )}
            </nav>

            <div className="pt-28 px-6 md:px-20 pb-10 min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
                <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 text-center space-y-6">
                    <h1 className="text-3xl font-bold text-purple-700">🎉 Quiz Completed!</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg font-medium">
                        <div className="bg-gray-100 py-4 px-6 rounded-xl shadow-sm">
                            <span className="text-gray-600 block mb-1">Questions Attempted</span>
                            <span className="text-purple-700 text-xl">{attempted} / {total}</span>
                        </div>
                        <div className="bg-green-100 py-4 px-6 rounded-xl shadow-sm">
                            <span className="text-green-800 block mb-1">Correct Answers</span>
                            <span className="text-green-900 text-xl">{correct}</span>
                        </div>
                        <div className="bg-red-100 py-4 px-6 rounded-xl shadow-sm">
                            <span className="text-red-700 block mb-1">Incorrect Answers</span>
                            <span className="text-red-800 text-xl">{incorrect}</span>
                        </div>
                        <div className="bg-yellow-100 py-4 px-6 rounded-xl shadow-sm">
                            <span className="text-yellow-700 block mb-1">XP Earned</span>
                            <span className="text-yellow-800 text-xl">{xp} XP</span>
                        </div>
                    </div>

                    <div className="mt-6 hover:text-black ">
                        <Button content={"🏠 Back to Home"} navigateto={"StudentDashboard"} />
                    </div>
                </div>
            </div>
        </>
    );
}
