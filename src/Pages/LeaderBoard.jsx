import React, { useState, useEffect } from "react";
import UserCard from "../Components/leaderboard/UserCard";
import RankingRow from "../Components/leaderboard/RankingRow";
import Logo from "../icons/Logo";
import LoadingScreen from "./Loading";
import { Menu, X } from "lucide-react"; // lucide-react for icons
import Home from "../icons/Home";


export default function LeaderBoard() {
  const [leaders, setLeaders] = useState([]);
  const [topPerformer, settopPerformer] = useState("");
  const role = localStorage.getItem("role");
  const avatar = localStorage.getItem("avatar");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/progress/leaderboard", {
        // const res = await fetch("https://micro-learn-backend.onrender.com/api/progress/leaderboard", {
          headers: { Authorization: token },
        });

        const data = await res.json();
        console.log(data);
        setLeaders(data.leaderboard);
        settopPerformer(data.leaderboard[0]?.name);
      } catch (error) {
        alert("Failed to fetch");
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
    fetchLeaders();
  }, []);
  if (loading) return <LoadingScreen />; //  use loading screen here

  return (
    <>
      <main className="w-full bg-white min-h-screen">

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
              {/* <a href="/StudentDashboard" className="hover:text-white transition">Home</a> */}
              <a href="/Quiz" className="hover:text-white transition">Quiz</a>
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
              <a href="/Quiz" className="hover:text-white transition">Quiz</a>
              <a href="/StudentProfile" className="hover:text-white transition">Profile</a>
            </div>
          )}
        </nav>

        <section className="px-4 sm:px-6 lg:px-8 pt-28 flex flex-col items-center gap-8">
          <div>
            {/* <div><VoiceAssistant /></div> */}
            <section className="flex flex-wrap justify-center items-end gap-x-6 gap-y-8 mb-6">
              {leaders.map((leader, index) =>
                index < 3 ? (
                  <UserCard
                    key={index}
                    name={leader.name}
                    position={index + 1}
                    points={leader.xp}
                    image={leader.avatar}
                  />
                ) : null
              )}
            </section>
          </div>

          <p className="mb-6 text-center h-20">
            <span className="text-xl font-bold text-black">{topPerformer}</span>
            <span className="text-base text-neutral-950"> is on top of the leaderboard this month</span>
          </p>



          <div className="w-full max-w-md sm:max-w-2xl md:max-w-3xl">
            <section className="rounded-xl bg-neutral-700 bg-opacity-50 w-full">
              <div className="flex flex-col">
                <div className="px-6 sm:px-8 py-4 text-lg font-medium text-white bg-neutral-500 bg-opacity-40 h-[57px] rounded-t-lg flex justify-between">
                  <div>Name</div>
                  <div>Rank</div>
                  <div>XP</div>
                </div>
                <div className="m-5">
                  {leaders.map((leader, index) => (
                    <RankingRow
                      key={index}
                      name={leader.name}
                      points={leader.xp}
                      position={index + 1}
                      image={leader.avatar}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}



// // import { useSpeechRecognition } from 'react-speech-recognition';
// import {  useRef} from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// export function VoiceAssistant({ courses = [] }) {
//   const wakeWord = 'hey brain';
//   const [wakeHeard, setWakeHeard] = useState(false);

//   const keywords = [
//     {
//       // keyword: 'dashboard',
//       // action: () => navigateTo('/StudentDashboard'),
//     },
//     {
//       keyword: 'profile',
//       action: () => navigateTo('/StudentProfile'),
//     },
//     {
//       keyword: 'quiz',
//       action: () => navigateTo('/Quiz'),
//     },
//     {
//       keyword: 'leaderboard',
//       action: () => navigateTo('/Leaderboard'),
//     },
//   ];

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   const navigateTo = (path) => {
//     speak(`Opening ${path.replace('/', '')}`);
//     window.location.href = path;
//   };

//   const speak = (message) => {
//     const synth = window.speechSynthesis;
//     const utter = new SpeechSynthesisUtterance(message);
//     synth.speak(utter);
//   };

//   useEffect(() => {
//     if (!browserSupportsSpeechRecognition) {
//       alert('Browser does not support speech recognition.');
//       return;
//     }

//     // Start listening continuously
//     SpeechRecognition.startListening({ continuous: true });
//   }, []);

//   useEffect(() => {
//     const lowerTranscript = transcript.toLowerCase();

//     if (!wakeHeard && lowerTranscript.includes(wakeWord)) {
//       setWakeHeard(true);
//       speak('Yes, how can I help you?');
//       resetTranscript(); // clear after detecting wake word
//       return;
//     }

//     if (wakeHeard) {
//       let commandDetected = false;

//       keywords.forEach(({ keyword, action }) => {
//         if (lowerTranscript.includes(keyword)) {
//           action();
//           commandDetected = true;
//         }
//       });

//       // Match lesson title
//       if (lowerTranscript.includes('start')) {
//         alert("hhhi")
//         const matchedLesson = courses.find(lesson =>
//           lowerTranscript.includes(lesson.title.toLowerCase())
//         );

//         if (matchedLesson) {
//           speak(`Starting lesson: ${matchedLesson.title}`);
//           window.location.href = `/lesson/${matchedLesson._id}`;
//           commandDetected = true;
//         }
//       }

//       if (commandDetected) {
//         resetTranscript(); // clear after processing command
//         setWakeHeard(false); // reset wake word detection
//       }
//     }
//   }, [transcript]);

//   return (
//     <div className="p-4 rounded-lg shadow bg-gray-100 max-w-70">
//       <p className="mt-2 text-sm text-gray-600">
//         {listening ? '🎤 Voice Assistant Listening...' : 'Click to start listening'}
//       </p>
//       <p className="text-xs mt-1 text-gray-800">Heard: {transcript}</p>
//     </div>
//   );
// }


// import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Fuse from 'fuse.js';

export function VoiceAssistant() {
  const wakeWord = 'hey brain';
  const [wakeHeard, setWakeHeard] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const navigateTo = (path) => {
    speak(`Opening ${path.replace('/', '')}`);
    window.location.href = path;
  };

  const speak = (message) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(message);
    synth.speak(utter);
  };

  const keywords = [
    {
      keyword: 'profile',
      action: () => navigateTo('/StudentProfile'),
    },
    {
      keyword: 'quiz',
      action: () => navigateTo('/Quiz'),
    },
    {
      keyword: 'leaderboard',
      action: () => navigateTo('/Leaderboard'),
    },
    {
      keyword: 'dashboard',
      action: () => navigateTo('/StudentDashboard'),
    },
  ];

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert('Browser does not support speech recognition.');
      return;
    }

    // Start listening continuously
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  useEffect(() => {
    const lowerTranscript = transcript.toLowerCase();

    // Step 1: Detect wake word
    if (!wakeHeard && lowerTranscript.includes(wakeWord)) {
      setWakeHeard(true);
      speak('Yes, how can I help you?');
      resetTranscript();
      return;
    }

    // Step 2: Handle commands only if wake word was detected
    if (wakeHeard) {
      let commandDetected = false;

      // Handle navigation keywords
      for (const { keyword, action } of keywords) {
        if (lowerTranscript.includes(keyword)) {
          action();
          commandDetected = true;
          break;
        }
      }

     

      if (commandDetected) {
        resetTranscript();
        setWakeHeard(false); // reset for next wake word
      }
    }
  }, [transcript]);

  return (
    <div className="p-4 rounded-lg shadow bg-gray-100 max-w-70">
      <p className="mt-2 text-sm text-gray-600">
        {listening ? '🎤 Voice Assistant Listening...' : 'Click to start listening'}
      </p>
      <p className="text-xs mt-1 text-gray-800">Heard: {transcript}</p>
    </div>
  );
}
