import React from 'react'
import SectionWrapper from './SectionWrapper'
import ExerciseCard from './ExerciseCard';

export default function Workout(props) {
  const { workout } = props;
  console.log("Workout component rendering");
  return (
    <SectionWrapper header={"welocome to"} title={['The ', 'DANGER ' , 'Zone']}>
        <div className='flex flex-col gap-4'>
            {workout.map((exercise , i) => {
              return(
                <ExerciseCard i={i} exercise={exercise} key={i}/>
              )
            })}
        </div>
    </SectionWrapper>
  );
}