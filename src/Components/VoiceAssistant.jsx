// import React, { useEffect } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const VoiceAssistant = () => {
//   const commands = [
//     {
//       command: '*',
//       callback: (route) => {
//         if (route === 'dashboard') window.location.href = '/StudentDashboard';
//         else if (route === 'profile') window.location.href = '/StudentProfile';
//         else if (route === 'courses') window.location.href = '/courses';
//       }
//     },
//     {
//       command: 'start lesson',
//       callback: () => alert('Starting lesson...')
//     },
//     {
//       command: 'submit quiz',
//       callback: () => alert('Submitting quiz...')
//     },
//   ];

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition({ commands });

//   useEffect(() => {
//     if (!browserSupportsSpeechRecognition) {
//       alert('Browser does not support voice recognition.');
//     }
    
//   }, []);

//   return (
//     <div className="p-4 rounded-lg shadow bg-gray-100">
//       <button
//         onClick={SpeechRecognition.startListening}
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         🎤 Start Voice Assistant
//       </button>
//       <p className="mt-2 text-sm text-gray-600">
//         {listening ? 'Listening...' : 'Click to start listening'}
//       </p>
//       <p className="text-xs mt-1 text-gray-800">Heard: {transcript}</p>
//     </div>
//   );
// };

// export default VoiceAssistant;
import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceAssistant = () => {
  const keywords = [
    {
      keyword: 'dashboard',
      action: () => window.location.href = '/StudentDashboard',
    },
    {
      keyword: 'profile',
      action: () => window.location.href = '/StudentProfile',
    },
    {
      keyword: 'quiz',
      action: () => window.location.href = '/Quiz',
    },
    {
      keyword: 'leaderboard',
      action: () => window.location.href = '/Leaderboard',
    },
    {
      keyword: 'start lesson',
      action: () => alert('Starting lesson...'),
    },
    {
      keyword: 'submit quiz',
      action: () => alert('Submitting quiz...'),
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert('Browser does not support voice recognition.');
      return;
    }
  }, []);

  useEffect(() => {
    const lowerTranscript = transcript.toLowerCase();

    keywords.forEach(({ keyword, action }) => {
      if (lowerTranscript.includes(keyword)) {
        action();
        resetTranscript(); // prevent multiple calls
      }
    });
  }, [transcript]);

  return (
    <div className="p-4 rounded-lg shadow bg-gray-100">
      <button
        onClick={() => SpeechRecognition.startListening({ continuous: true })}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        🎤 Start Voice Assistant
      </button>
      <p className="mt-2 text-sm text-gray-600">
        {listening ? 'Listening...' : 'Click to start listening'}
      </p>
      <p className="text-xs mt-1 text-gray-800">Heard: {transcript}</p>
    </div>
  );
};

export default VoiceAssistant;
