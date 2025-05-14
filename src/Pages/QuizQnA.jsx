
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import { useState, useEffect } from "react";
// import Logo from "../icons/Logo";
// import Home from "../icons/Home";
// import LoadingScreen from "./Loading";
// // import LoadingScreen from "./Loading";
// import { Menu, X } from "lucide-react"; 
// import toast from "react-hot-toast";

// export default function QuizQnA() {
//     const [quiz, setQuiz] = useState(null);
//     const [selectedAnswers, setSelectedAnswers] = useState({});
//     const [correctans, setCorrectAns] = useState(0);
//     const [attempted, setAttempted] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [isOpen, setIsOpen] = useState(false);

//     const userId = localStorage.getItem("user");
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
//     const avatar = localStorage.getItem("avatar");
//     const navigate = useNavigate();
//     const [xp, setxp] = useState(0);
//     const { id } = useParams();

//     useEffect(() => {
//         const fetchQuiz = async () => {
//             try {
//                 // const response = await fetch("http://localhost:5000/api/quiz/Allquiz", {
//                 const response = await fetch("https://mindspark-backend.onrender.com/api/quiz/Allquiz", {
//                     method: "GET",
//                     headers: {
//                         Authorization: token,
//                     },
//                 });
//                 const data = await response.json();
//                 const foundQuiz = data.Quiz.find((q) => q._id === id);
//                 if (foundQuiz) {
//                     setQuiz(foundQuiz);
//                 }
//             } catch (err) {
//                 toast.error("Error fetching quiz:", err);
//             }finally{
//                 setLoading(false)
//             }
//         };
//         fetchQuiz();
//     }, [id, token]);

//     const handleOptionClick = (questionId, optionId) => {
//         setSelectedAnswers((prev) => ({
//             ...prev,
//             [questionId]: optionId,
//         }));
//     };

//     const handleSubmit = async () => {
//         let correctCount = 0;
//         let attemptedCount = 0;

//         quiz.questions.forEach((question) => {
//             const selectedId = selectedAnswers[question._id];
//             if (selectedId) {
//                 attemptedCount++;
//                 const correctOption = question.options.find((o) => o.isCorrect);
//                 if (correctOption && correctOption._id === selectedId) {
//                     correctCount++;
//                 }
//             }
//         });

//         setCorrectAns(correctCount);
//         setAttempted(attemptedCount);
//         const xp = (quiz.xpReward / quiz.questions.length) * correctCount;
//         setxp(xp);

//         try {
//             // await fetch("http://localhost:5000/api/progress/quiz/complete", {
//             await fetch("https://mindspark-backend.onrender.com/api/progress/quiz/complete", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: token,
//                 },
//                 body: JSON.stringify({ quizId: id, userId, xpEarned: xp }),
//             });
//         } catch (err) {
//             console.error("Failed to track Quiz progress", err);
//         }finally{
//             setLoading(false)
//         }

//         navigate("/Result", {
//             state: {
//                 total: quiz.questions.length,
//                 attempted: attemptedCount,
//                 correct: correctCount,
//                 incorrect: quiz.questions.length - correctCount,
//                 xp: xp,
//             },
//         });
//     };

//     if (!quiz ) {
//         return<LoadingScreen/>
//     }

//     const progressPercent = Math.round((Object.keys(selectedAnswers).length / quiz.questions.length) * 100);

//     return (
//         <>
//                {/* Navbar */}

      

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
//             <a href="/StudentDashboard" className="hover:text-white transition">Home</a>
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
//             <div className="pt-28 px-5 md:px-20 pb-20 bg-gradient-to-b from-white to-gray-50 min-h-screen text-gray-900">
//                 <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//                     <h1 className="text-2xl font-bold text-purple-700">📚 Category: {quiz.category}</h1>
//                     <div className="bg-yellow-300 text-black font-medium rounded-full px-4 py-1 mt-4 md:mt-0 shadow-sm">
//                         XP Reward: {quiz.xpReward}
//                     </div>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="mb-10 sticky">
//                     <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                             className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
//                             style={{ width: `${progressPercent}%` }}
//                         ></div>
//                     </div>
//                     <div className="text-sm text-right mt-1 text-gray-500">
//                         Progress: {progressPercent}%
//                     </div>
//                 </div>

//                 <div className="space-y-10">
//                     {quiz.questions.map((question, index) => (
//                         <div key={question._id} className="bg-white shadow-md rounded-xl p-6 transition-transform hover:scale-[1.01]">
//                             <h2 className="text-lg font-semibold mb-4 text-gray-800">
//                                 Q{index + 1}: {question.questionText}
//                             </h2>
//                             <div className="grid gap-4">
//                                 {question.options.map((option) => (
//                                     <button
//                                         key={option._id}
//                                         onClick={() => handleOptionClick(question._id, option._id)}
//                                         className={`px-4 py-3 rounded-lg border text-left transition-all duration-200 ease-in-out
//                                             ${selectedAnswers[question._id] === option._id
//                                                 ? "bg-green-100 border-green-500 text-green-800 font-semibold"
//                                                 : "bg-gray-100 border-gray-300 hover:bg-purple-100"
//                                             }`}
//                                     >
//                                         {option.text}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="flex justify-center mt-12">
//                     <button
//                         onClick={handleSubmit}
//                         className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
//                     >
//                         🚀 Submit Quiz
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }


import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../icons/Logo";
import Home from "../icons/Home";
import LoadingScreen from "./Loading";
import { Menu, X, ChevronLeft, ChevronRight, CheckCircle,Award } from "lucide-react"; 
import toast from "react-hot-toast";

export default function QuizQnA() {
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [correctans, setCorrectAns] = useState(0);
    const [attempted, setAttempted] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    const userId = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const avatar = localStorage.getItem("avatar");
    const navigate = useNavigate();
    const [xp, setxp] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch("https://mindspark-backend.onrender.com/api/quiz/Allquiz", {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                });
                const data = await response.json();
                const foundQuiz = data.Quiz.find((q) => q._id === id);
                if (foundQuiz) {
                    setQuiz(foundQuiz);
                }
            } catch (err) {
                toast.error("Error fetching quiz: " + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id, token]);

    const handleOptionClick = (questionId, optionId) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: optionId,
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitModalOpen(false);
        let correctCount = 0;
        let attemptedCount = 0;

        quiz.questions.forEach((question) => {
            const selectedId = selectedAnswers[question._id];
            if (selectedId) {
                attemptedCount++;
                const correctOption = question.options.find((o) => o.isCorrect);
                if (correctOption && correctOption._id === selectedId) {
                    correctCount++;
                }
            }
        });

        setCorrectAns(correctCount);
        setAttempted(attemptedCount);
        const xp = (quiz.xpReward / quiz.questions.length) * correctCount;
        setxp(xp);

        try {
            await fetch("https://mindspark-backend.onrender.com/api/progress/quiz/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ quizId: id, userId, xpEarned: xp }),
            });
        } catch (err) {
            toast.error("Failed to track Quiz progress");
        } finally {
            setLoading(false);
        }

        navigate("/Result", {
            state: {
                total: quiz.questions.length,
                attempted: attemptedCount,
                correct: correctCount,
                incorrect: attemptedCount - correctCount,
                xp: xp,
            },
        });
    };

    if (loading || !quiz) {
        return <LoadingScreen />;
    }

    const progressPercent = Math.round((Object.keys(selectedAnswers).length / quiz.questions.length) * 100);
    
    // Pagination logic
    const questionsPerPage = 1;
    const totalPages = quiz.questions.length;
    const currentQuestion = quiz.questions[currentPage];
    
    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };
    
    const goToPrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    const goToPage = (pageIndex) => {
        setCurrentPage(pageIndex);
        window.scrollTo(0, 0);
    };

    const isQuestionAnswered = (questionId) => {
        return selectedAnswers[questionId] !== undefined;
    };

    return (
        <>
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
            
            <div className="pt-28 px-5 md:px-20 pb-20 bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen text-gray-900">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-primary flex items-center">
                        <span className="bg-purple-100 p-2 rounded-full mr-3">📚</span> 
                        {quiz.category}
                    </h1>
                    <div className="0 text-gray-900 font-medium rounded-full px-6 py-2 mt-4 md:mt-0 shadow-md">
                        <span className="mr-1">✨</span> XP Reward: {quiz.xpReward}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-10">
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div
                            className="h-full bg-gradient-to-r from-blue-850 to-primary transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                    <div className="text-sm text-right mt-1 text-gray-600 font-medium">
                        Progress: {progressPercent}% ({Object.keys(selectedAnswers).length}/{quiz.questions.length} questions answered)
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white shadow-lg rounded-2xl p-8 transition-all duration-300 border border-purple-100 hover:shadow-xl mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg md:text-xl font-bold text-blue-800">
                            Question {currentPage + 1} of {totalPages}
                        </h2>
                        <div className="text-sm bg-purple-100 text-bluee-700 px-3 py-1 rounded-full">
                            {isQuestionAnswered(currentQuestion._id) ? 
                              <span className="flex items-center"><CheckCircle size={16} className="mr-1" /> Answered</span> : 
                              "Not answered yet"}
                        </div>
                    </div>
                    
                    <p className="text-lg md:text-xl font-medium mb-6 text-gray-800">
                        {currentQuestion.questionText}
                    </p>
                    
                    <div className="grid gap-4">
                        {currentQuestion.options.map((option) => (
                            <button
                                key={option._id}
                                onClick={() => handleOptionClick(currentQuestion._id, option._id)}
                                className={`px-6 py-4 rounded-xl border-2 text-left transition-all duration-200 ease-in-out flex items-center
                                    ${selectedAnswers[currentQuestion._id] === option._id
                                        ? "bg-green-50 border-green-500 text-green-800 font-semibold shadow-md"
                                        : "bg-gray-50 border-gray-200 hover:bg-purple-50 hover:border-purple-300"
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 border ${
                                    selectedAnswers[currentQuestion._id] === option._id
                                    ? "bg-green-500 border-green-600"
                                    : "border-gray-400"
                                }`}></div>
                                <span>{option.text}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex gap-2 mb-4 md:mb-0">
                        <button
                            onClick={goToPrevPage}
                            disabled={currentPage === 0}
                            className={`flex items-center px-4 py-2 rounded-lg ${
                                currentPage === 0 
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                                : "bg-indigo-100 text-blue-800 hover:bg-indigo-200"
                            }`}
                        >
                            <ChevronLeft size={18} className="mr-1" /> Previous
                        </button>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages - 1}
                            className={`flex items-center px-4 py-2 rounded-lg ${
                                currentPage === totalPages - 1 
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                                : "bg-indigo-100 text-blue-800 hover:bg-indigo-200"
                            }`}
                        >
                            Next <ChevronRight size={18} className="ml-1" />
                        </button>
                    </div>

                    {/* Page Dots */}
                    <div className="flex gap-1 items-center">
                        {quiz.questions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToPage(index)}
                                className={`w-3 h-3 rounded-full transition-all ${
                                    currentPage === index 
                                    ? "bg-blue-800 w-4 h-4" 
                                    : isQuestionAnswered(quiz.questions[index]._id)
                                      ? "bg-green-500"
                                      : "bg-gray-300 hover:bg-gray-400"
                                }`}
                                aria-label={`Go to question ${index + 1}`}
                            ></button>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsSubmitModalOpen(true)}
                        className="bg-gradient-to-r from-blue-800 to-primary hover:from-blue-900 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300 flex items-center"
                    >
                        <span>🚀 Submit Quiz</span>
                    </button>
                </div>
            </div>
            
            {/* Submit Confirmation Modal */}
            {isSubmitModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">Confirm Submission</h3>
                        <p className="text-gray-700 mb-6">
                            You've answered {Object.keys(selectedAnswers).length} out of {quiz.questions.length} questions. 
                            {Object.keys(selectedAnswers).length < quiz.questions.length && (
                                <span className="text-amber-600 font-medium block mt-2">
                                    Are you sure you want to submit without answering all questions?
                                </span>
                            )}
                        </p>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setIsSubmitModalOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-800"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}