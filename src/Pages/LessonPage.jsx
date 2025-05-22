import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Menu, X, MessageCircle, Calendar, BookOpen, Send, Mic, Languages, ThumbsUp,
  PlayCircle, Download, Share2, Bookmark, HelpCircle, ChevronLeft, MoreHorizontal, Book,
  Award,
  ListChecks
} from "lucide-react";
import Logo from "../icons/Logo";
import Home from "../icons/Home";
import LoadingScreen from "./Loading";
import toast from "react-hot-toast";

export default function LessonPage() {
  const { state } = useLocation();
  const { id: courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en"); // Default language is English
  const [dubbedVideoUrl, setDubbedVideoUrl] = useState(null);
  const [showDiscussion, setShowDiscussion] = useState(true); // Toggle between Discussion and AI
  const [fullScreenVideo, setFullScreenVideo] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

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
  const chatContainerRef = useRef(null);
  const answerContainerRef = useRef(null);

  // Mock data for related videos and notes
  const relatedVideos = [
    { id: 1, title: "Understanding Basic Concepts", duration: "12:45", progress: 100 },
    { id: 2, title: "Advanced Techniques", duration: "18:30", progress: 30 },
    { id: 3, title: "Practice Problems", duration: "15:20", progress: 0 }
  ];

  // Mock transcript data
  const transcript = `
    [00:00] Hello and welcome to our lesson on this topic.
    [01:15] Today we'll be discussing the key concepts and applications.
    [02:30] Let's start with the fundamental principles.
    [05:45] Now, let's examine some examples in practice.
    [10:20] To summarize what we've learned today...
  `;

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    if (answerContainerRef.current) {
      answerContainerRef.current.scrollTop = answerContainerRef.current.scrollHeight;
    }
  }, [messages, answers]);

  useEffect(() => {
    console.log('Language changed:', language);
  }, [language]);

  useEffect(() => {
    socketRef.current = new WebSocket(`wss://mindspark-backend.onrender.com:8089?token=${token}`);

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
      await fetch("https://mindspark-backend.onrender.com/api/progress/course/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ courseId, userId }),
      });

      toast.success("Lesson completed! Progress saved.");
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

  // Format timestamp for messages
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const time = new Date(timeString);
    return time instanceof Date && !isNaN(time)
      ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : timeString;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
        <div className="flex justify-between items-center px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 cursor-pointer">
            <Logo navigateto={role === "student" ? "/StudentDashboard" : "/InstructorDashboard"} />
            <span className="font-bold text-xl">MindSpark</span>
          </div>

          <div className="hidden md:flex gap-6 items-center text-gray-300 text-md">
            <a href={role === "student" ? "/StudentDashboard" : "/InstructorDashboard"}
              className="hover:text-white transition flex items-center gap-1">
              <Home size={18} />
              <span>Home</span>
            </a>

            {role === "student" ? (
              <>
                <a href="/Quiz" className="hover:text-white transition flex items-center gap-1">
                  <ListChecks size={18} />
                  <span>Quiz</span>
                </a>
                <a href="/LeaderBoard" className="hover:text-white transition flex items-center gap-1">
                  <Award size={18} />
                  <span>LeaderBoard</span>
                </a>
              </>
            ) : (
              <>
                <a href="/Createquiz" className="hover:text-white transition flex items-center gap-1">
                  <ListChecks size={18} />
                  <span>Create Quiz</span>
                </a>
                <a href="/Createcourse" className="hover:text-white transition flex items-center gap-1">
                  <Award size={18} />
                  <span>Create Lecture</span>
                </a>
              </>
            )}

            <a href={role === "student" ? "/StudentProfile" : "/InstructorProfile"}>
              <img
                className="w-9 h-9 rounded-full border-2 border-blue-400 object-cover"
                src={avatar || "https://via.placeholder.com/42"}
                alt="Profile"
              />
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden px-6 pb-4 bg-primary text-gray-300 flex flex-col gap-4 text-md">
            <a href={role === "student" ? "/StudentDashboard" : "/InstructorDashboard"}
              className="hover:text-white transition py-2 flex items-center gap-2">
              <Home size={18} />
              <span>Home</span>
            </a>

            {role === "student" ? (
              <>
                <a href="/Quiz" className="hover:text-white transition flex items-center gap-1">
                  <ListChecks size={18} />
                  <span>Quiz</span>
                </a>
                <a href="/LeaderBoard" className="hover:text-white transition py-2 flex items-center gap-2">
                  <Calendar size={18} />
                  <span>LeaderBoard</span>
                </a>
              </>
            ) : (
              <>
                <a href="/Createquiz" className="hover:text-white transition flex items-center gap-1">
                  <ListChecks size={18} />
                  <span>Quiz</span>
                </a>
                <a href="/Createcourse" className="hover:text-white transition py-2 flex items-center gap-2">
                  <Calendar size={18} />
                  <span>Create Lecture</span>
                </a>
              </>
            )}

            <a href={role === "student" ? "/StudentProfile" : "/InstructorProfile"}
              className="hover:text-white transition py-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img src={avatar || "https://via.placeholder.com/42"} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <span>Profile</span>
            </a>
          </div>
        )}
      </nav>

      {/* Course Navigation Breadcrumb */}
      <div className="bg-white border-b pt-20 pb-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 py-2 text-sm text-gray-600">
            <a href={role === "student" ? "/StudentDashboard" : "/InstructorDashboard"} className="hover:text-blue-600">Courses</a>
            <span>/</span>
            <span className="font-medium text-gray-900">{state.video.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Video Player & Content */}
          <div className={`${fullScreenVideo ? 'w-full' : 'lg:w-2/3'} bg-white rounded-lg shadow-sm overflow-hidden`}>
            {/* Video Player */}
            <div className="relative bg-black">
              <video
                id="videoPlayer"
                controls
                width="100%"
                onEnded={handleVideoComplete}
                className="w-full aspect-video"
                poster={state.video.thumbnail || ""}
                ref={videoRef}
              >
                <source src={getVideoUrl()} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Floating Language Selector */}
              <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-70 rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <Languages size={16} className="text-white" />
                  <select
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-transparent text-white border-none text-sm focus:outline-none"
                    value={language}
                  >
                    <option value="en">English</option>
                    <option value="hin">Hindi</option>
                    {state.video.spanishVideoUrl && <option value="es">Spanish</option>}
                  </select>
                </div>
              </div>
            </div>

            {/* Video Info & Actions */}
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{state.video.title}</h1>
                  <div className="text-sm text-gray-500 mt-1">
                    Published on {state.video.createdAt.slice(0,10)}
                  </div>
                </div>

                {/* <div className="flex gap-4">
                  <button 
                    onClick={() => setLiked(!liked)} 
                    className={`flex items-center gap-1 ${liked ? 'text-blue-600' : 'text-gray-600'}`}
                  >
                    <ThumbsUp size={18} />
                    <span className="hidden sm:inline">Like</span>
                  </button>
                  <button onClick={() => setBookmarked(!bookmarked)} className={`flex items-center gap-1 ${bookmarked ? 'text-blue-600' : 'text-gray-600'}`}>
                    <Bookmark size={18} />
                    <span className="hidden sm:inline">Save</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-600">
                    <Download size={18} />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-600">
                    <Share2 size={18} />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div> */}
              </div>

              {/* Divider */}
              <div className="border-t my-4"></div>

              {/* Description */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{state.video.description}</p>
              </div>

              {/* Transcript Toggle */}
              {/* <div className="mt-6">
                <button 
                  onClick={() => setTranscriptOpen(!transcriptOpen)}
                  className="flex items-center justify-between w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} />
                    <span className="font-medium">Transcript</span>
                  </div>
                  <ChevronLeft className={`transform transition-transform ${transcriptOpen ? 'rotate-90' : '-rotate-90'}`} size={18} />
                </button>
                
                {transcriptOpen && (
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg max-h-64 overflow-y-auto text-sm text-gray-600">
                    <pre className="whitespace-pre-wrap font-sans">{transcript}</pre>
                  </div>
                )}
              </div> */}
            </div>
          </div>

          {/* Right Column: AI Chat & Discussion */}
          <div className={`${fullScreenVideo ? 'hidden' : 'lg:w-1/3'} lg:flex flex-col gap-4`}>
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm p-2 flex">
              <button
                onClick={() => setShowDiscussion(true)}
                className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 transition ${showDiscussion ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <MessageCircle size={18} />
                <span>Discussion</span>
              </button>
              <button
                onClick={() => setShowDiscussion(false)}
                className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 transition ${!showDiscussion ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <HelpCircle size={18} />
                <span>AI Assistant</span>
              </button>
            </div>

            {/* Discussion Panel */}
            {showDiscussion && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-96">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <MessageCircle size={18} className="text-blue-600" />
                    Class Discussion
                  </h3>
                </div>

                <div
                  ref={chatContainerRef}
                  className="flex-grow overflow-y-auto p-4 space-y-4"
                >
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-6">
                      <MessageCircle size={36} className="mx-auto mb-2 opacity-30" />
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-2 ${msg.user === userId ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-3/4 rounded-lg p-3 ${msg.user === userId
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                          }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-semibold text-sm ${msg.user === userId ? 'text-blue-100' : 'text-gray-600'}`}>
                              {msg.username || 'Anonymous'}
                            </span>
                          </div>
                          <p>{msg.message}</p>
                          <div className={`text-xs mt-1 ${msg.user === userId ? 'text-blue-200' : 'text-gray-500'}`}>
                            {formatTime(msg.tim)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-3 border-t">
                  <div className="relative">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      
                      className="w-full border rounded-full py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Type your message..."
                    />
                    <button
                      onClick={sendMessage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
                      aria-label="Send message"
                    >
                      <Send size={20}/>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* AI Assistant Panel */}
            {!showDiscussion && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-96">
                <div className="p-4 border-b bg-emerald-50">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <HelpCircle size={18} className="text-emerald-600" />
                    AI Learning Assistant
                  </h3>
                </div>

                <div
                  ref={answerContainerRef}
                  className="flex-grow overflow-y-auto p-4 space-y-4"
                >
                  {answers.length === 0 ? (
                    <div className="text-center text-gray-500 mt-6">
                      <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                        <HelpCircle size={28} className="text-emerald-600" />
                      </div>
                      <p className="font-medium">Ask me anything about this lesson!</p>
                      <p className="text-sm mt-1">I can explain concepts, provide examples, or help with questions.</p>
                    </div>
                  ) : (
                    answers.map((answer, idx) => (
                      <div key={idx} className={`${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-full rounded-lg p-3 ${answer.username !== "BOT"
                            ? 'bg-blue-600 text-white ml-auto'
                            : 'bg-emerald-50 text-gray-800 border border-emerald-100'
                          }`}>
                          {answer.username !== "BOT" && (
                            <div className="mb-1 text-sm font-medium text-blue-100">
                              You asked:
                            </div>
                          )}
                          <p className="whitespace-pre-line">{answer.message}</p>
                          <div className={`text-xs mt-1 ${answer.username !== "BOT" ? 'text-blue-200' : 'text-emerald-600'}`}>
                            {formatTime(answer.tim)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {loading && (
                    <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse delay-100"></div>
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse delay-200"></div>
                        <span className="text-emerald-600 text-sm">Thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 border-t">
                  <div className="relative">
                    <input
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !loading && question.trim() && sendQuestion()}
                      className="w-full border rounded-full py-2 pl-4 pr-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Ask the AI assistant..."
                      disabled={loading}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex">
                      <button
                        className="text-gray-400 hover:text-gray-600 mr-1"
                        aria-label="Voice input"
                      >
                        <Mic size={18} />
                      </button>
                      <button
                        onClick={() => !loading && question.trim() && sendQuestion()}
                        disabled={loading || !question.trim()}
                        className={`bg-emerald-600 text-white rounded-full p-1 ${loading || !question.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-700'
                          }`}
                        aria-label="Ask question"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Related Videos */}
            {/* <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <PlayCircle size={18} className="text-blue-600" />
                Related Lectures
              </h3>
              
              <div className="space-y-3">
                {relatedVideos.map(video => (
                  <div key={video.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center relative">
                      <PlayCircle size={24} className="text-gray-500" />
                      {video.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
                          <div 
                            className="h-full bg-blue-600" 
                            style={{ width: `${video.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{video.title}</h4>
                      <p className="text-xs text-gray-500">{video.duration}</p>
                    </div>
                    {video.progress === 100 && (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

