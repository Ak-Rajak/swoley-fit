import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

export default function ExerciseCard(props) {
  const { exercise, i } = props;
  const [setCompleted, setSetCompleted] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  // Calculate progress percentage for progress bar
  const progressPercentage = (setCompleted / 5) * 100;

  // Animation for card appearance
  const cardAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
    delay: i * 100,
  });

  // Rest timer functionality
  useEffect(() => {
    let interval;
    if (timerActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((time) => time - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setTimerActive(false);
      // Play sound notification when timer ends
      const audio = new Audio("/notification.mp3");
      audio.play().catch(err => console.log("Audio playback prevented:", err));
    }

    return () => clearInterval(interval);
  }, [timerActive, remainingTime]);

  function handleSetIncrement() {
    // If we're going to a new set, start the rest timer
    if (setCompleted < 5) {
      const newSetCompleted = setCompleted + 1;
      setSetCompleted(newSetCompleted);
      
      // Only start timer if not on the last set
      if (newSetCompleted < 5) {
        const restTime = parseInt(exercise.rest.split(' ')[0], 10);
        setRemainingTime(restTime);
        setTimerActive(true);
      }
    } else {
      setSetCompleted(0);
      setTimerActive(false);
      setRemainingTime(0);
    }
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function startRestTimer() {
    if (!timerActive && setCompleted < 5) {
      const restTime = parseInt(exercise.rest.split(' ')[0], 10);
      setRemainingTime(restTime);
      setTimerActive(true);
    }
  }

  return (
    <animated.div style={cardAnimation}>
      <div className="p-6 rounded-xl flex flex-col gap-6 bg-slate-900 border border-slate-800 hover:border-blue-500/30 transition-all duration-300 shadow-lg relative">
        {/* Exercise progress badge */}
        {setCompleted === 5 && (
          <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Complete!
          </div>
        )}

        {/* Rest timer notification */}
        {timerActive && (
          <div className="absolute -top-3 -right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            Rest: {formatTime(remainingTime)}
          </div>
        )}

        {/* Header with exercise number and name */}
        <div className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-12 h-12 rounded-lg font-bold text-white ${
            setCompleted === 5 ? 'bg-green-600' : 'bg-blue-600'
          }`}>
            {i + 1 < 10 ? `0${i + 1}` : i + 1}
          </div>
          <div className="flex-1">
            <h2 className="capitalize text-xl font-semibold text-white">
              {exercise.name.replaceAll("_", " ")}
            </h2>
            <p className="text-blue-400 text-sm capitalize">{exercise.type}</p>
          </div>
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-900/50 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* Muscle groups */}
        <div className="flex gap-2 flex-wrap">
          <h3 className="text-slate-400 text-sm font-medium">Muscles:</h3>
          {exercise.muscles.map((muscle, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-slate-800 rounded-full text-sm capitalize"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Description - conditionally shown */}
        {showInfo && (
          <div className="bg-slate-800/50 rounded-lg p-4 border-l-2 border-blue-500 animate-fadeIn">
            {exercise.description.split("___").map((val, idx) => (
              <p key={idx} className="text-sm text-slate-300 mb-2 last:mb-0">
                {val}
              </p>
            ))}
          </div>
        )}

        {/* Exercise details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["reps", "rest", "tempo"].map((info) => (
            <div
              key={info}
              className="flex flex-col p-3 rounded-lg bg-slate-800 border border-slate-700"
            >
              <h3 className="capitalize text-slate-400 text-xs font-medium mb-1">
                {info === "reps" ? `${exercise.unit}` : info}
              </h3>
              <p className="font-medium text-white">{exercise[info]}</p>
            </div>
          ))}

          {/* Sets completed with progress bar */}
          <div className="relative">
            <button
              onClick={handleSetIncrement}
              className={`flex flex-col p-3 rounded-lg w-full h-full transition-all duration-200 ${
                setCompleted === 5
                  ? "bg-green-900/30 border border-green-800 hover:bg-green-900/50"
                  : "bg-blue-900/30 border border-blue-800 hover:bg-blue-900/50"
              }`}
            >
              <h3 className="text-blue-300 text-xs font-medium mb-1">
                Sets Completed
              </h3>
              <p className="font-medium text-white">{setCompleted} / 5</p>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700 rounded-b-lg overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    setCompleted === 5 ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </button>
          </div>
        </div>

        {/* Timer controls for rest periods */}
        {setCompleted > 0 && setCompleted < 5 && (
          <div className="flex justify-center items-center gap-4 p-3 bg-slate-800/50 rounded-lg">
            <button
              onClick={startRestTimer}
              className={`px-4 py-2 rounded-md text-white font-medium transition-all ${
                timerActive
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {timerActive ? "Cancel Rest" : "Start Rest Timer"}
            </button>
            {timerActive && (
              <div className="text-lg font-mono text-yellow-400">
                {formatTime(remainingTime)}
              </div>
            )}
          </div>
        )}
      </div>
    </animated.div>
  );
}