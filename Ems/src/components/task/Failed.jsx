import React from 'react'

const Failed = ({data}) => {
  return (
    <div className="
      h-full w-[300px]
      bg-gray-900 border border-red-600/40
      p-5 rounded-2xl
      shadow-md hover:shadow-xl hover:border-red-500
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

      {/* Status Button */}
      <div className="mt-5">
        <button
          disabled
          className="
            w-full bg-red-700/90
            text-white text-sm py-2 rounded-lg
            cursor-not-allowed opacity-80
          "
        >
          ✖ Task Failed
        </button>
      </div>

    </div>
  )
}

export default Failed
