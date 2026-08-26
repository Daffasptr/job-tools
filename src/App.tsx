import { useState } from 'react'

type Application = {
  company: string
  role: string
}

function App() {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [applications, setApplications] = useState<Application[]>([])

  const handleAdd = () => {
    setApplications([...applications, { company, role }])
    setCompany('')
    setRole('')
  }

  return (
    <div>
      <h1>Job Application Tracker</h1>

      <div>
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul>
        {applications.map((app, index) => (
          <li key={index}>
            {app.company} — {app.role}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
