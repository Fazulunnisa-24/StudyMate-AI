import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">

        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-8">

            <p className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
              STUDYMATE
            </p>

            <h1 className="text-4xl font-bold text-slate-900 mt-2">
              Settings
            </h1>

            <p className="text-slate-500 mt-2">
              Customize your StudyMate experience.
            </p>

          </div>

          <div className="space-y-6">

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <h2 className="text-xl font-bold text-slate-900">
                Notifications
              </h2>

              <p className="text-sm text-slate-500 mt-1 mb-6">
                Control how StudyMate keeps you updated.
              </p>

              <div className="space-y-6">

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Notifications
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Receive StudyMate notifications.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setNotifications(!notifications)
                    }
                    className={`w-12 h-6 rounded-full transition-all ${
                      notifications
                        ? "bg-indigo-600"
                        : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${
                        notifications
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </button>

                </div>

                {/* Daily Reminder */}
                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Daily Study Reminder
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Get reminded to complete your study plan.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setDailyReminder(!dailyReminder)
                    }
                    className={`w-12 h-6 rounded-full transition-all ${
                      dailyReminder
                        ? "bg-indigo-600"
                        : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${
                        dailyReminder
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </button>

                </div>

              </div>
            </div>

            {/* Appearance */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <h2 className="text-xl font-bold text-slate-900">
                Appearance
              </h2>

              <p className="text-sm text-slate-500 mt-1 mb-6">
                Customize how StudyMate looks.
              </p>

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-semibold text-slate-800">
                    Dark Mode
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Use a darker interface for studying at night.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setDarkMode(!darkMode)
                  }
                  className={`w-12 h-6 rounded-full transition-all ${
                    darkMode
                      ? "bg-indigo-600"
                      : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${
                      darkMode
                        ? "translate-x-6"
                        : "translate-x-0"
                    }`}
                  />
                </button>

              </div>

            </div>

            {/* Study Preferences */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <h2 className="text-xl font-bold text-slate-900">
                Study Preferences
              </h2>

              <p className="text-sm text-slate-500 mt-1 mb-6">
                Choose your preferred learning style.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Study Session */}
                <div>

                  <label className="text-sm font-semibold text-slate-700">
                    Preferred Study Session
                  </label>

                  <select
                    className="w-full mt-2 p-3 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
                    defaultValue="25"
                  >
                    <option value="25">
                      25 minutes
                    </option>

                    <option value="45">
                      45 minutes
                    </option>

                    <option value="60">
                      60 minutes
                    </option>

                    <option value="90">
                      90 minutes
                    </option>
                  </select>

                </div>

                {/* Quiz Difficulty */}
                <div>

                  <label className="text-sm font-semibold text-slate-700">
                    Quiz Difficulty
                  </label>

                  <select
                    className="w-full mt-2 p-3 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
                    defaultValue="mixed"
                  >
                    <option value="mixed">
                      Mixed
                    </option>

                    <option value="easy">
                      Easy
                    </option>

                    <option value="medium">
                      Medium
                    </option>

                    <option value="hard">
                      Hard
                    </option>
                  </select>

                </div>

              </div>

            </div>

            {/* About StudyMate */}
            <div className="bg-slate-950 text-white rounded-2xl p-6">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center">
                  <span className="text-lg">
                    ✨
                  </span>
                </div>

                <div>
                  <h2 className="font-bold">
                    StudyMate AI
                  </h2>

                  <p className="text-xs text-slate-400">
                    AI Learning Assistant
                  </p>
                </div>

              </div>

              <p className="text-sm text-slate-400 mt-5 leading-relaxed">
                Learn smarter with AI-powered summaries,
                quizzes, study planning and personalized
                learning assistance.
              </p>

              <p className="text-xs text-slate-500 mt-5">
                StudyMate • Version 1.0
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;