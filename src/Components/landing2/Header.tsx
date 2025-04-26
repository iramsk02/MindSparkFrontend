
"use client";
import React from "react";

export const Header = () => {
  return (
    <header className="flex flex-wrap gap-5 justify-between items-start self-center w-full text-base max-w-[1382px] max-md:max-w-full">
      <nav className="flex flex-wrap gap-10 items-start mt-2.5 max-md:max-w-full">
        <h1 className="font-bold leading-8 text-blue-900 uppercase tracking-[3px]">
          MiCRoLEarn
        </h1>
        <div className="flex gap-10 font-medium text-zinc-900">
          <a href="#courses" className="self-start basis-auto">
            Explore Courses
          </a>
          <a href="#educators" className="leading-6">
            Educators
          </a>
        </div>
      </nav>
      <div className="flex gap-10 font-medium">
        <a href="#login" className="leading-6 text-zinc-900 ">
          Login
        </a>
        <button className="flex flex-col justify-center items-center self-start px-2.5 py-3 text-right text-white bg-blue-900 rounded-xl min-h-[45px]">
          <span className="gap-2.5 self-stretch">Create free account</span>
        </button>
      </div>
    </header>
  );
};
