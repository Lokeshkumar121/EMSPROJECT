import React from 'react'

const TaskNumberslist = ({ data }) => {
  if (!data || !data.taskCounts) return null;
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* New Task */}
      <div className="
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-blue-600/90 to-blue-800
        p-6 shadow-lg hover:scale-[1.03] transition
      ">
        <h2 className="text-4xl font-bold text-white">
          {data.taskCounts.newTask}
        </h2>
        <p className="mt-1 text-lg text-blue-200 font-medium">
          New Tasks
        </p>
        <span className="absolute right-4 bottom-3 text-6xl text-white/10">
          🆕
        </span>
      </div>

      {/* Completed Task */}
      <div className="
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-emerald-600/90 to-green-800
        p-6 shadow-lg hover:scale-[1.03] transition
      ">
        <h2 className="text-4xl font-bold text-white">
          {data.taskCounts.complete}
        </h2>
        <p className="mt-1 text-lg text-emerald-200 font-medium">
          Completed
        </p>
        <span className="absolute right-4 bottom-3 text-6xl text-white/10">
          ✅
        </span>
      </div>

      {/* Active Task */}
      <div className="
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-yellow-500/90 to-yellow-700
        p-6 shadow-lg hover:scale-[1.03] transition
      ">
        <h2 className="text-4xl font-bold text-gray-900">
          {data.taskCounts.active}
        </h2>
        <p className="mt-1 text-lg text-gray-900/80 font-medium">
          Active Tasks
        </p>
        <span className="absolute right-4 bottom-3 text-6xl text-black/10">
          ⏳
        </span>
      </div>

      {/* Failed Task */}
      <div className="
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-red-600/90 to-red-800
        p-6 shadow-lg hover:scale-[1.03] transition
      ">
        <h2 className="text-4xl font-bold text-white">
          {data.taskCounts.failed}
        </h2>
        <p className="mt-1 text-lg text-red-200 font-medium">
          Failed Tasks
        </p>
        <span className="absolute right-4 bottom-3 text-6xl text-white/10">
          ❌
        </span>
      </div>

    </div>
  )
}

export default TaskNumberslist
