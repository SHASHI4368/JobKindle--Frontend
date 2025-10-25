import React from 'react'

const loading = () => {
  return (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[200] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Loading spinner */}
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

        {/* Transition text */}
        <div className="text-primary font-semibold text-lg animate-pulse">
          Loading ...
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default loading