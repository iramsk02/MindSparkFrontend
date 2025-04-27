

import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import QuizGrid from "../Components/Quizgrid";
import Logo from "../icons/Logo";
import LoadingScreen from "./Loading";
import { Menu, X } from "lucide-react"; // lucide-react for icons
import Home from "../icons/Home";


export default function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const user = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const avatar = localStorage.getItem("avatar");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, []);

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
    } catch (error) {
      alert("Failed to fetch quizzes.");
      console.error(error);
    }finally{
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
            <a href="/StudentDashboard" className="hover:text-white transition"><Home /></a>
            {/* <a href="/StudentDashboard" className="hover:text-white transition">Home</a> */}
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
 
      

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-12 md:px-24 lg:px-32 text-center bg-gradient-to-r from-blue-100 via-white to-purple-100">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-3">
          🧠 Master Your Skills with Quizzes
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Sharpen your knowledge, boost your confidence, and earn XP by tackling interactive quizzes across tech topics.
        </p>
      </section>

      {/* Quiz Section */}
      <section className="px-6 sm:px-12 md:px-24 lg:px-32 py-10 bg-white min-h-[50vh]">
        {/* <VoiceAssistant/> */}
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">🔥 Featured Quizzes</h2>
         
        </div>

        {quiz.length > 0 ? (
          <QuizGrid quiz={quiz} />
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg">No quizzes found.</p>
          </div>
        )}
      </section>
    </>
  );
}
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export function VoiceAssistant ()  {
  const keywords = [
    {
      keyword: 'dashboard',
      action: () => window.location.href = '/StudentDashboard',
    },
    {
      keyword: 'profile',
      action: () => window.location.href = '/StudentProfile',
    },
    {
      keyword: 'quiz',
      action: () => window.location.href = '/Quiz',
    },
    {
      keyword: 'leaderboard',
      action: () => window.location.href = '/Leaderboard',
    },
    {
      keyword: 'start lesson',
      action: () => alert('Starting lesson...'),
    },
    {
      keyword: 'submit quiz',
      action: () => alert('Submitting quiz...'),
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert('Browser does not support voice recognition.');
      return;
    }
  }, []);

  useEffect(() => {
    const lowerTranscript = transcript.toLowerCase();

    keywords.forEach(({ keyword, action }) => {
      if (lowerTranscript.includes(keyword)) {
        action();
        resetTranscript(); // prevent multiple calls
      }
    });
  }, [transcript]);

  return (
    <div className="p-4 rounded-lg shadow bg-gray-100 max-w-70">
      <button
        onClick={() => SpeechRecognition.startListening({ continuous: true })}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        🎤 Start Voice Assistant
      </button>
      <p className="mt-2 text-sm text-gray-600">
        {listening ? 'Listening...' : 'Click to start listening'}
      </p>
      <p className="text-xs mt-1 text-gray-800">Heard: {transcript}</p>
    </div>
  );
};

