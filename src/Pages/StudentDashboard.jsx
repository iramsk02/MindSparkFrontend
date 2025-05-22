import { useEffect, useState } from "react";
import { Menu, X, Search, Bell, User, Book, Award, Calendar, Activity, Zap, ListChecks } from "lucide-react";
import Logo from "../icons/Logo";
import Home from "../icons/Home";
import LoadingScreen from "./Loading";
import VideoGrid from "../Components/VideoGrid";
import toast from "react-hot-toast";
import speak from "../utils/Speak";

export default function StudentDashboard() {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const avatar = localStorage.getItem("avatar");
  const role = localStorage.getItem("role");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setfilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentCourses, setRecentCourses] = useState([]);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const res = await fetch(`https://mindspark-backend.onrender.com/api/users/getProfile/${user}`, {
          headers: {
            Authorization: token,
          },
        });

        const data = await res.json();
        console.log(data);
        setStudent(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile data");
      }
    };

    fetchStudentProfile();
    getAllCourses();
    // Get mock recent courses (in real app, this would be from API)
    setRecentCourses(getMockRecentCourses());
  }, []);

  useEffect(() => {
    const filtered = courses.filter(q =>
      q.title?.toLowerCase().includes(searchQuery.toLowerCase()) || q.description?.toLowerCase().includes(searchQuery.toLowerCase())



    );
    setfilteredCourses(filtered)


  }, [searchQuery])

  // Mock function for demo purposes
  const getMockRecentCourses = () => {
    return [
      { id: 1, title: "Introduction to Python", progress: 75, lastAccessed: "2 days ago" },
      { id: 2, title: "Web Development Basics", progress: 40, lastAccessed: "Yesterday" },
      { id: 3, title: "Data Structures", progress: 20, lastAccessed: "Just now" },
    ];
  };

  async function getAllCourses() {
    try {
      const response = await fetch('https://mindspark-backend.onrender.com/api/courses/Allcourses', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });

      const data = await response.json();
      console.log(data);

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

  // if (loading) return <LoadingScreen />;

  // Calculate random (mock) stats for demo purposes
  const completedCourses = 3;
  const totalQuizzes = 28;
  const completedQuizzes = 21;
  const quizAccuracy = 82;
  const xpPoints = student.xp || 750;
  const currentStreak = student.streak?.current || 5;
  const level = Math.floor((xpPoints || 0) / 500) + 1;
  const progressToNextLevel = ((xpPoints % 500) / 500) * 100;

  return (
    <div className="h-full min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
        <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Logo navigateto={"/StudentDashboard"} />
            <span className="font-bold text-xl cursor-pointer">MindSpark</span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex relative w-1/3">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full py-2 px-4 pl-10 rounded-full bg-primary-dark text-white placeholder-gray-300 border border-gray-700 focus:outline-none focus:border-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-300" size={18} />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-300 text-md">
            {/* <a href="/StudentDashboard" className="hover:text-white transition flex items-center gap-1">
              <Home size={18} />
              <span>Home</span>
            </a> */}
            <a href="/Quiz" className="hover:text-white transition flex items-center gap-1">
              <ListChecks size={18} />
              <span>Quiz</span>
            </a>
            <a href="/LeaderBoard" className="hover:text-white transition flex items-center gap-1">
              <Award size={18} />
              <span>Leaderboard</span>
            </a>
            {/* <div className="relative">
              <Bell size={20} className="cursor-pointer hover:text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div> */}
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
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        {isOpen && (
          <div className="md:hidden px-6 pb-4 bg-primary text-gray-300 flex flex-col gap-4 text-md">
            {/* Mobile Search */}
            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full py-2 px-4 pl-10 rounded-full bg-primary-dark text-white placeholder-gray-300 border border-gray-700 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-300" size={18} />
            </div>

            {/* <a href="/StudentDashboard" className="hover:text-white transition flex items-center gap-2 py-2">
              <Home size={18} />
              <span>Home</span>
            </a> */}
            <a href="/Quiz" className="hover:text-white transition flex items-center gap-2 py-2">
              <ListChecks size={18} />
              <span>Quiz</span>
            </a>
            <a href="/LeaderBoard" className="hover:text-white transition flex items-center gap-2 py-2">
              <Award size={18} />
              <span>Leaderboard</span>
            </a>
            <a href="/StudentProfile" className="hover:text-white transition flex items-center gap-2 py-2">
              <User size={18} />
              <span>Profile</span>
            </a>
            {/* <a href="/signout" className="hover:text-white transition flex items-center gap-2 py-2">
              <span>Sign Out</span>
            </a> */}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-6 shadow-lg text-white mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {student.name || "Student"}!</h1>
              <p className="mt-2 text-sm md:text-base opacity-90">
                Continue your learning journey and reach new heights today.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Zap size={18} />
                  <span className="font-bold text-xl">{xpPoints}</span>
                </div>
                <span className="text-xs">XP Points</span>
              </div>
              <div className="h-10 w-px bg-blue-300 mx-2"></div>
              <div className="text-center">
                <div className="font-bold text-xl">{currentStreak}</div>
                <span className="text-xs">Day Streak</span>
              </div>
              <div className="h-10 w-px bg-blue-300 mx-2"></div>
              <div className="text-center">
                <div className="font-bold text-xl">{level}</div>
                <span className="text-xs">Level</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress to Level {level + 1}</span>
              <span>{progressToNextLevel.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-blue-800 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{ width: `${progressToNextLevel}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {/* <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Book size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Courses</p>
              <p className="font-bold text-xl">{completedCourses} / {courses.length}</p>
            </div>
          </div> */}

          {/* <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <ListChecks size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Quizzes</p>
              <p className="font-bold text-xl">{completedQuizzes} / {totalQuizzes}</p>
            </div>
          </div> */}

          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <Activity size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Accuracy</p>
              <p className="font-bold text-xl">{quizAccuracy}%</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-amber-100 p-3 mr-4">
              <Calendar size={24} className="text-amber-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Streak</p>
              <p className="font-bold text-xl">{currentStreak} days</p>
            </div>
          </div>
        </div>

        {/* Recent Courses */}
        {/* <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentCourses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-3 bg-blue-600" style={{ width: `${course.progress}%` }}></div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">Last accessed {course.lastAccessed}</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Recommended Videos Section */}
        <section className="mt-10 mb-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recommended Videos</h2>
           {} <a href="" className="text-blue-600 hover:underline text-sm">View All</a>
            {/* {filteredCourses.length>0?<VideoGrid videos={filteredCourses} />:<VideoGrid videos={courses} />} */}
          </div>
          {loading?  <LoadingScreen />:filteredCourses.length>0?<VideoGrid videos={filteredCourses} />:<VideoGrid videos={courses} />}
          {/* <VideoGrid videos={courses} /> */}
        </section>
      </div>
    </div>
  );
}
