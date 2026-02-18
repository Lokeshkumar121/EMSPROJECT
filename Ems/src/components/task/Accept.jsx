import React from 'react'
import { useContext } from "react"
import { Authcontext } from "../../context/AuthProvider"

const Accept = ({data, index, employeeId}) => {
  const { updateTaskStatus} = useContext(Authcontext)
    
  return (
    <div className="
      h-full w-[300px]
      bg-gray-900 border border-gray-700
      p-5 rounded-2xl
      shadow-md hover:shadow-xl hover:border-gray-500
      transition-all duration-300
      flex-shrink-0
    ">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="bg-red-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
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

      {/* Actions */}
      <div className="flex gap-3 mt-5">
        <button 
         onClick={() => updateTaskStatus(employeeId, data._id, "complete")}
        className="
          flex-1 bg-green-600/90 hover:bg-green-600
          text-white text-sm py-2 rounded-lg
          transition
        ">
          ✔ Complete
        </button>

        <button 
        onClick={() => updateTaskStatus(employeeId, data._id, "failed")}
        className="
          flex-1 bg-red-600/90 hover:bg-red-600
          text-white text-sm py-2 rounded-lg
          transition
        ">
          ✖ Failed
        </button>
      </div>

    </div>
  )
}

export default Accept
