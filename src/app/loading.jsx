import React from 'react';

const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>

                <h2 className="text-lg font-semibold text-slate-700">
                    Loading...
                </h2>

                <p className="text-sm text-slate-500">
                    Please wait a moment
                </p>
            </div>
        </div>
    );
};

export default Loading;