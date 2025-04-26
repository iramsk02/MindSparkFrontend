import * as React from "react";

export const Testimonials: React.FC = () => {
  return (

    <section className="bg-white px-6 py-12 w-full top-10">
  <div className="max-w-7xl mx-auto">
    <p className="text-blue-600 text-center font-semibold mb-2 hover:text-blue-900 transition">
      3900+ Happy Users
    </p>
    <h2 className="text-4xl md:text-5xl font-semibold text-center text-gray-900 leading-tight mb-12">
      Don’t just take our word for it
    </h2>

    <div className="grid gap-10 md:grid-cols-3">
      {/* Testimonial 1 */}
      <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4104a7d19a538c457ba353d8f2a4a49463c2d7c8?placeholderIfAbsent=true&apiKey=9e21df893bee460abfd2d80f901b69d1"
          alt="User 1"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <blockquote className="text-lg text-gray-700 italic mb-4">
          "Amazing experience! The platform is super smooth and reliable."
        </blockquote>
        <cite className="text-sm font-semibold text-gray-900">Jenny Wilson</cite>
      </div>

      {/* Testimonial 2 */}
      <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0879fc7cdb9266b064d51f13b3439f356978655?placeholderIfAbsent=true&apiKey=9e21df893bee460abfd2d80f901b69d1"
          alt="User 2"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <blockquote className="text-lg text-gray-700 italic mb-4">
          "Helped us scale our learning process easily. Highly recommended!"
        </blockquote>
        <div className="text-sm text-gray-900 font-semibold">Grower.io</div>
      </div>

      {/* Testimonial 3 */}
      <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
        <img
          src="https://randomuser.me/api/portraits/men/45.jpg"
          alt="User 3"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <blockquote className="text-lg text-gray-700 italic mb-4">
          "A user-friendly platform that actually delivers what it promises!"
        </blockquote>
        <div className="text-sm font-semibold text-gray-900">Devon Lane</div>
        <div className="text-sm text-slate-500">DLDesign.co</div>
      </div>
    </div>
  </div>
</section>

    
  );
};
