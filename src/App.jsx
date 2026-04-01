import React, { useState, useEffect } from 'react';
import LifeGrid from './components/LifeGrid';
import StatsDashboard from './components/StatsDashboard';
import './index.css';

function App() {
  const [birthDate, setBirthDate] = useState(() => {
    const savedDate = localStorage.getItem('birthDate');
    return savedDate ? savedDate : '1990-01-01';
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
      setError('');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 font-sans">
      <h1 className="text-4xl font-extralight tracking-tight mb-2">Weeks Left To Live</h1>
      <p className="text-zinc-500 text-sm mb-4">A visual map of your most finite resource.</p>
      <div className="w-full max-w-4xl">
        <div className="mb-4 p-4 bg-white rounded-2xl border-zinc-100">
          <div className="flex items-end space-x-4">
            <div>
              <label
                htmlFor="birthdate"
                className="block font-bold uppercase tracking-widest text-[10px] text-zinc-500"
              >
                Birthdate
              </label>
              <input
                type="date"
                id="birthdate"
                value={inputDate}
                onChange={handleDateChange}
                max={today}
                className="p-2 border border-gray-300 rounded block mt-1"
              />
            </div>
            <button
              onClick={handleGenerateMap}
              className={`px-4 py-2 font-bold rounded transition-colors ${
                inputDate !== birthDate
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-white text-black border border-black hover:bg-gray-100"
              }`}
            >
              Zoom Out
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <StatsDashboard birthDate={birthDate} />
        <div className="my-8" />
        <LifeGrid birthDate={birthDate} />
      </div>
    </div>
  );
}

export default App;
