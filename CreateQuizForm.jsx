import React, { useContext, useState } from 'react'
import { context1 } from '../context/Main'

export default function CreateQuizForm(props) {
  const {handleCreateQuiz}=useContext(context1)

    function handleSubmit(e){
        e.preventDefault()
  
        const data={
            title:e.target.title1.value,
            opt:[
              e.target.opt1.value,
              e.target.opt2.value,
              e.target.opt3.value, 
              e.target.opt4.value,
            ],
            correct:e.target.correctAnswer.value,
            type:e.target.type.value
        }
        handleCreateQuiz(data)
        e.target.reset()
    }
  return (
    <div className="mt-4 w-[100%]">
      <h2 className="text-2xl font-bold mb-4">Create a New Quiz</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-4 pb-4 mb-2">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            name='title1'
            type="text"
            placeholder="Enter quiz title"
            
            required
          />
        </div>
        <div className="mb-6">
          
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="opt1">
            Option 1
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="opt1"
            type="text"
            placeholder="Opt 1"
            name='opt1'
            required
          />
          <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="opt2">
            Option 2
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="opt2"
            type="text"
            placeholder="Opt 2"
            name='opt2'
            required
          />
          <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="opt3">
           Option 3
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="opt3"
            type="text"
            placeholder="Opt 3"
            name='opt3'
            required
          />
          <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="title">
            Option 4
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Opt 4"
            name='opt4'
            required
          />

        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correctAnswer">
            Correct Answer
          </label>
          <select
            id="correctAnswer"
            name='correctAnswer'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
          >
            <option value="-- --">--Select---</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
           Type
          </label>
          <select
            id="type"
            name='type'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
          >
            <option value="-- --">--Select---</option>
            <option value="javascript">Javascript</option>
            <option value="react">React</option>
            <option value="css">css</option>
            <option value="node">Node js</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-[#1935CA] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  )
}
