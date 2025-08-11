import React, { useState, useEffect } from 'react';

export default function WorkoutHistory() {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // On component mount, load saved workouts from localStorage
  useEffect(() => {
    const storedWorkouts = localStorage.getItem('swoleyWorkouts');
    if (storedWorkouts) {
      setSavedWorkouts(JSON.parse(storedWorkouts));
    }
  }, []);
  
  // Save current workout to history
  function saveCurrentWorkout() {
    // Get current workout data from the page
    const currentWorkout = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      poison: document.querySelector('[data-poison]')?.getAttribute('data-poison') || 'unknown',
      muscles: Array.from(document.querySelectorAll('[data-muscle]')).map(el => el.getAttribute('data-muscle')),
      exerciseCount: document.querySelectorAll('[data-exercise]').length,
      timestamp: Date.now()
    };
    
    const updatedWorkouts = [currentWorkout, ...savedWorkouts].slice(0, 10); // Keep only last 10 workouts
    setSavedWorkouts(updatedWorkouts);
    localStorage.setItem('swoleyWorkouts', JSON.stringify(updatedWorkouts));
    
    // Show confirmation toast
    showToast('Workout saved to history!');
  }
  
  // Remove a workout from history
  function removeWorkout(id) {
    const updatedWorkouts = savedWorkouts.filter(workout => workout.id !== id);
    setSavedWorkouts(updatedWorkouts);
    localStorage.setItem('swoleyWorkouts', JSON.stringify(updatedWorkouts));
  }
  
  // Simple toast notification
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
  
  // Format relative time
  function getRelativeTime(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInHours = Math.floor((now - then) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    
    return then.toLocaleDateString();
  }
  
  return (
    <div className="fixed bottom-6 left-6 z-30">
      {/* History toggle button */}
      <button 
        onClick={() => setShowHistory(!showHistory)} 
        className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white shadow-xl hover:bg-blue-600 transform hover:scale-110 transition-all duration-300 border border-slate-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      
      {/* Save current workout button - appears next to the history button */}
      <button 
        onClick={saveCurrentWorkout} 
        className="absolute -top-16 left-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        <span>Save</span>
      </button>
      
      {/* History panel */}
      {showHistory && (
        <div className="absolute bottom-16 left-0 w-72 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-4 max-h-96 overflow-y-auto">
          <h3 className="text-white font-semibold mb-3 flex items-center justify-between">
            Workout History
            <button 
              onClick={() => setShowHistory(false)} 
              className="text-slate-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </h3>
          
          {savedWorkouts.length === 0 ? (
            <p className="text-slate-400 text-sm py-4 text-center">No saved workouts yet</p>
          ) : (
            <div className="space-y-3">
              {savedWorkouts.map(workout => (
                <div key={workout.id} className="bg-slate-800 rounded-lg p-3 text-sm relative group">
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => removeWorkout(workout.id)} 
                      className="bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-blue-400 font-medium capitalize">{workout.poison.replaceAll('_', ' ')}</span>
                    <span className="text-slate-500 text-xs">{getRelativeTime(workout.timestamp)}</span>
                  </div>
                  <p className="text-white mb-1">{workout.exerciseCount} exercises</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {workout.muscles.map((muscle, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-blue-900/30 rounded-full text-xs text-blue-300 capitalize">
                        {muscle.replaceAll('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}