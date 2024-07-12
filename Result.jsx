import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { context1 } from './context/Main';

const Result = () => {
    const {setcurrAns,setcurrent,quiz,count}=useContext(context1);
    const totalQuestions=quiz.length;
    const correctAnswers=count;
  const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
        <div className="flex justify-between mb-4">
          <span className="text-lg">Total Questions:</span>
          <span className="text-lg font-bold">{totalQuestions}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg">Correct Answers:</span>
          <span className="text-lg font-bold">{correctAnswers}</span>
        </div>
        <div className="flex justify-between mb-8">
          <span className="text-lg">Percentage:</span>
          <span className="text-lg font-bold">{percentage}%</span>
        </div>
        <div className="flex justify-center">
        <Link to={'/play'} >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{
            setcurrAns({})
            setcurrent(0)
          }}>
            Restart Quiz
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
