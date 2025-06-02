import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Récupération des todos au chargement
  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = () => {
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    })
      .then((res) => res.json())
      .then((todo) => {
        setTodos([...todos, todo]);
        setNewTodo('');
      });
  };

  const deleteTodo = (id) => {
    fetch(`/api/todos/${id}`, { method: 'DELETE' }).then(() =>
      setTodos(todos.filter((todo) => todo.id !== id))
    );
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>TODO</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Ajouter une tâche"
      />
      <button onClick={addTodo}>Ajouter</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <p className="students">Anthony Dos Santos - Victor Lemercier</p>
    </div>
  );
}

export default App;
