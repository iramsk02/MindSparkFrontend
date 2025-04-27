import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../icons/Logo";
import LoadingScreen from "./Loading";
import { Menu, X } from "lucide-react"; // lucide-react for icons
import Home from "../icons/Home";
import toast from "react-hot-toast";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  // const API_URL=process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const handleClick = () => navigate("/Signup");

  useEffect(() => {
    getAllCourses();
  }, []);

  async function getAllCourses() {
    try {
      // const response = await fetch(`http://localhost:5000/api/courses/Allcourses`);
      const response = await fetch(`https://mindspark-backend.onrender.com/api/courses/Allcourses`);
      const data = await response.json();
      if (response.ok) {
        setCourses(data);
      } else {
        toast.error(`Failed to fetch courses: ${data.message}`);
      }
    } catch (error) {
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
            <Logo navigateto={"/"} />
            <span className="font-bold text-xl">MindSpark</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-gray-300 text-md">
          <a href="/" className="hover:text-white transition"><Home/></a>
            <a href="/Instructors" className="hover:text-white transition">Our Instructors</a>
            <a href="/Signup" className="hover:text-white transition">Sign Up</a>
            <a href="/Signin" className="hover:text-white transition">Sign In</a>
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
            <a href="/Instructors" className="hover:text-white transition">Our Instructors</a>
            <a href="/Courses" className="hover:text-white transition">Courses</a>
            <a href="/Signup" className="hover:text-white transition">Sign Up</a>
            <a href="/Signin" className="hover:text-white transition">Sign In</a>
          </div>
        )}
      </nav>
      
    

      {/* Hero Section */}
      <section className="pt-24 px-6 lg:px-20 bg-blue-950 text-white flex flex-col-reverse md:flex-row justify-between items-center gap-10">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Discover a New Way of Learning</h1>
          <p className="text-sm sm:text-base text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt debitis quidem nesciunt voluptas ipsam!</p>
        </div>
        <div className="md:w-1/2">
          <img src="src/assets/Courseimg.png" alt="Course" className="w-full h-auto rounded-2xl shadow-lg" />
        </div>
      </section>

      {/* Courses Section */}
      <section className="px-6 py-12 lg:px-20 bg-white min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-10">Trending Courses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.map((video, index) => (
            <div
              key={index}
              onClick={handleClick}
              className="cursor-pointer bg-white hover:bg-blue-50 p-4 rounded-xl shadow transition duration-300 border border-gray-200"
            >
              <video
                className="w-full h-40 object-cover rounded-lg mb-3 border"
                poster={video.thumbnailUrl}
                controls={false}
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h3 className="text-lg font-semibold text-blue-900">{video.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
