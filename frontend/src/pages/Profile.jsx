import React from "react";
import Sidebar from "../components/Sidebar";

function Profile() {
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
              My Profile
            </h1>

            <p className="text-slate-500 mt-2">
              Manage your student profile and learning information.
            </p>

          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

            {/* Profile Header */}
            <div className="flex items-center gap-6 pb-8 border-b border-slate-200">

              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-slate-950 text-white flex items-center justify-center text-3xl font-bold shrink-0">
                S
              </div>

              {/* User Info */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Student
                </h2>

                <p className="text-slate-500 mt-1">
                  StudyMate Learner
                </p>

                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                  Active Learner
                </span>
              </div>

            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

              {/* Name */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Name
                </label>

                <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                  Student
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Role
                </label>

                <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                  Student
                </div>
              </div>

              {/* Learning Goal */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Learning Goal
                </label>

                <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                  Improve my knowledge and exam preparation
                </div>
              </div>

              {/* Study Streak */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Study Streak
                </label>

                <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                  🔥 5 days
                </div>
              </div>

            </div>

            {/* Learning Summary */}
            <div className="mt-10">

              <h3 className="text-lg font-bold text-slate-900">
                Learning Summary
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">

                {/* Notes */}
                <div className="p-5 rounded-xl bg-indigo-50">

                  <p className="text-2xl font-bold text-indigo-600">
                    12
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    Notes studied
                  </p>

                </div>

                {/* Quizzes */}
                <div className="p-5 rounded-xl bg-emerald-50">

                  <p className="text-2xl font-bold text-emerald-600">
                    8
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    Quizzes completed
                  </p>

                </div>

                {/* Average Score */}
                <div className="p-5 rounded-xl bg-amber-50">

                  <p className="text-2xl font-bold text-amber-600">
                    76%
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    Average score
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;