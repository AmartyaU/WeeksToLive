import React from 'react';

const HeartbeatCounter = ({ beatsRemaining }) => {
  const formattedBeats = new Intl.NumberFormat('en-US').format(Math.floor(beatsRemaining));

  return (
    <div className="group flex flex-col items-center justify-center p-4 bg-white rounded-2xl border-zinc-100 h-full">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-20 h-20 text-rose-500 animate-heartbeat"
        >
          <path
            fillRule="evenodd"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="text-center mt-4">
        <div className="font-mono text-4xl font-bold tabular-nums tracking-tighter">
          {formattedBeats}
        </div>
        <div className="text-xs uppercase tracking-widest text-zinc-500 mt-2">
          ESTIMATED REMAINING<br/>BIOLOGICAL CLOCK (HEARTBEATS)
        </div>
      </div>
    </div>
  );
};

export default HeartbeatCounter;
