import React, { useContext, useEffect, useState } from 'react';
import { Typography, Container } from '@mui/material';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { context1 } from './context/Main';

const Homepage = () => {
  const { allScore ,setQuizType} = useContext(context1)
  const [scoreList,setScoreList]=useState([])
  useEffect(()=>{
    allScore.sort((a, b) => b.score - a.score);
    setScoreList(allScore.slice(0,10))
    // allScore.forEach((e) => {
    //   console.log(`${e.username} ${e.score}`);
    // });
  },[allScore])
  const navigator=useNavigate()
  return (
    <div className="min-h-[600px] px-20 ">
       <h2 className="text-3xl font-semibold text-gray-800 m-6 text-center">Welcome to the Quiz App!</h2>
       <p className="text-lg text-gray-600 m-6 text-center">
          Test your knowledge with our interactive quizzes. Choose a category and start challenging yourself!
        </p>
      <div className='flex items-center justify-between'>
      
      <div className="bg-[#FBF9F9] shadow-xl rounded-lg p-8 max-w-[800px] border h-[550px]">
       
       
        <div><p className="text-xl mb-6 text-center font-bold">Please select the category</p>
        <div className='flex gap-5 flex-wrap h-[400px]'>
          <div className=' group cursor-pointer w-[45%] hover:border hover:bg-slate-200 h-[45%] text-white font-bold p-6 rounded' onClick={()=>{
            setQuizType('javascript');
            navigator('/play')
          }}> <img className='group-hover:scale-110 duration-300 w-[100%] h-[100%]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/800px-HTML5_logo_and_wordmark.svg.png" alt="" /> </div>
          <div className='group cursor-pointer w-[45%] hover:border hover:bg-slate-200 h-[45%] text-white font-bold p-6 rounded' onClick={()=>{
            setQuizType('react')
            navigator('/play')
          }}> <img className='group-hover:scale-110 duration-300 w-[100%] h-[100%]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png" alt="" /> </div>
          <div className='group cursor-pointer w-[45%] hover:border hover:bg-slate-200 h-[45%] text-white font-bold p-6 rounded' onClick={()=>{
            setQuizType('css')
            navigator('/play')
          }}> <img className='group-hover:scale-110 duration-300 w-[100%] h-[100%]' src="https://delta-dev-software.fr/wp-content/uploads/2024/05/CSS-Logo.png" alt="" /></div>
          <div className='group cursor-pointer w-[45%] hover:border hover:bg-slate-200 h-[45%] text-white font-bold p-6 rounded' onClick={()=>{
            setQuizType('node')
            navigator('/play')
          }}> <img className='group-hover:scale-110 duration-300 w-[100%] h-[100%]' src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="" /></div></div></div>
        
      </div>
      <div className='bg-[#FBF9F9] w-[400px] min-h-[68vh] border shadow-xl rounded-xl overflow-hidden'>
      <div className='flex px-10 py-5 items-center justify-between border border-b-2'>
      <div className='font-bold'>Rank</div>
                <div className='font-bold'>Name</div>
                <div className='font-bold'>Score</div>
                </div>{
              (scoreList).map(
          (d,i) => {
            return (
              <div key={i} style={{borderBottom:'0.5px solid gray'}} className='flex px-10 py-2 items-center justify-between hover:bg-slate-200 cursor-pointer'>
                <div  >{i+1}<sup>{i<=2?(i==0?'st':(i==1?'nd':'rd')):'th'}</sup></div>
                <div>{d.username}</div>
                <div className={`font-bold ${d.score<=2?'text-[red]':'text-[green]'}`}>{d.score*100}</div>
                </div>

            )
          }
        )}
      </div></div>
    </div>
  );
}

export default Homepage;
