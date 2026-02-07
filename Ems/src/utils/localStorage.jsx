const employees = [
  {
  id: 1,
  firstName: "Rahul",
  email: "e@e.com",
  password: "123",
  taskCounts: {
    newTask: 0,
    active: 0,
    complete: 0,
    failed: 0
  },
  tasks: [
    //  NEW TASK
    // {
    //   title: "Prepare Daily Report",
    //   description: "Prepare and submit daily work report",
    //   date: "2026-02-01",
    //   category: "Reporting",
    //   newTask: true,
    //   active: false,
    //   complete: false,
    //   failed: false
    // },

    //  ACCEPTED TASK
    // {
    //   title: "Client Follow-up",
    //   description: "Call client regarding project updates",
    //   date: "2026-01-30",
    //   category: "Communication",
    //   newTask: false,
    //   active: true,
    //   complete: false,
    //   failed: false
    // },

    //  COMPLETED TASK
    // {
    //   title: "Bug Fixing",
    //   description: "Fix login page validation bug",
    //   date: "2026-01-28",
    //   category: "Development",
    //   newTask: false,
    //   active: false,
    //   complete: true,
    //   failed: false
    // },

    //  FAILED TASK
    // {
    //   title: "Server Deployment",
    //   description: "Deploy app on production server",
    //   date: "2026-01-27",
    //   category: "DevOps",
    //   newTask: false,
    //   active: false,
    //   complete: false,
    //   failed: true
    // }
  ]
}
,

  {
    id: 2,
    firstName: "Anjali",
    email: "employee2@example.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 0,
      complete: 0,
      failed: 0
    },
    tasks: [
      // {
      //   title: "Design Homepage",
      //   description: "Create homepage UI design in Figma",
      //   date: "2026-02-02",
      //   category: "Design",
      //   active: true,
      //   newTask: true,
      //   complete: false,
      //   failed: false
      // },
      // {
      //   title: "Update Logo",
      //   description: "Revise company logo colors",
      //   date: "2026-01-29",
      //   category: "Design",
      //   active: false,
      //   newTask: false,
      //   complete: true,
      //   failed: false
      // },
      // {
      //   title: "Design Review",
      //   description: "Review UI with development team",
      //   date: "2026-01-27",
      //   category: "Meeting",
      //   active: false,
      //   newTask: false,
      //   complete: false,
      //   failed: true
      // },
      // {
      //   title: "Wireframe Dashboard",
      //   description: "Create wireframe for admin dashboard",
      //   date: "2026-02-03",
      //   category: "Design",
      //   active: true,
      //   newTask: false,
      //   complete: false,
      //   failed: false
      // }
    ]
  },

  {
    id: 3,
    firstName: "Amit",
    email: "employee3@example.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 0,
      complete: 0,
      failed: 0
    },
    tasks: [
      // {
      //   title: "API Integration",
      //   description: "Integrate payment gateway API",
      //   date: "2026-02-01",
      //   category: "Backend",
      //   active: true,
      //   newTask: true,
      //   complete: false,
      //   failed: false
      // },
      // {
      //   title: "Database Backup",
      //   description: "Take full database backup",
      //   date: "2026-01-31",
      //   category: "Database",
      //   active: false,
      //   newTask: false,
      //   complete: true,
      //   failed: false
      // },
      // {
      //   title: "Optimize Queries",
      //   description: "Optimize slow SQL queries",
      //   date: "2026-01-29",
      //   category: "Database",
      //   active: false,
      //   newTask: false,
      //   complete: false,
      //   failed: true
      // }
    ]
  },

  {
    id: 4,
    firstName: "Priya",
    email: "employee4@example.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 0,
      complete: 0,
      failed: 0
    },
    tasks: [
      // {
      //   title: "Test Login Module",
      //   description: "Perform manual testing for login module",
      //   date: "2026-02-02",
      //   category: "Testing",
      //   active: true,
      //   newTask: true,
      //   complete: false,
      //   failed: false
      // },
      // {
      //   title: "Write Test Cases",
      //   description: "Write unit test cases for signup flow",
      //   date: "2026-01-30",
      //   category: "Testing",
      //   active: false,
      //   newTask: false,
      //   complete: true,
      //   failed: false
      // },
      // {
      //   title: "Bug Verification",
      //   description: "Verify fixed bugs from last sprint",
      //   date: "2026-01-28",
      //   category: "Testing",
      //   active: false,
      //   newTask: false,
      //   complete: false,
      //   failed: true
      // },
      // {
      //   title: "Automation Script",
      //   description: "Create automation script using Selenium",
      //   date: "2026-02-04",
      //   category: "Automation",
      //   active: true,
      //   newTask: false,
      //   complete: false,
      //   failed: false
      // }
    ]
  },

  {
    id: 5,
    firstName: "Neha",
    email: "employee5@example.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 0,
      complete: 0,
      failed: 0
    },
    tasks: [
      // {
      //   title: "Content Writing",
      //   description: "Write blog post for website",
      //   date: "2026-02-01",
      //   category: "Content",
      //   active: true,
      //   newTask: true,
      //   complete: false,
      //   failed: false
      // },
      // {
      //   title: "SEO Optimization",
      //   description: "Optimize website pages for SEO",
      //   date: "2026-01-31",
      //   category: "Marketing",
      //   active: false,
      //   newTask: false,
      //   complete: true,
      //   failed: false
      // },
      // {
      //   title: "Keyword Research",
      //   description: "Research keywords for upcoming campaign",
      //   date: "2026-01-27",
      //   category: "Marketing",
      //   active: false,
      //   newTask: false,
      //   complete: false,
      //   failed: true
      // }
    ]
  }
];



const admin = [
  {
    id: 100,
    email: "admin@example.com",
    password: "123"
  }
];

export const setLocalStorage = () => 
{
    localStorage.setItem('employees' , JSON.stringify(employees))
    localStorage.setItem('admin' , JSON.stringify(admin))
}

export const getLocalStorage = () => 
{
    const employees = JSON.parse(localStorage.getItem('employees'))
    const admin = JSON.parse(localStorage.getItem('admin'))
    
    return {employees , admin}
}

