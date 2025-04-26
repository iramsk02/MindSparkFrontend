import * as React from "react";

export const Features: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col items-center px-14 pt-14 pb-36 mt-32 w-full bg-white max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:mr-0.5 max-md:max-w-full">
      <h2 className="text-6xl font-black text-center text-black max-md:max-w-full max-md:text-4xl">
        Achievements Unlocked
      </h2>
      <p className="mt-3.5 text-3xl font-extralight text-center text-black max-md:max-w-full">
        Earn Rewards, Track Your Progress and level up your skills with our
        innovative micro-learning appp
      </p>
      <div className="self-stretch mt-28 -mb-7 max-md:mt-10 max-md:mb-2.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <article className="w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center px-2.5 py-12 mt-1 w-full bg-indigo-800 rounded-3xl max-md:mt-9 max-md:max-w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6225e0cc3ef67ba03393637ccef4f1f3a22b8c3d?placeholderIfAbsent=true&apiKey=9e21df893bee460abfd2d80f901b69d1"
                alt="Achievement feature 1"
                className="object-contain w-full aspect-[1.04]"
              />
            </div>
          </article>
          <article className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="px-2 pt-14 pb-9 w-full bg-indigo-800 rounded-3xl max-md:mt-8 max-md:max-w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/823e623a72ff6c2ca32bbe77a7ee925970673e84?placeholderIfAbsent=true&apiKey=9e21df893bee460abfd2d80f901b69d1"
                alt="Achievement feature 2"
                className="object-contain w-full aspect-[1.07]"
              />
            </div>
          </article>
          <article className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="px-1 pt-14 pb-9 w-full bg-indigo-800 rounded-3xl max-md:mt-8 max-md:max-w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/67ae068e7ea735ab74d1d270932a1eb5a047f1f5?placeholderIfAbsent=true&apiKey=9e21df893bee460abfd2d80f901b69d1"
                alt="Achievement feature 3"
                className="object-contain w-full aspect-[1.08]"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
