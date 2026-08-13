import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  X,
  Sparkles,
  Brain,
  CheckCircle2,
  Loader2,
  ArrowRight,
  BookOpen,
  FileCheck2,
  AlertCircle,
  BarChart3,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

function Upload() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [generated, setGenerated] = useState(false);

  const fileInputRef = useRef(null);

  const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // =====================================================
  // VALIDATE FILE
  // =====================================================

  const validateFile = (selectedFile) => {
    if (!selectedFile) {
      return false;
    }

    const isPDF =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPDF) {
      setError("Please upload a PDF file.");
      return false;
    }

    const maxSize = 10 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setError("File is too large. Please upload a PDF smaller than 10 MB.");
      return false;
    }

    setError("");
    return true;
  };

  // =====================================================
  // SELECT FILE
  // =====================================================

  const handleFile = (selectedFile) => {
    if (!validateFile(selectedFile)) {
      return;
    }

    setFile(selectedFile);
    setError("");
    setSummary("");
    setQuiz([]);
    setGenerated(false);
  };

  // =====================================================
  // FILE INPUT
  // =====================================================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  // =====================================================
  // DRAG AND DROP
  // =====================================================

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  // =====================================================
  // REMOVE FILE
  // =====================================================

  const removeFile = () => {
    setFile(null);
    setSummary("");
    setQuiz([]);
    setGenerated(false);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =====================================================
  // GENERATE STUDY MATERIAL
  // =====================================================

  const generateStudyMaterial = async () => {
    if (!file) {
      setError("Please select a PDF first.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");
    setQuiz([]);
    setGenerated(false);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let message = "Failed to generate study material.";

        try {
          const data = await response.json();

          if (data?.detail) {
            message =
              typeof data.detail === "string"
                ? data.detail
                : message;
          }
        } catch {
          // Ignore JSON parsing errors
        }

        throw new Error(message);
      }

      const data = await response.json();

      console.log("UPLOAD RESPONSE:", data);

      // =================================================
      // SUMMARY
      // =================================================

      const generatedSummary =
        data.summary ||
        data.ai_summary ||
        data.generated_summary ||
        "";

      // =================================================
      // QUIZ
      // =================================================

      let generatedQuiz =
        data.quiz ||
        data.questions ||
        data.generated_quiz ||
        [];

      if (!Array.isArray(generatedQuiz)) {
        generatedQuiz = [];
      }

      setSummary(generatedSummary);
      setQuiz(generatedQuiz);
      setGenerated(true);

      // =================================================
      // SAVE DATA
      // =================================================

      sessionStorage.setItem(
        "studymate_summary",
        typeof generatedSummary === "string"
          ? generatedSummary
          : JSON.stringify(generatedSummary)
      );

      sessionStorage.setItem(
        "studymate_quiz",
        JSON.stringify(generatedQuiz)
      );

      sessionStorage.setItem(
        "studymate_filename",
        file.name
      );

      console.log(
        "Summary:",
        generatedSummary
      );

      console.log(
        "Quiz:",
        generatedQuiz
      );

    } catch (err) {
      console.error("Upload error:", err);

      setError(
        err.message ||
          "Something went wrong while generating your study material."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // OPEN QUIZ
  // =====================================================

  const takeQuiz = () => {
    if (!quiz || quiz.length === 0) {
      setError("No quiz questions are available.");
      return;
    }

    sessionStorage.setItem(
      "studymate_quiz",
      JSON.stringify(quiz)
    );

    window.location.href = "/quiz";
  };

  // =====================================================
  // FILE SIZE
  // =====================================================

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "0 KB";
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // =====================================================
  // SUMMARY TEXT
  // =====================================================

  const summaryText =
    typeof summary === "string"
      ? summary
      : JSON.stringify(summary, null, 2);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="flex-1 min-w-0">

        <div className="max-w-6xl mx-auto px-5 sm:px-7 lg:px-10 py-8">

          {/* ================================================= */}
          {/* PAGE HEADER */}
          {/* ================================================= */}

          <div className="mb-8">

            <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium mb-2">

              <Sparkles size={16} />

              AI Study Material

            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">

              Upload your notes

            </h1>

            <p className="text-slate-500 mt-2 max-w-2xl">

              Upload your study notes as a PDF and let
              StudyMate AI create a summary and practice
              quiz for you.

            </p>

          </div>

          {/* ================================================= */}
          {/* TOP GRID */}
          {/* ================================================= */}

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6">

            {/* ================================================= */}
            {/* UPLOAD CARD */}
            {/* ================================================= */}

            <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-xl font-bold text-slate-950">

                    Upload PDF

                  </h2>

                  <p className="text-sm text-slate-500 mt-1">

                    Maximum file size: 10 MB

                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">

                  <FileText
                    size={21}
                    className="text-indigo-600"
                  />

                </div>

              </div>

              {/* ================================================= */}
              {/* DROP ZONE */}
              {/* ================================================= */}

              {!file ? (

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full min-h-[300px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center p-8 transition ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400"
                  }`}
                >

                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                      isDragging
                        ? "bg-indigo-100"
                        : "bg-white shadow-sm"
                    }`}
                  >

                    <UploadCloud
                      size={32}
                      className={
                        isDragging
                          ? "text-indigo-600"
                          : "text-slate-600"
                      }
                    />

                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-5">

                    Drop your PDF here

                  </h3>

                  <p className="text-sm text-slate-500 mt-2">

                    or click to browse from your computer

                  </p>

                  <span className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700">

                    <FileText size={15} />

                    Choose PDF

                  </span>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                </button>

              ) : (

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">

                      <FileText
                        size={27}
                        className="text-red-500"
                      />

                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="font-bold text-slate-900 truncate">

                        {file.name}

                      </p>

                      <div className="flex items-center gap-2 mt-1">

                        <span className="text-xs text-slate-500">
                          PDF
                        </span>

                        <span className="text-slate-300">
                          •
                        </span>

                        <span className="text-xs text-slate-500">

                          {formatFileSize(file.size)}

                        </span>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white text-slate-400 hover:text-red-500 transition"
                    >

                      <X size={18} />

                    </button>

                  </div>

                  <div className="flex items-center gap-2 mt-5 px-4 py-3 rounded-xl bg-white border border-slate-200">

                    <FileCheck2
                      size={17}
                      className="text-emerald-500"
                    />

                    <span className="text-sm text-slate-600">

                      PDF ready for AI processing

                    </span>

                  </div>

                </div>

              )}

              {/* ================================================= */}
              {/* ERROR */}
              {/* ================================================= */}

              {error && (

                <div className="flex items-start gap-3 mt-5 p-4 rounded-2xl bg-red-50 border border-red-100">

                  <AlertCircle
                    size={19}
                    className="text-red-500 shrink-0 mt-0.5"
                  />

                  <p className="text-sm text-red-700">

                    {error}

                  </p>

                </div>

              )}

              {/* ================================================= */}
              {/* GENERATE BUTTON */}
              {/* ================================================= */}

              <button
                type="button"
                onClick={generateStudyMaterial}
                disabled={!file || loading}
                className="w-full mt-6 py-3.5 rounded-xl bg-slate-950 text-white font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >

                {loading ? (

                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />

                    AI is processing...

                  </>

                ) : (

                  <>
                    <Sparkles size={18} />

                    Generate Study Material

                  </>

                )}

              </button>

              {/* ================================================= */}
              {/* LOADING */}
              {/* ================================================= */}

              {loading && (

                <div className="mt-5 p-5 rounded-2xl bg-slate-50 border border-slate-200">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">

                      <Brain
                        size={19}
                        className="text-indigo-600"
                      />

                    </div>

                    <div>

                      <p className="font-semibold text-slate-900">

                        Creating your study material

                      </p>

                      <p className="text-xs text-slate-500 mt-1">

                        Reading your PDF and generating
                        learning content...

                      </p>

                    </div>

                  </div>

                  <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">

                    <div className="h-full w-2/3 bg-indigo-600 rounded-full animate-pulse" />

                  </div>

                </div>

              )}

            </section>

            {/* ================================================= */}
            {/* HOW IT WORKS */}
            {/* ================================================= */}

            <section className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden">

              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl" />

              <div className="relative">

                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">

                  <Sparkles size={22} />

                </div>

                <h2 className="text-2xl font-bold mt-6">

                  From notes to{" "}

                  <span className="text-indigo-300">

                    smart study

                  </span>

                </h2>

                <p className="text-slate-400 mt-3 leading-relaxed">

                  StudyMate AI turns your study material
                  into resources that help you understand,
                  revise, and test yourself.

                </p>

                <div className="space-y-5 mt-8">

                  {/* STEP 1 */}

                  <div className="flex gap-4">

                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 font-bold">

                      1

                    </div>

                    <div>

                      <h3 className="font-semibold">

                        Upload your notes

                      </h3>

                      <p className="text-sm text-slate-400 mt-1">

                        Add a PDF containing your study
                        material.

                      </p>

                    </div>

                  </div>

                  {/* STEP 2 */}

                  <div className="flex gap-4">

                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 font-bold">

                      2

                    </div>

                    <div>

                      <h3 className="font-semibold">

                        AI understands your content

                      </h3>

                      <p className="text-sm text-slate-400 mt-1">

                        Your notes are processed into useful
                        learning material.

                      </p>

                    </div>

                  </div>

                  {/* STEP 3 */}

                  <div className="flex gap-4">

                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 font-bold">

                      3

                    </div>

                    <div>

                      <h3 className="font-semibold">

                        Study and test yourself

                      </h3>

                      <p className="text-sm text-slate-400 mt-1">

                        Review your summary and practice
                        with an AI-generated quiz.

                      </p>

                    </div>

                  </div>

                </div>

                <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10">

                  <div className="flex items-center gap-3">

                    <BookOpen
                      size={19}
                      className="text-indigo-300"
                    />

                    <div>

                      <p className="text-sm font-semibold">

                        Study smarter, not harder

                      </p>

                      <p className="text-xs text-slate-400 mt-1">

                        Turn passive reading into active
                        learning.

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </section>

          </div>

          {/* ================================================= */}
          {/* GENERATED CONTENT */}
          {/* ================================================= */}

          {generated && (

            <div className="mt-7 space-y-6">

              {/* SUCCESS */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-emerald-50 border border-emerald-100">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">

                    <CheckCircle2
                      size={20}
                      className="text-emerald-600"
                    />

                  </div>

                  <div>

                    <p className="font-bold text-emerald-900">

                      Study material generated

                    </p>

                    <p className="text-sm text-emerald-700 mt-0.5">

                      Your summary and quiz are ready.

                    </p>

                  </div>

                </div>

                {quiz.length > 0 && (

                  <button
                    type="button"
                    onClick={takeQuiz}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white font-semibold hover:bg-slate-800 transition"
                  >

                    Take Quiz

                    <ArrowRight size={17} />

                  </button>

                )}

              </div>

              {/* ================================================= */}
              {/* SUMMARY */}
              {/* ================================================= */}

              {summaryText && (

                <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">

                        <BookOpen
                          size={20}
                          className="text-indigo-600"
                        />

                      </div>

                      <div>

                        <h2 className="text-xl font-bold text-slate-950">

                          AI Summary

                        </h2>

                        <p className="text-sm text-slate-500">

                          A quick overview of your notes

                        </p>

                      </div>

                    </div>

                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">

                      <Sparkles size={13} />

                      AI Generated

                    </span>

                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6">

                    <div className="whitespace-pre-wrap text-[15px] leading-7 text-slate-700">

                      {summaryText}

                    </div>

                  </div>

                </section>

              )}

              {/* ================================================= */}
              {/* QUIZ PREVIEW */}
              {/* ================================================= */}

              {quiz.length > 0 && (

                <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">

                        <Brain
                          size={20}
                          className="text-purple-600"
                        />

                      </div>

                      <div>

                        <h2 className="text-xl font-bold text-slate-950">

                          Practice Quiz

                        </h2>

                        <p className="text-sm text-slate-500">

                          {quiz.length} AI-generated questions

                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={takeQuiz}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 text-white text-sm font-semibold hover:bg-slate-800 transition"
                    >

                      Start Quiz

                      <ArrowRight size={16} />

                    </button>

                  </div>

                  <div className="space-y-3">

                    {quiz.slice(0, 5).map(
                      (question, index) => {

                        const questionText =
                          typeof question === "string"
                            ? question
                            : question?.question ||
                              question?.text ||
                              `Question ${index + 1}`;

                        const options =
                          typeof question === "object" &&
                          Array.isArray(question?.options)
                            ? question.options
                            : [];

                        return (

                          <div
                            key={index}
                            className="p-5 rounded-2xl bg-slate-50 border border-slate-200"
                          >

                            <div className="flex gap-4">

                              <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center text-sm font-bold shrink-0">

                                {index + 1}

                              </div>

                              <div className="flex-1">

                                <p className="font-semibold text-slate-900 leading-relaxed">

                                  {questionText}

                                </p>

                                {options.length > 0 && (

                                  <div className="grid sm:grid-cols-2 gap-2 mt-4">

                                    {options
                                      .slice(0, 4)
                                      .map(
                                        (
                                          option,
                                          optionIndex
                                        ) => {

                                          const optionText =
                                            typeof option ===
                                            "string"
                                              ? option
                                              : option?.text ||
                                                option?.label ||
                                                option?.value ||
                                                "";

                                          return (

                                            <div
                                              key={
                                                optionIndex
                                              }
                                              className="px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-600"
                                            >

                                              <span className="font-semibold mr-2">

                                                {String.fromCharCode(
                                                  65 +
                                                    optionIndex
                                                )}

                                                .

                                              </span>

                                              {optionText}

                                            </div>

                                          );
                                        }
                                      )}

                                  </div>

                                )}

                              </div>

                            </div>

                          </div>

                        );
                      }
                    )}

                  </div>

                  {quiz.length > 5 && (

                    <button
                      type="button"
                      onClick={takeQuiz}
                      className="w-full mt-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >

                      View all {quiz.length} questions

                      <ArrowRight
                        size={15}
                        className="inline ml-2"
                      />

                    </button>

                  )}

                </section>

              )}

            </div>

          )}

          {/* ================================================= */}
          {/* FEATURES */}
          {/* ================================================= */}

          {!generated && !loading && (

            <div className="grid sm:grid-cols-3 gap-4 mt-7">

              {/* SUMMARY */}

              <div className="bg-white border border-slate-200 rounded-2xl p-5">

                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">

                  <FileText
                    size={19}
                    className="text-indigo-600"
                  />

                </div>

                <h3 className="font-bold text-slate-900 mt-4">

                  Smart Summary

                </h3>

                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">

                  Quickly understand the important
                  information in your notes.

                </p>

              </div>

              {/* QUIZ */}

              <div className="bg-white border border-slate-200 rounded-2xl p-5">

                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">

                  <Brain
                    size={19}
                    className="text-purple-600"
                  />

                </div>

                <h3 className="font-bold text-slate-900 mt-4">

                  AI Quiz

                </h3>

                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">

                  Test your understanding with questions
                  generated from your material.

                </p>

              </div>

              {/* ANALYTICS */}

              <div className="bg-white border border-slate-200 rounded-2xl p-5">

                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">

                  <BarChart3
                    size={19}
                    className="text-emerald-600"
                  />

                </div>

                <h3 className="font-bold text-slate-900 mt-4">

                  Track Progress

                </h3>

                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">

                  Use your quiz results to understand
                  where you need more practice.

                </p>

              </div>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default Upload;