import React, { useState } from "react";

export default function Planner() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Review study notes",
      subject: "Computer Science",
      time: "09:00 AM",
      completed: true,
    },
    {
      id: 2,
      title: "Practice DSA questions",
      subject: "Data Structures",
      time: "11:00 AM",
      completed: false,
    },
    {
      id: 3,
      title: "Revise SQL concepts",
      subject: "Database Management",
      time: "03:00 PM",
      completed: false,
    },
    {
      id: 4,
      title: "Take practice quiz",
      subject: "General Revision",
      time: "07:00 PM",
      completed: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    subject: "",
    time: "",
  });

  // Mark task as completed / incomplete
  const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // Remove completed task
  const removeTask = (id) => {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  };

  // Add new task
  const addTask = () => {
    if (!newTask.title.trim()) {
      alert("Please enter a task.");
      return;
    }

    const task = {
      id: Date.now(),
      title: newTask.title.trim(),
      subject:
        newTask.subject.trim() || "General Study",
      time: newTask.time || "Anytime",
      completed: false,
    };

    setTasks((previous) => [...previous, task]);

    setNewTask({
      title: "",
      subject: "",
      time: "",
    });

    setShowForm(false);
  };

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const totalTasks = tasks.length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* ================= HEADER ================= */}

        <div style={styles.header}>
          <div>
            <p style={styles.label}>
              STUDYMATE
            </p>

            <h1 style={styles.title}>
              Study Planner
            </h1>

            <p style={styles.subtitle}>
              Organize your study sessions and stay
              consistent with your learning goals.
            </p>
          </div>

          <button
            style={styles.addButton}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "✕ Close" : "+ Add Task"}
          </button>
        </div>

        {/* ================= ADD TASK FORM ================= */}

        {showForm && (
          <div style={styles.formCard}>

            <h2 style={styles.formTitle}>
              Add a study task
            </h2>

            <div style={styles.formGrid}>

              <input
                type="text"
                placeholder="Task name"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    title: e.target.value,
                  })
                }
                style={styles.input}
              />

              <input
                type="text"
                placeholder="Subject"
                value={newTask.subject}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    subject: e.target.value,
                  })
                }
                style={styles.input}
              />

              <input
                type="time"
                value={newTask.time}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    time: e.target.value,
                  })
                }
                style={styles.input}
              />

              <button
                style={styles.saveButton}
                onClick={addTask}
              >
                Save Task
              </button>

            </div>
          </div>
        )}

        {/* ================= PROGRESS ================= */}

        <div style={styles.progressCard}>

          <div style={styles.progressHeader}>

            <div>
              <p style={styles.progressLabel}>
                TODAY'S PROGRESS
              </p>

              <h2 style={styles.progressTitle}>
                Keep going! 💪
              </h2>
            </div>

            <div style={styles.progressNumber}>
              {progress}%
            </div>

          </div>

          <div style={styles.progressBackground}>
            <div
              style={{
                ...styles.progressBar,
                width: `${progress}%`,
              }}
            />
          </div>

          <p style={styles.progressText}>
            {completedTasks} of {totalTasks} tasks completed
          </p>

        </div>

        {/* ================= MAIN CONTENT ================= */}

        <div style={styles.mainGrid}>

          {/* ================= TASKS ================= */}

          <div style={styles.tasksCard}>

            <div style={styles.cardHeader}>

              <div>
                <p style={styles.label}>
                  TODAY
                </p>

                <h2 style={styles.cardTitle}>
                  Your Study Plan
                </h2>
              </div>

              <span style={styles.taskCount}>
                {totalTasks}{" "}
                {totalTasks === 1 ? "task" : "tasks"}
              </span>

            </div>

            <div style={styles.tasksList}>

              {tasks.length === 0 ? (
                <div style={styles.empty}>

                  <div style={styles.emptyIcon}>
                    🎉
                  </div>

                  <h3 style={styles.emptyTitle}>
                    All tasks completed!
                  </h3>

                  <p>
                    Great work! Add another task
                    whenever you're ready.
                  </p>

                </div>
              ) : (
                tasks.map((task) => (

                  <div
                    key={task.id}
                    style={{
                      ...styles.task,
                      ...(task.completed
                        ? styles.completedTask
                        : {}),
                    }}
                  >

                    {/* Checkbox */}

                    <button
                      onClick={() =>
                        toggleTask(task.id)
                      }
                      style={{
                        ...styles.checkbox,
                        ...(task.completed
                          ? styles.checked
                          : {}),
                      }}
                      aria-label={
                        task.completed
                          ? "Mark as incomplete"
                          : "Mark as completed"
                      }
                    >
                      {task.completed ? "✓" : ""}
                    </button>

                    {/* Task information */}

                    <div style={styles.taskInfo}>

                      <h3
                        style={{
                          ...styles.taskTitle,
                          ...(task.completed
                            ? styles.completedTitle
                            : {}),
                        }}
                      >
                        {task.title}
                      </h3>

                      <div style={styles.taskMeta}>

                        <span>
                          📚 {task.subject}
                        </span>

                        <span>
                          🕐 {task.time}
                        </span>

                      </div>

                    </div>

                    {/* Remove button only for completed tasks */}

                    {task.completed && (
                      <button
                        onClick={() =>
                          removeTask(task.id)
                        }
                        style={styles.removeButton}
                      >
                        Remove
                      </button>
                    )}

                  </div>

                ))
              )}

            </div>

          </div>

          {/* ================= RIGHT COLUMN ================= */}

          <div>

            {/* Study Stats */}

            <div style={styles.sideCard}>

              <p style={styles.label}>
                STUDY STATS
              </p>

              <h2 style={styles.cardTitle}>
                Your Routine
              </h2>

              <div style={styles.statRow}>

                <div style={styles.statIcon}>
                  ⏱️
                </div>

                <div>
                  <strong style={styles.statValue}>
                    2.5 hrs
                  </strong>

                  <p style={styles.statText}>
                    Study time today
                  </p>
                </div>

              </div>

              <div style={styles.statRow}>

                <div style={styles.statIcon}>
                  🔥
                </div>

                <div>
                  <strong style={styles.statValue}>
                    5 days
                  </strong>

                  <p style={styles.statText}>
                    Current streak
                  </p>
                </div>

              </div>

              <div style={styles.statRow}>

                <div style={styles.statIcon}>
                  🎯
                </div>

                <div>
                  <strong style={styles.statValue}>
                    {progress}%
                  </strong>

                  <p style={styles.statText}>
                    Today's completion
                  </p>
                </div>

              </div>

            </div>

            {/* Study Tip */}

            <div style={styles.tipCard}>

              <div style={styles.tipIcon}>
                💡
              </div>

              <h3 style={styles.tipTitle}>
                Study Tip
              </h3>

              <p style={styles.tipText}>
                Break large topics into smaller
                sessions. Short, focused study
                sessions are easier to maintain.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}


// =====================================================
// STYLES
// =====================================================

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f3f6fb",
    padding: "40px",
    boxSizing: "border-box",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    color: "#071022",
  },

  container: {
    maxWidth: "1150px",
    margin: "0 auto",
  },

  // ================= HEADER =================

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  label: {
    color: "#5b4bff",
    fontWeight: "800",
    fontSize: "12px",
    letterSpacing: "1.4px",
    margin: "0 0 7px",
  },

  title: {
    margin: 0,
    fontSize: "40px",
    fontWeight: "800",
  },

  subtitle: {
    color: "#64748b",
    fontSize: "16px",
    marginTop: "10px",
    lineHeight: "1.5",
  },

  addButton: {
    border: "none",
    background: "#080d29",
    color: "#ffffff",
    padding: "14px 20px",
    borderRadius: "11px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
  },

  // ================= FORM =================

  formCard: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "25px",
    marginBottom: "22px",
    boxShadow:
      "0 7px 25px rgba(15,23,42,0.06)",
  },

  formTitle: {
    margin: "0 0 18px",
    fontSize: "20px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "2fr 1.3fr 1fr auto",
    gap: "12px",
  },

  input: {
    border: "1px solid #dce2eb",
    borderRadius: "10px",
    padding: "13px",
    outline: "none",
    fontFamily: "inherit",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  saveButton: {
    border: "none",
    borderRadius: "10px",
    padding: "13px 18px",
    background: "#5b4bff",
    color: "#ffffff",
    fontWeight: "700",
    cursor: "pointer",
  },

  // ================= PROGRESS =================

  progressCard: {
    background: "#080d29",
    color: "#ffffff",
    borderRadius: "20px",
    padding: "27px",
    marginBottom: "22px",
  },

  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressLabel: {
    color: "#9da6c7",
    fontWeight: "800",
    fontSize: "12px",
    letterSpacing: "1.4px",
    margin: "0 0 7px",
  },

  progressTitle: {
    margin: 0,
    fontSize: "23px",
  },

  progressNumber: {
    fontSize: "34px",
    fontWeight: "800",
  },

  progressBackground: {
    height: "9px",
    background: "#292f50",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "22px",
  },

  progressBar: {
    height: "100%",
    background: "#7c6cff",
    borderRadius: "10px",
    transition: "width 0.3s ease",
  },

  progressText: {
    color: "#b6bdd7",
    margin: "12px 0 0",
    fontSize: "13px",
  },

  // ================= MAIN GRID =================

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: "22px",
  },

  // ================= TASK CARD =================

  tasksCard: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "27px",
    boxShadow:
      "0 7px 25px rgba(15,23,42,0.06)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "22px",
  },

  taskCount: {
    background: "#eef2ff",
    color: "#4f46e5",
    padding: "8px 12px",
    borderRadius: "9px",
    fontSize: "12px",
    fontWeight: "700",
  },

  tasksList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  task: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px",
    border: "1px solid #e8edf3",
    borderRadius: "14px",
    transition: "all 0.2s ease",
  },

  completedTask: {
    background: "#f8fafc",
  },

  // ================= CHECKBOX =================

  checkbox: {
    width: "27px",
    height: "27px",
    borderRadius: "8px",
    border: "2px solid #cbd5e1",
    background: "#ffffff",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "800",
    fontSize: "14px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  checked: {
    border: "2px solid #5b4bff",
    background: "#5b4bff",
  },

  // ================= TASK INFO =================

  taskInfo: {
    flex: 1,
    minWidth: 0,
  },

  taskTitle: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "700",
  },

  completedTitle: {
    textDecoration: "line-through",
    color: "#94a3b8",
  },

  taskMeta: {
    display: "flex",
    gap: "15px",
    marginTop: "6px",
    color: "#94a3b8",
    fontSize: "12px",
    flexWrap: "wrap",
  },

  // ================= REMOVE BUTTON =================

  removeButton: {
    border: "1px solid #fecaca",
    background: "#fff1f2",
    color: "#dc2626",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    flexShrink: 0,
  },

  // ================= EMPTY STATE =================

  empty: {
    textAlign: "center",
    padding: "45px 20px",
    color: "#64748b",
  },

  emptyIcon: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  emptyTitle: {
    color: "#0f172a",
  },

  // ================= RIGHT SIDE =================

  sideCard: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "25px",
    marginBottom: "20px",
    boxShadow:
      "0 7px 25px rgba(15,23,42,0.06)",
  },

  statRow: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "15px 0",
    borderBottom: "1px solid #edf0f5",
  },

  statIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "11px",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },

  statValue: {
    fontSize: "15px",
  },

  statText: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "12px",
  },

  // ================= TIP =================

  tipCard: {
    background: "#eef2ff",
    borderRadius: "18px",
    padding: "22px",
  },

  tipIcon: {
    fontSize: "25px",
    marginBottom: "5px",
  },

  tipTitle: {
    margin: "5px 0",
    fontSize: "17px",
  },

  tipText: {
    color: "#64748b",
    fontSize: "13px",
    lineHeight: "1.6",
    margin: 0,
  },
};