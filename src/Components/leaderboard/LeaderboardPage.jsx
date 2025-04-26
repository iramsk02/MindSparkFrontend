"use client";
import React from "react";
import Header from "../";
import TopPerformers from "./TopPerformers";
import LeaderboardTable from "./LeaderboardTable";

const LeaderboardPage = () => {
  return (
    <main className="p-5 w-full bg-white min-h-[screen]">
      <Header />
      <section className="flex flex-col items-center">
        <TopPerformers />
        <p className="mb-8 text-center">
          <span className="text-xl font-bold text-white">Brook</span>
          <span className="text-base text-neutral-950">
            {" "}
            is on top of the leader board this month
          </span>
        </p>
        <LeaderboardTable />
      </section>
    </main>
  );
};

export default LeaderboardPage;
