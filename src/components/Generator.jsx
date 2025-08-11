import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { SCHEMES, WORKOUTS } from '../utils/swoldier';
import Buttons from './Buttons';

function ProgressIndicator({ currentStep }) {
  const steps = [
    { num: '01', title: 'Poison' },
    { num: '02', title: 'Targets' },
    { num: '03', title: 'Goals' }
  ];
  
  return (
    <div className="sticky top-4 z-20 mb-8 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-800">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
              index + 1 === currentStep 
                ? 'bg-blue-600 text-white' 
                : index + 1 < currentStep 
                  ? 'bg-green-500 text-white' 
                  : 'bg-slate-800 text-slate-400'
            }`}>
              {index + 1 < currentStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                step.num
              )}
            </div>
            <span className={`text-xs font-medium ${
              index + 1 <= currentStep ? 'text-blue-400' : 'text-slate-500'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`hidden sm:block h-0.5 w-16 mt-4 ${
                index + 1 < currentStep ? 'bg-green-500' : 'bg-slate-700'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center bg-blue-600/20 w-12 h-12 rounded-lg text-blue-400 font-bold">
          {index}
        </div>
        <h4 className="text-2xl font-semibold">{title}</h4>
      </div>
      <p className="text-slate-400 ml-16">{description}</p>
    </div>
  );
}

export default function Generator(props) {
  const [showModel, setShowModel] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFloatingButtonVisible, setIsFloatingButtonVisible] = useState(false);
  
  const { poison, setPoison, muscles, setMuscles, goals, setGoals, updateWorkout } = props;

  // Update step based on selections
  useEffect(() => {
    if (poison) setCurrentStep(2);
    if (poison && muscles.length > 0) setCurrentStep(3);
  }, [poison, muscles]);

  // Scroll listener for floating button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show floating button when user scrolls past a certain point
      setIsFloatingButtonVisible(scrollPosition > windowHeight * 0.5 && scrollPosition < documentHeight - windowHeight * 1.2);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function toggleModel() {
    setShowModel(!showModel);
  }

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter(val => val !== muscleGroup));
      return;
    }

    if (muscles.length > 3) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    if (poison !== 'individual') {
      setMuscles([muscleGroup]);
      setShowModel(false); // close the model after selection
      return;
    }

    setMuscles([...muscles, muscleGroup]);
    // if the muscles are 3 then close the model
    if (muscles.length === 2) {
      setShowModel(false);
    }
  }

  function handleWorkoutGeneration() {
    setGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      updateWorkout();
      setGenerating(false);
      
      // Scroll to workout section
      document.getElementById('workout')?.scrollIntoView({ behavior: 'smooth' });
    }, 1200);
  }

  const canGenerate = poison && muscles.length > 0 && goals;

  return (
    <SectionWrapper id="generate" header="generate your workout" title={["It's", "Huge", "o'clock"]}>
      <ProgressIndicator currentStep={currentStep} />
      
      <Header
        index="01"
        title="Pick Your Poison"
        description="Select your workout you wish to endure."
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-10">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          const isSelected = type === poison;
          return (
            <button
              onClick={() => setPoison(type)}
              className={`relative overflow-hidden bg-slate-900 border-2 duration-300 px-4 py-5 rounded-xl transform transition-all ${
                isSelected
                  ? "border-blue-500 shadow-lg shadow-blue-500/20 scale-105"
                  : "border-slate-800 hover:border-blue-400 hover:scale-105"
              }`}
              key={typeIndex}
            >
              {isSelected && (
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-500 p-1 transform rotate-45 translate-y-[-50%] translate-x-[50%] shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
              <p className="capitalize font-medium">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Header
        index="02"
        title="Lock on Targets"
        description="Select the muscles judged for annihilation."
      />
      <div
        className={`bg-slate-900 border-2 border-solid rounded-xl mb-10 relative z-10 shadow-lg overflow-hidden transition-all duration-300 ${
          showModel ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-800"
        }`}
      >
        <button onClick={toggleModel} className="relative p-4 w-full flex items-center">
          <p className="capitalize font-medium flex-1 text-left">
            {muscles.length === 0
              ? "Select muscle groups"
              : muscles.map((m) => m.replaceAll("_", " ")).join(" • ")}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-blue-400 transition-transform duration-300 ${
              showModel ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {showTooltip && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-slate-800 text-white text-sm py-2 px-4 rounded-md shadow-lg z-20">
            Maximum 3 muscle groups allowed
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-800 rotate-45"></div>
          </div>
        )}

        {showModel && (
          <div className="flex flex-col divide-y divide-slate-800 max-h-64 overflow-y-auto">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, idx) => {
              const isSelected = muscles.includes(muscleGroup);
              return (
                <button
                  onClick={() => updateMuscles(muscleGroup)}
                  key={idx}
                  className={`p-3 text-left hover:bg-slate-800 transition-colors duration-200 flex items-center ${
                    isSelected ? "bg-blue-900/30 text-blue-400" : ""
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors duration-200 ${
                      isSelected
                        ? "border-blue-500 bg-blue-500"
                        : "border-slate-600"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="uppercase font-medium">
                    {muscleGroup.replaceAll("_", "")}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Header
        index="03"
        title="Become Juggernaut"
        description="Select your ultimate objective."
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          const isSelected = scheme === goals;
          return (
            <button
              onClick={() => setGoals(scheme)}
              className={`bg-slate-900 border-2 duration-300 py-5 rounded-xl relative transform transition-all ${
                isSelected
                  ? "border-blue-500 shadow-lg shadow-blue-500/20 scale-105"
                  : "border-slate-800 hover:border-blue-400 hover:scale-105"
              }`}
              key={schemeIndex}
            >
              {isSelected && (
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-500 p-1 transform rotate-45 translate-y-[-50%] translate-x-[50%] shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
              <p className="capitalize font-medium">
                {scheme.replaceAll("_", " ")}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center pt-6">
        <button
          onClick={handleWorkoutGeneration}
          disabled={!canGenerate || generating}
          className={`px-8 py-4 rounded-md text-white font-medium transition-all duration-300 shadow-lg transform mx-auto flex items-center gap-2 ${
            canGenerate && !generating
              ? "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30 hover:-translate-y-1"
              : "bg-slate-700 cursor-not-allowed"
          }`}
        >
          {generating ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Assembling Workout...</span>
            </>
          ) : (
            <>
              <span>Formulate Workout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Floating action button */}
      {isFloatingButtonVisible && canGenerate && (
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={handleWorkoutGeneration}
            disabled={generating}
            className="flex items-center justify-center p-4 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transform hover:scale-110 transition-all duration-300"
          >
            {generating ? (
              <svg
                className="animate-spin h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            )}
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}