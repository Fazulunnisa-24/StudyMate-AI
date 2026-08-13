import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  Brain,
  BarChart3,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Target,
  Sparkles,
  Trophy,
  TrendingUp,
  BookOpen,
  Zap,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [lastResult, setLastResult] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [hasQuiz, setHasQuiz] = useState(false);

  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    try {
      const savedResult =
        localStorage.getItem("studymate_last_result");

      if (savedResult) {
        setLastResult(JSON.parse(savedResult));
      }
    } catch (error) {
      console.error("Error loading last result:", error);
    }

    try {
      const savedTasks =
        localStorage.getItem("studymate_tasks");

      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        }
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }

    try {
      const quiz =
        sessionStorage.getItem("studymate_quiz");

      if (quiz) {
        const parsedQuiz = JSON.parse(quiz);

        if (
          Array.isArray(parsedQuiz) &&
          parsedQuiz.length > 0
        ) {
          setHasQuiz(true);
        }
      }
    } catch (error) {
      console.error("Error loading quiz:", error);
    }
  }, []);

  // =====================================================
  // CALCULATIONS
  // =====================================================

  const completedTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.completed === true ||
        task.done === true
    ).length;
  }, [tasks]);

  const taskProgress =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0;

  const score =
    lastResult?.percentage ??
    lastResult?.scorePercentage ??
    0;

  const correct =
    lastResult?.correct ??
    lastResult?.score ??
    0;

  const total =
    lastResult?.total ??
    0;

  const focusTopic = useMemo(() => {
    const topicStats =
      lastResult?.topicStats;

    if (!topicStats) {
      return "Start your first quiz";
    }

    const entries =
      Object.entries(topicStats);

    if (entries.length === 0) {
      return "Keep practicing";
    }

    entries.sort((a, b) => {
      const aPercentage =
        a[1].total > 0
          ? a[1].correct / a[1].total
          : 0;

      const bPercentage =
        b[1].total > 0
          ? b[1].correct / b[1].total
          : 0;

      return aPercentage - bPercentage;
    });

    return entries[0][0];
  }, [lastResult]);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "No quiz yet";

    try {
      return new Date(date).toLocaleDateString(
        "en-US",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return "Recent";
    }
  };

  // =====================================================
  // TASK TITLE
  // =====================================================

  const getTaskTitle = (task) => {
    return (
      task.title ||
      task.name ||
      task.task ||
      "Study session"
    );
  };

  // =====================================================
  // TOGGLE TASK
  // =====================================================

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];

    const current =
      updatedTasks[index];

    const completed =
      current.completed === true ||
      current.done === true;

    updatedTasks[index] = {
      ...current,
      completed: !completed,
      done: !completed,
    };

    setTasks(updatedTasks);

    localStorage.setItem(
      "studymate_tasks",
      JSON.stringify(updatedTasks)
    );
  };

  // =====================================================
  // SCORE RING
  // =====================================================

  const scoreRadius = 44;
  const circumference =
    2 * Math.PI * scoreRadius;

  const scoreOffset =
    circumference -
    (Math.min(score, 100) / 100) *
      circumference;

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar />

      <main className="flex-1 min-w-0">

        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-10 py-8">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">

            <div>

              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2">

                <Sparkles
                  size={16}
                  className="text-indigo-500"
                />

                AI-powered learning

              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">

                Welcome back 👋

              </h1>

              <p className="text-slate-500 mt-2 max-w-xl">

                Continue learning, test your knowledge,
                and stay on track with your study goals.

              </p>

            </div>

            <Link
              to="/upload"
              className="inline-flex items-center justify-center gap-2 bg-slate-950 text-white px-5 py-3 rounded-xl font-semibold hover:bg-slate-800 transition shadow-sm"
            >

              <Upload size={18} />

              Upload Notes

            </Link>

          </div>


          {/* ================================================= */}
          {/* HERO / QUICK ACTION AREA */}
          {/* ================================================= */}

          <section className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-7 sm:p-9 mb-7">

            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="absolute -bottom-32 left-1/3 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">

              <div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-slate-300">

                  <Zap size={15} />

                  Smart Study Mode

                </div>

                <h2 className="text-2xl sm:text-3xl font-bold mt-4">

                  Turn your notes into
                  <span className="text-indigo-300">
                    {" "}active learning.
                  </span>

                </h2>

                <p className="text-slate-400 mt-3 max-w-2xl leading-relaxed">

                  Upload your study material and let
                  StudyMate AI create summaries, quizzes,
                  and personalized insights for you.

                </p>

                <div className="flex flex-wrap gap-3 mt-6">

                  <Link
                    to="/upload"
                    className="inline-flex items-center gap-2 bg-white text-slate-950 px-5 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
                  >

                    <Upload size={17} />

                    Upload Notes

                    <ArrowRight size={16} />

                  </Link>

                  {hasQuiz && (
                    <Link
                      to="/quiz"
                      className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-5 py-3 rounded-xl font-semibold hover:bg-white/15 transition"
                    >

                      <Brain size={17} />

                      Continue Quiz

                    </Link>
                  )}

                </div>

              </div>


              <div className="hidden sm:flex w-32 h-32 lg:w-36 lg:h-36 rounded-3xl bg-white/5 border border-white/10 items-center justify-center">

                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center">

                  <Brain
                    size={42}
                    strokeWidth={1.5}
                  />

                </div>

              </div>

            </div>

          </section>


          {/* ================================================= */}
          {/* STAT CARDS */}
          {/* ================================================= */}

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-7">

            {/* SCORE */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">

              <div className="flex items-center justify-between">

                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">

                  <Target
                    size={20}
                    className="text-indigo-600"
                  />

                </div>

                <TrendingUp
                  size={18}
                  className="text-emerald-500"
                />

              </div>

              <p className="text-sm text-slate-500 mt-5">

                Latest Score

              </p>

              <p className="text-3xl font-bold text-slate-950 mt-1">

                {lastResult
                  ? `${score}%`
                  : "--"}

              </p>

            </div>


            {/* CORRECT */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">

              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">

                <CheckCircle2
                  size={20}
                  className="text-emerald-600"
                />

              </div>

              <p className="text-sm text-slate-500 mt-5">

                Correct Answers

              </p>

              <p className="text-3xl font-bold text-slate-950 mt-1">

                {lastResult
                  ? `${correct}/${total}`
                  : "--"}

              </p>

            </div>


            {/* TASKS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">

              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">

                <CalendarDays
                  size={20}
                  className="text-amber-600"
                />

              </div>

              <p className="text-sm text-slate-500 mt-5">

                Study Tasks

              </p>

              <p className="text-3xl font-bold text-slate-950 mt-1">

                {completedTasks}/{tasks.length}

              </p>

            </div>


            {/* FOCUS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">

              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">

                <BookOpen
                  size={20}
                  className="text-purple-600"
                />

              </div>

              <p className="text-sm text-slate-500 mt-5">

                Focus Area

              </p>

              <p className="text-lg font-bold text-slate-950 mt-1 truncate">

                {focusTopic}

              </p>

            </div>

          </div>


          {/* ================================================= */}
          {/* MAIN GRID */}
          {/* ================================================= */}

          <div className="grid lg:grid-cols-3 gap-6">

            {/* ================================================= */}
            {/* LEFT SIDE */}
            {/* ================================================= */}

            <div className="lg:col-span-2 space-y-6">

              {/* PERFORMANCE */}

              <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7">

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <h2 className="text-xl font-bold text-slate-950">

                      Your Performance

                    </h2>

                    <p className="text-sm text-slate-500 mt-1">

                      Your latest quiz performance at a glance.

                    </p>

                  </div>

                  <Link
                    to="/analytics"
                    className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-slate-950"
                  >

                    View Analytics

                    <ArrowRight size={15} />

                  </Link>

                </div>


                <div className="mt-7 flex flex-col sm:flex-row items-center gap-8">

                  {/* SCORE RING */}

                  <div className="relative w-36 h-36 shrink-0">

                    <svg
                      width="144"
                      height="144"
                      viewBox="0 0 144 144"
                      className="-rotate-90"
                    >

                      <circle
                        cx="72"
                        cy="72"
                        r={scoreRadius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        className="text-slate-100"
                      />

                      <circle
                        cx="72"
                        cy="72"
                        r={scoreRadius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                        className="text-indigo-600 transition-all duration-700"
                        strokeDasharray={circumference}
                        strokeDashoffset={scoreOffset}
                      />

                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">

                      <span className="text-3xl font-bold text-slate-950">

                        {lastResult
                          ? `${score}%`
                          : "--"}

                      </span>

                      <span className="text-xs text-slate-500">

                        latest score

                      </span>

                    </div>

                  </div>


                  <div className="flex-1 w-full">

                    <div className="flex items-center justify-between mb-2">

                      <span className="text-sm font-semibold text-slate-700">

                        Overall progress

                      </span>

                      <span className="text-sm font-bold text-slate-950">

                        {lastResult
                          ? `${score}%`
                          : "Start"}

                      </span>

                    </div>

                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-slate-950 rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(
                            score,
                            100
                          )}%`,
                        }}
                      />

                    </div>


                    <div className="grid grid-cols-2 gap-4 mt-6">

                      <div className="p-4 rounded-2xl bg-slate-50">

                        <p className="text-xs text-slate-500">

                          Latest attempt

                        </p>

                        <p className="font-bold text-slate-950 mt-1">

                          {lastResult
                            ? formatDate(
                                lastResult.date
                              )
                            : "No attempts"}

                        </p>

                      </div>


                      <div className="p-4 rounded-2xl bg-slate-50">

                        <p className="text-xs text-slate-500">

                          Questions answered

                        </p>

                        <p className="font-bold text-slate-950 mt-1">

                          {total || 0}

                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </section>


              {/* TASKS */}

              <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-xl font-bold text-slate-950">

                      Today's Study Plan

                    </h2>

                    <p className="text-sm text-slate-500 mt-1">

                      Stay consistent with your study goals.

                    </p>

                  </div>

                  <Link
                    to="/planner"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-slate-950"
                  >

                    Planner

                    <ArrowRight size={15} />

                  </Link>

                </div>


                <div className="mt-6">

                  {tasks.length === 0 ? (

                    <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">

                      <CalendarDays
                        size={28}
                        className="mx-auto text-slate-400"
                      />

                      <h3 className="font-semibold text-slate-900 mt-3">

                        No study tasks yet

                      </h3>

                      <p className="text-sm text-slate-500 mt-1">

                        Create a study plan to keep yourself
                        on track.

                      </p>

                      <Link
                        to="/planner"
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-xl bg-slate-950 text-white text-sm font-semibold"
                      >

                        Open Planner

                        <ArrowRight size={15} />

                      </Link>

                    </div>

                  ) : (

                    <div className="space-y-3">

                      {tasks
                        .slice(0, 5)
                        .map(
                          (task, index) => {

                            const completed =
                              task.completed ===
                                true ||
                              task.done ===
                                true;

                            return (

                              <button
                                key={
                                  task.id ||
                                  index
                                }
                                onClick={() =>
                                  toggleTask(
                                    index
                                  )
                                }
                                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition text-left"
                              >

                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0 ${
                                    completed
                                      ? "bg-slate-950 border-slate-950 text-white"
                                      : "border-slate-300"
                                  }`}
                                >

                                  {completed && (
                                    <CheckCircle2
                                      size={15}
                                    />
                                  )}

                                </div>


                                <div className="flex-1 min-w-0">

                                  <p
                                    className={`font-semibold truncate ${
                                      completed
                                        ? "text-slate-400 line-through"
                                        : "text-slate-900"
                                    }`}
                                  >

                                    {getTaskTitle(
                                      task
                                    )}

                                  </p>


                                  {task.time && (

                                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">

                                      <Clock3
                                        size={12}
                                      />

                                      {task.time}

                                    </div>

                                  )}

                                </div>


                                <ArrowRight
                                  size={17}
                                  className="text-slate-400"
                                />

                              </button>

                            );

                          }
                        )}

                    </div>

                  )}

                </div>


                {tasks.length > 0 && (

                  <div className="mt-5">

                    <div className="flex justify-between text-xs mb-2">

                      <span className="text-slate-500">

                        Daily progress

                      </span>

                      <span className="font-semibold text-slate-700">

                        {taskProgress}%

                      </span>

                    </div>

                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{
                          width: `${taskProgress}%`,
                        }}
                      />

                    </div>

                  </div>

                )}

              </section>

            </div>


            {/* ================================================= */}
            {/* RIGHT SIDE */}
            {/* ================================================= */}

            <div className="space-y-6">

              {/* QUICK ACTIONS */}

              <section className="bg-white border border-slate-200 rounded-3xl p-6">

                <div className="flex items-center gap-2">

                  <Zap
                    size={18}
                    className="text-amber-500"
                  />

                  <h2 className="text-lg font-bold">

                    Quick Actions

                  </h2>

                </div>


                <div className="space-y-3 mt-5">

                  <Link
                    to="/upload"
                    className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition"
                  >

                    <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">

                      <Upload
                        size={20}
                        className="text-indigo-600"
                      />

                    </div>

                    <div className="flex-1">

                      <p className="font-semibold text-slate-900">

                        Upload Notes

                      </p>

                      <p className="text-xs text-slate-500 mt-0.5">

                        Generate AI study material

                      </p>

                    </div>

                    <ArrowRight
                      size={17}
                      className="text-slate-400 group-hover:translate-x-1 transition"
                    />

                  </Link>


                  <Link
                    to="/quiz"
                    className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition"
                  >

                    <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">

                      <Brain
                        size={20}
                        className="text-purple-600"
                      />

                    </div>

                    <div className="flex-1">

                      <p className="font-semibold text-slate-900">

                        Take Quiz

                      </p>

                      <p className="text-xs text-slate-500 mt-0.5">

                        Test your knowledge

                      </p>

                    </div>

                    <ArrowRight
                      size={17}
                      className="text-slate-400 group-hover:translate-x-1 transition"
                    />

                  </Link>


                  <Link
                    to="/analytics"
                    className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition"
                  >

                    <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">

                      <BarChart3
                        size={20}
                        className="text-emerald-600"
                      />

                    </div>

                    <div className="flex-1">

                      <p className="font-semibold text-slate-900">

                        View Analytics

                      </p>

                      <p className="text-xs text-slate-500 mt-0.5">

                        Track your performance

                      </p>

                    </div>

                    <ArrowRight
                      size={17}
                      className="text-slate-400 group-hover:translate-x-1 transition"
                    />

                  </Link>

                </div>

              </section>


              {/* FOCUS CARD */}

              <section className="bg-white border border-slate-200 rounded-3xl p-6">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <Trophy
                      size={18}
                      className="text-amber-500"
                    />

                    <h2 className="text-lg font-bold">

                      Focus Area

                    </h2>

                  </div>

                </div>


                <div className="mt-5 p-5 rounded-2xl bg-slate-950 text-white">

                  <p className="text-xs text-slate-400">

                    Recommended focus

                  </p>

                  <h3 className="text-xl font-bold mt-1">

                    {focusTopic}

                  </h3>


                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">

                    Keep practicing your weaker topics
                    to improve your overall performance.

                  </p>


                  <Link
                    to="/quiz"
                    className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white hover:text-slate-300"
                  >

                    Practice now

                    <ArrowRight size={15} />

                  </Link>

                </div>

              </section>


              {/* LAST QUIZ */}

              <section className="bg-white border border-slate-200 rounded-3xl p-6">

                <div className="flex items-center gap-2">

                  <FileText
                    size={18}
                    className="text-slate-700"
                  />

                  <h2 className="text-lg font-bold">

                    Latest Quiz

                  </h2>

                </div>


                {lastResult ? (

                  <div className="mt-5">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm text-slate-500">

                          Completed

                        </p>

                        <p className="font-bold text-slate-950 mt-1">

                          {formatDate(
                            lastResult.date
                          )}

                        </p>

                      </div>


                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">

                        <span className="font-bold text-slate-950">

                          {score}%

                        </span>

                      </div>

                    </div>


                    <Link
                      to="/analytics"
                      className="flex items-center justify-center gap-2 w-full mt-5 py-3 rounded-xl bg-slate-950 text-white font-semibold text-sm hover:bg-slate-800 transition"
                    >

                      View Results

                      <ArrowRight size={15} />

                    </Link>

                  </div>

                ) : (

                  <div className="mt-5">

                    <p className="text-sm text-slate-500 leading-relaxed">

                      You haven't completed a quiz yet.
                      Upload your notes and generate your
                      first AI quiz.

                    </p>


                    <Link
                      to="/upload"
                      className="flex items-center justify-center gap-2 w-full mt-5 py-3 rounded-xl bg-slate-950 text-white font-semibold text-sm hover:bg-slate-800 transition"
                    >

                      Start Learning

                      <ArrowRight size={15} />

                    </Link>

                  </div>

                )}

              </section>

            </div>

          </div>


          {/* ================================================= */}
          {/* BOTTOM CTA */}
          {/* ================================================= */}

          <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center shrink-0">

                  <Sparkles size={21} />

                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-950">

                    Ready for your next study session?

                  </h2>

                  <p className="text-sm text-slate-500 mt-1">

                    Upload your notes and let StudyMate AI
                    do the heavy lifting.

                  </p>

                </div>

              </div>


              <Link
                to="/upload"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white font-semibold hover:bg-slate-800 transition shrink-0"
              >

                Upload Notes

                <ArrowRight size={17} />

              </Link>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;