import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  ClipboardCheck,
  Sparkles,
  BookOpen,
  UploadCloud,
  BarChart3,
} from "lucide-react";

import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";


function Quiz() {

  // =====================================================
  // STATE
  // =====================================================

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [answers, setAnswers] = useState({});

  const [showResult, setShowResult] = useState(false);

  const [loading, setLoading] = useState(true);

  const [loadError, setLoadError] = useState("");


  // =====================================================
  // LOAD QUIZ FROM SESSION STORAGE
  // =====================================================

  useEffect(() => {

    const loadQuiz = () => {

      try {

        console.log("================================");
        console.log("STUDYMATE QUIZ");
        console.log("Loading quiz from sessionStorage...");
        console.log("================================");


        const savedQuiz =
          sessionStorage.getItem("studymate_quiz");


        console.log(
          "Raw quiz:",
          savedQuiz
        );


        if (!savedQuiz) {

          console.log(
            "No studymate_quiz found."
          );

          setQuestions([]);

          setLoading(false);

          return;
        }


        const parsedQuiz =
          JSON.parse(savedQuiz);


        console.log(
          "Parsed quiz:",
          parsedQuiz
        );


        // -------------------------------------------------
        // CASE 1:
        // Quiz is directly an array
        // -------------------------------------------------

        if (
          Array.isArray(parsedQuiz) &&
          parsedQuiz.length > 0
        ) {

          setQuestions(
            normalizeQuiz(parsedQuiz)
          );

          setLoading(false);

          return;
        }


        // -------------------------------------------------
        // CASE 2:
        // Quiz is inside { quiz: [...] }
        // -------------------------------------------------

        if (
          parsedQuiz &&
          Array.isArray(parsedQuiz.quiz) &&
          parsedQuiz.quiz.length > 0
        ) {

          setQuestions(
            normalizeQuiz(parsedQuiz.quiz)
          );

          setLoading(false);

          return;
        }


        // -------------------------------------------------
        // INVALID QUIZ
        // -------------------------------------------------

        console.error(
          "Invalid quiz format:",
          parsedQuiz
        );


        setLoadError(
          "The generated quiz format is invalid."
        );


        setQuestions([]);

      } catch (error) {

        console.error(
          "Unable to load quiz:",
          error
        );


        setLoadError(
          "Unable to read the generated quiz."
        );


        setQuestions([]);

      } finally {

        setLoading(false);

      }

    };


    loadQuiz();

  }, []);


  // =====================================================
  // NORMALIZE QUIZ
  // =====================================================

  function normalizeQuiz(quiz) {

    return quiz
      .filter(
        (item) =>
          item &&
          item.question &&
          Array.isArray(item.options) &&
          item.options.length === 4
      )
      .map((item) => {

        let answer = item.answer;

        // ---------------------------------------------
        // Convert answer to number
        // ---------------------------------------------

        if (
          typeof answer === "string" &&
          !isNaN(Number(answer))
        ) {

          answer = Number(answer);

        }


        // ---------------------------------------------
        // Handle A/B/C/D answers
        // ---------------------------------------------

        if (
          typeof answer === "string"
        ) {

          const upper =
            answer.trim().toUpperCase();

          if (upper === "A") answer = 0;

          if (upper === "B") answer = 1;

          if (upper === "C") answer = 2;

          if (upper === "D") answer = 3;

        }


        return {

          question:
            String(item.question),

          options:
            item.options.map(
              (option) =>
                String(option)
            ),

          answer,

          explanation:
            item.explanation ||
            "Review the study material for more information.",

          topic:
            item.topic ||
            "General",

          difficulty:
            item.difficulty ||
            "Medium",

        };

      });

  }


  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {

    return (

      <div className="flex min-h-screen bg-slate-100">

        <Sidebar />

        <main className="flex-1 flex items-center justify-center">

          <div className="text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-950 text-white flex items-center justify-center">

              <Sparkles
                size={25}
              />

            </div>


            <p className="mt-5 text-slate-600 font-semibold">

              Loading your AI quiz...

            </p>

          </div>

        </main>

      </div>

    );

  }


  // =====================================================
  // NO QUIZ
  // =====================================================

  if (questions.length === 0) {

    return (

      <div className="flex min-h-screen bg-slate-100">

        <Sidebar />

        <main className="flex-1 flex items-center justify-center px-6">

          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl shadow-sm p-8 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">

              <ClipboardCheck
                size={30}
                className="text-slate-700"
              />

            </div>


            <h1 className="text-2xl font-bold text-slate-950 mt-6">

              No quiz available

            </h1>


            <p className="text-slate-500 mt-3 leading-6">

              {loadError ||
                "Upload your study material first. StudyMate will generate an AI-powered quiz from your notes."}

            </p>


            <Link
              to="/upload"
              className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-950 text-white font-semibold hover:bg-slate-800 transition"
            >

              <UploadCloud
                size={18}
              />

              Upload Notes

            </Link>

          </div>

        </main>

      </div>

    );

  }


  // =====================================================
  // CURRENT QUESTION
  // =====================================================

  const question =
    questions[currentQuestion];


  const answeredCount =
    Object.keys(answers).length;


  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;


  const alreadyAnswered =
    answers[currentQuestion] !== undefined;


  const currentAnswer =
    alreadyAnswered
      ? answers[currentQuestion]
      : selectedAnswer;


  // =====================================================
  // SELECT ANSWER
  // =====================================================

  const selectAnswer = (index) => {

    if (alreadyAnswered) {

      return;

    }


    setSelectedAnswer(index);

  };


  // =====================================================
  // SUBMIT ANSWER
  // =====================================================

  const submitAnswer = () => {

    if (
      selectedAnswer === null ||
      selectedAnswer === undefined
    ) {

      return;

    }


    setAnswers(
      (previous) => ({

        ...previous,

        [currentQuestion]:
          selectedAnswer,

      })
    );

  };


  // =====================================================
  // CALCULATE SCORE
  // =====================================================

  const calculateScore = () => {

    let score = 0;


    Object.entries(
      answers
    ).forEach(
      ([questionIndex, answer]) => {

        const index =
          Number(questionIndex);


        const correctAnswer =
          Number(
            questions[index]?.answer
          );


        if (
          questions[index] &&
          Number(answer) ===
            correctAnswer
        ) {

          score++;

        }

      }
    );


    return score;

  };


  // =====================================================
  // SAVE QUIZ RESULT
  // =====================================================

  const saveQuizResult = () => {

    const score =
      calculateScore();


    const total =
      questions.length;


    const percentage =
      Math.round(
        (score / total) * 100
      );


    const topicStats = {};


    const difficultyStats = {};


    questions.forEach(
      (item, index) => {

        // ---------------------------------------------
        // TOPIC
        // ---------------------------------------------

        const topic =
          item.topic ||
          "General";


        if (
          !topicStats[topic]
        ) {

          topicStats[topic] = {

            total: 0,

            correct: 0,

          };

        }


        topicStats[topic].total++;


        if (
          answers[index] !== undefined &&
          Number(answers[index]) ===
            Number(item.answer)
        ) {

          topicStats[topic].correct++;

        }


        // ---------------------------------------------
        // DIFFICULTY
        // ---------------------------------------------

        const difficulty =
          item.difficulty ||
          "Medium";


        if (
          !difficultyStats[difficulty]
        ) {

          difficultyStats[difficulty] = {

            total: 0,

            correct: 0,

          };

        }


        difficultyStats[
          difficulty
        ].total++;


        if (
          answers[index] !== undefined &&
          Number(answers[index]) ===
            Number(item.answer)
        ) {

          difficultyStats[
            difficulty
          ].correct++;

        }

      }
    );


    const result = {

      date:
        new Date().toISOString(),

      score,

      total,

      percentage,

      correct:
        score,

      wrong:
        total - score,

      topicStats,

      difficultyStats,

      questions,

    };


    // =================================================
    // SAVE LAST RESULT
    // =================================================

    localStorage.setItem(

      "studymate_last_result",

      JSON.stringify(result)

    );


    // =================================================
    // SAVE HISTORY
    // =================================================

    let history = [];


    try {

      history =
        JSON.parse(
          localStorage.getItem(
            "studymate_quiz_history"
          ) || "[]"
        );

    } catch {

      history = [];

    }


    history.push({

      date:
        result.date,

      score:
        result.score,

      total:
        result.total,

      percentage:
        result.percentage,

      topicStats:
        result.topicStats,

      difficultyStats:
        result.difficultyStats,

    });


    // Keep latest 20 quizzes

    if (
      history.length > 20
    ) {

      history =
        history.slice(-20);

    }


    localStorage.setItem(

      "studymate_quiz_history",

      JSON.stringify(history)

    );


    console.log(
      "Quiz result saved:",
      result
    );

  };


  // =====================================================
  // NEXT QUESTION
  // =====================================================

  const nextQuestion = () => {

    if (
      currentQuestion <
      questions.length - 1
    ) {

      const nextIndex =
        currentQuestion + 1;


      setCurrentQuestion(
        nextIndex
      );


      setSelectedAnswer(

        answers[nextIndex] !==
          undefined
          ? answers[nextIndex]
          : null

      );

    } else {

      saveQuizResult();

      setShowResult(true);

    }

  };


  // =====================================================
  // PREVIOUS QUESTION
  // =====================================================

  const previousQuestion = () => {

    if (
      currentQuestion === 0
    ) {

      return;

    }


    const previousIndex =
      currentQuestion - 1;


    setCurrentQuestion(
      previousIndex
    );


    setSelectedAnswer(

      answers[previousIndex] !==
        undefined
        ? answers[previousIndex]
        : null

    );

  };


  // =====================================================
  // GO TO QUESTION
  // =====================================================

  const goToQuestion = (index) => {

    setCurrentQuestion(
      index
    );


    setSelectedAnswer(

      answers[index] !==
        undefined
        ? answers[index]
        : null

    );

  };


  // =====================================================
  // RESTART QUIZ
  // =====================================================

  const restartQuiz = () => {

    setCurrentQuestion(0);

    setSelectedAnswer(null);

    setAnswers({});

    setShowResult(false);

  };


  // =====================================================
  // RESULT PAGE
  // =====================================================

  if (showResult) {

    const score =
      calculateScore();


    const total =
      questions.length;


    const percentage =
      Math.round(
        (score / total) * 100
      );


    let message;


    if (
      percentage >= 80
    ) {

      message =
        "Excellent work! You have a strong understanding of these topics.";

    } else if (
      percentage >= 60
    ) {

      message =
        "Good effort! Review the topics you missed and try again.";

    } else {

      message =
        "Keep practicing. Review your notes and try the quiz again.";

    }


    return (

      <div className="flex min-h-screen bg-slate-100">

        <Sidebar />


        <main className="flex-1 min-w-0 px-6 md:px-10 py-10">

          <div className="max-w-3xl mx-auto">

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">


              {/* HEADER */}

              <div className="bg-slate-950 text-white p-8 md:p-10 text-center">

                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center">

                  <Trophy
                    size={30}
                  />

                </div>


                <p className="text-sm text-slate-400 mt-5">

                  Quiz completed

                </p>


                <h1 className="text-5xl font-bold mt-2">

                  {score} / {total}

                </h1>


                <p className="text-slate-400 mt-2">

                  {percentage}% score

                </p>

              </div>


              {/* BODY */}

              <div className="p-6 md:p-10">

                <div className="text-center">

                  <h2 className="text-2xl font-bold text-slate-950">

                    {percentage >= 80
                      ? "Great job! 🎉"
                      : percentage >= 60
                      ? "Nice work! 👍"
                      : "Keep learning! 💪"}

                  </h2>


                  <p className="text-slate-500 mt-3 leading-7">

                    {message}

                  </p>

                </div>


                {/* STATS */}

                <div className="grid grid-cols-3 gap-3 mt-8">

                  <ResultStat
                    label="Correct"
                    value={score}
                  />


                  <ResultStat
                    label="Wrong"
                    value={
                      total - score
                    }
                  />


                  <ResultStat
                    label="Accuracy"
                    value={`${percentage}%`}
                  />

                </div>


                {/* REVIEW */}

                <div className="mt-8">

                  <h3 className="font-bold text-slate-900">

                    Review your answers

                  </h3>


                  <div className="mt-4 space-y-3">

                    {questions.map(
                      (item, index) => {

                        const userAnswer =
                          answers[index];


                        const correct =
                          userAnswer !==
                            undefined &&
                          Number(userAnswer) ===
                            Number(item.answer);


                        return (

                          <div
                            key={index}
                            className="border border-slate-200 rounded-xl p-4"
                          >

                            <div className="flex items-start gap-3">

                              {correct ? (

                                <CheckCircle2
                                  size={19}
                                  className="text-emerald-600 shrink-0 mt-0.5"
                                />

                              ) : (

                                <XCircle
                                  size={19}
                                  className="text-red-500 shrink-0 mt-0.5"
                                />

                              )}


                              <div className="flex-1">

                                <p className="text-sm font-medium text-slate-900">

                                  Q{index + 1}.{" "}

                                  {item.question}

                                </p>


                                <p className="text-xs text-slate-500 mt-1">

                                  {item.topic}

                                  {" • "}

                                  {item.difficulty}

                                </p>


                                {userAnswer !==
                                  undefined && (
                                  <p className="text-xs text-slate-600 mt-2">

                                    Your answer:{" "}

                                    {
                                      item.options[
                                        userAnswer
                                      ]
                                    }

                                  </p>
                                )}


                                <p className="text-xs text-emerald-700 mt-1">

                                  Correct answer:{" "}

                                  {
                                    item.options[
                                      item.answer
                                    ]
                                  }

                                </p>


                                {item.explanation && (

                                  <p className="text-xs text-slate-500 mt-2 leading-5">

                                    {item.explanation}

                                  </p>

                                )}

                              </div>

                            </div>

                          </div>

                        );

                      }
                    )}

                  </div>

                </div>


                {/* BUTTONS */}

                <div className="grid sm:grid-cols-3 gap-3 mt-8">

                  <button
                    onClick={restartQuiz}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-950 text-white font-semibold hover:bg-slate-800 transition"
                  >

                    <RotateCcw
                      size={17}
                    />

                    Try Again

                  </button>


                  <Link
                    to="/analytics"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
                  >

                    <BarChart3
                      size={17}
                    />

                    Analytics

                  </Link>


                  <Link
                    to="/upload"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
                  >

                    <BookOpen
                      size={17}
                    />

                    Study More

                  </Link>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    );

  }


  // =====================================================
  // QUIZ SCREEN
  // =====================================================

  return (

    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />


      <main className="flex-1 min-w-0 px-6 md:px-10 py-8">

        <div className="max-w-4xl mx-auto">


          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

            <div>

              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">

                <ClipboardCheck
                  size={16}
                />

                <span>
                  AI Generated Quiz
                </span>

              </div>


              <h1 className="text-3xl font-bold text-slate-950">

                Test your knowledge

              </h1>


              <p className="text-slate-500 mt-1">

                Questions generated from your uploaded study material.

              </p>

            </div>


            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl">

              <Sparkles
                size={17}
              />

              <span className="text-sm font-semibold text-slate-700">

                AI Practice

              </span>

            </div>

          </div>


          {/* PROGRESS */}

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-5">

            <div className="flex items-center justify-between text-sm mb-3">

              <span className="font-semibold text-slate-800">

                Question{" "}

                {currentQuestion + 1}

                {" "}of{" "}

                {questions.length}

              </span>


              <span className="text-slate-500">

                {answeredCount} answered

              </span>

            </div>


            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">

              <div
                className="h-full bg-slate-950 rounded-full transition-all duration-300"
                style={{
                  width:
                    `${progress}%`,
                }}
              />

            </div>

          </div>


          {/* QUESTION CARD */}

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">


            {/* QUESTION */}

            <div className="p-6 md:p-8 border-b border-slate-200">

              <div className="flex flex-wrap gap-2 mb-5">

                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">

                  {question.topic}

                </span>


                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-xs font-semibold">

                  {question.difficulty}

                </span>

              </div>


              <div className="flex items-start gap-4">

                <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold">

                  {currentQuestion + 1}

                </div>


                <h2 className="text-xl md:text-2xl font-bold text-slate-950 leading-8">

                  {question.question}

                </h2>

              </div>

            </div>


            {/* OPTIONS */}

            <div className="p-6 md:p-8">

              <div className="space-y-3">

                {question.options.map(
                  (option, index) => {

                    const isSelected =
                      currentAnswer ===
                      index;


                    const isCorrect =
                      alreadyAnswered &&
                      index ===
                        Number(
                          question.answer
                        );


                    const isWrong =
                      alreadyAnswered &&
                      isSelected &&
                      index !==
                        Number(
                          question.answer
                        );


                    let optionClass =
                      "border-slate-200 hover:border-slate-400 hover:bg-slate-50";


                    if (
                      isSelected &&
                      !alreadyAnswered
                    ) {

                      optionClass =
                        "border-slate-950 bg-slate-50";

                    }


                    if (isCorrect) {

                      optionClass =
                        "border-emerald-300 bg-emerald-50";

                    }


                    if (isWrong) {

                      optionClass =
                        "border-red-300 bg-red-50";

                    }


                    return (

                      <button
                        key={index}
                        onClick={() =>
                          selectAnswer(index)
                        }
                        disabled={
                          alreadyAnswered
                        }
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition ${optionClass}`}
                      >

                        <div
                          className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center font-semibold text-sm ${
                            isCorrect
                              ? "bg-emerald-100 text-emerald-700"
                              : isWrong
                              ? "bg-red-100 text-red-700"
                              : isSelected
                              ? "bg-slate-950 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >

                          {String.fromCharCode(
                            65 + index
                          )}

                        </div>


                        <span className="flex-1 text-sm md:text-base font-medium text-slate-800">

                          {option}

                        </span>


                        {isCorrect && (

                          <CheckCircle2
                            size={20}
                            className="text-emerald-600"
                          />

                        )}


                        {isWrong && (

                          <XCircle
                            size={20}
                            className="text-red-500"
                          />

                        )}

                      </button>

                    );

                  }
                )}

              </div>


              {/* EXPLANATION */}

              {alreadyAnswered && (

                <div
                  className={`mt-6 p-5 rounded-xl border ${
                    currentAnswer ===
                    Number(
                      question.answer
                    )
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >

                  <div className="flex items-start gap-3">

                    {currentAnswer ===
                    Number(
                      question.answer
                    ) ? (

                      <CheckCircle2
                        size={20}
                        className="text-emerald-600 shrink-0"
                      />

                    ) : (

                      <XCircle
                        size={20}
                        className="text-red-500 shrink-0"
                      />

                    )}


                    <div>

                      <p className="font-bold text-slate-900">

                        {currentAnswer ===
                        Number(
                          question.answer
                        )
                          ? "Correct!"
                          : "Not quite."}

                      </p>


                      <p className="text-sm text-slate-600 leading-6 mt-1">

                        {question.explanation}

                      </p>

                    </div>

                  </div>

                </div>

              )}


              {/* NAVIGATION */}

              <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-8">


                {/* PREVIOUS */}

                <button
                  onClick={
                    previousQuestion
                  }
                  disabled={
                    currentQuestion ===
                    0
                  }
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl border font-semibold ${
                    currentQuestion ===
                    0
                      ? "border-slate-100 text-slate-300"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >

                  <ArrowLeft
                    size={17}
                  />

                  Previous

                </button>


                {/* CHECK / NEXT */}

                {!alreadyAnswered ? (

                  <button
                    onClick={
                      submitAnswer
                    }
                    disabled={
                      selectedAnswer ===
                      null
                    }
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold ${
                      selectedAnswer ===
                      null
                        ? "bg-slate-200 text-slate-400"
                        : "bg-slate-950 text-white hover:bg-slate-800"
                    }`}
                  >

                    Check Answer

                    <CheckCircle2
                      size={17}
                    />

                  </button>

                ) : (

                  <button
                    onClick={
                      nextQuestion
                    }
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-950 text-white font-semibold hover:bg-slate-800"
                  >

                    {currentQuestion ===
                    questions.length - 1
                      ? "View Results"
                      : "Next Question"}

                    <ArrowRight
                      size={17}
                    />

                  </button>

                )}

              </div>

            </div>

          </div>


          {/* QUESTION NAVIGATION */}

          <div className="bg-white border border-slate-200 rounded-2xl p-5 mt-5 shadow-sm">

            <p className="text-sm font-semibold text-slate-800 mb-4">

              Questions

            </p>


            <div className="flex flex-wrap gap-2">

              {questions.map(
                (item, index) => {

                  const answered =
                    answers[index] !==
                    undefined;


                  return (

                    <button
                      key={index}
                      onClick={() =>
                        goToQuestion(index)
                      }
                      className={`w-9 h-9 rounded-lg text-xs font-semibold ${
                        index ===
                        currentQuestion
                          ? "bg-slate-950 text-white"
                          : answered
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >

                      {index + 1}

                    </button>

                  );

                }
              )}

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}


// =====================================================
// RESULT STAT
// =====================================================

function ResultStat({
  label,
  value,
}) {

  return (

    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">

      <p className="text-2xl font-bold text-slate-950">

        {value}

      </p>


      <p className="text-xs text-slate-500 mt-1">

        {label}

      </p>

    </div>

  );

}


export default Quiz;