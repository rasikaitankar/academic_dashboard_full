import React, { useState } from 'react';

const ProgressTracker = () => {
  const [tasks, setTasks] = useState([]); // No default tasks
  const [newTaskName, setNewTaskName] = useState('');

  const addTask = () => {
    if (!newTaskName.trim()) return;
    const newTask = {
      id: Date.now(),
      name: newTaskName.trim(),
      progress: 0,
    };
    setTasks([...tasks, newTask]);
    setNewTaskName('');
  };

  const incrementProgress = (id) => {
    setTasks(tasks.map(task =>
      task.id === id && task.progress < 100
        ? { ...task, progress: task.progress + 10 }
        : task
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h2>📈 Your Progress Tracker</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Enter new task..."
        />
        <button onClick={addTask} style={{ marginLeft: '10px' }}>Add Task</button>
      </div>

      {tasks.length === 0 && <p>No tasks added yet.</p>}

      {tasks.map(task => (
        <div key={task.id} style={{ marginBottom: '1rem' }}>
          <strong>{task.name}</strong>
          <div style={{
            background: '#eee',
            height: '20px',
            width: '100%',
            borderRadius: '10px',
            marginTop: '5px',
            overflow: 'hidden'
          }}>
            <div
              style={{
                height: '100%',
                width: `${task.progress}%`,
                background: '#4caf50',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <p>{task.progress}% completed</p>
          <button onClick={() => incrementProgress(task.id)}>✅ Tick</button>
          <button onClick={() => removeTask(task.id)} style={{ marginLeft: '10px', color: 'red' }}>❌ Remove</button>
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;
