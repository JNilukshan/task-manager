import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:5000/api';

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Update a task
  const updateTask = async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <p>Manage your daily tasks efficiently</p>
      </header>
      
      <main className="App-main">
        <TaskForm onAddTask={addTask} />
        
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onUpdateTask={updateTask} 
            onDeleteTask={deleteTask} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
