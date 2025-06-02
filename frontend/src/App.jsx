"use client"

import { useEffect, useState } from "react"

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Récupération des tâches au chargement
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/tasks")
      if (!response.ok) throw new Error("Erreur lors du chargement des tâches")
      const data = await response.json()
      setTasks(data)
      setError("")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async () => {
    if (!newTask.trim()) return

    try {
      setLoading(true)
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask.trim() }),
      })

      if (!response.ok) throw new Error("Erreur lors de l'ajout de la tâche")

      const task = await response.json()
      setTasks([...tasks, task])
      setNewTask("")
      setError("")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteTask = async (id) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" })

      if (!response.ok) throw new Error("Erreur lors de la suppression")

      setTasks(tasks.filter((task) => task.id !== id))
      setError("")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  return (
    <div className="container">
      <h1>📝 Gestionnaire de Tâches</h1>

      {error && (
        <div
          style={{
            color: "#ff6b6b",
            background: "#ffe0e0",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ajouter une nouvelle tâche..."
          disabled={loading}
          style={{ flex: 1 }}
        />
        <button
          onClick={addTask}
          disabled={loading || !newTask.trim()}
          style={{
            backgroundColor: loading ? "#ccc" : "#646cff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "..." : "Ajouter"}
        </button>
      </div>

      {loading && tasks.length === 0 ? (
        <p>Chargement des tâches...</p>
      ) : (
        <div>
          <h3>Tâches ({tasks.length})</h3>
          {tasks.length === 0 ? (
            <p style={{ color: "#888", fontStyle: "italic" }}>Aucune tâche pour le moment. Ajoutez-en une !</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    margin: "5px 0",
                    background: "#2a2a2a",
                    borderRadius: "8px",
                  }}
                >
                  <span>{task.title}</span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    disabled={loading}
                    style={{
                      backgroundColor: "#ff6b6b",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className="students">Anthony Dos Santos - Victor Lemercier</p>
    </div>
  )
}

export default App
