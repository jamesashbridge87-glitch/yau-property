"use client";

import { useState, FormEvent } from "react";

export default function Home() {
  const [formState, setFormState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <main className="flex-1">
      <Nav />
      <Hero />
      <PainPoints />
      <ChecklistPreview />
      <SocialProof />
      <FormSection
        formState={formState}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </main>
  );
}

/* ━━━━━━━━━━━━━━━━━━━ NAV ━━━━━━━━━━━━━━━━━━━ */

function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-navy/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo placeholder — James to replace */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange to-yellow flex items-center justify-center">
            <span className="text-navy text-xs font-extrabold font-[family-name:var(--font-poppins)]">YAU</span>
          </div>
          <span className="text-white/70 text-sm font-medium hidden sm:block">Your Aussie Uncle</span>
        </div>
        <a
          href="#checklist-form"
          className="bg-orange hover:bg-orange-hover text-navy font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm shadow-orange/20 font-[family-name:var(--font-poppins)]"
        >
          Get checklist
        </a>
      </div>
    </nav>
  );
}

/* ━━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━━ */

function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-24 md:pt-40 md:pb-32 px-6">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-orange/[0.06] blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-lime/[0.04] blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-yellow/[0.03] blur-[100px]" />

      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-1.5 text-sm text-lime mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
          Free resource for first home buyers
        </div>

        <h1 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.08] text-white tracking-tight">
          Your deposit is{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-orange">not your only cost</span>
            <span className="absolute bottom-1 left-0 right-0 h-3 bg-orange/20 -rotate-1 rounded-full" />
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-4 leading-relaxed font-[family-name:var(--font-dm-sans)]">
          Australian property speaks its own language. We translate it so you buy with confidence, not confusion.
        </p>
        <p className="text-sm text-white/30 mb-10 font-[family-name:var(--font-dm-sans)]">
          No jargon. No sales pitch. Just the checklist you actually need.
        </p>

        <a
          href="#checklist-form"
          className="group inline-flex items-center gap-3 bg-orange hover:bg-orange-hover text-navy font-[family-name:var(--font-poppins)] font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg shadow-orange/20 hover:shadow-orange/30 hover:scale-[1.02]"
        >
          Get the free checklist
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━ PAIN POINTS ━━━━━━━━━━━━━━━━━ */

function PainPoints() {
  const cards = [
    {
      accent: "lime",
      accentHex: "#D2FF42",
      label: "The language problem",
      title: "Stamp duty is never explained in plain English",
      body: "You sign contracts before anyone mentions the extra $30,000 you need. We give you the questions to ask first.",
    },
    {
      accent: "orange",
      accentHex: "#FDA400",
      label: "The system problem",
      title: "You are not bad with money",
      body: "The Australian property system was not built with international workers in mind. You just need the right questions.",
    },
    {
      accent: "cyan",
      accentHex: "#11E8F6",
      label: "The confidence problem",
      title: "Walk into an open home and know what to ask",
      body: "Fifteen questions that get the agent to take you seriously. No nodding along pretending you understand.",
    },
  ];

  return (
    <section className="py-12 md:py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-lime text-sm font-medium mb-3 font-[family-name:var(--font-dm-sans)] tracking-wide uppercase">
            Sound familiar?
          </p>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold text-white">
            Nobody tells you this stuff
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="group relative bg-white/[0.03] rounded-2xl p-8 border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300"
            >
              {/* Accent top line */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${card.accentHex}, ${card.accentHex}44)` }}
              />

              <p className="text-xs font-medium uppercase tracking-wider mb-4 opacity-50 font-[family-name:var(--font-dm-sans)]">
                {card.label}
              </p>

              <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-lg mb-3 text-white leading-snug">
                {card.title}
              </h3>

              <p className="text-white/45 text-sm leading-relaxed font-[family-name:var(--font-dm-sans)]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━ CHECKLIST PREVIEW ━━━━━━━━━━━━━ */

function ChecklistPreview() {
  const items = [
    {
      accent: "border-lime/30",
      bg: "bg-lime/[0.04]",
      title: "The First Home Buyer Question List",
      body: "15 questions to ask at every open home. So you understand what you are really looking at.",
    },
    {
      accent: "border-orange/30",
      bg: "bg-orange/[0.04]",
      title: "Property English Glossary",
      body: "48 terms translated into plain language. Stamp duty, body corporate, conveyancing — finally explained clearly.",
    },
    {
      accent: "border-cyan/30",
      bg: "bg-cyan/[0.04]",
      title: "Cost Checklist",
      body: "Everything beyond your deposit. The line items most first home buyers only discover after it is too late.",
    },
  ];

  return (
    <section className="py-12 md:py-16 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-lime text-sm font-medium mb-3 font-[family-name:var(--font-dm-sans)] tracking-wide uppercase">
            Free download
          </p>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold text-white mb-3">
            What you will get
          </h2>
          <p className="text-white/40 text-lg font-[family-name:var(--font-dm-sans)]">
            A free checklist built for people who want clarity, not confusion.
          </p>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-5 ${item.bg} ${item.accent} border rounded-2xl p-6 transition-all duration-200`}
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 text-sm font-bold font-[family-name:var(--font-poppins)]">
                {i + 1}
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed font-[family-name:var(--font-dm-sans)]">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━ SOCIAL PROOF ━━━━━━━━━━━━━━━━━ */

function SocialProof() {
  return (
    <section className="py-12 md:py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-8">
          <span className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </span>
          <span className="text-white/50 text-sm font-[family-name:var(--font-dm-sans)]">
            Trusted by people new to Australia
          </span>
        </div>

        <blockquote className="text-xl md:text-2xl text-white/70 italic font-[family-name:var(--font-dm-sans)] leading-relaxed max-w-xl mx-auto">
          &ldquo;I spent three months confused about property costs. This checklist explained more than every friend and agent combined.&rdquo;
        </blockquote>
        <p className="text-white/30 text-sm mt-4 font-[family-name:var(--font-dm-sans)]">
          Real feedback from a YAU community member
        </p>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━ FORM ━━━━━━━━━━━━━━━━━ */

function FormSection({
  formState,
  errorMessage,
  handleSubmit,
}: {
  formState: string;
  errorMessage: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section id="checklist-form" className="py-12 md:py-16 px-6">
      {/* Section divider */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <p className="text-lime text-sm font-medium mb-3 font-[family-name:var(--font-dm-sans)] tracking-wide uppercase">
            Download now
          </p>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold text-white mb-2">
            Get the checklist
          </h2>
          <p className="text-white/40 font-[family-name:var(--font-dm-sans)]">
            Free. No spam. Just clarity.
          </p>
        </div>

        {formState === "success" ? (
          <div className="bg-white/[0.03] border border-lime/20 rounded-2xl p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-lime/10 border border-lime/20 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D2FF42" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-poppins)] font-bold text-2xl mb-2 text-white">
              Check your inbox
            </h3>
            <p className="text-white/40 text-sm leading-relaxed font-[family-name:var(--font-dm-sans)]">
              Your First Home Buyer Checklist is on the way. If you do not see it, check your spam folder or promotions tab.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <InputField id="name" label="First name" type="text" autoComplete="given-name" placeholder="James" />
            <InputField id="email" label="Email address" type="email" autoComplete="email" placeholder="james@example.com" />

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-white/40 mb-2 font-[family-name:var(--font-dm-sans)]">
                Where are you looking?
              </label>
              <select
                id="location"
                name="location"
                required
                defaultValue=""
                className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white focus:border-orange focus:ring-2 focus:ring-orange/10 outline-none transition-all duration-200 cursor-pointer appearance-none font-[family-name:var(--font-dm-sans)]"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 20px center",
                }}
              >
                <option value="" disabled>Select an area</option>
                <option value="Sydney">Sydney</option>
                <option value="Melbourne">Melbourne</option>
                <option value="Brisbane">Brisbane</option>
                <option value="Other">Other</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>

            {formState === "error" && (
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl px-5 py-3 text-red-300/80 text-sm font-[family-name:var(--font-dm-sans)]">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={formState === "loading"}
              className="w-full bg-orange hover:bg-orange-hover disabled:opacity-50 disabled:cursor-not-allowed text-navy font-[family-name:var(--font-poppins)] font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-orange/20 hover:shadow-orange/30"
            >
              {formState === "loading" ? (
                <>
                  <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send me the checklist"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function InputField({
  id,
  label,
  type,
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white/40 mb-2 font-[family-name:var(--font-dm-sans)]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-white/20 focus:border-orange focus:ring-2 focus:ring-orange/10 outline-none transition-all duration-200 font-[family-name:var(--font-dm-sans)]"
      />
    </div>
  );
}

/* ━━━━━━━━━━━━━━ FOOTER ━━━━━━━━━━━━━━━ */

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo placeholder */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange to-yellow flex items-center justify-center">
              <span className="text-navy text-[10px] font-extrabold font-[family-name:var(--font-poppins)]">YAU</span>
            </div>
            <span className="text-white/30 text-sm font-[family-name:var(--font-dm-sans)]">
              Your Aussie Uncle
            </span>
          </div>

          <p className="text-white/20 text-sm text-center font-[family-name:var(--font-dm-sans)]">
            Australian workplace and life fluency for people new to Australia
          </p>

          <div className="flex gap-6 text-sm text-white/30 font-[family-name:var(--font-dm-sans)]">
            <a href="https://instagram.com/youraussieuncle" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors">Instagram</a>
            <a href="https://tiktok.com/@youraussieuncle" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors">TikTok</a>
            <a href="#" className="hover:text-orange transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
