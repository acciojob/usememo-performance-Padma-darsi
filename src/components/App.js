import React, { useState, useMemo } from "react";
import "./../styles/App.css";

// Generate 50 tasks: 25 active, 25 completed
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

// Simulate heavy computation
const slowDown = (ms = 5) => {
  const start = performance.now();
  while (performance.now() - start < ms) {}
};

const App = () => {
  const [tasks] = useState(generateTasks()); // Tasks don't change
  const [filter, setFilter] = useState("All"); // Filter tab state
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      slowDown(); // artificial slowdown
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
        backgroundColor: darkMode ? "#222" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>Todo App - useMemo Performance</h1>

      {/* Dark mode toggle */}
      <button onClick={() => setDarkMode(!darkMode)} style={{ marginBottom: "20px" }}>
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

      {/* Task List */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {task.text} {task.completed ? "(Completed)" : "(Active)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
