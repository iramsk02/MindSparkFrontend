
// import { useNavigate } from "react-router-dom";
// import { FaBrain, FaStar } from "react-icons/fa";
// import Button from "./Button";

// export default function QuizCard({ category, xpReward, id }) {
//   const navigate = useNavigate();

//   return (
//     <div className="h-45 bg-gradient-to-br from-indigo-900 to-blue-800 text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-6 w-full max-w-sm m-auto flex flex-col justify-between gap-4">

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h3 className="sm:text-xs text-sm font-bold tracking-wide uppercase text-blue-100 flex items-center gap-2">
//           <FaBrain className="text-yellow-400" />
//           {category}
//         </h3>

//         {/* XP Badge */}
//         <div className="bg-yellow-400 text-blue-900 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-2 shadow-md">
//           <FaStar /> {xpReward} XP
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-blue-400 opacity-20"></div>

//       {/* Call to Action */}
//       <div className="flex justify-end">
//         <button
//           onClick={() => navigate(`/TakeQuiz/${id}`)}
//           className="bg-yellow-400 text-blue-900 font-semibold px-5 py-2 rounded-full hover:bg-yellow-300 transition duration-300 shadow-sm"
//         >
//           Take Quiz
//         </button>
//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import { FaBrain, FaStar } from "react-icons/fa";

export default function QuizCard({ category, xpReward, id }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-blue-800 text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-4 sm:p-6 w-full max-w-sm sm:max-w-xs md:max-w-sm m-auto flex flex-col justify-between gap-4 min-h-[200px]">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs sm:text-sm font-bold tracking-wide uppercase text-blue-100 flex items-center gap-2">
          <FaBrain className="text-yellow-400 text-base sm:text-lg" />
          {category}
        </h3>

        {/* XP Badge */}
      
      </div>
      
        <div className="bg-yellow-400 text-blue-900 font-bold text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 sm:gap-2 shadow-md ">
          <FaStar className="text-[12px] sm:text-sm" /> {xpReward} XP
        </div>

      {/* Divider */}
      <div className="border-t border-blue-400 opacity-20"></div>

      {/* Call to Action */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate(`/TakeQuiz/${id}`)}
          className="bg-yellow-400 text-blue-900 font-semibold text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-full hover:bg-yellow-300 transition duration-300 shadow-sm"
        >
          Take Quiz
        </button>
      </div>
    </div>
  );
}
