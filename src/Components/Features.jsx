

import Cards from "./cards";




export default function Features() {
    return (
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Smarter Learning with AI-Powered Features 🚀
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          <Cards c1="Short Descriptive Lectures" c2="Bite-sized, structured lessons designed for quick learning and easy retention." />
          <Cards c1="AI Recommendations" c2="Get personalized suggestions based on your progress and learning style." />
          <Cards c1="Knowledge Checks" c2="Interactive quizzes and flashcards to reinforce learning instantly." />
          <Cards c1="Progress Tracking" c2="Real-time stats and insights to monitor your learning journey." />
          <Cards c1="Gamification & XP" c2="Earn badges, streaks, and leaderboard ranks to stay motivated!" />
          <Cards c1="Live Chat & Discussions" c2="Connect with learners and instructors in real-time." />
        </div>
      </section>
    );
  }
  