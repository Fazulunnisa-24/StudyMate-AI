import { useEffect, useMemo, useState } from "react";

import {
  BarChart3,
  Trophy,
  Target,
  CheckCircle2,
  XCircle,
  TrendingUp,
  BookOpen,
  Brain,
  RotateCcw,
  ClipboardCheck,
  Award,
  Flame,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";


function Analytics() {

  const [result, setResult] = useState(null);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);


  // =====================================================
  // LOAD ANALYTICS
  // =====================================================

  useEffect(() => {

    loadAnalytics();

  }, []);


  const loadAnalytics = async () => {

    setLoading(true);


    // ---------------------------------------------------
    // First load local data immediately
    // ---------------------------------------------------

    try {

      const savedResult =
        localStorage.getItem(
          "studymate_last_result"
        );


      const savedHistory =
        localStorage.getItem(
          "studymate_quiz_history"
        );


      if (savedResult) {

        setResult(
          JSON.parse(savedResult)
        );

      }


      if (savedHistory) {

        setHistory(
          JSON.parse(savedHistory)
        );

      }

    } catch (error) {

      console.error(
        "Unable to load local analytics:",
        error
      );

    }


    // ---------------------------------------------------
    // Then try backend
    // ---------------------------------------------------

    try {

      const response =
        await fetch(
          `${API_URL}/quiz-results`
        );


      if (
        response.ok
      ) {

        const data =
          await response.json();


        console.log(
          "Backend analytics:",
          data
        );


        /*
         * We support several possible backend
         * response formats so the frontend
         * doesn't break if your API structure changes.
         */

        let backendHistory = [];


        if (
          Array.isArray(data)
        ) {

          backendHistory =
            data;

        } else if (
          Array.isArray(data.results)
        ) {

          backendHistory =
            data.results;

        } else if (
          Array.isArray(data.history)
        ) {

          backendHistory =
            data.history;

        }


        if (
          backendHistory.length > 0
        ) {

          const normalized =
            backendHistory.map(
              normalizeResult
            );


          setHistory(
            normalized
          );


          setResult(
            normalized[
              normalized.length - 1
            ]
          );

        }

      }

    } catch (error) {

      console.log(
        "Backend analytics unavailable. Using local data."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // NORMALIZE RESULT
  // =====================================================

  const normalizeResult = (item) => {

    return {

      date:
        item.date ||
        item.created_at ||
        new Date().toISOString(),

      score:
        Number(
          item.score ??
          item.correct ??
          0
        ),

      total:
        Number(
          item.total ??
          item.questions ??
          0
        ),

      percentage:
        Number(
          item.percentage ??
          item.accuracy ??
          0
        ),

      correct:
        Number(
          item.correct ??
          item.score ??
          0
        ),

      wrong:
        Number(
          item.wrong ??
          Math.max(
            0,
            Number(
              item.total ?? 0
            ) -
            Number(
              item.score ??
              item.correct ??
              0
            )
          )
        ),

      topicStats:
        item.topicStats ||
        item.topic_stats ||
        {},

      difficultyStats:
        item.difficultyStats ||
        item.difficulty_stats ||
        {},

    };

  };


  // =====================================================
  // CALCULATED STATS
  // =====================================================

  const overallStats =
    useMemo(() => {

      if (
        history.length === 0
      ) {

        return {

          average: 0,

          best: 0,

          quizzes: 0,

        };

      }


      const percentages =
        history.map(
          (item) =>
            Number(
              item.percentage || 0
            )
        );


      const average =
        Math.round(
          percentages.reduce(
            (sum, value) =>
              sum + value,
            0
          ) /
          percentages.length
        );


      const best =
        Math.max(
          ...percentages
        );


      return {

        average,

        best,

        quizzes:
          history.length,

      };

    }, [history]);


  // =====================================================
  // TOPICS
  // =====================================================

  const topicEntries =
    Object.entries(
      result?.topicStats || {}
    );


  const difficultyEntries =
    Object.entries(
      result?.difficultyStats || {}
    );


  const strongestTopic =
    topicEntries.length > 0
      ? [...topicEntries].sort(
          (a, b) =>
            getPercentage(
              b[1]
            ) -
            getPercentage(
              a[1]
            )
        )[0]
      : null;


  const weakestTopic =
    topicEntries.length > 0
      ? [...topicEntries].sort(
          (a, b) =>
            getPercentage(
              a[1]
            ) -
            getPercentage(
              b[1]
            )
        )[0]
      : null;


  // =====================================================
  // CLEAR HISTORY
  // =====================================================

  const clearAnalytics = () => {

    const confirmed =
      window.confirm(
        "Clear all StudyMate quiz analytics?"
      );


    if (!confirmed) {

      return;

    }


    localStorage.removeItem(
      "studymate_last_result"
    );


    localStorage.removeItem(
      "studymate_quiz_history"
    );


    setResult(null);

    setHistory([]);

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading && !result) {

    return (

      <div className="flex min-h-screen bg-slate-100">

        <Sidebar />

        <main className="flex-1 flex items-center justify-center">

          <div className="text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-950 text-white flex items-center justify-center">

              <BarChart3
                size={25}
              />

            </div>


            <p className="mt-5 text-slate-600 font-semibold">

              Loading your analytics...

            </p>

          </div>

        </main>

      </div>

    );

  }


  // =====================================================
  // NO DATA
  // =====================================================

  if (!result) {

    return (

      <div className="flex min-h-screen bg-slate-100">

        <Sidebar />

        <main className="flex-1 flex items-center justify-center px-6">

          <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl shadow-sm p-8 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">

              <BarChart3
                size={30}
                className="text-slate-700"
              />

            </div>


            <h1 className="text-2xl font-bold text-slate-950 mt-6">

              No analytics yet

            </h1>


            <p className="text-slate-500 mt-3 leading-6">

              Complete an AI-generated quiz and StudyMate
              will show your performance here.

            </p>


            <Link
              to="/upload"
              className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-950 text-white font-semibold hover:bg-slate-800 transition"
            >

              <BookOpen
                size={18}
              />

              Start Studying

            </Link>

          </div>

        </main>

      </div>

    );

  }


  // =====================================================
  // MAIN UI
  // =====================================================

  return (

    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />


      <main className="flex-1 min-w-0 px-6 md:px-10 py-8">

        <div className="max-w-6xl mx-auto">


          {/* ============================================
              HEADER
          ============================================ */}

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">

            <div>

              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">

                <BarChart3
                  size={16}
                />

                <span>
                  Your Progress
                </span>

              </div>


              <h1 className="text-3xl md:text-4xl font-bold text-slate-950">

                Learning Analytics

              </h1>


              <p className="text-slate-500 mt-2">

                Understand your performance and discover
                where to focus next.

              </p>

            </div>


            <button
              onClick={
                clearAnalytics
              }
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 transition"
            >

              <RotateCcw
                size={16}
              />

              Clear Data

            </button>

          </div>


          {/* ============================================
              OVERVIEW CARDS
          ============================================ */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

            <StatCard
              icon={
                <Trophy
                  size={19}
                />
              }
              label="Latest Score"
              value={`${result.percentage}%`}
            />


            <StatCard
              icon={
                <TrendingUp
                  size={19}
                />
              }
              label="Average"
              value={`${overallStats.average}%`}
            />


            <StatCard
              icon={
                <Award
                  size={19}
                />
              }
              label="Best Score"
              value={`${overallStats.best}%`}
            />


            <StatCard
              icon={
                <ClipboardCheck
                  size={19}
                />
              }
              label="Quizzes"
              value={overallStats.quizzes}
            />

          </div>


          {/* ============================================
              LATEST SCORE
          ============================================ */}

          <section className="bg-slate-950 rounded-2xl p-6 md:p-8 text-white mb-6">

            <div className="grid md:grid-cols-2 gap-8 items-center">

              <div>

                <div className="flex items-center gap-2 text-slate-400 text-sm">

                  <Trophy
                    size={17}
                  />

                  Latest Quiz

                </div>


                <h2 className="text-5xl font-bold mt-3">

                  {result.percentage}%

                </h2>


                <p className="text-slate-400 mt-2">

                  {result.score} correct out of{" "}

                  {result.total}

                  {" "}questions

                </p>


                <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">

                  <CalendarDays
                    size={15}
                  />

                  {formatDate(
                    result.date
                  )}

                </div>

              </div>


              <div className="grid grid-cols-2 gap-3">

                <DarkStat
                  label="Correct"
                  value={
                    result.correct
                  }
                />


                <DarkStat
                  label="Wrong"
                  value={
                    result.wrong
                  }
                />


                <DarkStat
                  label="Questions"
                  value={
                    result.total
                  }
                />


                <DarkStat
                  label="Accuracy"
                  value={`${result.percentage}%`}
                />

              </div>

            </div>

          </section>


          {/* ============================================
              INSIGHTS
          ============================================ */}

          <div className="grid md:grid-cols-2 gap-5 mb-6">

            <InsightCard
              icon={
                <TrendingUp
                  size={20}
                />
              }
              title="Your strongest topic"
              value={
                strongestTopic
                  ? strongestTopic[0]
                  : "Not available"
              }
              description={
                strongestTopic
                  ? `${strongestTopic[1].correct}/${strongestTopic[1].total} correct`
                  : "Complete more questions."
              }
            />


            <InsightCard
              icon={
                <Brain
                  size={20}
                />
              }
              title="Needs more practice"
              value={
                weakestTopic
                  ? weakestTopic[0]
                  : "Not available"
              }
              description={
                weakestTopic
                  ? `${weakestTopic[1].correct}/${weakestTopic[1].total} correct`
                  : "Complete more questions."
              }
            />

          </div>


          {/* ============================================
              TOPIC PERFORMANCE
          ============================================ */}

          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 mb-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">

                <Target
                  size={19}
                />

              </div>


              <div>

                <h2 className="text-xl font-bold text-slate-950">

                  Topic Performance

                </h2>


                <p className="text-sm text-slate-500">

                  See which topics you understand best.

                </p>

              </div>

            </div>


            {topicEntries.length === 0 ? (

              <EmptySection
                text="Topic information will appear after completing a quiz."
              />

            ) : (

              <div className="space-y-5">

                {topicEntries.map(
                  ([topic, stats]) => {

                    const percentage =
                      getPercentage(
                        stats
                      );


                    return (

                      <div
                        key={topic}
                      >

                        <div className="flex justify-between items-center mb-2">

                          <span className="text-sm font-semibold text-slate-800">

                            {topic}

                          </span>


                          <span className="text-sm text-slate-500">

                            {stats.correct}/
                            {stats.total}

                            {" "}({percentage}%)

                          </span>

                        </div>


                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

                          <div
                            className="h-full bg-slate-950 rounded-full transition-all duration-500"
                            style={{
                              width:
                                `${percentage}%`,
                            }}
                          />

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            )}

          </section>


          {/* ============================================
              DIFFICULTY
          ============================================ */}

          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 mb-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">

                <ClipboardCheck
                  size={19}
                />

              </div>


              <div>

                <h2 className="text-xl font-bold text-slate-950">

                  Difficulty Breakdown

                </h2>


                <p className="text-sm text-slate-500">

                  How you performed at each difficulty.

                </p>

              </div>

            </div>


            {difficultyEntries.length === 0 ? (

              <EmptySection
                text="Difficulty statistics will appear here after your quiz."
              />

            ) : (

              <div className="grid md:grid-cols-3 gap-4">

                {difficultyEntries.map(
                  ([difficulty, stats]) => {

                    const percentage =
                      getPercentage(
                        stats
                      );


                    return (

                      <div
                        key={difficulty}
                        className="border border-slate-200 rounded-xl p-5"
                      >

                        <p className="font-bold text-slate-900">

                          {difficulty}

                        </p>


                        <p className="text-3xl font-bold text-slate-950 mt-3">

                          {percentage}%

                        </p>


                        <p className="text-sm text-slate-500 mt-1">

                          {stats.correct} of{" "}
                          {stats.total} correct

                        </p>


                        <div className="h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">

                          <div
                            className="h-full bg-slate-950 rounded-full"
                            style={{
                              width:
                                `${percentage}%`,
                            }}
                          />

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            )}

          </section>


          {/* ============================================
              QUIZ HISTORY
          ============================================ */}

          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">

            <div className="flex items-center justify-between gap-4 mb-6">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">

                  <BarChart3
                    size={19}
                  />

                </div>


                <div>

                  <h2 className="text-xl font-bold text-slate-950">

                    Quiz History

                  </h2>


                  <p className="text-sm text-slate-500">

                    Your previous StudyMate quiz attempts.

                  </p>

                </div>

              </div>


              <span className="hidden sm:block text-xs font-semibold text-slate-400">

                {history.length} attempt
                {history.length === 1
                  ? ""
                  : "s"}

              </span>

            </div>


            {history.length === 0 ? (

              <p className="text-slate-500 text-sm">

                No previous quiz attempts.

              </p>

            ) : (

              <div className="space-y-3">

                {[...history]
                  .reverse()
                  .map(
                    (item, index) => {

                      const percentage =
                        Number(
                          item.percentage ||
                          0
                        );


                      return (

                        <div
                          key={index}
                          className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition"
                        >

                          <div className="flex items-center gap-3">

                            {percentage >=
                            60 ? (

                              <CheckCircle2
                                size={20}
                                className="text-emerald-600"
                              />

                            ) : (

                              <XCircle
                                size={20}
                                className="text-red-500"
                              />

                            )}


                            <div>

                              <p className="font-semibold text-slate-800">

                                Quiz Attempt

                              </p>


                              <p className="text-xs text-slate-500 mt-1">

                                {formatDate(
                                  item.date
                                )}

                              </p>

                            </div>

                          </div>


                          <div className="flex items-center gap-4">

                            <div className="text-right">

                              <p className="font-bold text-slate-950">

                                {item.score}/
                                {item.total}

                              </p>


                              <p className="text-xs text-slate-500">

                                {percentage}%

                              </p>

                            </div>


                            <ArrowUpRight
                              size={17}
                              className="text-slate-400"
                            />

                          </div>

                        </div>

                      );

                    }
                  )}

              </div>

            )}

          </section>


          {/* ============================================
              ACTIONS
          ============================================ */}

          <div className="flex flex-col sm:flex-row gap-3 mt-6">

            <Link
              to="/quiz"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white font-semibold hover:bg-slate-800 transition"
            >

              <ClipboardCheck
                size={17}
              />

              Take Another Quiz

            </Link>


            <Link
              to="/upload"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
            >

              <BookOpen
                size={17}
              />

              Study New Material

            </Link>

          </div>

        </div>

      </main>

    </div>

  );

}


// =====================================================
// HELPERS
// =====================================================

function getPercentage(
  stats
) {

  if (
    !stats ||
    !stats.total
  ) {

    return 0;

  }


  return Math.round(
    (Number(
      stats.correct || 0
    ) /
      Number(
        stats.total
      )) *
      100
  );

}


function formatDate(
  date
) {

  try {

    return new Date(
      date
    ).toLocaleString(
      undefined,
      {
        dateStyle:
          "medium",
        timeStyle:
          "short",
      }
    );

  } catch {

    return "Recent";

  }

}


// =====================================================
// COMPONENTS
// =====================================================

function StatCard({
  icon,
  label,
  value,
}) {

  return (

    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">

          {icon}

        </div>

      </div>


      <p className="text-2xl font-bold text-slate-950 mt-4">

        {value}

      </p>


      <p className="text-xs text-slate-500 mt-1">

        {label}

      </p>

    </div>

  );

}


function DarkStat({
  label,
  value,
}) {

  return (

    <div className="bg-white/10 rounded-xl p-4">

      <p className="text-2xl font-bold">

        {value}

      </p>


      <p className="text-xs text-slate-400 mt-1">

        {label}

      </p>

    </div>

  );

}


function InsightCard({
  icon,
  title,
  value,
  description,
}) {

  return (

    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">

          {icon}

        </div>


        <p className="text-sm font-semibold text-slate-500">

          {title}

        </p>

      </div>


      <h3 className="text-xl font-bold text-slate-950 mt-5">

        {value}

      </h3>


      <p className="text-sm text-slate-500 mt-1">

        {description}

      </p>

    </div>

  );

}


function EmptySection({
  text,
}) {

  return (

    <div className="py-8 text-center text-sm text-slate-400">

      {text}

    </div>

  );

}


export default Analytics;