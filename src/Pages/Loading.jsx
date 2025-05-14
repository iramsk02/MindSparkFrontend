import React from "react";

export default function LoadingScreen() {
    return (
        <div className="flex w-full flex-col items-center justify-center min-h-screen bg-blue-50 text-blue-700 px-4">
            {/* Simple icon */}
            <div className="text-5xl mb-4 text-blue-500">⏳</div>

            {/* Clean text */}
            <h1 className="text-xl md:text-2xl font-medium text-center text-blue-700">
                Loading your content
            </h1>

            {/* Subtle loading indicator */}
            <div className="mt-6 relative h-1 w-48 bg-blue-100 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-blue-500 w-1/3 rounded-full animate-pulse"></div>
            </div>

            {/* Simple message */}
            <p className="mt-4 text-sm text-blue-400 text-center">
                Just a moment please
            </p>
        </div>
    );
}