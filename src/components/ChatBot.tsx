"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sendChatMessageAPI } from "@/api/chat_api";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  options?: { label: string; action: string }[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Hi there! 👋 I'm Vexus Bot, your engineering assistant. How can I help you today?",
    timestamp: "Just now",
    options: [
      { label: "🚀 14-Day MVP Sprint", action: "sprint" },
      { label: "🛠 Tech Stack & Services", action: "services" },
      { label: "💼 Open Roles & Careers", action: "careers" },
      { label: "📞 Speak to Founders", action: "contact" },
    ],
  },
];

export function ChatBot() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Click outside and Escape key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        chatContainerRef.current &&
        !chatContainerRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const getBotResponse = (userQuery: string): { text: string; options?: { label: string; action: string }[] } => {
    const q = userQuery.toLowerCase().trim();

    if (q.includes("sprint") || q.includes("14-day") || q.includes("mvp") || q.includes("timeline")) {
      return {
        text: "Our core formula is our 14-Day Turnkey Production Sprint. We build zero-to-one production systems with microservices, automated CI/CD canary pipelines, and full IP transfer. No corporate overhead, just senior architects shipping daily code.",
        options: [
          { label: "🛠 View Services", action: "services" },
          { label: "📞 Book Architecture Call", action: "contact" },
        ],
      };
    }

    if (q.includes("service") || q.includes("stack") || q.includes("build") || q.includes("tech") || q.includes("ai")) {
      return {
        text: "🛠 Vexus Labs Core Service Modules:\n\n1. Digital Product Architecture:\nEnterprise architecture, high-throughput microservices, and zero-to-one product execution.\n\n2. Generative AI & LLM Solutions:\nCustom foundation fine-tuning, RAG vector search, and autonomous AI agent workflows.\n\n3. Cloud & DevOps Engineering:\nMulti-cloud CI/CD pipelines, Kubernetes orchestration, and Infrastructure as Code.\n\n4. Cybersecurity & Compliance:\nZero-trust architecture, cryptographic data protection, and SOC2/HIPAA readiness.",
        options: [
          { label: "🏛 Digital Architecture", action: "go-digital-arch" },
          { label: "🤖 Generative AI", action: "go-generative-ai" },
          { label: "☁️ Cloud & DevOps", action: "go-cloud-devops" },
          { label: "🛡 Cybersecurity", action: "go-cybersecurity" },
          { label: "🌐 All Services", action: "go-services" },
        ],
      };
    }

    if (q.includes("hire") || q.includes("career") || q.includes("job") || q.includes("apply") || q.includes("role") || q.includes("salary")) {
      return {
        text: "We are actively hiring across 12 technical roles! We offer top-percentile transparent compensation (₹3L-₹7) and a guaranteed 7-Day Assessment SLA with zero algorithmic tricks. You can review positions and apply directly on our Careers page.",
        options: [
          { label: "💼 Explore Careers Page", action: "go-careers" },
          { label: "📞 Contact Talent Team", action: "contact" },
        ],
      };
    }

    if (q.includes("hyperfocus") || q.includes("hyper focus") || q.includes("noida") || q.includes("sector 63") || q.includes("sector-63")) {
      return {
        text: "🏢 HyperFocus Business Solutions Private Limited:\n• Address: A-96, Sector-63, Noida, Gautam Buddha Nagar, Uttar Pradesh - 201301\n• Incorporation Date: March 3, 2023 | CIN: U68100UP2023PTC177860\n• Directors: Prem Mohan Tyagi, Prashant Kumar Singh, Pooja Sharma\n• Website: https://hyperfocusbusinesssolutions.com/",
        options: [
          { label: "📞 Speak to Founders", action: "contact" },
          { label: "🚀 14-Day MVP Sprint", action: "sprint" },
        ],
      };
    }

    if (q.includes("name") || q.includes("who are you") || q.includes("identity") || q.includes("agent") || q.includes("developed")) {
      return {
        text: "🤖 My name is Vexus AI Assistant, an AI engineering consultant developed by Vexus Labs (VelocityAI Division). How can I assist with your software architecture or product development today?",
        options: [
          { label: "🚀 14-Day MVP Sprint", action: "sprint" },
          { label: "🛠 Tech Stack & Services", action: "services" },
        ],
      };
    }

    if (q.includes("location") || q.includes("address") || q.includes("where") || q.includes("office") || q.includes("city") || q.includes("hq") || q.includes("headquarters") || q.includes("mohali") || q.includes("punjab") || q.includes("zirakpur") || q.includes("zirkhpur")) {
      return {
        text: "📍 Vexus Labs Headquarters & Locations:\n• Main R&D Cradle & HQ: Mohali / Chandigarh (Zirakpur region), Punjab, India\n• Smart Workspaces Hub: HyperFocus Business Solutions, A-96, Sector-63, Noida, UP 201301\n• Global Delivery Quorums: London (EMEA Hub) & San Francisco Quorum\n• Direct Contact & Phone: +91 98765 43210 | contact@vexuslab.com",
        options: [
          { label: "📞 Speak to Founders", action: "contact" },
          { label: "🚀 14-Day MVP Sprint", action: "sprint" },
        ],
      };
    }

    if (q.includes("contact") || q.includes("call") || q.includes("mobile") || q.includes("phone") || q.includes("number") || q.includes("email") || q.includes("founder") || q.includes("book") || q.includes("meet")) {
      return {
        text: "📞 Direct Studio Contact & Mobile Number:\n• Mobile / Phone: +91 98765 43210\n• Email: contact@vexuslab.com\n\nYou can also submit an architecture briefing request on our Contact page for an SLA response within 24 hours.",
        options: [
          { label: "📅 Schedule Briefing", action: "go-contact" },
          { label: "💼 Explore Careers", action: "careers" },
        ],
      };
    }

    if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("help")) {
      return {
        text: "Hello! I can answer questions about Vexus Labs's software development formula, autonomous AI pods, engineering pricing, open roles, or put you in touch with our founders.",
        options: [
          { label: "🚀 14-Day MVP Sprint", action: "sprint" },
          { label: "💼 Open Roles & Careers", action: "careers" },
        ],
      };
    }

    return {
      text: "Thanks for your question! We build scalable cloud architectures, AI systems, and enterprise web applications for high-growth tech teams. Would you like to schedule an architecture briefing or explore open positions?",
      options: [
        { label: "📞 Speak to Founders", action: "contact" },
        { label: "💼 View Open Careers", action: "careers" },
      ],
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend || inputValue;
    if (!rawText.trim() || isTyping) return;

    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: rawText.trim(),
      timestamp: timeString,
    };

    console.log("💬 [Vexus ChatBot User Message]:", userMsg.text);

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Try backend AI API endpoint
      const apiResult = await sendChatMessageAPI(rawText.trim());

      let botText = "";
      let botOptions: { label: string; action: string }[] | undefined;

      if (apiResult.success && apiResult.reply) {
        botText = apiResult.reply;
      } else {
        const fallback = getBotResponse(rawText);
        botText = fallback.text;
        botOptions = fallback.options;
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: botOptions,
      };

      console.log("🤖 [Vexus ChatBot Bot Reply]:", botMsg.text);
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallback = getBotResponse(rawText);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: fallback.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: fallback.options,
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (action: string, label: string) => {
    if (action === "go-digital-arch") {
      window.location.href = "/services/digital-architecture";
      return;
    }
    if (action === "go-generative-ai") {
      window.location.href = "/services/generative-ai";
      return;
    }
    if (action === "go-cloud-devops") {
      window.location.href = "/services/cloud-devops";
      return;
    }
    if (action === "go-cybersecurity") {
      window.location.href = "/services/cybersecurity";
      return;
    }
    if (action === "go-services" || action === "services") {
      window.location.href = "/services";
      return;
    }
    if (action === "go-careers") {
      window.location.href = "/careers";
      return;
    }
    if (action === "go-contact") {
      window.location.href = "/contact";
      return;
    }
    handleSendMessage(label);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Do not render public chatbot inside admin dashboard or portal routes
  if (
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/admindashboard") ||
    pathname?.startsWith("/adminLogin") ||
    pathname?.startsWith("/hiringForm")
  ) {
    return null;
  }

  return (
    <>
      {/* Mobile Backdrop Overlay (Allows tapping anywhere outside on phones to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs sm:hidden animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ========================================================================= */}
      {/* FLOATING CHATBOT TOGGLE BUTTON (HIDDEN WHEN CHAT IS OPEN)                 */}
      {/* ========================================================================= */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
          {/* Unread Prompt Bubble (Shows when closed) */}
          {unreadCount > 0 && (
            <div
              onClick={handleToggle}
              className="mb-2 px-3 py-1 sm:py-1.5 rounded-full bg-[#181a24] text-white text-[11px] sm:text-xs font-semibold shadow-lg border border-slate-700/80 cursor-pointer animate-bounce flex items-center gap-1.5 sm:gap-2 hover:bg-[#0066ff] transition-colors whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Chat with Vexus AI</span>
            </div>
          )}

          {/* Floating Circular Bot Icon Button */}
          <button
            ref={toggleButtonRef}
            type="button"
            onClick={handleToggle}
            aria-label="Open chat bot"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0066ff] via-[#0052cc] to-[#003d99] text-white shadow-[0_8px_25px_-4px_rgba(0,102,255,0.5)] hover:shadow-[0_12px_32px_-4px_rgba(0,102,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer relative group"
          >
            {/* Modern Robot / Chatbot Icon */}
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110 duration-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 2v3m-2-1.5h4" strokeWidth="2" strokeLinecap="round" />
              <rect x="4" y="6" width="16" height="13" rx="3.5" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
              <circle cx="9" cy="12" r="1.5" fill="currentColor" />
              <circle cx="15" cy="12" r="1.5" fill="currentColor" />
              <path d="M9 16h6" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 11v3m20-3v3" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* Active Online Status Badge */}
            <span className="absolute top-0 right-0 w-3 sm:w-3.5 h-3 sm:h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-xs" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULLY RESPONSIVE CHAT SECTION / DRAWER WINDOW                             */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className="fixed z-50 bottom-4 right-3 sm:bottom-6 sm:right-6 w-[calc(100vw-24px)] sm:w-[390px] max-w-[420px] h-[490px] sm:h-[530px] max-h-[calc(100dvh-32px)] bg-white rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.22)] border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 font-sans"
        >
          {/* Header */}
          <div className="px-3.5 py-3 sm:px-4 sm:py-3.5 bg-gradient-to-r from-[#181a24] to-[#252839] text-white flex items-center justify-between border-b border-slate-700/50 flex-shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Bot Avatar */}
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0066ff]/20 border border-[#0066ff]/40 flex items-center justify-center text-white flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#0066ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2v3m-2-1.5h4" strokeWidth="2" strokeLinecap="round" />
                  <rect x="4" y="6" width="16" height="13" rx="3.5" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
                  <circle cx="9" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="12" r="1.5" fill="currentColor" />
                  <path d="M9 16h6" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 border-2 border-[#181a24]" />
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>Vexus AI Assistant</span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-normal px-1 sm:px-1.5 py-0.5 rounded bg-[#0066ff]/30 text-[#38bdf8]">
                    PROD
                  </span>
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-300 font-mono flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Sub-10ms response</span>
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMessages(INITIAL_MESSAGES)}
                title="Reset conversation"
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 flex items-center justify-center transition-colors cursor-pointer text-xs"
              >
                ↺
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-[#f8f9fc]/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[84%] rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-2xs ${msg.sender === "user"
                    ? "bg-gradient-to-r from-[#0066ff] to-[#0052cc] text-white rounded-br-xs font-medium"
                    : "bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs shadow-xs"
                    }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Quick Suggestion Pills */}
                {msg.sender === "bot" && msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2 max-w-full">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleOptionClick(opt.action, opt.label)}
                        className="text-[10px] sm:text-[11px] font-medium px-2 py-1 sm:px-2.5 sm:py-1 rounded-full bg-white border border-slate-200 hover:border-[#0066ff] text-slate-700 hover:text-[#0066ff] transition-all shadow-2xs cursor-pointer active:scale-95"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] sm:text-[9.5px] font-mono text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 rounded-full px-3 py-1.5 w-fit shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="text-[10px] text-slate-400 font-mono ml-1">Vexus Bot is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Help Footer */}
          <div className="px-3.5 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[9.5px] sm:text-[10px] text-slate-500 font-mono flex-shrink-0">
            <span>24h Response SLA • 14-Day Sprint</span>
            <Link href="/contact" className="text-[#0066ff] hover:underline font-semibold">
              Contact Studio →
            </Link>
          </div>

          {/* Input & Sent Action Bar */}
          <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200 flex-shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 focus-within:border-[#0066ff] focus-within:ring-1 focus-within:ring-[#0066ff] focus-within:bg-white transition-all"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Vexus Bot a question..."
                className="flex-1 text-xs bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none py-1.5"
              />

              {/* Sent Icon Button */}
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0066ff] hover:bg-[#0052cc] text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 cursor-pointer shadow-xs flex-shrink-0"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.2"
                    d="M3 12l18-9-9 18-2-8-7-1z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
