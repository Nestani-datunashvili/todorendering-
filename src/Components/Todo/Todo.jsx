import React, { useCallback, useState } from "react";

const TodoItem = React.memo(({ task, onDelete, onDone, id }) => {
  console.log("TodoItem re-render");
  return (
    <li>
      {task}
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onDone(id)}>Done</button>
    </li>
  );
});

const DoneTask = React.memo(({ task, onDelete, onReset, id }) => {
  console.log("DoneTask re-render");
  return (
    <li>
      {task}
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onReset(id)}>Reset</button>
    </li>
  );
});

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [doneTasks, setDoneTasks] = useState([]);

  const handleChange = useCallback((event) => {
    setCurrentTask(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (currentTask.trim() === "") return; // Avoid adding empty tasks
      setTasks((prevTasks) => [...prevTasks, currentTask]);
      setCurrentTask("");
    },
    [currentTask]
  );

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((_, index) => index !== id));
  }, []);

  const handleDone = useCallback(
    (id) => {
      const taskToMove = tasks[id];
      setTasks((prevTasks) => prevTasks.filter((_, index) => index !== id));
      setDoneTasks((prevDoneTasks) => [...prevDoneTasks, taskToMove]);
    },
    [tasks]
  );

  const handleDoneDelete = useCallback((id) => {
    setDoneTasks((prevDoneTasks) =>
      prevDoneTasks.filter((_, index) => index !== id)
    );
  }, []);

  const handleReset = useCallback(
    (id) => {
      const taskToReset = doneTasks[id];
      setDoneTasks((prevDoneTasks) =>
        prevDoneTasks.filter((_, index) => index !== id)
      );
      setTasks((prevTasks) => [...prevTasks, taskToReset]);
    },
    [doneTasks]
  );

  return (
    <div>
      <h1>To Do App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          onChange={handleChange}
          value={currentTask}
        />
        <button type="submit">Add Task</button>
      </form>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <TodoItem
            key={index}
            id={index}
            task={task}
            onDelete={deleteTask}
            onDone={handleDone}
          />
        ))}
      </ul>
      <h2>Completed Tasks</h2>
      <ul>
        {doneTasks.map((task, index) => (
          <DoneTask
            key={index}
            id={index}
            task={task}
            onDelete={handleDoneDelete}
            onReset={handleReset}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todo;
