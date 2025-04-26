"use client";
import * as React from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { Testimonials } from "./Testimonials";
import { Footer } from "./Footer";

export const Landing: React.FC = () => {
  return (
    <main className="flex overflow-hidden flex-col pt-4 bg-white">
      <Header />
      <Hero />
      <Features />
      <section className="overflow-hidden px-20 mt-20 bg-white max-md:px-5 max-md:mt-10 max-md:mr-1.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[39%] max-md:ml-0 max-md:w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dadcddc0774d73d1e228624602c9140252bfe10f?placeholderIfAbsent=true&apiKey=9e21df893bee460abfd2d80f901b69d1"
              alt="Learning progress visualization"
              className="object-contain grow w-full aspect-[1.01] max-md:mt-10 max-md:max-w-full"
            />
          </div>
          <article className="ml-5 w-[61%] max-md:ml-0 max-md:w-full">
            <div className="mt-9 text-4xl font-medium text-black max-md:mt-10 max-md:max-w-full">
              Our Micro-Learning App transforms education into an engaging
              experience with an XP-based progress system.
              <br />
              <br />
              <p className="text-base">
                Track Your Growth – Watch your XP increase as you learn.
              </p>
              <p className="text-base">
                Stay Motivated – Unlock new levels, earn streaks, and collect
                rewards.
              </p>
              <p className="text-base">
                Gamified Learning – Progress at your own pace while making
                education fun!
              </p>
              <br />
              <p className="text-base">
                Keep learning, keep earning XP, and level up your skills!
              </p>
            </div>
          </article>
        </div>
      </section>
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Landing;
