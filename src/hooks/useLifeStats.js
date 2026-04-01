import { useState, useEffect, useMemo } from 'react';
import {
  differenceInWeeks,
  addYears,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  intervalToDuration,
} from 'date-fns';

/**
 * A custom hook to calculate life statistics in weeks.
 *
 * @param {string} birthDate - The birth date in a string format parsable by `new Date()`.
 * @param {number} [lifespanYears=75] - The total expected lifespan in years.
 * @returns {{totalWeeks: number, weeksLived: number, remainingWeeks: number, progressPercent: number, beatsLived: number, beatsRemaining: number, totalLifespanBeats: number}}
 */
export const useLifeStats = (birthDate, lifespanYears = 75) => {
  const [now, setNow] = useState(new Date());
  const [heartStats, setHeartStats] = useState({
    totalLifespanBeats: 0,
    beatsLived: 0,
    beatsRemaining: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const HEART_RATE_BPM = 80;
    const BEATS_PER_MINUTE = HEART_RATE_BPM;
    const LIFESPAN_FOR_BEATS_YEARS = 90;
    const TOTAL_LIFESPAN_BEATS =
      LIFESPAN_FOR_BEATS_YEARS * 365.25 * 24 * 60 * BEATS_PER_MINUTE;

    const startDate = new Date(birthDate);
    let animationFrameId;

    const updateBeats = () => {
      const nowMs = new Date().getTime();
      const startMs = startDate.getTime();
      const millisecondsLived = nowMs - startMs;
      const beatsLived = (millisecondsLived / (1000 * 60)) * BEATS_PER_MINUTE;

      setHeartStats({
        totalLifespanBeats: TOTAL_LIFESPAN_BEATS,
        beatsLived: beatsLived,
        beatsRemaining: TOTAL_LIFESPAN_BEATS - beatsLived,
      });

      animationFrameId = requestAnimationFrame(updateBeats);
    };

    updateBeats();

    return () => cancelAnimationFrame(animationFrameId);
  }, [birthDate]);

  const stats = useMemo(() => {
    const startDate = new Date(birthDate);
    const endDate = addYears(startDate, lifespanYears);

    // Original calculations
    const totalWeeks = lifespanYears * 52;
    const weeksLived = differenceInWeeks(now, startDate);
    const remainingWeeks = totalWeeks - weeksLived;
    const progressPercent = (weeksLived / totalWeeks) * 100;

    // New calculations
    const daysLived = differenceInDays(now, startDate);
    const hoursLived = differenceInHours(now, startDate);
    const minutesLived = differenceInMinutes(now, startDate);
    const secondsLived = differenceInSeconds(now, startDate);

    const ageDuration = intervalToDuration({ start: startDate, end: now });
    const age = `${ageDuration.years}y ${ageDuration.months}m ${ageDuration.days}d`;

    // Milestone calculation
    const nextMilestone = Math.ceil(daysLived / 5000) * 5000;
    const daysToNextMilestone = nextMilestone - daysLived;

    return {
      totalWeeks,
      weeksLived,
      remainingWeeks,
      progressPercent,
      daysLived,
      hoursLived,
      minutesLived,
      secondsLived,
      age,
      daysToNextMilestone,
    };
  }, [birthDate, lifespanYears, now]);

  return { ...stats, ...heartStats };
};
