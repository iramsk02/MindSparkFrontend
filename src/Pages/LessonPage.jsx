import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Logo from "../icons/Logo";
import Home from "../icons/Home";
import LoadingScreen from "./Loading";
import { Menu, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LessonPage() {
  const { state } = useLocation();
  const { id: courseId } = useParams();
  console.log(state);

  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en"); // Default language is English
  const [dubbedVideoUrl, setDubbedVideoUrl] = useState(null);
  console.log(language);

  const userId = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const avatar = localStorage.getItem("avatar");
  const role = localStorage.getItem("role");
  const videoRef = useRef();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    console.log('Language changed:', language);
  }, [language]);

  useEffect(() => {
    socketRef.current = new WebSocket(`wss://mindspark-backend.onrender.com:8089`);
    // socketRef.current = new WebSocket(`https://chat-app-frontend-psi-six.vercel.app`);

    // socketRef.current = new WebSocket(`wss://micro-learn-backend.onrender.com:8089?token=${token}`);
    socketRef.current.onopen = async () => {
      await socketRef.current.send(
        JSON.stringify({
          type: "join",
          courseId,
          user: userId,
        })
      );

    };

    socketRef.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "message") setMessages((prev) => [...prev, msg]);
      if (msg.type === "history") setMessages(msg.data);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [courseId]);

  const sendMessage = async (query) => {
    if (query) await setInput(query);
    if (!input.trim()) return;
    socketRef.current.send(
      JSON.stringify({
        type: "message",
        courseId,
        user: userId,
        message: input.trim(),
      })
    );
    setInput("");
  };

  const sendQuestion = async (query) => {
    setLoading(true);
    try {
      const response = await fetch("https://mindspark-backend.onrender.com/api/gemini/ask", {
      // const response = await fetch("https://micro-learn-backend.onrender.com/api/gemini/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ prompt: question, courseId, userId }),
      });

      const data = await response.json();
      if (data) {
        setAnswers((prev) => [
          ...prev,
          {
            username: "BOT",
            message: data[0].text,
            tim: new Date().toLocaleTimeString(),
          },
        ]);
      }
    } catch (err) {
      toast.error("AI error:", err);
    } finally {
      setQuestion("");
      setLoading(false);
    }
  };

  const handleVideoComplete = async () => {
    try {
      // await fetch("http://localhost:5000/api/progress/course/complete", {
      await fetch("https://mindspark-backend.onrender.com/api/progress/course/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ courseId, userId }),
      });
    } catch (err) {
      console.error("Progress tracking error:", err);
    }
  };

  const getVideoUrl = () => {
    if (language === "en") return state.video.videoUrl;
    if (language === "es") return state.video.spanishVideoUrl;
    return state.video.hindivideoUrl;
  };

  // Reload video when language changes
  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.pause();
      videoEl.load(); // forces re-load of <source>
      videoEl.play();
    }
  }, [language]);

  return (
    <>
      {/* Navbar */}{role==="student"?
      <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Logo navigateto={"/StudentDashboard"} />
            <span className="font-bold text-xl">MindSpark</span>
          </div>
          <div className="hidden md:flex gap-6 text-gray-300 text-md">
            <a href="/StudentDashboard" className="hover:text-white">
              <Home />
            </a>
            <a href="/Quiz" className="hover:text-white">
              Quiz
            </a>
            <a href="/LeaderBoard" className="hover:text-white">
              LeaderBoard
            </a>
            <a href={role === "student" ? "/StudentProfile" : "/InstructorProfile"}>
              <img
                className="bg-amber-300 w-[42px] h-[42px] rounded-full border-amber-50 border"
                src={avatar}
                alt="DP"
              />
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden px-6 pb-4 bg-primary text-gray-300 flex flex-col gap-4 text-md">
            <a href="/Quiz" className="hover:text-white">
              Quiz
            </a>
            <a href="/LeaderBoard" className="hover:text-white">
              LeaderBoard
            </a>
            <a href="/StudentProfile" className="hover:text-white">
              Profile
            </a>
          </div>
        )}
      </nav>:<nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Logo navigateto={"/StudentDashboard"} />
            <span className="font-bold text-xl">MindSpark</span>
          </div>
          <div className="hidden md:flex gap-6 text-gray-300 text-md">
            <a href="/InstructorDashboard" className="hover:text-white">
              <Home />
            </a>
            <a href="/Createquiz" className="hover:text-white">
              CreateQuiz
            </a>
            <a href="/Createcourse" className="hover:text-white">
              CreateCourse
            </a>
            <a href={role === "student" ? "/StudentProfile" : "/InstructorProfile"}>
              <img
                className="bg-amber-300 w-[42px] h-[42px] rounded-full border-amber-50 border"
                src={avatar}
                alt="DP"
              />
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden px-6 pb-4 bg-primary text-gray-300 flex flex-col gap-4 text-md">
            <a href="/Createquiz" className="hover:text-white">
              CreateQuiz
            </a>
            <a href="/Createcourse" className="hover:text-white">
              CreateCourse
            </a>
            <a href="/InstructorProfile" className="hover:text-white">
              Profile
            </a>
          </div>
        )}
      </nav>}

      {/* Main Section */}
      <section className="p-5 sm:p-20 pt-28 flex flex-col md:flex-row gap-8 min-h-screen bg-gray-100">

        {/* Language Selector */}
        <div className="mb-4">
          <select
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white border rounded p-2"
          >
            <option value="en">English</option>
            <option value="hin">Hindi</option>
            {/* <option value="es">Spanish</option> */}
          </select>
        </div>

        {/* Video Section */}
        <div className="lg:w-2/3 bg-white p-5 md:p-20 rounded shadow">
          <h2 className="text-3xl font-bold mb-4">{state.video.title}</h2>

          <video
            id="videoPlayer"
            controls
            width="100%"
            onEnded={handleVideoComplete}
            className="rounded mb-6"
            poster=""
            ref={videoRef}
          >
            <source
   src={getVideoUrl()}
    type="video/mp4"
  />
          </video>

          <div>
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{state.video.description}</p>
          </div>
        </div>

        {/* Discussion + AI */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          {/* Discussion Panel */}
          <div className="bg-white p-4 rounded shadow h-[450px] overflow-hidden flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Discussion</h3>
            <div className="flex-1 overflow-y-auto border p-2 rounded bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className="mb-2">
                  <span className="font-semibold">{msg.username}:</span>{" "}
                  {msg.message}
                  <p className="text-xs text-gray-400">{msg.tim}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex mt-2 gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-grow border rounded p-2"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </div>

          {/* AI Assistant */}
          <div className="bg-white p-4 rounded shadow h-[450px] overflow-hidden flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Ask AI Assistant</h3>
            <div className="flex-1 overflow-y-auto border p-2 rounded bg-gray-50">
              {answers.map((answer, idx) => (
                <div key={idx} className="mb-3">
                  <span className="font-semibold">{answer.username}:</span>{" "}
                  {answer.message}
                  <p className="text-xs text-gray-400">{answer.tim}</p>
                </div>
              ))}
              {loading && (
                <div className="text-sm text-gray-500 animate-pulse">
                  BOT is thinking...
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex mt-2 gap-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendQuestion()}
                className="flex-grow border rounded p-2"
                placeholder="Ask a question..."
              />
              <button
                onClick={sendQuestion}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}









// import { useEffect, useRef, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import Logo from "../icons/Logo";
// import Home from "../icons/Home";
// import LoadingScreen from "./Loading";
// import { Menu, X } from "lucide-react";
// import axios from "axios"


// export default function LessonPage() {
//   const { state } = useLocation();
//   const { id: courseId } = useParams();
//   console.log(state)
//   // console.log(state.video.subURl_hi)

//   const [loading, setLoading] = useState(false);
//   const [language, setLanguage] = useState("en"); // Default language is English
//   const [dubbedVideoUrl, setDubbedVideoUrl] = useState(null);
//   console.log(language)



//   const userId = localStorage.getItem("user");
//   const token = localStorage.getItem("token");
//   const avatar = localStorage.getItem("avatar");
//   const role = localStorage.getItem("role");
//   const videoRef = useRef();


//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [question, setQuestion] = useState("");
//   const [answers, setAnswers] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const socketRef = useRef(null);

//   useEffect(() => {
//     console.log('Language changed:', language);
//   }, [language]);

//   useEffect(() => {
//     socketRef.current = new WebSocket(`ws://localhost:8087?token=${token}`);
//     socketRef.current.onopen = async () => {
//       await socketRef.current.send(
//         JSON.stringify({
//           type: "join",
//           courseId,
//           user: userId,
//         })
//       );
//     };

//     socketRef.current.onmessage = (event) => {
//       const msg = JSON.parse(event.data);
//       if (msg.type === "message") setMessages((prev) => [...prev, msg]);
//       if (msg.type === "history") setMessages(msg.data);
//     };

//     return () => {
//       socketRef.current?.close();
//     };
//   }, [courseId]);

//   const sendMessage = async (query) => {
//     if (query) await setInput(query);
//     if (!input.trim()) return;
//     socketRef.current.send(
//       JSON.stringify({
//         type: "message",
//         courseId,
//         user: userId,
//         message: input.trim(),
//       })
//     );
//     setInput("");
//   };

//   const sendQuestion = async (query) => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/gemini/ask", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify({ prompt: question, courseId, userId }),
//       });

//       const data = await response.json();
//       if (data) {
//         setAnswers((prev) => [
//           ...prev,
//           {
//             username: "BOT",
//             message: data[0].text,
//             tim: new Date().toLocaleTimeString(),
//           },
//         ]);
//       }
//     } catch (err) {
//       console.error("AI error:", err);
//     } finally {
//       setQuestion("");
//       setLoading(false);
//     }
//   };

//   const handleVideoComplete = async () => {
//     try {
//       await fetch("http://localhost:5000/api/progress/course/complete", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify({ courseId, userId }),
//       });
//     } catch (err) {
//       console.error("Progress tracking error:", err);
//     }
//   };

//   const VideoPlayer = (subtitleText = state.video.subURl_hi) => {
//     // console.log(videoData)

//     useEffect(() => {
//       if (!subtitleText) return;

//       const blob = new Blob([subtitleText], { type: 'text/vtt' });
//       const trackUrl = URL.createObjectURL(blob);

//       const track = document.createElement('track');
//       track.kind = 'subtitles';
//       track.label = 'Hindi';
//       track.srclang = 'hi';
//       track.src = trackUrl;
//       track.default = true;

//       const video = videoRef.current;
//       video.appendChild(track);

//       // Clean up the Blob URL after component unmount
//       return () => {
//         URL.revokeObjectURL(trackUrl);
//         video.removeChild(track);
//       };
//     }, [subtitleText]);
//   }
//   // VideoPlayer()
//   return (
//     <>
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
//         <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
//           <div className="flex items-center gap-2">
//             <Logo navigateto={"/StudentDashboard"} />
//             <span className="font-bold text-xl">MindSpark</span>
//           </div>
//           <div className="hidden md:flex gap-6 text-gray-300 text-md">
//             <a href="/StudentDashboard" className="hover:text-white">
//               <Home />
//             </a>
//             <a href="/Quiz" className="hover:text-white">
//               Quiz
//             </a>
//             <a href="/LeaderBoard" className="hover:text-white">
//               LeaderBoard
//             </a>
//             <a href={role === "student" ? "/StudentProfile" : "/InstructorProfile"}>
//               <img
//                 className="bg-amber-300 w-[42px] h-[42px] rounded-full border-amber-50 border"
//                 src={avatar}
//                 alt="DP"
//               />
//             </a>
//           </div>
//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)}>
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//         {isOpen && (
//           <div className="md:hidden px-6 pb-4 bg-primary text-gray-300 flex flex-col gap-4 text-md">
//             <a href="/Quiz" className="hover:text-white">
//               Quiz
//             </a>
//             <a href="/LeaderBoard" className="hover:text-white">
//               LeaderBoard
//             </a>
//             <a href="/StudentProfile" className="hover:text-white">
//               Profile
//             </a>
//           </div>
//         )}
//       </nav>

//       {/* Main Section */}
//       <section className="p-5 sm:p-20 pt-28 flex flex-col md:flex-row gap-8 min-h-screen bg-gray-100">

//         {/* Language Selector */}

//         {/* Video Section */}
//         <div className="lg:w-2/3 bg-white p-5 md:p-20 rounded shadow">
//           <div className=" right-8">
//             <select
              
//               onChange={(e) => setLanguage(e.target.value)}
//               className="bg-white border rounded p-2"
//             >
//               <option value="en">English</option>
//               <option value="hin">Hindi</option>
//               <option value="es">Spanish</option>
//               {/* Add more languages as needed */}
//             </select>
//           </div>

//           <h2 className="text-3xl font-bold mb-4">{state.video.title}</h2>

//           <video
//             id="videoPlayer"
//             controls
//             width="100%"
//             onEnded={handleVideoComplete}
//             className="rounded mb-6"
//             poster=""
//             ref={videoRef}
//           >
//              {
//               language === "hin" ? (
//                 <source src={state.video.hindivideoUrl} type="video/mp4" />
//               ) : language === "es" ? (
//                 <source src={state.video.videoUrl} type="video/mp4" />
//               ) : (
//                 <source src={state.video.videoUrl} type="video/mp4" />
//               )
//             }

//           </video>

//           <div>

//             <h3 className="text-xl font-semibold mb-2">Description</h3>
//             <p className="text-gray-600">{state.video.description}</p>
//           </div>
//         </div>

//         {/* Discussion + AI */}
//         <div className="lg:w-1/3 flex flex-col gap-6">
//           {/* <VoiceControl
//             messages={messages}
//             sendQuestion={sendQuestion}
//             setQuestion={setQuestion}
//             setMessages={sendMessage}
//             sendMessage={sendMessage}
//             language={language}
//           /> */}

//           {/* Discussion Panel */}
//           <div className="bg-white p-4 rounded shadow h-[450px] overflow-hidden flex flex-col">
//             <h3 className="text-xl font-semibold mb-2">Discussion</h3>
//             <div className="flex-1 overflow-y-auto border p-2 rounded bg-gray-50">
//               {messages.map((msg, idx) => (
//                 <div key={idx} className="mb-2">
//                   <span className="font-semibold">{msg.username}:</span>{" "}
//                   {msg.message}
//                   <p className="text-xs text-gray-400">{msg.tim}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="flex flex-col md:flex mt-2 gap-2">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 className="flex-grow border rounded p-2"
//                 placeholder="Type your message..."
//               />
//               <button
//                 onClick={sendMessage}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Send
//               </button>
//             </div>
//           </div>

//           {/* AI Assistant */}
//           <div className="bg-white p-4 rounded shadow h-[450px] overflow-hidden flex flex-col">
//             <h3 className="text-xl font-semibold mb-2">Ask AI Assistant</h3>
//             <div className="flex-1 overflow-y-auto border p-2 rounded bg-gray-50">
//               {answers.map((answer, idx) => (
//                 <div key={idx} className="mb-3">
//                   <span className="font-semibold">{answer.username}:</span>{" "}
//                   {answer.message}
//                   <p className="text-xs text-gray-400">{answer.tim}</p>
//                 </div>
//               ))}
//               {loading && (
//                 <div className="text-sm text-gray-500 animate-pulse">
//                   BOT is thinking...
//                 </div>
//               )}
//             </div>
//             <div className="flex flex-col md:flex mt-2 gap-2">
//               <input
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendQuestion()}
//                 className="flex-grow border rounded p-2"
//                 placeholder="Ask a question..."
//               />
//               <button
//                 onClick={sendQuestion}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 Ask
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


// export function VoiceControl({ messages = [], sendQuestion, setQuestion, setMessages, sendMessage }) {


//   const synth = window.speechSynthesis;
//   const recognitionRef = useRef(null);
//   const [listening, setListening] = useState(false);

//   // Text-to-Speech
//   const speak = (text) => {
//     const utter = new SpeechSynthesisUtterance(text);
//     synth.speak(utter);
//   };

//   // Start Speech Recognition
//   const startListening = () => {
//     if (!recognitionRef.current) return;
//     recognitionRef.current.start();
//     setListening(true);
//   };

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech Recognition not supported in your browser.");
//       return;
//     }
    

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;
//     recognition.continuous = false;

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript.toLowerCase();
//       console.log("Voice Command:", transcript);

//       // 1. Ask a Question
//       if (transcript.includes("send message")) {
//         const query = transcript.replace("send message", "").trim();
//         if (query.length > 0) {
//           // setMessages(query)
//           // console.log(query)
//           sendMessage(query)
//           // setQuestion(query);
//           // sendQuestion();
//           speak("Sending your message...");
//         } else {
//           speak("Please say your message after 'send message'.");
//         }
//       }

//       // 2. Read last 5 messages
//       else if (transcript.includes("read messages")) {
//         const lastMessages = messages.slice(-5);
//         console.log(lastMessages)
//         lastMessages.forEach((msg) => {
//           // speak(`hiii`);
//           // console.log("hiii")
//           speak(`${msg.username} says: ${msg.message}`);
//         });
//       }

//       // 3. Ask AI Assistant (direct)
//       else if ((transcript.includes("what is") || transcript.includes("who is")) || transcript.includes("define") || transcript.includes("explain") || transcript.includes("summarise")) {



//         setQuestion(transcript);
//         sendQuestion(transcript);
//         console.log(transcript)
//         speak("Asking AI Assistant...");
//       }

//       // 4. Video Control
//       else if (transcript.includes("pause video")) {
//         const video = document.getElementById("videoPlayer");
//         if (video) {
//           video.pause();
//           speak("Video paused");
//         } else {
//           speak("Video not found");
//         }
//       } else if (transcript.includes("play video")) {
//         const video = document.getElementById("videoPlayer");
//         if (video) {
//           video.play();
//           speak("Playing video");
//         } else {
//           speak("Video not found");
//         }
//       }

//       // Unknown command
//       else {
//         speak("Sorry, I didn't understand that.");
//       }

//       setListening(false);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       speak("An error occurred during voice recognition.");
//       setListening(false);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };

//     recognitionRef.current = recognition;
//   }, [messages, sendQuestion, setQuestion]);

//   return (
//     <div className="p-4 bg-gray-200 rounded shadow max-w-sm">
//       <button
//         onClick={startListening}
//         className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//       >
//         🎤 Start Voice Command
//       </button>
//       <p className="mt-2 text-gray-700 text-sm">
//         {listening ? "Listening..." : "Click to speak"}
//       </p>
//     </div>
//   );
// }


