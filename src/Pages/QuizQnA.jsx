
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useState, useEffect } from "react";
import Logo from "../icons/Logo";
import Home from "../icons/Home";
import LoadingScreen from "./Loading";
// import LoadingScreen from "./Loading";
import { Menu, X } from "lucide-react"; 

export default function QuizQnA() {
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [correctans, setCorrectAns] = useState(0);
    const [attempted, setAttempted] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

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
                const response = await fetch("http://localhost:5000/api/quiz/Allquiz", {
                // const response = await fetch("https://micro-learn-backend.onrender.com/api/quiz/Allquiz", {
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
                console.error("Error fetching quiz:", err);
            }finally{
                setLoading(false)
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
            await fetch("http://localhost:5000/api/progress/quiz/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ quizId: id, userId, xpEarned: xp }),
            });
        } catch (err) {
            console.error("Failed to track Quiz progress", err);
        }finally{
            setLoading(false)
        }

        navigate("/Result", {
            state: {
                total: quiz.questions.length,
                attempted: attemptedCount,
                correct: correctCount,
                incorrect: quiz.questions.length - correctCount,
                xp: xp,
            },
        });
    };

    if (!quiz ) {
        return<LoadingScreen/>
    }

    const progressPercent = Math.round((Object.keys(selectedAnswers).length / quiz.questions.length) * 100);

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
            <div className="pt-28 px-5 md:px-20 pb-20 bg-gradient-to-b from-white to-gray-50 min-h-screen text-gray-900">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-purple-700">📚 Category: {quiz.category}</h1>
                    <div className="bg-yellow-300 text-black font-medium rounded-full px-4 py-1 mt-4 md:mt-0 shadow-sm">
                        XP Reward: {quiz.xpReward}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-10 sticky">
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                    <div className="text-sm text-right mt-1 text-gray-500">
                        Progress: {progressPercent}%
                    </div>
                </div>

                <div className="space-y-10">
                    {quiz.questions.map((question, index) => (
                        <div key={question._id} className="bg-white shadow-md rounded-xl p-6 transition-transform hover:scale-[1.01]">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                                Q{index + 1}: {question.questionText}
                            </h2>
                            <div className="grid gap-4">
                                {question.options.map((option) => (
                                    <button
                                        key={option._id}
                                        onClick={() => handleOptionClick(question._id, option._id)}
                                        className={`px-4 py-3 rounded-lg border text-left transition-all duration-200 ease-in-out
                                            ${selectedAnswers[question._id] === option._id
                                                ? "bg-green-100 border-green-500 text-green-800 font-semibold"
                                                : "bg-gray-100 border-gray-300 hover:bg-purple-100"
                                            }`}
                                    >
                                        {option.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <button
                        onClick={handleSubmit}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
                    >
                        🚀 Submit Quiz
                    </button>
                </div>
            </div>
        </>
    );
}
