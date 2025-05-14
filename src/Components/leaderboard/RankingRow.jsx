// // import React from "react";

// // const RankingRow = ({ image, name, position, points }) => {
// //   return (


// //     <div className="flex">
// //       <div className="flex gap-4 items-center px-8 py-5">
// //         <img
// //           src={image}
// //           alt={name}
// //           className="w-[52px] h-[52px] rounded-[260px]"
// //         />
// //         <div className="text-lg font-medium text-black w-10">{name}</div>
// //       </div>
// //       <div className="w-[98px] text-center ml-7 ">
// //         <div className="text-lg mt-16  text-black h-[93.6px]">{position}</div>
// //       </div>
// //       <div className="w-[98px] text-center ml-15">
// //         <div className="mt-16 ml-10 text-lg text-black h-[93.6px]">{points}</div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RankingRow;
// import React from "react";

// const RankingRow = ({ image, name, position, points }) => {
//   return (
//     <div className="flex flex-wrap items-center text-center justify-between bg-white rounded-lg shadow p-4 mb-4">
//       {/* Avatar and Name */}
//       <div className="flex items-center gap-4 w-full sm:w-1/2 md:w-1/3 ">
//         <img
//           src={image}
//           alt={name}
//           className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full object-cover"
//         />
//         <div className="text-base sm:text-lg font-medium text-black">{name}</div>
//       </div>

//       {/* Position */}
//       <div className="w-1/2 sm:w-1/4 mt-2 sm:mt-0 text-center">
//         <div className="text-base sm:text-lg font-semibold text-black">{position}</div>
//         <div className="text-sm text-gray-500">Position</div>
//       </div>

//       {/* Points */}
//       <div className="w-1/2 sm:w-1/4 mt-2 sm:mt-0 text-center">
//         <div className="text-base sm:text-lg font-semibold text-black">{points}</div>
//         <div className="text-sm text-gray-500">Points</div>
//       </div>
//     </div>
//   );
// };

// export default RankingRow;
import React from "react";
import { Trophy, Star } from "lucide-react";

const RankingRow = ({ image, name, position, points }) => {
  // Determine styling based on position
  const getPositionStyle = () => {
    if (position === 1) {
      return {
        badgeColor: "bg-amber-400",
        textColor: "text-amber-800",
        icon: <Trophy size={16} className="text-amber-800" />,
        borderColor: "border-l-amber-400"
      };
    } else if (position === 2) {
      return {
        badgeColor: "bg-gray-300",
        textColor: "text-gray-700",
        icon: <Trophy size={16} className="text-gray-700" />,
        borderColor: "border-l-gray-300"
      };
    } else if (position === 3) {
      return {
        badgeColor: "bg-amber-700",
        textColor: "text-amber-800",
        icon: <Trophy size={16} className="text-amber-800" />,
        borderColor: "border-l-amber-700"
      };
    } else {
      return {
        badgeColor: "bg-gray-100",
        textColor: "text-gray-600",
        icon: <Star size={16} className="text-gray-600" />,
        borderColor: "border-l-gray-200"
      };
    }
  };

  const style = getPositionStyle();

  return (
    <div className="flex flex-wrap items-center justify-between bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow transition-all duration-300 p-4 mb-4 border-l-4 group overflow-hidden relative" style={{ borderLeftColor: position <= 3 ? "" : "transparent" }}>
      {/* Position indicator for top 3 with colored left border */}
      {position <= 3 && (
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.borderColor}`}></div>
      )}
      
      {/* Hover effect background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content wrapper */}
      <div className="flex items-center gap-4 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 relative z-10">
        {/* Position badge */}
        <div className={`flex items-center justify-center ${style.badgeColor} w-8 h-8 rounded-full ${style.textColor} font-bold text-sm`}>
          {position}
        </div>
        
        {/* Avatar with subtle border effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary bg-opacity-20 rounded-full animate-pulse" style={{animationDuration: '3s'}}></div>
          <img
            src={image}
            alt={name}
            className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full object-cover border-2 border-gray-200 group-hover:border-primary transition-colors duration-300 relative z-10"
          />
        </div>
        
        {/* Name with hover effect */}
        <div className="text-base sm:text-lg font-medium text-gray-800 group-hover:text-primary transition-colors duration-300 truncate max-w-[150px] sm:max-w-[200px]">
          {name}
        </div>
      </div>

      {/* Points section */}
      <div className="w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 mt-2 sm:mt-0 text-center relative z-10">
        <div className="inline-flex items-center gap-1">
          <div className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
            {points}
          </div>
          <span className="text-xs font-medium text-gray-500">XP</span>
        </div>
        
        {/* XP progress bar - visual representation of points */}
        <div className="w-full bg-gray-100 rounded-full h-1 mt-2">
          <div 
            className="bg-primary bg-opacity-70 h-1 rounded-full group-hover:bg-opacity-100 transition-all duration-300"
            style={{ width: `${Math.min(100, points / 10)}%` }} // Scale points to percentage (capped at 100%)
          ></div>
        </div>
      </div>

      {/* Achievement icon section */}
      <div className="w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 mt-2 sm:mt-0 text-center relative z-10">
        <div className="flex justify-center items-center gap-1">
          {style.icon}
          <div className="text-sm font-medium">
            {position === 1 ? (
              <span className="text-amber-800">1st Place</span>
            ) : position === 2 ? (
              <span className="text-gray-700">2nd Place</span>
            ) : position === 3 ? (
              <span className="text-amber-800">3rd Place</span>
            ) : (
              <span className="text-gray-600">Rank {position}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingRow;