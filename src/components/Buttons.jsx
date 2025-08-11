import React from 'react'

export default function Buttons(props) {
    const {text, func} = props
  return (
    <button 
      onClick={func} 
      className='px-8 py-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 mx-auto flex items-center gap-2'
    >
      <span>{text}</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  )
}