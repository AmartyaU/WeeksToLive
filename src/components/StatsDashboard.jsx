import { useLifeStats } from '../hooks/useLifeStats';
import HeartbeatCounter from './HeartbeatCounter';

const StatCard = ({ label, value }) => (
  <div className="bg-white p-3 sm:p-4 rounded-2xl border border-zinc-100 overflow-hidden flex flex-col justify-between">
    <p className="font-bold uppercase tracking-widest text-[10px] text-slate-500">
      {label}
    </p>
    <p
      className={`text-lg sm:text-xl lg:text-2xl font-bold font-mono break-all tabular-nums leading-tight ${
        label === 'Current Age' ? 'text-rose-400' : 'text-slate-800'
      }`}
    >
      {value}
    </p>
  </div>
);

const StatsDashboard = ({ birthDate }) => {
  const {
    daysLived,
    hoursLived,
    minutesLived,
    secondsLived,
    age,
    daysToNextMilestone,
    beatsRemaining,
  } = useLifeStats(birthDate);

  return (
    <div>
      <div className="mt-8 mb-4 p-8 bg-white border border-zinc-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden">
      {/* Subtle background glow behind the heart */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-50/50 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <HeartbeatCounter beatsRemaining={beatsRemaining} />
        </div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-8">
        <StatCard label="Current Age" value={age} />
        <StatCard label="Total Days" value={daysLived.toLocaleString()} />
        <StatCard label="Total Hours" value={hoursLived.toLocaleString()} />
        <StatCard label="Total Minutes" value={minutesLived.toLocaleString()} />
        <StatCard label="Total Seconds" value={secondsLived.toLocaleString()} />
        <StatCard label="Next Milestone" value={`${daysToNextMilestone.toLocaleString()} days`} />
      </div>
    </div>
  );
};

export default StatsDashboard;
