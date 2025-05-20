

import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import QuizGrid from "../Components/Quizgrid";
import Logo from "../icons/Logo";
import LoadingScreen from "./Loading";
import { Menu, X, Search, Award, BookOpen, User } from "lucide-react"; // Added more icons
import Home from "../icons/Home";
import toast from "react-hot-toast";

export default function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const [filteredQuiz, setFilteredQuiz] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const avatar = localStorage.getItem("avatar");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    fetchQuiz();

    // Add fade-in animation after component mounts
    setTimeout(() => {
      setFadeIn(true);
    }, 100);
  }, []);

  // Filter quizzes when search term changes
  useEffect(() => {
    // if (!searchTerm.trim()) {
    //   setFilteredQuiz(quiz);
    // } else {
    const filtered = quiz.filter(q =>
      q.category?.toLowerCase().includes(searchTerm.toLowerCase())



    );

    setFilteredQuiz(filtered);
    // }
  }, [searchTerm]);

  async function fetchQuiz() {
    try {
      // const response = await fetch("http://localhost:5000/api/quiz/Allquiz", {
      const response = await fetch("https://mindspark-backend.onrender.com/api/quiz/Allquiz", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await response.json();
      setQuiz(data.Quiz);
      console.log(data.Quiz)
      // setFilteredQuiz(data.Quiz);
      // console.log(filteredQuiz.length)
    } catch (error) {
      toast.error("Failed to fetch quizzes.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // if (loading) return <LoadingScreen />;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
        <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center gap-2 hover:scale-105 transition duration-300 cursor-pointer">
            <Logo navigateto={"/StudentDashboard"} />
            <span className="font-bold text-xl">MindSpark</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-300 text-md">
            <a href="/StudentDashboard" className="flex items-center gap-1 hover:text-white hover: transition duration-300">
              <Home />
              <span>Home</span>
            </a>
            <a href="/LeaderBoard" className="flex items-center gap-1 hover:text-white hover:transition duration-300">
              <Award size={20} />
              <span>LeaderBoard</span>
            </a>
            <a href={role === "student" ? "/StudentProfile" : "/InstructorProfile"}>
              <img
                className="w-9 h-9 rounded-full border-2 border-blue-400 object-cover"
                src={avatar || "https://via.placeholder.com/42"}
                alt="Profile"
              />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-blue-700 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        {isOpen && (
          <div className="md:hidden px-6 pb-4 bg-primary text-gray-300 flex flex-col gap-4 text-md animate-fadeIn">
            <a href="/StudentDashboard" className="py-3 flex items-center gap-2 hover:text-white  border-blue-700">
              <Home size={18} />
              <span>Home</span>
            </a>
            <a href="/LeaderBoard" className="py-3 flex items-center gap-2 hover:text-white  border-blue-700">
              <Award size={18} />
              <span>LeaderBoard</span>
            </a>
            <a href="/StudentProfile" className="py-3 flex items-center gap-2 hover:text-white">
              {/* <img 
                className="w-6 h-6 rounded-full border border-blue-200" 
                src={avatar || "https://ui-avatars.com/api/?name=User&background=random"} 
                alt="Profile" 
              /> */}
              <User size={18} />

              <span>Profile</span>
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-6 sm:px-12 md:px-20 text-center bg-gradient-to-r from-blue-100 via-white to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 p-2 bg-blue-100 rounded-full">
            <BookOpen size={32} className="text-blue-800" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 leading-tight">
            Master Your Skills with Quizzes
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Sharpen your knowledge, boost your confidence, and earn XP by tackling interactive quizzes across tech topics.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mt-6 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition group-hover:shadow-md"
              placeholder="Search for quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="px-6 sm:px-12  md:px-20 py-12 bg-white min-h-[50vh] rounded-t-3xl shadow-inner -mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0 flex items-center">
              <span className="bg-blue-100 p-2 rounded-full mr-3">🔥</span>
              Featured Quizzes
            </h2>
            {/* <VoiceAssistantButton /> */}
          </div>
          { }

          {

            loading ? <LoadingScreen /> : filteredQuiz.length > 0 ? (
              <div className="text-center text-gray-500 mt-16 p-20 bg-blue-50 rounded-xl">
                <QuizGrid quiz={filteredQuiz} />
              </div>
            ) : (

              <div className="text-center text-gray-500 mt-16 p-20 bg-blue-50 rounded-xl">


                <QuizGrid quiz={quiz} />
              </div>


            )}
        </div>
      </section>


    </div>
  );
}
