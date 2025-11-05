import React, { useState, useMemo } from "react";
import "./../styles/App.css";

// Utility to create tasks
const generateTasks = () => {
  const tasks = [];
  for (let i = 1; i <= 25; i++) {
    tasks.push({ id: i, text: `Active Task ${i}`, completed: false });
  }
  for (let i = 26; i <= 50; i++) {
    tasks.push({ id: i, text: `Completed Task ${i}`, completed: true });
  }
  return tasks;
};

// Artificial slowdown function
const slowDown = () => {
  const start = Date.now();
  while (Date.now() - start < 5) {} // 5ms delay per task
};

const App = () => {
  const [tasks] = useState(generateTasks());
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
    console.log("Filtering tasks..."); // Demonstrates memoization
    return tasks.filter((task) => {
      slowDown(); // simulate heavy computation
      if (filter === "All") return true;
      if (filter === "Active") return !task.completed;
      if (filter === "Completed") return task.completed;
      return true;
    });
  }, [tasks, filter]);

  return (
    <div
      className="main-container"
      style={{
        background: darkMode ? "#222" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>Todo App with useMemo</h1>

      {/* Dark mode toggle */}
      <button onClick={() => setDarkMode((prev) => !prev)} style={{ marginBottom: "20px" }}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      {/* Filter buttons */}
      <div style={{ marginBottom: "20px" }}>
        {["All", "Active", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              marginRight: "10px",
              fontWeight: filter === tab ? "bold" : "normal",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task list */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "5px" }}>
            {task.text} {task.completed ? "(Completed)" : "(Active)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
