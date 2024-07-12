import React,{ useContext, useEffect, useState } from 'react'
import QuizList from './QuizList';
import CreateQuizForm from './CreateQuizForm';
export default function Create() {

  
  
  return (
    <div className="py-6 flex flex-col justify-center sm:py-2">
      <div className="py-3  flex gap-10">
      <QuizList  />
        <div className="h-[88vh] sticky right-10 top-0 bg-gradient-to-r from-green-400 to-[#1935CA] shadow-lg  sm:rounded-3xl sm:shadow-xl sm:px-10  ms-auto me-5 w-[30vw] flex">
          
          <CreateQuizForm />
        </div>
      </div>
    </div>
  )
}
