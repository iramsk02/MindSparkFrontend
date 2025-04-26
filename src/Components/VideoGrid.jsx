import VideoCard from "./VideoCard"

export default function VideoGrid({ videos }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
      {/* <VoiceAssistant courses={videos} /> */}

      {videos?.map(video => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// export function VoiceAssistant({ courses = [] }) {
//   // const wakeWord = 'hey brain';
//   // const [wakeHeard, setWakeHeard] = useState(false);
//   const navigateTo = useNavigate()

//   const keywords = [
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
//     {
//       keyword: 'dashboard',
//       action: () => navigateTo('/StudentDashboard'),
//     },
//   ];

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   // const navigateTo = (path) => {
//   //   speak(`Opening ${path.replace('/', '')}`);
//   //   window.location.href = path;
//   // };

//   // const speak = (message) => {
//   //   const synth = window.speechSynthesis;
//   //   const utter = new SpeechSynthesisUtterance(message);
//   //   synth.speak(utter);
//   // };

//   useEffect(() => {
//     if (!browserSupportsSpeechRecognition) {
//       alert('Browser does not support speech recognition.');
//       return;
//     }

//     // Start listening on mount
//     SpeechRecognition.startListening({ continuous: true });

//     // Keep listening if it stops
//     const interval = setInterval(() => {
//       if (!listening) {
//         SpeechRecognition.startListening({ continuous: true });
//       }
//     }, 2000); // check every 2 seconds

//     return () => clearInterval(interval); // clean up on unmount
//   }, [listening]);

//   useEffect(() => {
//     const lowerTranscript = transcript.toLowerCase();

//     // Wake word detection
//     // if (!wakeHeard && lowerTranscript.includes(wakeWord)) {
//     //   setWakeHeard(true);
//     //   speak('Yes, how can I help you?');
//     //   resetTranscript();
//     //   return;
//     // }

//     // Only act if wake word was heard
//     // if (wakeHeard) {
//     let commandDetected = false;

//     // Handle fixed keyword routes
//     keywords.forEach(({ keyword, action }) => {
//       if (lowerTranscript.includes(keyword)) {
//         action();
//         commandDetected = true;
//       }
//     }
//     );

//     // Start lesson if "start" + partial title is matched
//     if (lowerTranscript.includes('start')) {
//       const matchedLesson = courses.find((lesson) => {
//         const title = lesson.title.toLowerCase();
//         const words = title.split(' ').filter(word => word.length > 4); // ignore short/common words
//         return words.some(word => lowerTranscript.includes(word));
//       });

//       if (matchedLesson) {
//         // speak(`Starting lesson: ${matchedLesson.title}`);
//         // window.location.href = `/lesson/${matchedLesson._id}`;
//         // navigateTo(`/lesson/${matchedLesson._id}`, { state: { video: matchedLesson.videoUrl, title: matchedLesson.title, description: matchedLesson.description } });
//         navigateTo(`/lesson/${matchedLesson._id}`, {
//           state: {
//             video: matchedLesson,
//           },
//         });
        

//         // window.location.href = `/lesson/${matchedLesson._id}`;
//         commandDetected = true;
//       }
//     }

//     if (commandDetected) {
//       resetTranscript();
//       // setWakeHeard(false);
//     }
//     // }
//   }, [transcript]);

//   return (
//     <div className="p-4 rounded-lg shadow bg-gray-100 max-w-70">
//       <p className="mt-2 text-sm text-gray-600">
//         {listening ? '🎤 Voice Assistant Listening...' : 'Voice Assistant Idle'}
//       </p>
//       <p className="text-xs mt-1 text-gray-800">Heard: {transcript}</p>
//     </div>
//   );
// }
