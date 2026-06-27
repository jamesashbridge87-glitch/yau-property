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
        setErrorMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setFormState("error");
      setErrorMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <main className="flex-1 bg-[#1A1A2E] relative">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange/[0.03] rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-pink/[0.02] rounded-full blur-[130px]" />
      </div>

      <Nav />
      <Hero />
      <ProblemCards />
      <Divider color="orange" />
      <ChecklistPreview />
      <Divider color="pink" />
      <FormSection formState={formState} errorMessage={errorMessage} handleSubmit={handleSubmit} />
      <Footer />
    </main>
  );
}

/* ━━━ NAV ━━━ */

function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#1A1A2E]/90 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/15">
            <Image src="/logo.png" alt="Your Aussie Uncle" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <span className="text-white/70 text-sm font-semibold hidden sm:block font-sans tracking-tight">
            Your Aussie Uncle
          </span>
        </a>
        <a
          href="#checklist-form"
          className="bg-orange hover:bg-orange/90 text-[#1A1A2E] font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 font-sans shadow-lg shadow-orange/30 hover:shadow-orange/50"
        >
          Download free checklist
        </a>
      </div>
    </nav>
  );
}

/* ━━━ HERO ━━━ */

function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-28 px-6 overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/10 rounded-full px-5 py-2 mb-7">
              <span className="w-2 h-2 rounded-full bg-yellow" />
              <span className="text-yellow text-xs font-bold uppercase tracking-widest font-sans">
                Free download
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-heading font-extrabold leading-[1.05] mb-5 text-white tracking-tight">
              Your deposit is{" "}
              <span className="relative inline-block">
                <span className="text-orange">not your only cost</span>
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-orange/40 rounded-full" />
              </span>
            </h1>

            <p className="text-lg text-white/60 leading-relaxed mb-4 font-sans max-w-md">
              Australian property speaks its own language. We translate it so you buy with confidence, not confusion.
            </p>

            <a
              href="#checklist-form"
              className="group inline-flex items-center gap-3 bg-orange hover:bg-orange/90 text-[#1A1A2E] font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-xl shadow-orange/30 hover:shadow-orange/50 font-sans mt-3"
            >
              Get the free checklist
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          <div className="relative">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-br from-pink/25 via-orange/10 to-transparent rounded-[1.25rem] blur-sm" />
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                <Image src="/hero.jpg" alt="Your Aussie Uncle" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>
            <p className="text-center text-white/50 text-xs mt-3.5 font-sans">
              James, Your Aussie Uncle
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━ DIVIDER ━━━ */

function Divider({ color }: { color: "orange" | "pink" }) {
  const colors = {
    orange: "from-orange/30 via-transparent to-transparent",
    pink: "from-pink/30 via-transparent to-transparent",
  };
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className={`h-px bg-gradient-to-r ${colors[color]}`} />
    </div>
  );
}

/* ━━━ PROBLEM CARDS ━━━ */

function ProblemCards() {
  const cards = [
    {
      accent: "border-l-lime",
      label: "The language problem",
      title: "Stamp duty is never explained in plain English",
      body: "You sign contracts before anyone mentions the extra $30,000 you need. We give you the questions to ask first.",
    },
    {
      accent: "border-l-orange",
      label: "The system problem",
      title: "You are not bad with money",
      body: "The Australian property system was not built with international workers in mind. You just need the right questions.",
    },
    {
      accent: "border-l-cyan",
      label: "The confidence problem",
      title: "Walk into an open home and know what to ask",
      body: "Fifteen questions that get the agent to take you seriously. No nodding along pretending you understand.",
    },
  ];

  const labelColors: Record<string, string> = {
    "border-l-lime": "text-lime",
    "border-l-orange": "text-orange",
    "border-l-cyan": "text-cyan",
  };

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-pink text-sm font-bold mb-3 font-sans uppercase tracking-widest">
            Sound familiar?
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white">
            How to buy property without the hidden costs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div
              key={card.label}
              className={`group border border-white/10 border-l-[4px] ${card.accent} rounded-2xl p-8 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300`}
            >
              <p className={`text-xs font-bold uppercase tracking-widest mb-4 font-sans ${labelColors[card.accent]}`}>
                {card.label}
              </p>
              <h3 className="font-heading font-bold text-lg mb-3 text-white leading-snug">
                {card.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed font-sans">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━ CHECKLIST PREVIEW ━━━ */

function ChecklistPreview() {
  const items = [
    {
      accent: "border-lime/40 bg-lime/[0.04]",
      title: "The First Home Buyer Question List",
      body: "15 questions to ask at every open home. Know what you are really looking at.",
    },
    {
      accent: "border-orange/40 bg-orange/[0.04]",
      title: "Property English Glossary",
      body: "48 terms translated into plain language. Stamp duty, body corporate, conveyancing. Finally explained clearly.",
    },
    {
      accent: "border-cyan/40 bg-cyan/[0.04]",
      title: "Cost Checklist",
      body: "Everything beyond your deposit. The line items most first home buyers only discover after it is too late.",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-yellow text-sm font-bold uppercase tracking-widest font-sans mb-4">
            Free download
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-3">
            What is inside
          </h2>
          <p className="text-white/60 text-lg font-sans max-w-md mx-auto">
            A free checklist built for people who want clarity, not confusion.
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`flex items-start gap-5 border rounded-2xl p-6 ${item.accent} hover:border-white/20 transition-all duration-300`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                <span className="font-heading font-extrabold text-xl text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="pt-1">
                <h3 className="font-heading font-bold text-lg text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed font-sans">
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

/* ━━━ FORM ━━━ */

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
    <section id="checklist-form" className="py-20 md:py-28 px-6">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <p className="text-yellow text-sm font-bold mb-3 font-sans uppercase tracking-widest">
            Download now
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-2">
            Get the free checklist
          </h2>
          <p className="text-white/60 font-sans">
            Free download. No spam, no nonsense.
          </p>
        </div>

        {formState === "success" ? (
          <div className="border border-lime/40 bg-lime/[0.04] rounded-2xl p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-lime/10 border border-lime/25 flex items-center justify-center mx-auto mb-6">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D2FF42" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-heading font-extrabold text-2xl mb-2 text-white">
              Check your inbox
            </h3>
            <p className="text-white/55 text-sm leading-relaxed font-sans max-w-xs mx-auto">
              Your First Home Buyer Checklist is on the way. If you do not see it, check spam or promotions.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 border border-white/10 rounded-2xl p-8 bg-white/[0.02]" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-white/70 mb-2.5 font-sans">
                First name
              </label>
              <input
                id="name" name="name" type="text" required autoComplete="given-name" placeholder="James"
                className="w-full px-5 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all duration-200 font-sans text-base"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white/70 mb-2.5 font-sans">
                Email address
              </label>
              <input
                id="email" name="email" type="email" required autoComplete="email" placeholder="james@example.com"
                className="w-full px-5 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all duration-200 font-sans text-base"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-white/70 mb-2.5 font-sans">
                Where are you looking?
              </label>
              <select
                id="location" name="location" required defaultValue=""
                className="w-full px-5 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-white focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all cursor-pointer appearance-none font-sans text-base"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238888aa' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 20px center",
                }}
              >
                <option value="" disabled>Select an area</option>
                <option value="Sydney">Sydney</option>
                <option value="Melbourne">Melbourne</option>
                <option value="Brisbane">Brisbane</option>
                <option value="Perth">Perth</option>
                <option value="Adelaide">Adelaide</option>
                <option value="Other">Other</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>

            {formState === "error" && (
              <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-5 py-3.5 text-red-300 text-sm font-sans">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={formState === "loading"}
              className="w-full bg-orange hover:bg-orange/90 disabled:opacity-50 disabled:cursor-not-allowed text-[#1A1A2E] font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 shadow-xl shadow-orange/30 hover:shadow-orange/50 font-sans mt-2"
            >
              {formState === "loading" ? (
                <>
                  <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending your checklist...
                </>
              ) : (
                "Get Your Free Checklist"
              )}
            </button>

            <p className="text-center text-white/30 text-xs font-sans pt-1">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

/* ━━━ FOOTER ━━━ */

function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/15">
              <Image src="/logo.png" alt="Your Aussie Uncle" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <span className="text-white/50 text-sm font-semibold font-sans">
              Your Aussie Uncle
            </span>
          </div>

          <p className="text-white/40 text-sm text-center font-sans">
            Helping people new to Australia buy property with confidence
          </p>

          <div className="flex gap-8 text-sm text-white/50 font-sans">
            <a href="https://instagram.com/youraussieuncle" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors duration-200">
              Instagram
            </a>
            <a href="https://tiktok.com/@youraussieuncle" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors duration-200">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
