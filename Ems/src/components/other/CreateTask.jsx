import React, { useContext, useState } from 'react'
import { Authcontext } from '../../context/AuthProvider'

const CreateTask = () => {
  const { userData , addTaskToEmployee} = useContext(Authcontext)

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setDescription] = useState('')
  const [assignedTo, setAssignedTo] = useState('') // 🔹  employee name
  const [taskDate, setTaskDate] = useState('')
  const [taskCategory, setTaskCategory] = useState('')
  const [showToast, setShowToast] = useState(false)

  const submitHandler = (e) => {
     e.preventDefault()
    if (!assignedTo || !taskTitle) return
    const employee = userData.find(
  emp => emp.firstName.toLowerCase() === assignedTo.toLowerCase()
);
     if (!employee) {
    alert("Employee not found");
    return;
  }

    const taskObj = {
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      category: taskCategory,
      newTask: true,
      active: false,
      complete: false,
      failed: false,
    }

    addTaskToEmployee(employee._id, taskObj) // 🔹 assign  using firstName

    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)

    setTaskTitle('')
    setDescription('')
    setAssignedTo('')
    setTaskDate('')
    setTaskCategory('')
  }

  return (
    <>
      {showToast && (
        <div className="fixed top-6 right-6 z-[999] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold animate-slide-in">
          ✅ Task created successfully
        </div>
      )}
      <div className="mt-6 p-6 bg-[#111] border border-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-6">Create New Task</h2>
        <form onSubmit={submitHandler} className="flex flex-wrap gap-6">

          <div className="w-full lg:w-[55%] space-y-4">
            <div>
              <label className="text-sm text-gray-400">Task Title</label>
              <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} type="text" placeholder="Make UI design" className="mt-1 w-full rounded-lg bg-transparent border border-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
            </div>

            <div>
              <label className="text-sm text-gray-400">Date</label>
              <input value={taskDate} onChange={(e) => setTaskDate(e.target.value)} type="date" className="mt-1 w-full rounded-lg bg-transparent border border-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
            </div>

            <div>
              <label className="text-sm text-gray-400">Assign To (Employee Name)</label>
              <input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} type="text" placeholder="Employee Name" className="mt-1 w-full rounded-lg bg-transparent border border-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
            </div>

            <div>
              <label className="text-sm text-gray-400">Category</label>
              <input value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)} type="text" placeholder="Dev / Design / Testing" className="mt-1 w-full rounded-lg bg-transparent border border-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
            </div>
          </div>

          <div className="w-full lg:w-[40%] flex flex-col">
            <label className="text-sm text-gray-400">Description</label>
            <textarea value={taskDescription} onChange={(e) => setDescription(e.target.value)} rows="8" placeholder="Write task details here..." className="mt-1 rounded-lg bg-transparent border border-gray-700 px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-emerald-500" />
            <button type="submit" className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-3 rounded-xl transition-all active:scale-95">Create Task</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateTask
