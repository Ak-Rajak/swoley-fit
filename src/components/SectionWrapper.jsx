import React from 'react'

export default function SectionWrapper(props) {
    const {children, header, title, id} = props
  return (
    <section id={id} className='min-h-screen flex flex-col gap-16 py-10 relative'>
       {/* Background Elements */}
       <div className="absolute inset-0 overflow-hidden -z-10">
         <div className="absolute top-1/4 -right-40 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
         <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
       </div>
       
       <div className='bg-slate-900 py-16 flex flex-col gap-4 justify-center items-center px-4 rounded-b-3xl shadow-xl'>
        <p className='uppercase font-medium text-blue-400 tracking-widest'>{header}</p>
        <h2 className='font-bold text-4xl sm:text-5xl md:text-6xl text-center'>
            {title[0]}<span className='uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600'>{title[1]}</span>{title[2]}
        </h2>
       </div>
       <div className='max-w-[900px] w-full flex flex-col mx-auto gap-10 px-4 pb-20'>{children}</div>
    </section>
  )
}