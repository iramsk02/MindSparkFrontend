// "use client";
// import * as React from "react";

// export const AuthToggle = () => {
//   const [selectedRole, setSelectedRole] =
//     "student" | "educator"
//   ("student");

//   return (
//     <div className="flex gap-2.5 mb-3">
//       <button
//         onClick={() => setSelectedRole("student")}
//         className={`flex-1 text-base rounded-lg h-[46px] text-zinc-600 ${
//           selectedRole === "student"
//             ? "bg-zinc-300"
//             : "bg-white border border-zinc-200"
//         }`}
//       >
//         Student
//       </button>
//       <button
//         onClick={() => setSelectedRole("educator")}
//         className={`flex-1 text-base rounded-lg h-[46px] text-zinc-600 ${
//           selectedRole === "educator"
//             ? "bg-zinc-300"
//             : "bg-white border border-zinc-200"
//         }`}
//       >
//         Educator
//       </button>
//     </div>
//   );
// };

"use client";
import React, { useState } from "react";

export const AuthToggle = () => {
  const [selectedRole, setSelectedRole] = useState("student");

  return (
    <div className="flex gap-2 mb-3">
      <button
        onClick={() => setSelectedRole("student")}
        className={`flex-1 text-base rounded-lg h-[46px] text-zinc-600 ${
          selectedRole === "student"
            ? "bg-zinc-300"
            : "bg-white border border-zinc-200"
        }`}
      >
        Student
      </button>
      <button
        onClick={() => setSelectedRole("educator")}
        className={`flex-1 text-base rounded-lg h-[46px] text-zinc-600 ${
          selectedRole === "educator"
            ? "bg-zinc-300"
            : "bg-white border border-zinc-200"
        }`}
      >
        Educator
      </button>
    </div>
  );
};

