import React from "react";
import RankingRow from "./RankingRow";

const LeaderboardTable = () => {
  const rankings = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a8e2afa14cb847c074e3c593b9556fabd16193c7",
      name: "Cody Fisher",
      place: "1",
      points: "1500",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83f634103982c436a99913e40a0751bf8e0edf0f",
      name: "Kathryn Murphy",
      place: "2",
      points: "1200",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e08be9df014f17acf1c5b854bb7714ebf0c8ce95",
      name: "Kristin Watson",
      place: "3",
      points: "500",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d9ef59e46a717bc59488a86b4d66b85b7ef606a2",
      name: "Jerome Bell",
      place: "4",
      points: "300",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a6d6722fe1ba06851f2866666d1c47a2f86e04ce",
      name: "Annette Black",
      place: "5",
      points: "200",
    },
  ];

  return (
    <section className="rounded-lg bg-neutral-700 bg-opacity-50 w-[467px] max-md:w-full">
      <div className="flex">
        <div className="flex-1">
          <div className="px-8 py-4 text-lg font-medium text-white bg-neutral-100 bg-opacity-40 h-[57px] rounded-[8px_0_0_0]">
            Name
          </div>
          {rankings.map((ranking, index) => (
            <RankingRow key={index} {...ranking} />
          ))}
        </div>
        <div className="w-[98px]">
          <div className="text-lg font-medium text-white bg-neutral-100 bg-opacity-40 h-[57px]">
            Place
          </div>
        </div>
        <div className="w-[98px]">
          <div className="text-lg font-medium text-white rounded-none bg-neutral-100 bg-opacity-40 h-[57px]">
            Points
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardTable;
