
import { Sparkles } from "lucide-react"; // Add any icon you like

export default function Cards({ c1, c2 }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 hover:-translate-y-2 transition-transform border border-gray-200 text-center">
      <div className="text-indigo-600 text-5xl mb-4 mx-auto">
        <Sparkles />
      </div>
      <h3 className="text-xl font-bold text-gray-800">{c1}</h3>
      <p className="mt-3 text-gray-600 text-sm">{c2}</p>
    </div>
  );
}
