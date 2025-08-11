import React, { useState, useRef } from 'react';
import SectionWrapper from './SectionWrapper';
import ExerciseCard from './ExerciseCard';
import WorkoutHistory from './WorkoutHistroy';

export default function Workout(props) {
  const { workout } = props;
  const [completedExercises, setCompletedExercises] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const workoutRef = useRef(null);
  
  // Track completed exercises based on signals from ExerciseCard
  React.useEffect(() => {
    // Event listener for exercise completion events
    const handleExerciseComplete = () => {
      setCompletedExercises(prev => {
        const newCount = prev + 1;
        if (newCount === workout.length) {
          // All exercises completed - celebrate!
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
        return newCount;
      });
    };
    
    window.addEventListener('exercise-completed', handleExerciseComplete);
    return () => window.removeEventListener('exercise-completed', handleExerciseComplete);
  }, [workout]);
  
  // Calculate workout progress
  const workoutProgress = workout && workout.length > 0 
    ? Math.round((completedExercises / workout.length) * 100) 
    : 0;
  
  // Print workout function
  const printWorkout = () => {
    window.print();
  };
  
  // Share workout function
  const shareWorkout = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My SwoleyFit Workout',
        text: `Check out my custom workout with ${workout.length} exercises!`,
        url: window.location.href,
      })
      .catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Workout link copied to clipboard!'))
        .catch(err => console.log('Error copying to clipboard:', err));
    }
  };
  
  if (!workout || workout.length === 0) {
    return null;
  }
  
  return (
    <SectionWrapper id="workout" header="welcome to" title={['The ', 'DANGER ', 'Zone']} ref={workoutRef}>
      {/* Confetti effect when workout completed */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Simplified confetti animation */}
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i}
              className="absolute animate-confetti bg-yellow-500"
              style={{
                top: '-5%',
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Sticky navigation controls */}
      <div className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-md p-3 -mx-4 mb-6 rounded-b-xl border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">WORKOUT PROGRESS</p>
            <div className="relative w-48 h-2 bg-slate-700 rounded-full mt-1 overflow-hidden">
              <div 
                className="absolute h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${workoutProgress}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={printWorkout}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            title="Print workout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
          <button 
            onClick={shareWorkout}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            title="Share workout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Workout Summary Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-900 p-6 rounded-xl border border-slate-800 mb-6 transform transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5">
        <div className="bg-blue-600/20 rounded-full p-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-semibold mb-2">Your Custom Workout</h3>
          <p className="text-slate-400">Complete all {workout.length} exercises for maximum gains</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{workout.length}</p>
            <p className="text-sm text-slate-400">Exercises</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">5</p>
            <p className="text-sm text-slate-400">Sets Each</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{completedExercises}</p>
            <p className="text-sm text-slate-400">Completed</p>
          </div>
        </div>
      </div>
      
      {/* Timer control */}
      <div className="mb-6">
        <WorkoutTimer />
      </div>
      
      {/* Exercise Cards */}
      <div className="flex flex-col gap-6">
        {workout.map((exercise, i) => (
          <ExerciseCard i={i} exercise={exercise} key={i} />
        ))}
      </div>
      
      {/* Motivational Footer */}
      <div className="mt-10 text-center bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-xl shadow-lg shadow-blue-600/20 transform transition-all hover:scale-105">
        <h3 className="text-2xl font-bold text-white mb-2">GET AFTER IT!</h3>
        <p className="text-blue-100">Embrace the pain, enjoy the gains.</p>
        
        {/* Progress circle */}
        <div className="mt-4 flex justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="#1e40af" 
                strokeWidth="8"
              />
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={283 - (workoutProgress / 100) * 283}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{workoutProgress}%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Workout history component */}
      <WorkoutHistory />
    </SectionWrapper>
  );
}

// Timer component for tracking total workout duration
function WorkoutTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  
  const startTimer = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  };
  
  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };
  
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };
  
  return (
    <div className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
        <span className="text-slate-300">Workout Timer</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="font-mono text-xl font-bold text-white">{formatTime(time)}</div>
        
        <div className="flex gap-2">
          {isRunning ? (
            <button 
              onClick={pauseTimer}
              className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          ) : (
            <button 
              onClick={startTimer}
              className="p-2 rounded-full bg-green-600 hover:bg-green-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
          
          <button 
            onClick={resetTimer}
            className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}