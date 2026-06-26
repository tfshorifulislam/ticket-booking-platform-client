import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="flex flex-col items-center gap-5">

        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-emerald-200 dark:border-emerald-900"></div>

          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-emerald-600 dark:border-t-emerald-400 animate-spin"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Loading...
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
            Please wait a moment
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-bounce"></span>
          <span
            className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>

      </div>
    </div>
  );
};

export default Loading;