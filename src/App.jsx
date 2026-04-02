import React, { useState, useEffect } from 'react';
import LifeGrid from './components/LifeGrid';
import StatsDashboard from './components/StatsDashboard';
import './index.css';
import lifeInWeeksImg from './assets/life chart.png';

const DEFAULT_BIRTH_DATE = '1990-01-01';

function App() {
  const [birthDate, setBirthDate] = useState(() => {
    const savedDate = localStorage.getItem('birthDate');
    return savedDate ? savedDate : DEFAULT_BIRTH_DATE;
  });
  const [hasSubmitted, setHasSubmitted] = useState(() => {
    return !!localStorage.getItem('birthDate');
  });
  const [inputDate, setInputDate] = useState(birthDate);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('birthDate', birthDate);
  }, [birthDate]);

  const handleDateChange = (e) => {
    setInputDate(e.target.value);
  };

  const handleGenerateMap = () => {
    const selectedDate = new Date(inputDate);
    const today = new Date();
    if (selectedDate > today) {
      setError('Please select a date in the past.');
    } else {
      setBirthDate(inputDate);
      setHasSubmitted(true);
      setError('');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 font-sans">
      <h1 className="text-4xl font-extralight tracking-tight mb-2">Weeks Left To Live</h1>
      <p className="text-zinc-500 text-sm mb-4">A visual map of your most finite resource.</p>
      <div className="w-full max-w-4xl">
        {!hasSubmitted &&
          <div className="mb-4 p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-4 flex-1">
                <label
                  htmlFor="birthdate"
                  className="shrink-0 font-bold uppercase tracking-widest text-[10px] text-zinc-500"
                >
                  Birthdate
                </label>
                <input
                  type="date"
                  id="birthdate"
                  value={inputDate}
                  onChange={handleDateChange}
                  max={today}
                  className="flex-1 p-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all text-sm font-mono"
                />
              </div>

              <button
                onClick={handleGenerateMap}
                className={`px-6 py-2 font-bold rounded-lg transition-all transform active:scale-95 hover:scale-105
                ${
                  inputDate !== birthDate
                    ? "bg-black text-white hover:bg-zinc-800 animate-button-active" /* Breathe when modified */
                    : "bg-white text-black border border-black hover:bg-zinc-50 animate-button-in" /* Pop in on load */
                }`}
              >
                Zoom Out
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-3 font-medium">{error}</p>}
          </div>
        }
        {hasSubmitted && birthDate &&
          <div className="animate-zoom-out">
            <StatsDashboard birthDate={birthDate} />
            <div className="mt-10 mb-5 max-w-2xl ml-6 pl-2 border-l-2 border-zinc-200 py-2">
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">
                The Perspective
              </p>
              <h2 className="text-lg text-zinc-800 leading-relaxed font-light">
                Each square below represents one week of a 75-year life (a conservative global estimate).
              </h2>
              <p className="mt-4 text-zinc-500 text-sm leading-relaxed">
                Seeing the total sum of your time makes the "Now" impossible to ignore.
                You are exactly where you are. <span className="text-zinc-900 font-medium italic">Make the remaining squares count.</span>
              </p>
            </div>
            <LifeGrid birthDate={birthDate} />
            <div className="mt-20 mb-12 py-12 border-t border-zinc-100">
              <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-400 mb-8">
                  Inspiration
                </p>
                  <div className="relative overflow-hidden rounded-2xl border border-zinc-200 transition-all duration-700">
                    <img
                      src={lifeInWeeksImg}
                      alt="Wait But Why Life in Weeks"
                      className="w-full"
                    />
                  </div>

                  <div className="mt-6 space-y-2">
                    <p className="text-zinc-500 text-sm px-4 leading-relaxed">
                      Inspired by Tim Urban’s original 2014 visualization on
                        <span className="italic underline">
                          <a
                            href="https://waitbutwhy.com/2014/05/life-weeks.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                          >
                            Wait But Why.
                          </a>
                        </span>
                    </p>
                  </div>
              </div>
            </div>
            <button
              onClick={() => setHasSubmitted(false)}
              className="mt-8 text-zinc-400 hover:text-zinc-600 text-[12px] uppercase tracking-widest font-bold"
            >
            ← Edit Birthdate
            </button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
