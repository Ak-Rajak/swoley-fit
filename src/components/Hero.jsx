import React from 'react'
import Buttons from './Buttons'

export default function Hero() {
  return (
    <div className='min-h-screen flex flex-col gap-12 items-center justify-center text-center max-w-[900px] w-full mx-auto p-6'>
        {/* Background design element */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Main heading */}
        <div className='flex flex-col gap-6'>
            <p className='text-blue-400 font-medium tracking-wider'>IT'S TIME TO GET</p>
            <h1 className='uppercase font-bold text-5xl sm:text-6xl md:text-7xl
            lg:text-8xl text-white'>
              Swole<span className='text-blue-500 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>normous</span>
            </h1>
        </div>
        
        {/* Description with animated highlight */}
        <p className='text-base md:text-lg font-light text-slate-300 max-w-2xl leading-relaxed'>
          I hereby acknowledge that I may become <span className='text-blue-400 font-semibold'>unbelievably swolenormous</span> and accept all risks of becoming the local <span className='text-blue-400 font-semibold'>mass monstrosity</span>, afflicted with severe body dysmorphia, unable to fit through doors.
        </p>
        
        {/* Call to action */}
        <div className="relative">
          <Buttons func={() => window.location.href = '#generate'} text={"Accept & Begin"}/>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-slate-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
    </div>
  )
}