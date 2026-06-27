"use client";

import { useState, FormEvent, useRef } from "react";
import Loading from "./loading";

export default function Home() {
  const [formState, setFormState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const location = formData.get("location") as string;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, location }),
      });

      const data = await res.json();

      if (data.success) {
        setFormState("success");
      } else {
        setFormState("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setFormState("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  const scrollToForm = () => {
    const el = document.getElementById("checklist-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex-1">
      {/* ── HERO ── */}
      <section className="relative py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Koala logo */}
          <div className="mb-10 inline-block">
            {/* YAU Koala — white SVG */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              className="mx-auto"
              aria-hidden="true"
            >
              <circle cx="24" cy="24" r="7" fill="white" />
              <circle cx="40" cy="24" r="7" fill="white" />
              <circle cx="24" cy="24" r="3" fill="#1A1A2E" />
              <circle cx="40" cy="24" r="3" fill="#1A1A2E" />
              <ellipse cx="32" cy="36" rx="8" ry="10" fill="white" />
              <ellipse cx="32" cy="33" rx="5" ry="3" fill="#1A1A2E" />
              <path
                d="M12 18c-3-4-1-10 1-12 2-2 7-1 8 2 1 2-1 6-4 8s-3 3-5 2z"
                fill="white"
              />
              <path
                d="M52 18c3-4 1-10-1-12-2-2-7-1-8 2-1 2 1 6 4 8s3 3 5 2z"
                fill="white"
              />
            </svg>
          </div>

          <h1 className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            Your Deposit Is Not<br className="hidden sm:block" /> Your Only
            Cost
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Australian property has a language of its own. We translate it —
            so you buy with confidence, not confusion.
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-navy font-[family-name:var(--font-poppins)] font-semibold px-8 py-4 rounded-xl text-lg transition-colors duration-200 cursor-pointer"
          >
            Get the First Home Buyer Checklist
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-navy-light rounded-xl p-8 hover:-translate-y-1 transition-transform duration-200">
              <div className="text-lime text-3xl mb-4" aria-hidden="true">
                📋
              </div>
              <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-lg mb-2 text-white">
                Nobody explains stamp duty in plain English
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Legal documents should not be the first place you learn about
                government costs.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-navy-light rounded-xl p-8 hover:-translate-y-1 transition-transform duration-200">
              <div className="text-lime text-3xl mb-4" aria-hidden="true">
                💬
              </div>
              <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-lg mb-2 text-white">
                You are not bad with money — you are new to the system
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                The Australian property system was not built with international
                workers in mind. We bridge that gap.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-navy-light rounded-xl p-8 hover:-translate-y-1 transition-transform duration-200">
              <div className="text-lime text-3xl mb-4" aria-hidden="true">
                🏠
              </div>
              <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-lg mb-2 text-white">
                Walk into an open home knowing what to ask
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Fifteen questions that show the agent you have done your
                homework — and get you real answers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEAD MAGNET PREVIEW ── */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold mb-4 text-center text-white">
            What You Will Get
          </h2>
          <p className="text-gray-400 text-center mb-12">
            A free checklist built for people who want clarity, not confusion.
          </p>

          <div className="space-y-5 max-w-2xl mx-auto">
            <div className="flex items-start gap-4 bg-navy-light rounded-xl p-6">
              <span
                className="text-lime text-xl mt-0.5 flex-shrink-0"
                aria-hidden="true"
              >
                ✅
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-white mb-1">
                  The First Home Buyer Question List
                </h3>
                <p className="text-gray-400 text-sm">
                  15 questions to ask at every open home — so you understand
                  what you are really looking at.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-navy-light rounded-xl p-6">
              <span
                className="text-lime text-xl mt-0.5 flex-shrink-0"
                aria-hidden="true"
              >
                ✅
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-white mb-1">
                  Property English Glossary
                </h3>
                <p className="text-gray-400 text-sm">
                  48 terms translated into plain language — from &ldquo;stamp
                  duty&rdquo; to &ldquo;body corporate&rdquo;.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-navy-light rounded-xl p-6">
              <span
                className="text-lime text-xl mt-0.5 flex-shrink-0"
                aria-hidden="true"
              >
                ✅
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-white mb-1">
                  Cost Checklist
                </h3>
                <p className="text-gray-400 text-sm">
                  Everything beyond your deposit — the line items most first
                  home buyers only discover after it is too late.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPTURE FORM ── */}
      <section id="checklist-form" className="py-16 md:py-20 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold mb-2 text-center text-white">
            Get the Checklist
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Free. No spam. Just clarity.
          </p>

          {formState === "success" ? (
            <div className="bg-navy-light rounded-xl p-10 text-center">
              <div className="text-lime text-4xl mb-4" aria-hidden="true">
                ✅
              </div>
              <h3 className="font-[family-name:var(--font-poppins)] font-bold text-2xl mb-2 text-white">
                Check your inbox!
              </h3>
              <p className="text-gray-400">
                Your First Home Buyer Checklist is on the way. If you do not
                see it, check your spam folder or promotions tab.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  First name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="given-name"
                  placeholder="James"
                  className="w-full px-5 py-4 bg-navy-light border border-navy-lighter rounded-xl text-white placeholder-gray-400 focus:border-orange focus:ring-1 focus:ring-orange outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="james@example.com"
                  className="w-full px-5 py-4 bg-navy-light border border-navy-lighter rounded-xl text-white placeholder-gray-400 focus:border-orange focus:ring-1 focus:ring-orange outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Where are you looking?
                </label>
                <select
                  id="location"
                  name="location"
                  required
                  className="w-full px-5 py-4 bg-navy-light border border-navy-lighter rounded-xl text-white focus:border-orange focus:ring-1 focus:ring-orange outline-none transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 20px center",
                  }}
                >
                  <option value="">Select an area</option>
                  <option value="Sydney">Sydney</option>
                  <option value="Melbourne">Melbourne</option>
                  <option value="Brisbane">Brisbane</option>
                  <option value="Other">Other</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>

              {formState === "error" && (
                <div className="bg-red-900/30 border border-red-700 rounded-xl px-5 py-3 text-red-300 text-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full bg-orange hover:bg-orange-hover disabled:opacity-60 disabled:cursor-not-allowed text-navy font-[family-name:var(--font-poppins)] font-semibold px-8 py-4 rounded-xl text-lg transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                {formState === "loading" ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-navy"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Me the Checklist
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 border-t border-navy-light">
        <div className="max-w-4xl mx-auto text-center">
          {/* Small koala */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 64 64"
            fill="none"
            className="mx-auto mb-4 opacity-60"
            aria-hidden="true"
          >
            <circle cx="24" cy="24" r="7" fill="white" />
            <circle cx="40" cy="24" r="7" fill="white" />
            <circle cx="24" cy="24" r="3" fill="#1A1A2E" />
            <circle cx="40" cy="24" r="3" fill="#1A1A2E" />
            <ellipse cx="32" cy="36" rx="8" ry="10" fill="white" />
            <ellipse cx="32" cy="33" rx="5" ry="3" fill="#1A1A2E" />
            <path
              d="M12 18c-3-4-1-10 1-12 2-2 7-1 8 2 1 2-1 6-4 8s-3 3-5 2z"
              fill="white"
            />
            <path
              d="M52 18c3-4 1-10-1-12-2-2-7-1-8 2-1 2 1 6 4 8s3 3 5 2z"
              fill="white"
            />
          </svg>

          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            Your Aussie Uncle — Australian life fluency for people who want to
            understand the system before they buy.
          </p>

          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a
              href="https://instagram.com/youraussieuncle"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@youraussieuncle"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange transition-colors"
            >
              TikTok
            </a>
            <a
              href="#"
              className="hover:text-orange transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
