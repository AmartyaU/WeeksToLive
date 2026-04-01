import React from 'react';
import { useLifeStats } from '../hooks/useLifeStats';

/**
 * A component that renders a grid of weeks in a lifetime.
 *
 * @param {{
 *   birthDate: string,
 *   lifespanYears?: number
 * }} props
 */
const LifeGrid = ({ birthDate, lifespanYears }) => {
  const { weeksLived } = useLifeStats(birthDate, lifespanYears);
  const totalYears = lifespanYears || 75;

  const yearRows = [];
  for (let year = 0; year < totalYears; year++) {
    const weeksInYear = [];
    for (let week = 0; week < 52; week++) {
      weeksInYear.push(year * 52 + week);
    }
    yearRows.push(weeksInYear);
  }

  return (
    <div className="space-y-1">
      {yearRows.map((weeks, year) => (
        <div key={year} className="flex items-center gap-2">
          <div className="w-6 shrink-0 text-right text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            {year % 5 === 0 ? year : ''}
          </div>
          <div className="grid grid-cols-52 gap-1 flex-1">
            {weeks.map(i => {
              let className = 'aspect-square rounded-[1px] ';
              if (i < weeksLived) {
                className += 'bg-slate-200';
              } else if (i === weeksLived) {
                className +=
                  'bg-rose-400 ring-2 ring-rose-200 shadow-lg animate-pulse';
              } else {
                className +=
                  'bg-sky-200 transition-all duration-200 hover:bg-sky-300 hover:scale-150 hover:z-10 hover:shadow-sm cursor-pointer';
              }
              return <div key={i} className={className} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LifeGrid;
