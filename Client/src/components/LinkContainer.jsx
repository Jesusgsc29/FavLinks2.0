import { useState, useEffect } from "react"
import Form from "./Form.jsx"
import Table from "./Table.jsx"

// Dev: Vite on 5173, API on 9002 → use full URL or a Vite proxy (see below)
// Production: same origin → "" is fine (requests go to /links, /new)
const API_BASE = import.meta.env.DEV ? "http://localhost:9002" : ""

function LinkContainer() {
  const [favLinks, setFavLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // GET /links — load links when the page loads
  const fetchLinks = async () => {
    try {
      setError(null)
      const res = await fetch(`${API_BASE}/links`)
      console.log(res)
      if (!res.ok) {
        throw new Error(`GET /links failed: ${res.status}`)
      }
      const data = await res.json()
      console.log(data)
      setFavLinks(data)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  // POST /new — called when Form submits
  const handleNewSubmission = async (data) => {
    try {
      setError(null)
      const res = await fetch(`${API_BASE}/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          URL: data.URL,
        }),
      })

      if (!res.ok) {
        throw new Error(`POST /new failed: ${res.status}`)
      }

      // refetch all links after a successful create
      const linksRes = await fetch(`${API_BASE}/links`)
      if (!linksRes.ok) {
        throw new Error(`GET /links failed: ${linksRes.status}`)
      }
      const links = await linksRes.json()
      setFavLinks(links)
    } catch (err) {
      console.error(err)
      setError(err.message)
      alert("Could not save link. Check the server and database.")
    }
  }

  //delete row with id 
  const handleDelete = async (id) => {
    try {
      setError(null)
      const res = await fetch(`${API_BASE}/links/${id}`, {
        method: 'DELETE',
      })
      console.log(res)
      if (!res.ok) {
        throw new Error(`DELETE failed: ${res.status}`)
      }
      // refetch (matches your POST flow)
      await fetchLinks()

    } catch (err) {
      console.error(err)
      setError(err.message)
      alert('Could not delete link.')
    }
  }

  //Update row with id
  const handleUpdate = async (id, updatedData) => {
    try {
      setError(null)
      const res = await fetch(`${API_BASE}/links/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updatedData.name,
          url: updatedData.url,
        }),
      })
  
      console.log(res)
      if (!res.ok) {
        throw new Error(`UPDATE failed: ${res.status}`)
      }
  
      await fetchLinks()
    } catch (err) {
      console.error(err)
      setError(err.message)
      alert('Could not update link.')
    }
  }


  if (loading) {
    return <p>Loading links...</p>
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Form onNewSubmit={handleNewSubmission} />

      <Table links={favLinks} onDelete={handleDelete} onUpdate={handleUpdate}/>
    </div>
  )
}

export default LinkContainer