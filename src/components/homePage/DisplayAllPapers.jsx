import { notFound } from 'next/navigation';
import React from 'react'

async function getData(){
  const res = await fetch("http://localhost:3000/api/addPublication",{cache: "no-store"});
  if(!res.ok) return notFound();
  return res.json();
}

const DisplayAllPapers = async () => {
  const data = await getData();
  return (
    <div className='w-full'>
        <p>All Papers</p>
        <div className='w-full'>
            <div className='bg-neutral-300 p-3 w-full'>
                <p>Title of the project</p>
                {data.map(item => (
                  <div>
                    <p>{item.title}</p>
                  </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default DisplayAllPapers