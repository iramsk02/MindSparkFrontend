import { useEffect, useState } from "react";
import Achivement from "../Components/Achievements";
import Features from "../Components/Features";
import { Hero } from "../Components/landing2/Hero";
import { Testimonials } from "../Components/landing2/Testimonials";
import { Footer } from "../Components/landing2/Footer";
import Logo from "../icons/Logo";
import LoadingScreen from "./Loading";
// import {useState} from "react";
import {Menu, X} from "lucide-react"; // lucide-react for icons
// import Logo from "./Logo"; // assuming your Logo component is here

export default function Landing() {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <>
     

     

      <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Logo navigateto={"/"} />
            <div className="font-bold text-xl">MindSpark</div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-gray-300 text-md">
            <a href="/Instructors" className="hover:text-white transition">Our Instructors</a>
            <a href="/Courses" className="hover:text-white transition">Explore Courses</a>
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

      {/* 
            <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
              <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                  <Logo navigateto={"/"} />
                  <span className="font-bold text-xl">MicroLearn</span>
                </div>
                <nav className="flex gap-4 text-gray-300 text-md">
                  <a href="/Instructors" className="hover:text-white transition">Our Instructors</a>
                  <a href="/Courses" className="hover:text-white transition">Courses</a>
                  <a href="/Signup" className="hover:text-white transition">Sign Up</a>
                  <a href="/Signin" className="hover:text-white transition">Sign In</a>
                </nav>
              </div>
            </nav>
       */}

      {/* Content */}
      <main className="pt-24">
        <Hero />
        <Features />
        <Achivement />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
