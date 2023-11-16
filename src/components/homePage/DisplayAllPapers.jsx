import React from 'react'

const DisplayAllPapers = () => {
  return (
    <div className='w-full'>
        <p>All Papers</p>
        <div className='w-full'>
            <div className='bg-neutral-300 p-3 w-full'>
                <p>Title of the project</p>
                <div className='flex gap-2'>
                    <p>Author 1</p>
                    <p>Author 2</p>
                    <p>Author 3</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DisplayAllPapers