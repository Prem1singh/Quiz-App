import React, { useContext, useEffect, useState } from 'react'
import { context1 } from '../context/Main'

export default function Quiz1list() {
  const {quiz,quizType,setQuizType}=useContext(context1);
  const {getquizes}=useContext(context1)
  const [active,setActive]=useState(0)
  useEffect(
    ()=>{
  getquizes()
    } ,[quizType]
  )
  return (
    <div className="mb-8 w-[70vw] px-10">
      <div className='flex gap-10 mb-5'>
      <div className={`font-bold text-[20px] cursor-pointer () hover:text-[#6363f4] ${active==0?'text-[#1935CA]':''} `} onClick={()=>{
        setQuizType('javascript')
        setActive(0)
      }}>Javascipt</div>
      <div className={`font-bold text-[20px] cursor-pointer hover:text-[#6363f4]   ${active==1?'text-[#1935CA]':''}`} onClick={()=>{
        setQuizType('react')
        setActive(1)
      }}>React</div>
      <div className={`font-bold text-[20px] cursor-pointer hover:text-[#6363f4] ${active==2?'text-[#1935CA]':''}`} onClick={()=>{
        setQuizType('css')
        setActive(2)
      }}>css</div>
      <div className={`font-bold text-[20px] cursor-pointer hover:text-[#6363f4] ${active==3?'text-[#1935CA]':''}`} onClick={()=>{
        setQuizType('node')
        setActive(3)
      }}>Node</div></div>
      <h2 className="text-2xl font-bold mb-4">Quizzes Available</h2>
      {quiz?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-[65vw]">
          {quiz?.map((quiz1, index) => (
            <li key={index} className="bg-[#FBF9F9] shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl border">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{quiz1.title}</h3>
                {
                  quiz1.opt?.map(
                    (d,index)=>{
                      return(
                        <h4 key={index} className='text-lg text-[#716f6f] font-[600] mb-2' style={{
                          color:(quiz1.correct==index+1)?'red':''
                      }}>{index+1}. {d}</h4>
                      )
                    }
                  )
                }
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quizzes available yet.</p>
      )}
    </div>
  )
  
}
