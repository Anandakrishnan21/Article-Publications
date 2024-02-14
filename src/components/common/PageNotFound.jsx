import React from 'react'

function PageNotFound({paper}) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
    <img src="/img/pageNotFound.png" alt="png1" className="w-1/4 h-60"/>
    <h1 className="text-3xl text-bold">Sorry no result!</h1>
    <p>Upload your {paper}</p>
  </div>
  )
}

export default PageNotFound
