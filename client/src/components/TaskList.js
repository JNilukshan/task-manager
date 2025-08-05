import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <h2>Your Tasks</h2>
        <div className="no-tasks">
          No tasks yet. Add your first task above!
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Your Tasks ({tasks.length})</h2>
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
