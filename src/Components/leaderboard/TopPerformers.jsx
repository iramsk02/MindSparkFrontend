import React from "react";
import UserCard from "./UserCard";

const TopPerformers = ({position,name,points}) => {
  const performers = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83f634103982c436a99913e40a0751bf8e0edf0f",
      name: "Kathryn Murphy",
      position: "2nd",
      points: "1200",
      height: "h-[140px]",
      gradient:
        "bg-[linear-gradient(182deg,rgba(174,174,174,0.60)_1.54%,rgba(217,217,217,0.60)_134.1%)]",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/5ab84c75e20c4e98f9f20e4dcdc536361d158560",
      name: "Cody Fisher",
      position: "1st",
      points: "1500",
      height: "h-[179px]",
      gradient:
        "bg-[linear-gradient(180deg,rgba(217,185,2,0.80)_0%,rgba(245,229,135,0.80)_123.82%)]",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e08be9df014f17acf1c5b854bb7714ebf0c8ce95",
      name: "Kristin Watson",
      position: "3rd",
      points: "500",
      height: "h-[94px]",
      gradient:
        "bg-[linear-gradient(176deg,rgba(189,90,20,0.50)_3.17%,rgba(220,197,181,0.50)_174.03%)]",
    },
  ];

  return (
    <section className="flex gap-4 justify-center items-end mb-8">
      {performers.map((performer, index) => (
        <UserCard key={index} {...performer} />
      ))}
    </section>
  );
};

export default TopPerformers;
