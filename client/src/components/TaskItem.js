import React from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const handleToggleComplete = () => {
    onUpdateTask(task._id, { completed: !task.completed });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task._id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <input
            type="checkbox"
            className="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
          />
          <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
            {task.title}
          </h3>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-date">
          Created: {formatDate(task.createdAt)}
        </div>
      </div>
      
      <div className="task-actions">
        <button
          onClick={handleDelete}
          className="btn btn-danger btn-small"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
