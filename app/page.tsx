"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

export default function Home() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
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
      if (data.success) setFormState("success");
      else {
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
      <ProblemCards />
      <ChecklistPreview />
      <FormSection formState={formState} errorMessage={errorMessage} handleSubmit={handleSubmit} />
      <Footer />
    </main>
  );
}

/* ━━━━━━━━━━━━━━━ NAV ━━━━━━━━━━━━━━━ */

function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e8e4df]/60">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo.png" alt="Your Aussie Uncle" width={32} height={32} className="w-8 h-8 rounded-lg" />
          <span className="text-[#1a1a2e]/60 text-sm font-medium hidden sm:block font-sans">Your Aussie Uncle</span>
        </a>
        <a
          href="#checklist-form"
          className="bg-[#fda400] hover:bg-[#e69500] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 font-sans"
        >
          Get checklist
        </a>
      </div>
    </nav>
  );
}

/* ━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━ */

function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-6 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fda400]/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d2ff42]/[0.04] rounded-full blur-[100px]" />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#e8e4df] rounded-full px-4 py-1.5 text-xs font-semibold text-[#5a5a6e] mb-6 uppercase tracking-wider font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d2ff42]" />
              Free download
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-[1.08] mb-5 text-[#1a1a2e]">
              Your deposit is{" "}
              <span className="text-[#fda400]">not your only cost</span>
            </h1>

            <p className="text-lg text-[#5a5a6e] leading-relaxed mb-3 font-sans max-w-md">
              Australian property speaks its own language. We translate it so you buy with confidence, not confusion.
            </p>
            <p className="text-sm text-[#9a9aac] mb-8 font-sans">
              No jargon. No sales pitch. Just the checklist you actually need.
            </p>

            <a
              href="#checklist-form"
              className="group inline-flex items-center gap-2 bg-[#fda400] hover:bg-[#e69500] text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-all duration-200 hover:shadow-lg hover:shadow-orange-200 font-sans"
            >
              Get the free checklist
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Right: James's photo */}
          <div className="relative">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#e8e4df] shadow-lg">
              <Image
                src="/hero.jpg"
                alt="Your Aussie Uncle - James"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Subtle caption */}
            <p className="text-center text-xs text-[#9a9aac] mt-3 font-sans italic">
              James, Your Aussie Uncle
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━ PROBLEM CARDS ━━━━━━━━━━━━━━━ */

function ProblemCards() {
  const cards = [
    {
      color: "border-l-[#d2ff42]",
      bg: "bg-[#d2ff42]/[0.06]",
      label: "The language problem",
      title: "Stamp duty is never explained in plain English",
      body: "You sign contracts before anyone mentions the extra $30,000 you need. We give you the questions to ask first.",
    },
    {
      color: "border-l-[#fda400]",
      bg: "bg-[#fda400]/[0.06]",
      label: "The system problem",
      title: "You are not bad with money",
      body: "The Australian property system was not built with international workers in mind. You just need the right questions.",
    },
    {
      color: "border-l-[#11e8f6]",
      bg: "bg-[#11e8f6]/[0.06]",
      label: "The confidence problem",
      title: "Walk into an open home and know what to ask",
      body: "Fifteen questions that get the agent to take you seriously. No nodding along pretending you understand.",
    },
  ];

  return (
    <section className="py-12 md:py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-[#fda400] text-sm font-semibold mb-3 font-sans uppercase tracking-wide">
            Sound familiar?
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a1a2e]">
            Nobody tells you this stuff
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className={`group bg-white rounded-2xl p-8 border border-[#e8e4df] border-l-[3px] ${card.color} hover:shadow-md transition-all duration-300`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-[#9a9aac] font-sans">
                {card.label}
              </p>
              <h3 className="font-serif font-semibold text-lg mb-3 text-[#1a1a2e] leading-snug">
                {card.title}
              </h3>
              <p className="text-[#5a5a6e] text-sm leading-relaxed font-sans">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━ CHECKLIST PREVIEW ━━━━━━━━━━━━━━━ */

function ChecklistPreview() {
  const items = [
    {
      num: "1",
      accent: "border-[#d2ff42]",
      bg: "bg-[#d2ff42]/[0.04]",
      title: "The First Home Buyer Question List",
      body: "15 questions to ask at every open home. Know what you are really looking at.",
    },
    {
      num: "2",
      accent: "border-[#fda400]",
      bg: "bg-[#fda400]/[0.04]",
      title: "Property English Glossary",
      body: "48 terms translated into plain language. Stamp duty, body corporate, conveyancing. Finally explained clearly.",
    },
    {
      num: "3",
      accent: "border-[#11e8f6]",
      bg: "bg-[#11e8f6]/[0.04]",
      title: "Cost Checklist",
      body: "Everything beyond your deposit. The line items most first home buyers only discover after it is too late.",
    },
  ];

  return (
    <section className="py-12 md:py-16 px-6 bg-white border-y border-[#e8e4df]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#fda400] text-sm font-semibold mb-3 font-sans uppercase tracking-wide">
            Free download
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-3">
            What you will get
          </h2>
          <p className="text-[#5a5a6e] text-lg font-sans">
            A free checklist built for people who want clarity, not confusion.
          </p>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {items.map((item) => (
            <div
              key={item.num}
              className={`flex items-start gap-5 ${item.bg} ${item.accent} border rounded-2xl p-6 transition-all duration-200 hover:shadow-sm`}
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-white border border-[#e8e4df] flex items-center justify-center text-[#5a5a6e] text-sm font-bold font-sans">
                {item.num}
              </span>
              <div>
                <h3 className="font-serif font-semibold text-[#1a1a2e] mb-1.5">{item.title}</h3>
                <p className="text-[#5a5a6e] text-sm leading-relaxed font-sans">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━ FORM ━━━━━━━━━━━━━━━ */

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
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#fda400] text-sm font-semibold mb-3 font-sans uppercase tracking-wide">
            Download now
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-2">
            Get the checklist
          </h2>
          <p className="text-[#5a5a6e] font-sans">
            Free. No spam. Just clarity.
          </p>
        </div>

        {formState === "success" ? (
          <div className="bg-white border border-[#d2ff42]/30 rounded-2xl p-10 text-center shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#d2ff42]/10 border border-[#d2ff42]/20 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5a8f00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-serif font-bold text-2xl mb-2 text-[#1a1a2e]">Check your inbox</h3>
            <p className="text-[#5a5a6e] text-sm leading-relaxed font-sans">
              Your First Home Buyer Checklist is on the way. If you do not see it, check your spam folder or promotions tab.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-[#e8e4df] rounded-2xl p-8 shadow-sm" noValidate>
            <Field id="name" label="First name" type="text" autoComplete="given-name" placeholder="James" />
            <Field id="email" label="Email address" type="email" autoComplete="email" placeholder="james@example.com" />

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-[#5a5a6e] mb-2 font-sans">
                Where are you looking?
              </label>
              <select
                id="location"
                name="location"
                required
                defaultValue=""
                className="w-full px-4 py-3.5 bg-white border-2 border-[#e8e4df] rounded-xl text-[#1a1a2e] focus:border-[#fda400] focus:ring-3 focus:ring-[#fda400]/10 outline-none transition-all duration-200 cursor-pointer appearance-none font-sans"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239a9aac' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
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
              <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 text-red-600 text-sm font-sans">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={formState === "loading"}
              className="w-full bg-[#fda400] hover:bg-[#e69500] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-200 font-sans"
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

function Field({ id, label, type, autoComplete, placeholder }: {
  id: string; label: string; type: string; autoComplete: string; placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#5a5a6e] mb-2 font-sans">{label}</label>
      <input
        id={id} name={id} type={type} required autoComplete={autoComplete} placeholder={placeholder}
        className="w-full px-4 py-3.5 bg-white border-2 border-[#e8e4df] rounded-xl text-[#1a1a2e] placeholder-[#9a9aac] focus:border-[#fda400] focus:ring-3 focus:ring-[#fda400]/10 outline-none transition-all duration-200 font-sans"
      />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━ FOOTER ━━━━━━━━━━━━━━━ */

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#e8e4df] bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Your Aussie Uncle" width={28} height={28} className="w-7 h-7 rounded-lg" />
            <span className="text-[#9a9aac] text-sm font-sans">Your Aussie Uncle</span>
          </div>

          <p className="text-[#9a9aac] text-sm text-center font-sans">
            Australian workplace and life fluency for people new to Australia
          </p>

          <div className="flex gap-6 text-sm text-[#9a9aac] font-sans">
            <a href="https://instagram.com/youraussieuncle" target="_blank" rel="noopener noreferrer" className="hover:text-[#fda400] transition-colors">Instagram</a>
            <a href="https://tiktok.com/@youraussieuncle" target="_blank" rel="noopener noreferrer" className="hover:text-[#fda400] transition-colors">TikTok</a>
            <a href="#" className="hover:text-[#fda400] transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
