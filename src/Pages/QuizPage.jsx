

// import { useEffect, useState } from "react";
// import Navbar from "../Components/Navbar";
// import QuizGrid from "../Components/Quizgrid";
// import Logo from "../icons/Logo";
// import LoadingScreen from "./Loading";
// import { Menu, X } from "lucide-react"; // lucide-react for icons
// import Home from "../icons/Home";


// export default function QuizPage() {
//   const [quiz, setQuiz] = useState([]);
//   const user = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const avatar = localStorage.getItem("avatar");
//   const [loading, setLoading] = useState(true);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     fetchQuiz();
//   }, []);

//   async function fetchQuiz() {
//     try {
//       // const response = await fetch("http://localhost:5000/api/quiz/Allquiz", {
//       const response = await fetch("https://mindspark-backend.onrender.com/api/quiz/Allquiz", {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//       });

//       const data = await response.json();
//       setQuiz(data.Quiz);
//     } catch (error) {
//       toast.error("Failed to fetch quizzes.");
//       console.error(error);
//     }finally{
//       setLoading(false)
//     }
//   }

//  if (loading) return <LoadingScreen />; //  use loading screen here
 
//    return (
//      <>
 
//       {/* Navbar */}

      

//       <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
//         <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
//           {/* Logo Section */}
//           <div className="flex items-center gap-2">
//             <Logo navigateto={"/StudentDashboard"} />
//             <span className="font-bold text-xl">MindSpark</span>
//           </div>

//           {/* Desktop Links */}
//           <div className="hidden md:flex gap-6 text-gray-300 text-md">
//             <a href="/StudentDashboard" className="hover:text-white transition"><Home /></a>
//             {/* <a href="/StudentDashboard" className="hover:text-white transition">Home</a> */}
//             <a href="/LeaderBoard" className="hover:text-white transition">LeaderBoard</a>
//             {/* <a href="/Signin" className="hover:text-white transition">Sign In</a> */}
//             <div className="">
//               {role === "student" ? <a href="/StudentProfile"><img className=" bg-amber-300 w-[42px] h-[42px] rounded-[260px] border-amber-50 border-1" src={avatar} alt="DP" /></a> : <a href="/InstructorProfile"><img className=" bg-amber-300 w-[42px] h-[42px] rounded-[260px] border-amber-50 border-1" src={avatar} alt="DP" /></a>}

//             </div>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)}>
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Links */}
//         {isOpen && (
//           <div className="md:hidden px-6 pb-4 bg-primary text-gray-300 flex flex-col gap-4 text-md">
//             <a href="/StudentDashboard" className="hover:text-white transition">Home</a>
//             <a href="/LeaderBoard" className="hover:text-white transition">LeaderBoard</a>
//             <a href="/StudentProfile" className="hover:text-white transition">Profile</a>
//           </div>
//         )}
//       </nav>
 
      

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-6 sm:px-12 md:px-24 lg:px-32 text-center bg-gradient-to-r from-blue-100 via-white to-purple-100">
//         <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-3">
//           🧠 Master Your Skills with Quizzes
//         </h1>
//         <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
//           Sharpen your knowledge, boost your confidence, and earn XP by tackling interactive quizzes across tech topics.
//         </p>
//       </section>

//       {/* Quiz Section */}
//       <section className="px-6 sm:px-12 md:px-24 lg:px-32 py-10 bg-white min-h-[50vh]">
//         {/* <VoiceAssistant/> */}
//         <div className="flex justify-center items-center mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800">🔥 Featured Quizzes</h2>
         
//         </div>

//         {quiz.length > 0 ? (
//           <QuizGrid quiz={quiz} />
//         ) : (
//           <div className="text-center text-gray-500 mt-10">
//             <p className="text-lg">No quizzes found.</p>
//           </div>
//         )}
//       </section>
//     </>
//   );
// }
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import toast from "react-hot-toast";

// export function VoiceAssistant ()  {
//   const keywords = [
//     {
//       keyword: 'dashboard',
//       action: () => window.location.href = '/StudentDashboard',
//     },
//     {
//       keyword: 'profile',
//       action: () => window.location.href = '/StudentProfile',
//     },
//     {
//       keyword: 'quiz',
//       action: () => window.location.href = '/Quiz',
//     },
//     {
//       keyword: 'leaderboard',
//       action: () => window.location.href = '/Leaderboard',
//     },
//     {
//       keyword: 'start lesson',
//       action: () => alert('Starting lesson...'),
//     },
//     {
//       keyword: 'submit quiz',
//       action: () => alert('Submitting quiz...'),
//     },
//   ];

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   useEffect(() => {
//     if (!browserSupportsSpeechRecognition) {
//       alert('Browser does not support voice recognition.');
//       return;
//     }
//   }, []);

//   useEffect(() => {
//     const lowerTranscript = transcript.toLowerCase();

//     keywords.forEach(({ keyword, action }) => {
//       if (lowerTranscript.includes(keyword)) {
//         action();
//         resetTranscript(); // prevent multiple calls
//       }
//     });
//   }, [transcript]);

//   return (
//     <div className="p-4 rounded-lg shadow bg-gray-100 max-w-70">
//       <button
//         onClick={() => SpeechRecognition.startListening({ continuous: true })}
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         🎤 Start Voice Assistant
//       </button>
//       <p className="mt-2 text-sm text-gray-600">
//         {listening ? 'Listening...' : 'Click to start listening'}
//       </p>
//       <p className="text-xs mt-1 text-gray-800">Heard: {transcript}</p>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import QuizGrid from "../Components/Quizgrid";
import Logo from "../icons/Logo";
import LoadingScreen from "./Loading";
import { Menu, X, Search, Award, BookOpen } from "lucide-react"; // Added more icons
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
    if (!searchTerm.trim()) {
      setFilteredQuiz(quiz);
    } else {
      const filtered = quiz.filter(q => 
        q.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuiz(filtered);
    }
  }, [searchTerm, quiz]);

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
      setFilteredQuiz(data.Quiz);
    } catch (error) {
      toast.error("Failed to fetch quizzes.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingScreen />;

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
            <a href="/StudentDashboard" className="py-3 flex items-center gap-2 hover:text-white border-b border-blue-700">
              <Home size={18} />
              <span>Home</span>
            </a>
            <a href="/LeaderBoard" className="py-3 flex items-center gap-2 hover:text-white border-b border-blue-700">
              <Award size={18} />
              <span>LeaderBoard</span>
            </a>
            <a href="/StudentProfile" className="py-3 flex items-center gap-2 hover:text-white">
              <img 
                className="w-6 h-6 rounded-full border border-blue-200" 
                src={avatar || "https://ui-avatars.com/api/?name=User&background=random"} 
                alt="Profile" 
              />
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
      <section className="px-6 sm:px-12 md:px-20 py-12 bg-white min-h-[50vh] rounded-t-3xl shadow-inner -mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0 flex items-center">
              <span className="bg-blue-100 p-2 rounded-full mr-3">🔥</span> 
              Featured Quizzes
            </h2>
            {/* <VoiceAssistantButton /> */}
          </div>

          {filteredQuiz.length > 0 ? (
            <div className="animate-fadeUp">
              <QuizGrid quiz={filteredQuiz} />
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-16 py-20 bg-blue-50 rounded-xl">
              <div className="inline-block p-4 rounded-full bg-blue-100 mb-4">
                <Search size={48} className="text-blue-500" />
              </div>
              <p className="text-xl font-medium">No quizzes found matching "{searchTerm}"</p>
              <p className="mt-2 text-gray-500">Try using different keywords or browse all available quizzes</p>
              <button 
                onClick={() => setSearchTerm("")}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Show All Quizzes
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-primary text-white py-6 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Logo navigateto={"/StudentDashboard"} />
            <span className="font-bold text-xl">MindSpark</span>
          </div>
          <p className="text-gray-300 text-sm">© {new Date().getFullYear()} MindSpark Learning Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function VoiceAssistantButton() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full hover:shadow-lg transition duration-300 hover:scale-105"
      >
        <span className="animate-pulse">🎤</span>
        <span>Voice Assistant</span>
      </button>
      
      {isOpen && <VoiceAssistant close={() => setIsOpen(false)} />}
    </div>
  );
}

function VoiceAssistant({ close }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  // This is a simplified mock version since we can't fully implement SpeechRecognition here
  // In a real implementation, this would use the react-speech-recognition library
  
  const startListening = () => {
    setListening(true);
    setTranscript("Listening...");
    
    // Simulate listening for demonstration purposes
    setTimeout(() => {
      setTranscript("Going to dashboard");
      
      // Simulate navigation after command recognition
      setTimeout(() => {
        window.location.href = '/StudentDashboard';
      }, 1000);
    }, 2000);
  };
  
  return (
    <div className="absolute right-0 top-12 z-10 w-64 p-4 bg-white rounded-lg shadow-xl border border-gray-200 animate-fadeIn">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Voice Commands</h3>
        <button onClick={close} className="text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button>
      </div>
      
      <div className="p-3 bg-gray-50 rounded-lg mb-3">
        <p className="text-sm text-gray-600 mb-2">Try saying:</p>
        <ul className="text-xs text-gray-500 space-y-1 ml-4 list-disc">
          <li>"Go to dashboard"</li>
          <li>"Show my profile"</li>
          <li>"Open leaderboard"</li>
          <li>"Start quiz"</li>
        </ul>
      </div>
      
      <button
        onClick={startListening}
        className={`w-full px-4 py-2 ${listening ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-lg flex items-center justify-center gap-2`}
      >
        <span className={listening ? 'animate-pulse' : ''}>🎤</span>
        <span>{listening ? 'Listening...' : 'Start Listening'}</span>
      </button>
      
      {transcript && (
        <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-700">
          {transcript}
        </div>
      )}
    </div>
  );
}

// Add these styles to your CSS/Tailwind config
// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }
// @keyframes fadeUp {
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fadeIn { animation: fadeIn 0.3s ease-in; }
// .animate-fadeUp { animation: fadeUp 0.5s ease-out; }