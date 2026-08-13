import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Quiz from "./pages/Quiz";
import Analytics from "./pages/Analytics";
import Planner from "./pages/Planner";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100">

        {/* ================= SIDEBAR ================= */}

        <Sidebar />

        {/* ================= MAIN CONTENT ================= */}

        <main className="ml-64 min-h-screen">

          <Routes>

            {/* ================= DASHBOARD ================= */}

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            {/* ================= UPLOAD NOTES ================= */}

            <Route
              path="/upload"
              element={<Upload />}
            />

            {/* ================= QUIZ ================= */}

            <Route
              path="/quiz"
              element={<Quiz />}
            />

            {/* ================= ANALYTICS ================= */}

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            {/* ================= STUDY PLANNER ================= */}

            <Route
              path="/planner"
              element={<Planner />}
            />

            {/* ================= PROFILE ================= */}

            <Route
              path="/profile"
              element={<Profile />}
            />

            {/* ================= SETTINGS ================= */}

            <Route
              path="/settings"
              element={<Settings />}
            />

            {/* ================= INVALID ROUTE ================= */}

            <Route
              path="*"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

          </Routes>

        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;