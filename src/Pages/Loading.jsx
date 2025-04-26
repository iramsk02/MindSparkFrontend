import React from "react";

export default function LoadingScreen() {
    return (
        <div className="flex w-full flex-col items-center justify-center min-h-screen bg-black text-white px-4">
            {/* Animated emoji */}
            <div className="text-6xl md:text-7xl animate-bounce mb-6">🌙</div>

            {/* Glowing text */}
            <h1 className="text-2xl md:text-3xl font-semibold text-center animate-pulse text-slate-100">
                Loading your cozy space...
            </h1>

            {/* Animated dots */}
            <div className="mt-6 flex items-center justify-center space-x-2">
                <span className="w-3 h-3 bg-white rounded-full animate-ping" />
                <span className="w-3 h-3 bg-white rounded-full animate-ping delay-150" />
                <span className="w-3 h-3 bg-white rounded-full animate-ping delay-300" />
            </div>

            {/* Optional message for slower connections */}
            <p className="mt-4 text-sm text-gray-400 text-center max-w-xs">
                Hang tight, we’re getting everything ready just for you 🌟
            </p>
        </div>
    );
}
