
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import VideoGrid from "../Components/VideoGrid";
import Logo from "../icons/Logo";
import LoadingScreen from "./Loading";
import { Menu, X } from "lucide-react"; // lucide-react for icons
import Home from "../icons/Home";
// import VoiceAssistant from "../Components/VoiceAssistant";
import speak from "../utils/Speak";
import toast from "react-hot-toast";
// import SpeechSynthesisUtterance 


export default function StudentDashboard() {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const avatar = localStorage.getItem("avatar");
  const role = localStorage.getItem("role");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [student, setstudent] = useState();
  const [isOpen, setIsOpen] = useState(false);


  // const speak = (text, lang = 'en-US') => {
  //   if ('speechSynthesis' in window) {
  //     const utterance = new SpeechSynthesisUtterance(text);
  //     utterance.lang = lang;
  //     utterance.rate = 1; // 0.1 to 10
  //     utterance.pitch = 1; // 0 to 2
  //     utterance.volume = 1; // 0 to 1
  //     window.speechSynthesis.speak(utterance);
  //   } else {
  //     console.warn('Speech synthesis not supported in this browser.');
  //   }
  // };


  // useEffect(() => {
  //   speak('Welcome to Student Dashboard');
  // }, []);


  useEffect(() => {
        
        const fetchInstructorProfile = async () => {
          try {
            const res = await fetch(`https://mindspark-backend.onrender.com/api/users/getProfile/${user}`, {
            // const res = await fetch(`http://localhost:5000/api/users/getProfile/${user}`, {
              headers: {
                Authorization: token,
              },
            });
    
            const data = await res.json();
            // console.log(Array.isArray(data));  // Should return true
    
            console.log(data)
            // setInstructor(data);
            setstudent(data)
            // setFormData({ name: data.name || "", avatar: data.avatar || "", bio: data.bio || "",length:data.length });
          } catch (err) {
            console.error("Error fetching profile:", err);
          }
        };
    
        fetchInstructorProfile();
    getAllCourses();

  }, []);

  async function getAllCourses() {
    try {
      const response = await fetch('https://mindspark-backend.onrender.com/api/courses/Allcourses', {
      // const response = await fetch('http://localhost:5000/api/courses/Allcourses', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });

      const data = await response.json();
      console.log(data)
      
      if (response.ok) {
        setCourses(data);
      } else {
        toast.error(`Failed to fetch courses: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while retrieving courses.');
    } finally {
      setLoading(false);
     
    }
  }


  if (loading) return <LoadingScreen />; //  use loading screen here

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
            <a href="/Quiz" className="hover:text-white transition">Quiz</a>
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
            <a href="/Quiz" className="hover:text-white transition">Quiz</a>
            <a href="/LeaderBoard" className="hover:text-white transition">LeaderBoard</a>
            <a href="/StudentProfile" className="hover:text-white transition">Profile</a>
          </div>
        )}
      </nav>

      {/* Welcome Section */}
      <section className="pt-28 px-4 md:px-12 lg:px-20 flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
          </p>
        </div>
        <div className="flex-1 bg-gray-100 rounded-lg p-4 shadow-md w-full max-w-sm">
          <h2 className="text-lg font-semibold mb-2">Progress Summary</h2>
          <div className="flex justify-between text-sm text-gray-700">
            <div>
              <p className="font-medium">Progress</p>
              {/* <p>{student.xp/1000 || 0}%</p> */}
            </div>
            <div>
              <p className="font-medium">Streak</p>
              {/* <p>{student.streak.current|| 1}</p> */}
            </div>
            <div>
              <p className="font-medium">XP</p>
              {/* <p>{student.xp || 0}</p> */}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Videos Section */}
      <section className="mt-12 px-4 md:px-12 lg:px-20 mb-20">
        {/* <VoiceAssistant /> */}
        <h2 className="text-2xl font-bold mb-6">Recommended Videos</h2>
        <VideoGrid videos={courses} />
      </section>
    </>
  );
}



// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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
//       keyword: 'profile',
//       action: () => window.location.href = '/StudentProfile',
//     },
//     // {
//     //   keyword: 'start lesson *',
//     //   action: () => alert('Starting lesson...'),

//     //   courses?.map(video => (
//     //           <VideoCard key={video._id} video={video} />
//     //         ))
//     // },
//     // {
//     //   keyword: 'submit quiz',
//     //   action: () => alert('Submitting quiz...'),
//     // },
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



//     if (lowerTranscript.includes('start ')) {
//       const matchedLesson = courses.find(lesson =>
//         lowerTranscript.includes(lesson.title)
       
//       );
      

//       if (matchedLesson) {
//         alert(`Starting lesson: ${matchedLesson.keyword}`);
//         window.location.href = `/lesson/${courses._id}`;
//         resetTranscript(); // Clear it after handling
//       }
//     }
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

