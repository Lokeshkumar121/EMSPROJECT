import React from 'react'
import { useContext } from "react"
import { Authcontext } from '../../context/AuthProvider'
const Newtask = ({data , index, employeeId}) => {
  const { updateTaskStatus} = useContext(Authcontext)
  return (
    <div className="
      h-full w-[300px]
      bg-gray-900 border border-blue-500/40
      p-5 rounded-2xl
      shadow-md hover:shadow-xl hover:border-blue-400
      transition-all duration-300
      flex-shrink-0
    ">

      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {data.category}
        </span>
        <span className="text-xs text-gray-400">
          {data.date}
        </span>
      </div>

      {/* Title */}
      <h2 className="mt-4 text-xl font-bold text-white">
        {data.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-300 mt-2 leading-relaxed">
        {data.description}
      </p>

      {/* Action Button */}
      <div className="mt-5">
        <button 
        
        onClick={() => { console.log("EMP ID:", employeeId);
  console.log("TASK INDEX:", index); updateTaskStatus(employeeId, data._id, "active")}}
        className="
          w-full bg-blue-600 hover:bg-blue-700
          text-white text-sm py-2 rounded-lg
          transition
        ">
          ✔ Accept Task
        </button>
      </div>

    </div>
  )
}

export default Newtask
