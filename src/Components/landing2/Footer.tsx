import * as React from "react";
import Logo from "../../icons/Logo";

export const Footer= () => {
  return (

    <footer className="bw-full w-full bg-primary text-white py-8 mt-10 b-0">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      
      {/* Left side: Branding */}
      {/* <div className="text-center md:text-left">
        <h1 className="text-2xl font-bold"><Logo navigateto={""}/> MicroLearn</h1>
        <p className="text-sm text-gray-300 mt-1">Empowering Learners. One Click at a Time.</p>
      </div> */}
<div className="text-center md:text-left flex flex-col items-center md:items-start">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-2">
    <Logo navigateto={"/"} /> MicroLearn
  </h1>
  <p className="text-sm sm:text-base lg:text-lg text-gray-300 mt-1">
    Empowering Learners.
  </p>
</div>

      {/* Right side: Links */}
      <div className="flex space-x-6">
        {/* <a href="/" className="hover:text-gray-300 transition">Home</a> */}
        <a href="Courses" className="hover:text-gray-300 transition">Courses</a>
        <a href="/Instructors" className="hover:text-gray-300 transition">Our Instructors</a>
        <a href="/About" className="hover:text-gray-300 transition">About</a>
        <a href="/Contact" className="hover:text-gray-300 transition">Contact</a>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} MindSpark. All rights reserved.
    </div>
  </div>
</footer>

    
  );
};
