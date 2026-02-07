import React from 'react'
import Accept from './Accept'
import Newtask from './Newtask'
import Completetask from './Completetask'
import Failed from './Failed'

const Tasklist = ({ data }) => {

  if (!data || !data.tasks) return null

  if (data.tasks.length === 0) {
    return (
      <div className="h-[55%] w-full py-5 mt-10 flex items-center justify-center">
        <div className="p-6 bg-gray-700 text-gray-300 rounded-lg text-center">
          No tasks assigned yet.
        </div>
      </div>
    )
  }

  return (
    <div
      id="tasklist"
      className="h-[55%] w-full py-5 mt-10
                 flex items-center justify-start gap-5
                 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600"
    >

      {/* 🔥 IMPORTANT: ORIGINAL ARRAY PE MAP */}
      {data.tasks.map((task, index) => {

        if (task.newTask) {
          return (
            <Newtask
              key={index}
              data={task}
              index={index}            // ✅ REAL INDEX
              employeeId={data._id}
            />
          )
        }

        if (task.active) {
          return (
            <Accept
              key={index}
              data={task}
              index={index}            // ✅ REAL INDEX
              employeeId={data._id}
            />
          )
        }

        if (task.complete) {
          return <Completetask key={index} data={task} />
        }

        if (task.failed) {
          return <Failed key={index} data={task} />
        }

        return null
      })}
    </div>
  )
}

export default Tasklist
