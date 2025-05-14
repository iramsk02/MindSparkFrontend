// import React from "react";
// import RankingRow from "./RankingRow";

// const LeaderboardTable = () => {
//   const rankings = [
//     {
//       image:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/a8e2afa14cb847c074e3c593b9556fabd16193c7",
//       name: "Cody Fisher",
//       place: "1",
//       points: "1500",
//     },
//     {
//       image:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/83f634103982c436a99913e40a0751bf8e0edf0f",
//       name: "Kathryn Murphy",
//       place: "2",
//       points: "1200",
//     },
//     {
//       image:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/e08be9df014f17acf1c5b854bb7714ebf0c8ce95",
//       name: "Kristin Watson",
//       place: "3",
//       points: "500",
//     },
//     {
//       image:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/d9ef59e46a717bc59488a86b4d66b85b7ef606a2",
//       name: "Jerome Bell",
//       place: "4",
//       points: "300",
//     },
//     {
//       image:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/a6d6722fe1ba06851f2866666d1c47a2f86e04ce",
//       name: "Annette Black",
//       place: "5",
//       points: "200",
//     },
//   ];

//   return (
//     <section className="rounded-lg bg-neutral-700 bg-opacity-50 w-[467px] max-md:w-full">
//       <div className="flex">
//         <div className="flex-1">
//           <div className="px-8 py-4 text-lg font-medium text-white bg-neutral-100 bg-opacity-40 h-[57px] rounded-[8px_0_0_0]">
//             Name
//           </div>
//           {rankings.map((ranking, index) => (
//             <RankingRow key={index} {...ranking} />
//           ))}
//         </div>
//         <div className="w-[98px]">
//           <div className="text-lg font-medium text-white bg-neutral-100 bg-opacity-40 h-[57px]">
//             Place
//           </div>
//         </div>
//         <div className="w-[98px]">
//           <div className="text-lg font-medium text-white rounded-none bg-neutral-100 bg-opacity-40 h-[57px]">
//             Points
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LeaderboardTable;


import React, { useState, useEffect } from "react";
import { Award, TrendingUp, Users } from "lucide-react";
import RankingRow from "./RankingRow";

const LeaderboardTable = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  // Sample data
  const rankings = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a8e2afa14cb847c074e3c593b9556fabd16193c7",
      name: "Cody Fisher",
      position: 1,
      points: 1500,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83f634103982c436a99913e40a0751bf8e0edf0f",
      name: "Kathryn Murphy",
      position: 2,
      points: 1200,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e08be9df014f17acf1c5b854bb7714ebf0c8ce95",
      name: "Kristin Watson",
      position: 3,
      points: 500,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d9ef59e46a717bc59488a86b4d66b85b7ef606a2",
      name: "Jerome Bell",
      position: 4,
      points: 300,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a6d6722fe1ba06851f2866666d1c47a2f86e04ce",
      name: "Annette Black",
      position: 5,
      points: 200,
    },
  ];

  // Trigger animation after component mount
  useEffect(() => {
    setTimeout(() => setShowAnimation(true), 200);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Award size={24} className="text-primary" />
          <h2 className="text-xl font-bold text-gray-800">Top Performers</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={18} className="text-gray-500" />
          <span>{rankings.length} Participants</span>
        </div>
      </div>
      
      {/* Main leaderboard container with animation */}
      <div className={`rounded-xl overflow-hidden bg-white shadow-lg transition-all duration-500 transform ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* Header row */}
        <div className="bg-primary text-white">
          <div className="grid grid-cols-12 items-center py-4 px-6">
            <div className="col-span-1 text-center font-medium">#</div>
            <div className="col-span-6 sm:col-span-7 font-medium flex items-center gap-2">
              <Users size={16} />
              <span>Name</span>
            </div>
            <div className="col-span-5 sm:col-span-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center font-medium flex items-center justify-center gap-1">
                  <Award size={16} />
                  <span className="hidden sm:inline">Rank</span>
                </div>
                <div className="text-center font-medium flex items-center justify-center gap-1">
                  <TrendingUp size={16} />
                  <span className="hidden sm:inline">Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Rankings with staggered animation */}
        <div className="divide-y divide-gray-100">
          {rankings.map((ranking, index) => (
            <div 
              key={index} 
              className={`transition-all duration-500 transform ${showAnimation ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <RankingRow 
                image={ranking.image}
                name={ranking.name}
                position={ranking.position}
                points={ranking.points}
              />
            </div>
          ))}
        </div>
        
        {/* Footer with stats */}
        <div className="bg-gray-50 px-6 py-4 text-sm text-gray-600 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-medium">Total XP: </span>
            <span>{rankings.reduce((sum, item) => sum + item.points, 0).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">Updated recently</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* CSS animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LeaderboardTable;