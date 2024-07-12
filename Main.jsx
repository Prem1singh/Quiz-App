import React, { createContext, useEffect, useState } from 'react'

import { getDatabase, ref, set ,onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyBDv7eWjL8bJg2mMF3Gxisoxi5sL4JLw7Q",
  authDomain: "quiz-3132d.firebaseapp.com",
  projectId: "quiz-3132d",
  storageBucket: "quiz-3132d.appspot.com",
  messagingSenderId: "608075079118",
  appId: "1:608075079118:web:966c91cbbad50162899f9f",
  measurementId: "G-8QY9HMQZ7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics1 = getAnalytics(app);

export const context1 =createContext();
export default function Main(props) {
  
    const [user,setUser]=useState(null)
    const [quiz,setquiz]=useState([])
    const [current,setcurrent]=useState(0)
    const [currAns,setcurrAns]=useState({})
    const [count,setcount]=useState(0)
    const [allScore,setAllScore]=useState([])
    const [change,setchange]=useState(false)
    const [quizType,setQuizType]=useState('javascript')
    const [timeRem,settime]=useState(60);
  
 
 
    function createScore(score){
      let userId=''
      let flag=false
      console.log(allScore)
      allScore.forEach(
          (data,index)=>{
            if(data.email==user.email){
              flag=true
              userId=data.id
              }
          }
      ) 
      if(flag==true){
      const db = getDatabase();
     
      set(ref(db, 'score/' + userId ),{
        username: user.displayName,
        email: user.email,
        score : score
      });
      }else{
        const db = getDatabase();
        let userId1=uuidv4();
      set(ref(db, 'score/' + userId1 ),{
        username: user.displayName,
        email: user.email,
        score : score
      });
      }
   
    }

    const logIn=(data)=>{
    setUser(data)

    }
    function setAnswer(ans){
     
     
      if(currAns[current]==ans){
        setcurrAns({...currAns,[current]:null})
      }else{
        setcurrAns({...currAns,[current]:ans})
      }
      
    }
    useEffect(()=>{
      let lsAns= JSON.parse(localStorage.getItem('ans'));
      setcurrAns(lsAns)
    },[])
    useEffect(()=>{
      
      localStorage.setItem('ans',JSON.stringify(currAns))
    },[currAns])
   
    const check=()=>{
      let check=0
      for (let i = 0; i < quiz.length; i++) {
        if(currAns[i]+1==quiz[i].correct){
          check+=1
        }
      }
      localStorage.setItem('timer',60);
      setcurrAns({});
      setcurrent(0);
     setcount(check);
     createScore(check);
     setchange(!change)

    }
    
    const prev=()=>{
      if (current>0) {
        
        setcurrent(current-1)
      }
    }
    const next=()=>{
      if (current<quiz.length-1) {
        
        setcurrent(current+1)
      }
    }
  
    const delUser=()=>{
        setUser(null);
    }


    const lsUser=JSON.parse(localStorage.getItem('user'));
    useEffect(
      ()=>{
        if(lsUser!=null){
          setUser(lsUser)
        }
      },[]
    )
    useEffect(()=>{
      let lscurrent=Number(localStorage.getItem("current1"));
      setcurrent(lscurrent);
    },[])

      useEffect(()=>{
      
      localStorage.setItem("current1",current)
    
    },[current])


    function getAllScore(){
      const db = getDatabase();
      const starCountRef = ref(db, 'score/');
      onValue(starCountRef, (snapshot) => {
      const data1 = snapshot.val();
      let arr=[]
      for(var d in data1){
      arr.push({id:d,...data1[d]})
      }
      setAllScore(arr)
      
    });
    }
    useEffect(()=>{
      getAllScore();
    },[change])
    // read quiz from firebase
    function getquizes(){
      const db = getDatabase();
      const starCountRef = ref(db, `quizes/${quizType}/`);
      onValue(starCountRef, (snapshot) => {
      const data1 = snapshot.val();
      var arr=[]
      for(var d in data1){
      arr.push({id:d,...data1[d]})
      }
      setquiz(arr)
      
  });
    }
    
    
    // create quiz
    function handleCreateQuiz(data) {
      const db = getDatabase();
      let userId=uuidv4();
      set(ref(db, `quizes/${data.type}/` + userId), data);
    }
  return (
   <context1.Provider value={{user,getquizes,logIn,delUser,quiz,current,currentquiz:quiz[current],next,prev,Ans:currAns[current],currAns,count,check,handleCreateQuiz,setAnswer,setcurrAns,setcurrent,allScore,quizType,setQuizType,timeRem,settime}}>
    {props.children}
   </context1.Provider>
  )
  
}

