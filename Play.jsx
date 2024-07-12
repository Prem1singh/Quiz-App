import React, { useContext, useEffect, useState } from 'react'
import { context1 } from './context/Main';
import { Link, useNavigate } from 'react-router-dom';

export default function Play() {
  const navigator = useNavigate()
  const { user, currentquiz,prev,next,quiz,current ,Ans,count,check,setAnswer,currAns,settime,timeRem} = useContext(context1);
  const {getquizes}=useContext(context1)
  const [toggle,settoggle]=useState(false);
  const [submitShow,setSubmitShow]=useState(false)
  useEffect(
    ()=>{
  getquizes()
    } ,[]
  )
  const [ans,setans]=useState(null)
  const [show,setshow]=useState(false)
  const [attempt,setattempt]=useState(0);
 
  useEffect(
    ()=>{
      
      setans(Ans)
      let count1=0
      for (var k in currAns) {
        if(currAns[k]!=null){
          count1++
        }
      }
     setattempt(count1);
    },[current,Ans,toggle]
  )

  const lsUser = localStorage.getItem("user")
  useEffect(
    () => {
      if (lsUser == null && user == null) {
        navigator('/login')
      }
      
    }, []
  )

  const setsubmit=()=>{
  
    localStorage.setItem('timer',60)
   
    navigator('/result')
    
  }
  // const [timeRem,settime]=useState(60);
  useEffect(
  ()=>{
    if (timeRem<=0) {
        check()
        for (const key in currAns) {
          localStorage.setItem(key,null)
        }
        localStorage.setItem('timer',60)
        navigator('/result')
        return
    }
    const si= setInterval(() => {
        localStorage.setItem('timer',timeRem)
        settime(timeRem-1)
     
  }, 1000);
  return ()=> clearInterval(si);
  },[timeRem]
)
  useEffect(()=>{
    var lstime=localStorage.getItem('timer');
    settime(lstime)
  },[])
  return (
    <div className="flex items-center justify-center mt-40 flex-col">
        <div className='mb-5'>Time: <span className={`${timeRem<25?'text-[red]':'text-[green]'} font-bold`}> {timeRem}</span></div>
        <div className='flex justify-between w-[450px]'><div className=' px-3 text-right'>Attempted:{attempt}</div>
          <div className=' px-3 text-right'>Total:{quiz.length}</div></div>
          <div className="max-w-md w-full bg-white p-8 rounded shadow-xl border mt-4">
          <h2 className="text-xl font-bold mb-4">{currentquiz?.title}</h2>
          <div className="space-y-4">
            {
              currentquiz?.opt?.map(
                (d,index)=>{
                  return(
                    <button
                    key={index}
                    className={`w-full py-2 px-4 rounded-md border  ${(ans==index)?'bg-blue-600':''}  focus:outline-none active:scale-95`} onClick={()=>{
                      setAnswer(index);
                      settoggle(!toggle)
                    } }
                  >
                      {d}
                  </button>
                  )
                }
              )
            }
        </div>
       <div className='w-full flex justify-between px-4'>
          <button
            className={`mt-4 py-2 px-6 rounded-md text-white   focus:outline-none ${current==0?'bg-gray-600':'bg-green-500 hover hover:bg-green-600'}`}
            onClick={()=>{
              prev();
              settoggle(false)
            }}
          >
            prev
          </button>
          <button
            className={` mt-4 py-2 px-6 rounded-md text-white focus:outline-none ${(current==quiz.length-1)?'bg-gray-600':'bg-green-500 hover:bg-green-600 '}`} onClick={()=>{
              next()
              settoggle(false)
            }}
          >
            Next
          </button>
          </div>

          {
            current==quiz.length-1?
            <button
            className={`w-full mt-4 py-2 px-6 rounded-md text-white focus:outline-none bg-green-500 hover:bg-green-600 }`} onClick={()=>{  
              setSubmitShow(true)
            }}
          >
            Submit
          </button>
          :''
          }
         
      </div>
        {submitShow? <Submit setsubmit={setsubmit} check={check} setshow={setshow} setSubmitShow={setSubmitShow} show={show}/>:''}
     
      </div>
  )
}
export function Submit({setsubmit ,setshow ,check,setSubmitShow,show}){
  return(
    <div className='flex w-[100vw] h-[100vh] fixed top-0 bg-[#000000b4] items-center justify-center'>
    
    <div className='w-[400px] h-[300px] bg-white pt-10 rounded-3xl text-center'>
      <div className='flex justify-center'><img className='w-[120px]' src="public/Success Icon.svg" alt="" /></div>
      <h3 className='text-[20px]'>Are you Sure you want 
      to submit Quiz?</h3>
      <div className='flex mt-[30px] items-center justify-center gap-[90px]'>
        <div className='px-5 py-2 cursor-pointer hover:shadow-xl bg-[#1935CA] rounded-lg text-white' onClick={()=>{
          check()
          setsubmit()
          setshow(!show)
        }}>Yes</div>
        <div className='px-5 py-2 cursor-pointer hover:shadow-xl text-[#1935CA] rounded-lg' style={{border:'1px solid #1935CA'}} onClick={()=>{
           setSubmitShow(false)
        }}>No</div>
      </div>
    </div>
    </div>
  )
}