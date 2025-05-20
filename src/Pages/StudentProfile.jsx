import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingScreen from "./Loading";
// import { Menu, X } from "lucide-react";
import Home from "../icons/Home";
import Navbar from "../Components/Navbar";
import Logo from "../icons/Logo";
import {
  Menu, X, MessageCircle, Calendar, BookOpen, Send, Mic, Languages, ThumbsUp,
  PlayCircle, Download, Share2, Bookmark, HelpCircle, ChevronLeft, MoreHorizontal, Book,
  Award,
  Zap,
  ListChecks
} from "lucide-react";

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", avatar: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");
  const avatar = localStorage.getItem("avatar");
  const role = localStorage.getItem("role");
  console.log(userId)

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchStudentProfile = async () => {
      try {
        const res = await fetch(`https://mindspark-backend.onrender.com/api/users/getProfile/${userId}`, {
          // const res = await fetch(`https://micro-learn-backend.onrender.com/api/users/getProfile/${userId}`, {
          headers: { Authorization: token },
        });

        const data = await res.json();
        console.log(data)
        if (isMounted) {
          setStudent(data);
          setFormData({ name: data.name || "", avatar: data.avatar || "", bio: data.bio || "" });
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };

    fetchStudentProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      // const res = await fetch(`http://localhost:5000/api/users/updateProfile/${userId}`, {
      const res = await fetch(`https://mindspark-backend.onrender.com/api/users/updateProfile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const updated = await res.json();
      setStudent(updated);
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile");
    }
  };

  const logoutUser = async () => {
    try {
      const res = await fetch("https://mindspark-backend.onrender.com/api/auth/logout", {
        // const res = await fetch("https://micro-learn-backend.onrender.com/api/auth/logout", {
        method: "POST",
      });

      await res.json();
      localStorage.clear();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="text-center  text-gray-500">
  //       <LoadingScreen />
  //     </div>
  //   );
  // }

  return (
    <>



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
                {/* <a onClick={logoutUser} className="hover:text-white transition cursor-pointer flex items-center gap-1">
                  {/* <Award size={18} /> 
                  <span>LogOut</span>
                </a> */}
              </>
            ) : (
              <>
                <a href="/Createquiz" className="hover:text-white transition flex items-center gap-1">
                  <ListChecks size={18} />
                  <span>Create Quiz</span>
                </a>
                <a href="/Createcourse" className="hover:text-white transition flex items-center gap-1">
                  <Award size={18} />
                  <span>Create Course</span>
                </a>
              </>
            )}

            <a onClick={logoutUser} className="hover:text-white transition cursor-pointer flex items-center gap-1">
              {/* <Award size={18} /> */}
              <span>LogOut</span>

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
                <a href="/Quiz" className="hover:text-white transition py-2 flex items-center gap-2">
                  <ListChecks size={18} />
                  <span>Quiz</span>
                </a>
                <a href="/LeaderBoard" className="hover:text-white transition py-2 flex items-center gap-2">
                  <Award size={18} />
                  <span>LeaderBoard</span>
                </a>
                <a onClick={logoutUser} className="hover:text-white transition cursor-pointer flex items-center gap-1">
                  {/* <Award size={18} /> */}
                  <span>LogOut</span>
                </a>
              </>
            ) : (
              <>
                <a href="/Createquiz" className="hover:text-white transition flex items-center gap-2">
                  <ListChecks size={18} />
                  <span>Quiz</span>
                </a>
                <a href="/Createcourse" className="hover:text-white transition py-2 flex items-center gap-2">
                  <Award size={18} />
                  <span>Create Course</span>
                </a>
                <a onClick={logoutUser} className="hover:text-white transition cursor-pointer flex items-center gap-1">
                  {/* <Award size={18} /> */}
                  <span>LogOut</span>
                </a>
              </>
            )}

            {/* <a href={role === "student" ? "/StudentProfile" : "/InstructorProfile"} 
              className="hover:text-white transition py-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img src={avatar || "https://via.placeholder.com/42"} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <span>Profile</span>
            </a> */}
          </div>
        )}
      </nav>

      <div className="flex justify-center items-center top-0  px-4 py-6 bg-gray-100 h-screen">
        {loading?<LoadingScreen/>:

        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-xl">
          {/* <VoiceAssistant/> */}
          <div className="flex flex-col items-center text-center">
            <img
              className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
              src={formData.avatar || "https://i.pravatar.cc/150"}
              alt="Student Avatar"
            />

            {editMode ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="mt-2 p-2 border rounded w-full"
                />
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Write your bio..."
                  className="mt-2 p-2 border rounded w-full"
                />
              </>
            ) : (
              <>
                <h2 className="mt-4 text-2xl font-bold text-gray-800">{student.name}</h2>
                <p className="text-gray-600">{student.email}</p>

                {student.bio && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-1">Bio</h3>
                    <p className="text-sm text-gray-600">{student.bio}</p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Profile Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-indigo-100 rounded-xl p-4">
                <div className="flex justify-center gap-2">
                  <span className="mt-2"><Zap size={18} /></span>
                  <p className="text-xl font-bold text-indigo-600">{student.xp || 0}</p>
                </div>
                <p className="text-sm text-gray-600">XP</p>
              </div>
              <div className="bg-yellow-100 rounded-xl p-4">

                <p className="text-xl font-bold text-yellow-600">{student.badges?.length || 0}</p>
                <p className="text-sm text-gray-600">Badges</p>
              </div>
            </div>
          </div>

          {student.badges?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Badges</h3>
              <div className="flex flex-wrap gap-2">
                {student.badges.map((badge, index) => (
                  <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex  sm:flex-row justify-between sm:justify-between gap-4 text-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">🔥 Current Streak</h3>
              <div className="bg-orange-200 text-orange-900 font-medium px-4 py-2 rounded-full text-sm shadow-md animate-pulse">
                🔥 {student.streak?.current || 0} days
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">🔥 Longest Streak</h3>
              <div className="bg-orange-200 text-orange-900 font-medium px-4 py-2 rounded-full text-sm shadow-md animate-pulse">
                🔥 {student.streak?.longest || 0} days
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="text-gray-500 px-4 py-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>}
      </div>


    </>
  );
}