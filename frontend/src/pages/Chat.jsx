import { useState } from "react";
import {
  Send,
  Sparkles,
  User,
  Bot,
  Trash2,
  Lightbulb,
  BookOpen,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your StudyMate AI Tutor. Upload your study material first, then ask me anything about your notes.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const sendMessage = async () => {
    const question = input.trim();

    if (!question || loading) {
      return;
    }

    // Add user's message
    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: question,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/chat?question=${encodeURIComponent(
          question
        )}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to get AI response."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            data.answer ||
            "I couldn't generate an answer.",
        },
      ]);
    } catch (error) {
      console.error("CHAT ERROR:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: `Sorry, I couldn't process that question. ${
            error.message || ""
          }`,
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  // =====================================================
  // CLEAR CHAT
  // =====================================================

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "Chat cleared. Ask me anything about your uploaded study material.",
      },
    ]);
  };

  // =====================================================
  // QUICK QUESTIONS
  // =====================================================

  const askQuickQuestion = (question) => {
    setInput(question);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 min-w-0 flex flex-col">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="px-6 md:px-10 pt-8">

          <div className="max-w-5xl">

            <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">

              <Sparkles size={16} />

              <span>AI Tutor</span>

            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

              <div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-950">
                  Ask your AI Tutor
                </h1>

                <p className="text-slate-500 mt-2 max-w-2xl">
                  Ask questions about your uploaded study
                  material and get simple explanations.
                </p>

              </div>

              <button
                onClick={clearChat}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50"
              >
                <Trash2 size={16} />
                Clear Chat
              </button>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* CHAT AREA */}
        {/* ================================================= */}

        <div className="px-6 md:px-10 py-8 flex-1">

          <div className="max-w-5xl mx-auto">

            {/* ================================================= */}
            {/* QUICK QUESTIONS */}
            {/* ================================================= */}

            {messages.length <= 1 && (

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">

                <QuickQuestion
                  icon={<Lightbulb size={17} />}
                  text="Explain the main concepts"
                  onClick={() =>
                    askQuickQuestion(
                      "Explain the main concepts from my notes."
                    )
                  }
                />

                <QuickQuestion
                  icon={<BookOpen size={17} />}
                  text="Give me an exam summary"
                  onClick={() =>
                    askQuickQuestion(
                      "Give me an exam-focused summary of my notes."
                    )
                  }
                />

                <QuickQuestion
                  icon={<Sparkles size={17} />}
                  text="Explain difficult topics"
                  onClick={() =>
                    askQuickQuestion(
                      "Which topics in my notes are difficult and explain them simply."
                    )
                  }
                />

                <QuickQuestion
                  icon={<Bot size={17} />}
                  text="Test my knowledge"
                  onClick={() =>
                    askQuickQuestion(
                      "Ask me 5 questions to test my understanding of these notes."
                    )
                  }
                />

              </div>

            )}

            {/* ================================================= */}
            {/* CHAT CARD */}
            {/* ================================================= */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

              {/* Messages */}

              <div className="min-h-[480px] max-h-[600px] overflow-y-auto p-5 md:p-7 space-y-6">

                {messages.map((message, index) => (

                  <Message
                    key={index}
                    message={message}
                  />

                ))}

                {/* AI TYPING */}

                {loading && (

                  <div className="flex items-start gap-3">

                    <div className="w-9 h-9 shrink-0 rounded-xl bg-slate-950 text-white flex items-center justify-center">

                      <Bot size={18} />

                    </div>

                    <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-5 py-4">

                      <div className="flex items-center gap-1">

                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />

                        <span
                          className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                          style={{
                            animationDelay: "0.15s",
                          }}
                        />

                        <span
                          className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                          style={{
                            animationDelay: "0.3s",
                          }}
                        />

                      </div>

                    </div>

                  </div>
                )}

              </div>

              {/* ================================================= */}
              {/* INPUT */}
              {/* ================================================= */}

              <div className="border-t border-slate-200 p-4">

                <div className="flex items-end gap-3">

                  <textarea
                    value={input}
                    onChange={(event) =>
                      setInput(event.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Ask something about your notes..."
                    rows={2}
                    className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-400 focus:bg-white transition"
                  />

                  <button
                    onClick={sendMessage}
                    disabled={
                      !input.trim() || loading
                    }
                    className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition ${
                      !input.trim() || loading
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-slate-950 text-white hover:bg-slate-800"
                    }`}
                  >

                    <Send size={18} />

                  </button>

                </div>

                <p className="text-xs text-slate-400 mt-2 px-1">
                  Press Enter to send • Shift + Enter for a new line
                </p>

              </div>

            </div>

            {/* ================================================= */}
            {/* INFO */}
            {/* ================================================= */}

            <div className="flex items-start gap-3 mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">

              <Sparkles
                size={17}
                className="text-slate-600 shrink-0 mt-0.5"
              />

              <p className="text-xs text-slate-500 leading-5">
                StudyMate answers questions using your uploaded
                study material. If something isn't covered in
                your notes, it will tell you instead of making
                up an answer.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

// =====================================================
// MESSAGE
// =====================================================

function Message({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >

      {/* Avatar */}

      <div
        className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${
          isUser
            ? "bg-slate-200 text-slate-700"
            : "bg-slate-950 text-white"
        }`}
      >
        {isUser ? (
          <User size={18} />
        ) : (
          <Bot size={18} />
        )}
      </div>

      {/* Message */}

      <div
        className={`max-w-[80%] px-5 py-4 rounded-2xl ${
          isUser
            ? "bg-slate-950 text-white rounded-tr-sm"
            : message.error
            ? "bg-red-50 border border-red-200 text-red-700 rounded-tl-sm"
            : "bg-slate-100 text-slate-700 rounded-tl-sm"
        }`}
      >

        <p className="text-sm leading-7 whitespace-pre-line">
          {message.text}
        </p>

      </div>

    </div>
  );
}

// =====================================================
// QUICK QUESTION
// =====================================================

function QuickQuestion({
  icon,
  text,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-4 text-left bg-white border border-slate-200 rounded-xl hover:border-slate-400 hover:bg-slate-50 transition"
    >

      <div className="w-9 h-9 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
        {icon}
      </div>

      <span className="text-sm font-semibold text-slate-700">
        {text}
      </span>

    </button>
  );
}

export default Chat;