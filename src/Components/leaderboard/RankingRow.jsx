// import React from "react";

// const RankingRow = ({ image, name, position, points }) => {
//   return (


//     <div className="flex">
//       <div className="flex gap-4 items-center px-8 py-5">
//         <img
//           src={image}
//           alt={name}
//           className="w-[52px] h-[52px] rounded-[260px]"
//         />
//         <div className="text-lg font-medium text-black w-10">{name}</div>
//       </div>
//       <div className="w-[98px] text-center ml-7 ">
//         <div className="text-lg mt-16  text-black h-[93.6px]">{position}</div>
//       </div>
//       <div className="w-[98px] text-center ml-15">
//         <div className="mt-16 ml-10 text-lg text-black h-[93.6px]">{points}</div>
//       </div>
//     </div>
//   );
// };

// export default RankingRow;
import React from "react";

const RankingRow = ({ image, name, position, points }) => {
  return (
    <div className="flex flex-wrap items-center text-center justify-between bg-white rounded-lg shadow p-4 mb-4">
      {/* Avatar and Name */}
      <div className="flex items-center gap-4 w-full sm:w-1/2 md:w-1/3 ">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full object-cover"
        />
        <div className="text-base sm:text-lg font-medium text-black">{name}</div>
      </div>

      {/* Position */}
      <div className="w-1/2 sm:w-1/4 mt-2 sm:mt-0 text-center">
        <div className="text-base sm:text-lg font-semibold text-black">{position}</div>
        <div className="text-sm text-gray-500">Position</div>
      </div>

      {/* Points */}
      <div className="w-1/2 sm:w-1/4 mt-2 sm:mt-0 text-center">
        <div className="text-base sm:text-lg font-semibold text-black">{points}</div>
        <div className="text-sm text-gray-500">Points</div>
      </div>
    </div>
  );
};

export default RankingRow;
