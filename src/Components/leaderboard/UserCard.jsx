import React from "react";

const UserCard = ({
   image,
   name, position, points, 
  //  height: "h-[140px]",
  //     gradient:
  //       "bg-[linear-gradient(182deg,rgba(174,174,174,0.60)_1.54%,rgba(217,217,217,0.60)_134.1%)]",
  }) => {
  return (
    <article className="flex flex-col items-center">
      <div className="flex flex-col gap-1 items-center mb-3">
        <img
          src={image}
          alt={name}
          className="w-[83px] h-[83px] rounded-[210px]"
        />
        <h3 className="text-base font-semibold text-white">{name}</h3>
      </div>
      <div
        // className={`flex relative flex-col items-center bg-[linear-gradient(182deg,rgba(174,174,174,0.60)_1.54%,rgba(217,217,217,0.60)_134.1%)] "h-[140px] rounded-[16.8px_16.8px_0_0] w-[137px]`}
        className={`${position === 1 ? "bg-amber-300 text-center p-2 rounded-t-2xl" : position === 2 ? "bg-amber-600 text-center p-2  rounded-t-2xl" : "bg-amber-200 text-center p-2  rounded-t-2xl"} text-base font-bold text-white`}
     >
        <div
          className={`${position === 1 ? "mt-16 " : position === 2 ? "mt-14" : "mt-6"} text-base font-bold text-white`}
        >
          {position}
        </div>
        <div className="px-2.5 py-0.5 mt-1.5 text-sm font-medium text-black bg-white bg-opacity-30 rounded-[29.5px]">
          {points} Pts
        </div>
      </div>
    </article>
  );
};

export default UserCard;
