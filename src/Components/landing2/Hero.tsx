
import * as React from "react";
import Lottie from "lottie-react";
import AnimatedTextUnderlign from "../AnimatedText";
// import learningAnimation from "../../assets/animations/learning.json"; // ✅ Adjust path if needed

export const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 py-24 px-6 text-white animate-fadeIn">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">

        {/* Left content */}
        <div className="w-full text-center md:text-left">
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
            {/* Headline and Description */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight drop-shadow-xl">
                Learn Smart.<br />
                Grow Fast. <br />
                Stay Ahead.
              </h1>

              <p className="mt-6 text-lg sm:text-2xl font-light max-w-md leading-relaxed mx-auto sm:mx-0">
                Bite-sized courses, real-time progress tracking, and AI-powered learning—all in one platform.
              </p>
            </div>

            {/* Animated Text on Right Side */}
            <div className="mt-6 sm:mt-0">
              <AnimatedTextUnderlign />
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <a
              href="/Courses"
              className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:scale-105 transition"
              aria-label="Explore available courses"
            >
              Explore Courses
            </a>
            <a
              href="/Signup"
              className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-purple-600 transition"
              aria-label="Join the platform for free"
            >
              Join for Free
            </a>
          </div>
        </div>

        {/* Right animation */}
        {/* <div className="w-full max-w-md">
          <Lottie animationData={learningAnimation} loop={true} />
        </div> */}
      </div>
    </section>
  );
};
