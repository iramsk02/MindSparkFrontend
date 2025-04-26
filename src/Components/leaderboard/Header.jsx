import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-10">
      <h1 className="text-base font-bold leading-8 text-blue-900 uppercase tracking-[3px]">
        MicroLearn
      </h1>
      <nav className="flex gap-10 items-center">
        <a href="#" className="text-base font-medium leading-6 text-zinc-900">
          Quiz
        </a>
        <button className="gap-2.5 p-4 text-base font-medium leading-6 text-white bg-blue-900 rounded-xl">
          Profile
        </button>
      </nav>
    </header>
  );
};

export default Header;
