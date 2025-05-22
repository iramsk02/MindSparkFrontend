import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import Logo from "../icons/Logo";
import Home from "../icons/Home";
import LoadingScreen from "./Loading";
import { Menu, X,ListChecks,Book,User } from "lucide-react"; // lucide-react for icons
import toast from "react-hot-toast";

export default function CreateQuiz() {
  const token = localStorage.getItem("token");
  const avatar = localStorage.getItem("avatar");
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [numQuestions, setNumQuestions] = useState(0);
  const [category, setCategory] = useState("");
  const [xp, setXp] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleNumQuestionsChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;
    setNumQuestions(value);

    const newQuestions = Array.from({ length: value }, () => ({
      questionText: "",
      options: Array.from({ length: 4 }, () => ({ text: "", isCorrect: false })),
    }));
    setQuestions(newQuestions);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "category") setCategory(value);
    else if (name === "xp") setXp(value);
  };

  const handleQuestionChange = (qIndex, field, value, oIndex = null) => {
    const updatedQuestions = questions.map((q, i) => {
      if (i === qIndex) {
        if (field === "questionText") {
          return { ...q, questionText: value };
        } else if (field === "option") {
          const updatedOptions = q.options.map((opt, oi) =>
            oi === oIndex ? { ...opt, text: value } : opt
          );
          return { ...q, options: updatedOptions };
        } else if (field === "isCorrect") {
          const updatedOptions = q.options.map((opt, oi) => ({
            ...opt,
            isCorrect: oi === oIndex,
          }));
          return { ...q, options: updatedOptions };
        }
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   const formattedPayload = {
  //     category,
  //     xp: parseInt(xp, 10),
  //     createdBy: user,
  //     questions: questions.map((q) => ({
  //       questionText: q.questionText,
  //       options: q.options,
  //     })),
  //   };

  //   try {
  //     // const response = await fetch("https://micro-learn-backend.onrender.com/api/courses/add/quiz", {
  //     const response = await fetch("http://localhost:5000/api/courses/add/quiz", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //         role: "educator",
  //       },
  //       body: JSON.stringify(formattedPayload),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       alert("Quiz Created Successfully");
  //       navigate("/InstructorDashboard");
  //     } else {
  //       alert(`Failed to create quiz: ${data.message}`);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("An error occurred while creating the quiz.");
  //   } finally {
  //     setLoading(false);
  //   }

  //   setNumQuestions(0);
  //   setCategory("");
  //   setXp("");
  //   setQuestions([]);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    if (!category || !xp || numQuestions <= 0) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }
  
    const formattedPayload = {
      category,
      xp: parseInt(xp, 10),
      createdBy: user,
      questions: questions.map((q) => ({
        questionText: q.questionText,
        options: q.options,
      })),
    };
  
    try {
      // const response = await fetch("http://64.227.171.122:5000/api/courses/add/quiz", {
      const response = await fetch("https://mindspark-backend.onrender.com/api/courses/add/quiz", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          role: "educator",
        },
        body: JSON.stringify(formattedPayload),
      });
  
      const data = await response.json();
      if (response.ok) {
        // alert("Quiz Created Successfully");
        toast.success('Quiz Created successful!');
        navigate("/InstructorDashboard");
      } else {
        toast.error(`Failed to create quiz: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the quiz.");
    } finally {
      setLoading(false);
    }
  
    setNumQuestions(0);
    setCategory("");
    setXp("");
    setQuestions([]);
  };
  

  if (loading) return <LoadingScreen />;

  return (
    <>
      {/* Navbar */}
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
                       
                        <a href="/Createcourse" className="flex items-center gap-1 hover:text-white transition font-medium">
                            <Book size={18} />
                            <span>Create Lecture</span>
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
                       
                        <a href="/Createcourse" className="flex items-center gap-2 py-2 hover:text-white transition">
                            <Book size={18} />
                            <span>Create Lecture</span>
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

      {/* Form */}
      <div className="mt-24 px-6 md:px-20 pb-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">Create a New Quiz</h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium">Quiz Category</label>
              <input
                type="text"
                name="category"
                value={category}
                onChange={handleInputChange}
                placeholder="E.g. JavaScript"
                className="mt-2 w-full border border-gray-300 p-3 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">XP</label>
              <input
                type="number"
                name="xp"
                value={xp}
                onChange={handleInputChange}
                placeholder="E.g. 50"
                className="mt-2 w-full border border-gray-300 p-3 rounded-lg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium">Number of Questions</label>
              <input
                type="number"
                value={numQuestions}
                onChange={handleNumQuestionsChange}
                placeholder="E.g. 5"
                className="mt-2 w-full border border-gray-300 p-3 rounded-lg"
              />
            </div>
          </div>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="font-semibold mb-4">Question {qIndex + 1}</h3>

              <input
                type="text"
                value={q.questionText}
                onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                placeholder="Enter question"
                className="w-full mb-4 border border-gray-300 p-3 rounded-lg"
              />

              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="flex items-center gap-3 mb-2">
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => handleQuestionChange(qIndex, "option", e.target.value, oIndex)}
                    placeholder={`Option ${oIndex + 1}`}
                    className="flex-grow border border-gray-300 p-2 rounded-lg"
                  />
                  <input
                    type="radio"
                    name={`correct-answer-${qIndex}`}
                    checked={opt.isCorrect}
                    onChange={() => handleQuestionChange(qIndex, "isCorrect", true, oIndex)}
                    className="w-5 h-5"
                  />
                  <label className="text-sm">Correct</label>
                </div>
              ))}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </>
  );
}
