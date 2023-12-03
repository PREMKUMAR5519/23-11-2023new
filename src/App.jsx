import React, { useState } from 'react';
import './App.css'

const TodoList = () => {
  const [tasks, setTasks] = useState({
    completed: [],
    incompleted: [],
  });
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [click, setClick] = useState(true)

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks({
        ...tasks,
        incompleted: [...tasks.incompleted, { text: newTask, id: Date.now() }],
      });
      setNewTask('');
    }
  };

  const completeTask = (task) => {
    const updatedIncompletedTasks = tasks.incompleted.filter((e) => e.id !== task.id);
    setTasks({
      incompleted: updatedIncompletedTasks,
      completed: [...tasks.completed, task],
    });
  };

  const deleteTask = (task) => {
    const updatedIncompletedTasks = tasks.incompleted.filter((t) => t.id !== task.id);
    const updatedCompletedTasks = tasks.completed.filter((t) => t.id !== task.id);

    setTasks({
      incompleted: updatedIncompletedTasks,
      completed: updatedCompletedTasks,
    });
  };

  const editTask = (task) => {
    setEditingTask(task.id);
    setNewTask(task.text);
  };

  const updateTask = () => {
    if (newTask.trim() !== '') {
      const updatedIncompletedTasks = tasks.incompleted.map((task) =>
        task.id === editingTask ? { ...task, text: newTask } : task
      );

      const updatedCompletedTasks = tasks.completed.map((task) =>
        task.id === editingTask ? { ...task, text: newTask } : task
      );

      setTasks({
        incompleted: updatedIncompletedTasks,
        completed: updatedCompletedTasks,
      });

      setEditingTask(null);
      setNewTask('');
    }
  };

  const displayTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.completed;
      case 'incompleted':
        return tasks.incompleted;
      default:
        return [...tasks.incompleted, ...tasks.completed];
    }
  };

  return (
    <div className='container'>
      <h1 className='hellolist'>TODO-LIST</h1>
      <div className='bigcontainer'>
        <div id='index' class="input-group mb-3">
          <div>          <input type="text" class="form-control" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter your Task" aria-label="Recipient's username" aria-describedby="button-addon2" />
          </div>
          <div>          <button  class="btn btn-outline-secondary" onClick={editingTask ? updateTask : addTask} type="button" id="button-addon2">{editingTask ? 'Update Task' : 'Add Task'}</button>
          </div>
        </div>
      </div>
      <div id='buttongroup' class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" className={click ? "completed" : "completed1"} onClick={() => setClick(true) || setFilter('completed')}>Completed</button>
        <button type="button" className={click ? "incompleted" : "incompleted1"} onClick={() => setClick(false) || setFilter('incompleted')}>Incompleted</button>
      </div>
      <div id='taskcontainer'>
        <h2>TASKS</h2>
        <div id='taskcon'>
          {displayTasks().map((task) => (
            <div id='taskconsy' key={task.id} className="card text-bg-secondary mb-3" style={{ maxwidth: '18rem' }}>
              <div className="card-header">TASK:{task.id}</div>
              <div className="card-body">
                <h5 className="card-title"><p>{task.text}</p></h5>
                <button className='edit' onClick={() => editTask(task)}>EDIT</button>
                <button className='delete' onClick={() => deleteTask(task)}>DELETE</button>
                <button className='complete' onClick={() => completeTask(task)}>COMPLETED</button>
              </div>
            </div>))}
        </div>


      </div>
    </div>
  )
}

export default TodoList;
