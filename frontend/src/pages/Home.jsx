import {
  Upload,
  Sparkles,
  Brain,
  FileText,
  ClipboardCheck,
  MessageCircle,
  CalendarDays,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      icon: FileText,
      title: "Smart Summaries",
      description:
        "Turn lengthy study material into clear, structured summaries with the most important concepts highlighted.",
    },
    {
      icon: ClipboardCheck,
      title: "AI Quizzes",
      description:
        "Generate practice questions from your own study material and test how well you understand the topic.",
    },
    {
      icon: MessageCircle,
      title: "AI Tutor",
      description:
        "Ask questions about your study material and get simple explanations whenever you get stuck.",
    },
    {
      icon: CalendarDays,
      title: "Study Planner",
      description:
        "Organize your preparation and create a focused study routine around your goals.",
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description:
        "See your quiz performance, study progress and areas that need more attention.",
    },
    {
      icon: Brain,
      title: "Personalized Learning",
      description:
        "Use your performance to identify weak topics and decide what you should study next.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Upload your notes",
      description:
        "Upload your PDF study material and let StudyMate process the content.",
    },
    {
      number: "02",
      title: "Learn with AI",
      description:
        "Generate summaries, quizzes and ask questions about your material.",
    },
    {
      number: "03",
      title: "Track your progress",
      description:
        "Understand your strengths, identify weak topics and improve over time.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-slate-100 rounded-full blur-3xl opacity-70" />
        </div>

        {/* Navigation */}
        <header className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center">
                <Sparkles size={20} />
              </div>

              <div>
                <h1 className="font-bold text-lg tracking-tight">
                  StudyMate AI
                </h1>

                <p className="text-[11px] text-slate-500">
                  Your AI learning assistant
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-950 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2.5 rounded-xl bg-slate-950 text-white text-sm font-medium hover:bg-slate-800 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>

        {/* Hero content */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 lg:pt-24">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-sm text-slate-600 mb-6">
                <Sparkles size={15} />
                AI-powered learning
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-slate-950">
                Study smarter.
                <span className="block text-slate-500">
                  Not harder.
                </span>
              </h2>

              <p className="mt-6 text-lg md:text-xl text-slate-600 leading-8 max-w-xl">
                Turn your study notes into summaries, quizzes, AI
                explanations and personalized learning insights — all in
                one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950 text-white font-semibold hover:bg-slate-800 transition"
                >
                  Start studying
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
                >
                  Sign in
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8">
                <Benefit text="Upload study notes" />
                <Benefit text="Generate quizzes" />
                <Benefit text="Track progress" />
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="relative">
              <div className="rounded-3xl bg-slate-950 p-3 shadow-2xl">
                <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
                  {/* Fake browser header */}
                  <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />

                    <div className="ml-4 h-7 flex-1 rounded-lg bg-slate-800" />
                  </div>

                  <div className="p-5">
                    <div className="flex gap-4">
                      {/* Mini sidebar */}
                      <div className="hidden sm:block w-28">
                        <div className="h-7 w-20 bg-white/10 rounded-lg mb-6" />

                        {[1, 2, 3, 4, 5].map((item) => (
                          <div
                            key={item}
                            className={`h-7 rounded-lg mb-2 ${
                              item === 1
                                ? "bg-white/15"
                                : "bg-white/5"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Mini dashboard */}
                      <div className="flex-1">
                        <div className="h-5 w-44 bg-white/80 rounded mb-2" />
                        <div className="h-3 w-60 bg-white/10 rounded mb-6" />

                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <MiniCard value="12" label="Notes" />
                          <MiniCard value="7" label="Quizzes" />
                          <MiniCard value="5" label="Streak" />
                        </div>

                        <div className="bg-white/5 rounded-xl p-4">
                          <div className="flex justify-between">
                            <div>
                              <div className="h-3 w-28 bg-white/30 rounded" />
                              <div className="h-2 w-20 bg-white/10 rounded mt-2" />
                            </div>

                            <div className="text-xs text-white/70">
                              82%
                            </div>
                          </div>

                          <div className="h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
                            <div className="h-full w-[82%] bg-white rounded-full" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="h-20 bg-white/5 rounded-xl" />
                          <div className="h-20 bg-white/5 rounded-xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white border border-slate-200 shadow-xl rounded-2xl p-4 w-56">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Brain size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      AI recommendation
                    </p>

                    <p className="text-sm font-semibold text-slate-900">
                      Review SQL Joins
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
              Everything you need
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mt-3">
              One workspace for your entire study routine.
            </h2>

            <p className="text-slate-600 mt-4 leading-7">
              StudyMate combines your notes, AI tools and learning
              progress into one simple experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-950 text-white flex items-center justify-center">
                    <Icon size={20} />
                  </div>

                  <h3 className="font-bold text-lg text-slate-950 mt-5">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-6 mt-2">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
              How it works
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              From notes to better learning.
            </h2>

            <p className="text-slate-600 mt-4">
              A simple three-step workflow designed around how students
              actually study.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="text-5xl font-bold text-slate-100">
                  {step.number}
                </div>

                <h3 className="text-xl font-bold text-slate-950 mt-2">
                  {step.title}
                </h3>

                <p className="text-slate-600 leading-7 mt-3">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-slate-950 text-white px-8 py-14 md:px-14 md:py-16 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 flex items-center justify-center">
              <Sparkles size={22} />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mt-5">
              Ready to study smarter?
            </h2>

            <p className="text-slate-400 max-w-xl mx-auto mt-4 leading-7">
              Upload your study material and start building a smarter
              learning routine with StudyMate AI.
            </p>

            <Link
              to="/signup"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-semibold hover:bg-slate-100 transition"
            >
              Get started for free
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles size={17} />
            <span className="font-semibold">StudyMate AI</span>
          </div>

          <p className="text-sm text-slate-500">
            AI-powered learning for students.
          </p>

          <div className="flex gap-5 text-sm text-slate-500">
            <Link to="/login" className="hover:text-slate-900">
              Login
            </Link>

            <Link to="/signup" className="hover:text-slate-900">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- Small components ---------------- */

function Benefit({ text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <CheckCircle2 size={16} className="text-slate-900" />
      {text}
    </div>
  );
}

function MiniCard({ value, label }) {
  return (
    <div className="bg-white/5 rounded-xl p-3">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[10px] text-white/40 mt-1">{label}</p>
    </div>
  );
}

export default Home;