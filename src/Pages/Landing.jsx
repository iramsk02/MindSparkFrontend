
import {Users,} from "lucide-react"; 
import { useState } from "react";
import {
  Menu,
  X,
  BookOpen,
  UserPlus,
  LogIn,
  Rocket,
  Smile,
  Star,
  ChevronRight,
} from "lucide-react";
import Logo from "../icons/Logo";

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
        <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Logo navigateto={"/"} />
            <span className="font-bold text-xl cursor-pointer">MindSpark</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-300 text-md">
              <a href="/Instructors" className="hover:text-white transition flex items-center gap-1">
              <Users size={18} />
              <span>Our Instructors</span>
            </a>
            <a href="/Courses" className="hover:text-white flex items-center gap-1">
              <BookOpen size={18} />
              <span>Courses</span>
            </a>
            <a href="/Signup" className="hover:text-white flex items-center gap-1 bg-blue-600 px-4 py-1.5 rounded-full">
              <UserPlus size={18} />
              <span>Sign Up</span>
            </a>
            <a href="/Signin" className="hover:text-white flex items-center gap-1 border border-gray-400 px-4 py-1.5 rounded-full">
              <LogIn size={18} />
              <span>Sign In</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        {isOpen && (
          <div className="md:hidden px-6 pb-4 bg-primary text-gray-300 flex flex-col gap-4 text-md">
              <a href="/Instructors" className="hover:text-white transition flex items-center gap-1">
              <Users size={18} />
              <span>Our Instructors</span>
            </a>
            <a href="/Courses" className="hover:text-white flex items-center gap-2 py-2">
              <BookOpen size={18} />
              <span>Courses</span>
            </a>
            <a href="/Signup" className="hover:text-white flex items-center gap-2 py-2 bg-blue-600 px-4 rounded-lg text-white">
              <UserPlus size={18} />
              <span>Sign Up</span>
            </a>
            <a href="/Signin" className="hover:text-white flex items-center gap-2 py-2 border border-gray-400 px-4 rounded-lg">
              <LogIn size={18} />
              <span>Sign In</span>
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-6 bg-gradient-to-b from-blue-950 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Unlock Your Potential with <span className="text-blue-400">MindSpark</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
            Learn from top instructors. Build skills for the future. Join a vibrant community of learners and creators.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <a href="/Courses" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2">
              Browse Courses <ChevronRight size={18} />
            </a>
            <a href="/Signup" className="px-6 py-3 border border-gray-400 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-800">
              Join Now
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose MindSpark?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { icon: Rocket, title: "Industry-Relevant Skills", desc: "Learn from courses designed with the latest industry standards." },
              { icon: Smile, title: "Engaging Experience", desc: "Interactive quizzes, projects, and real-time discussions." },
              { icon: Star, title: "Top-Rated Instructors", desc: "Learn from experts who are passionate about teaching." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <Icon size={32} className="text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Learners Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Aarav Mehta",
                feedback: "MindSpark helped me land my first internship! The projects and mentorship were top-notch.",
              },
              {
                name: "Sara Khan",
                feedback: "Amazing instructors and community. I felt supported every step of the way.",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md text-left">
                <p className="text-gray-700 italic">"{t.feedback}"</p>
                <p className="mt-4 font-semibold text-blue-800">- {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Highlight */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Get Started with Our Top Courses</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            {["Full-Stack Web Development", "Data Science & AI", "UI/UX Design"].map((course) => (
              <div key={course} className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition w-full md:w-1/3">
                <h3 className="text-xl font-semibold text-blue-800">{course}</h3>
                <p className="text-gray-600 mt-2">Explore detailed modules and real-world projects.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Thousands of Learners</h2>
          <p className="text-gray-300 mb-8">
            Whether you're upskilling, reskilling, or just exploring—MindSpark is the place to grow.
          </p>
          <a href="/Signup" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2">
            Get Started <ChevronRight size={18} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-gray-300 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} MindSpark. All rights reserved.</p>
      </footer>
    </>
  );
}
