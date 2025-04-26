// src/utils/speech.ts
export default function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // You can change to 'hi-IN', etc.
    window.speechSynthesis.speak(utterance);
  };
  