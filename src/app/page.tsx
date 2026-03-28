"use client";

import { useEffect, useState } from "react";

function useScrollFade() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrollY;
}

function WaitlistForm({ size = "default" }: { size?: "default" | "large" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      // Store in Supabase via edge function or direct insert
      const res = await fetch("https://sgqurcjeqmrbeoqiidzm.supabase.co/rest/v1/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNncXVyY2plcW1yYmVvcWlpZHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NTA4MTIsImV4cCI6MjA5MDIyNjgxMn0.og1piyHfkjA_dPEswV8Nc4AJjWxyntJytQ9SyfA0x-E",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        // If duplicate, still show success
        const text = await res.text();
        if (text.includes("duplicate") || text.includes("23505")) {
          setStatus("success");
          setEmail("");
        } else {
          setStatus("error");
        }
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 ${size === "large" ? "text-lg" : "text-base"}`}>
        <span className="text-2xl">&#x1F389;</span>
        <span className="text-[#FFD60A] font-semibold">You&apos;re on the list! We&apos;ll notify you when LockIn launches.</span>
      </div>
    );
  }

  const isLarge = size === "large";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={`flex-1 w-full ${isLarge ? "px-6 py-4 text-lg" : "px-5 py-3.5 text-base"} rounded-xl bg-white/5 border border-white/[0.12] text-white placeholder-zinc-500 outline-none focus:border-[#FFD60A]/50 focus:ring-1 focus:ring-[#FFD60A]/30 transition-all`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`shrink-0 ${isLarge ? "px-8 py-4 text-lg" : "px-6 py-3.5 text-base"} rounded-xl bg-gradient-to-r from-[#FFD60A] to-[#FF9500] text-black font-semibold transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,214,10,0.3)] disabled:opacity-50 disabled:hover:scale-100`}
      >
        {status === "loading" ? "Joining..." : status === "error" ? "Try again" : "Join Waitlist"}
      </button>
    </form>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <span className="text-2xl">&#x1F525;</span>
          <span>LockIn</span>
        </a>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/[0.08] text-xs text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD60A] animate-pulse" />
            Coming to iOS
          </span>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,214,10,0.06) 0%, transparent 70%)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* TestFlight badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD60A]/10 border border-[#FFD60A]/20 mb-8"
          style={{ animation: "fade-in 0.6s ease-out both" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#FFD60A] animate-pulse" />
          <span className="text-sm font-medium text-[#FFD60A] tracking-wide uppercase">
            Now on TestFlight
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
          style={{ animation: "fade-in 0.6s ease-out 0.1s both" }}
        >
          Your friends won&apos;t
          <br />
          let you{" "}
          <span className="bg-gradient-to-r from-[#FFD60A] to-[#FF9500] bg-clip-text text-transparent">
            scroll.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ animation: "fade-in 0.6s ease-out 0.2s both" }}
        >
          Form pacts with friends. Lock distracting apps.
          <br className="hidden sm:block" />
          Only they can set you free.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col items-center justify-center gap-4 w-full max-w-lg"
          style={{ animation: "fade-in 0.6s ease-out 0.3s both" }}
        >
          <WaitlistForm />
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/[0.12] text-white font-medium text-base transition-all duration-200 hover:bg-white/5 hover:border-white/20"
          >
            See how it works
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Phone mockup */}
      <div
        className="relative mt-20 mb-10"
        style={{ animation: "fade-in-slow 0.8s ease-out 0.5s both" }}
      >
        <PhoneMockup />
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
        <div className="w-5 h-8 rounded-full border-2 border-zinc-600 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-zinc-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div
      className="relative mx-auto"
      style={{ animation: "float 6s ease-in-out infinite" }}
    >
      {/* Phone frame */}
      <div className="relative w-[280px] sm:w-[320px] h-[560px] sm:h-[640px] rounded-[3rem] border-[3px] border-zinc-700 bg-black shadow-2xl shadow-black/50 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-20" />

        {/* Screen content */}
        <div className="absolute inset-[3px] rounded-[2.7rem] overflow-hidden bg-black p-5 pt-10">
          {/* Status bar */}
          <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-6">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-zinc-600 rounded-sm">
                <div className="w-3/4 h-full bg-[#FFD60A] rounded-sm" />
              </div>
            </div>
          </div>

          {/* Greeting */}
          <p className="text-zinc-500 text-xs mb-1">Good morning</p>
          <h2 className="text-white text-lg font-bold mb-5">Stay locked in.</h2>

          {/* Streak ring */}
          <div className="flex items-center justify-center mb-5">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  strokeDashoffset="66"
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFD60A" />
                    <stop offset="100%" stopColor="#FF9500" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-white">7</span>
                <span className="text-[9px] text-zinc-500">day streak</span>
              </div>
            </div>
          </div>

          {/* Pact cards */}
          <div className="space-y-2.5">
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">
                  Study Squad
                </span>
                <span className="text-[9px] text-[#FFD60A] bg-[#FFD60A]/10 px-1.5 py-0.5 rounded-full">
                  Active
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFD60A] to-[#FF9500] flex items-center justify-center text-[8px] font-bold text-black">
                  L
                </div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-[8px] font-bold text-white">
                  M
                </div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-[8px] font-bold text-white">
                  S
                </div>
                <span className="text-[9px] text-zinc-500 ml-1">3 members</span>
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">
                  Gym Bros
                </span>
                <span className="text-[9px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded-full">
                  2 apps locked
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-[8px] font-bold text-white">
                  A
                </div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFD60A] to-[#FF9500] flex items-center justify-center text-[8px] font-bold text-black">
                  L
                </div>
                <span className="text-[9px] text-zinc-500 ml-1">2 members</span>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-around bg-white/[0.04] rounded-2xl py-2.5 border border-white/[0.06]">
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#FFD60A] to-[#FF9500] flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="text-[8px] text-[#FFD60A]">Home</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <svg
                className="w-5 h-5 text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-[8px] text-zinc-600">Lock</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <svg
                className="w-5 h-5 text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-[8px] text-zinc-600">Pacts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Glow behind phone */}
      <div className="absolute -inset-10 bg-gradient-to-b from-[#FFD60A]/5 via-transparent to-transparent rounded-full blur-3xl -z-10" />
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      emoji: "🔒",
      title: "Lock your apps",
      description:
        "Pick the apps that waste your time. Instagram, TikTok, Twitter — whatever your poison. LockIn uses Apple Screen Time to actually block them.",
    },
    {
      number: "02",
      emoji: "🤝",
      title: "Form a pact",
      description:
        "Invite 2-4 friends who want to focus too. Share an invite code and lock in together. Real accountability, not just willpower.",
    },
    {
      number: "03",
      emoji: "🔑",
      title: "They hold the key",
      description:
        "Want to unlock early? You'll need your pact to approve it. No cheating, no workarounds. Your friends keep you honest.",
    },
  ];

  return (
    <section id="how-it-works" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-sm font-medium text-[#FFD60A] tracking-wider uppercase mb-4 block">
            How it works
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Three steps to{" "}
            <span className="bg-gradient-to-r from-[#FFD60A] to-[#FF9500] bg-clip-text text-transparent">
              freedom
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 transition-all duration-300 hover:border-[#FFD60A]/20 hover:bg-white/[0.05]"
            >
              {/* Large faded number */}
              <span className="absolute top-6 right-6 text-7xl font-black text-white/[0.03] select-none group-hover:text-[#FFD60A]/[0.06] transition-colors duration-300">
                {step.number}
              </span>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#FFD60A]/10 flex items-center justify-center text-2xl mb-6">
                  {step.emoji}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-[15px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      emoji: "📅",
      title: "Smart Scheduling",
      description:
        "Set daily time limits or schedule focus blocks. Lock apps during study hours, unlock them after.",
    },
    {
      emoji: "🗳️",
      title: "Pact Voting",
      description:
        "Unlock requests go to every pact member. Majority rules — no single point of failure.",
    },
    {
      emoji: "🔥",
      title: "Streak Tracking",
      description:
        "Build streaks for consecutive days locked in. Watch your focus grow over time.",
    },
    {
      emoji: "🛡️",
      title: "On-Device Privacy",
      description:
        "Screen Time data stays on your iPhone. We never see which apps you use or block.",
    },
    {
      emoji: "🔔",
      title: "Push Alerts",
      description:
        "Get notified when someone requests an unlock or when your pact needs your vote.",
    },
    {
      emoji: "🎨",
      title: "Custom Shields",
      description:
        "When you try to open a blocked app, you see a custom LockIn shield — not the boring iOS default.",
    },
  ];

  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-sm font-medium text-[#FFD60A] tracking-wider uppercase mb-4 block">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Built for people who{" "}
            <span className="bg-gradient-to-r from-[#FFD60A] to-[#FF9500] bg-clip-text text-transparent">
              mean it
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 transition-all duration-300 hover:border-[#FFD60A]/20 hover:bg-white/[0.05]"
            >
              <div className="w-11 h-11 rounded-xl bg-[#FFD60A]/10 flex items-center justify-center text-xl mb-5">
                {feature.emoji}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  const points = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Screen Time stays on device",
      description:
        "Apple's FamilyControls framework runs entirely on your iPhone. We can't access your app usage data.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "No tracking, no ads",
      description:
        "We don't track your behavior, sell your data, or show you ads. We make money when you stay focused, not distracted.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Minimal data collection",
      description:
        "We only store what's needed: your profile, pact memberships, and unlock requests. Nothing else.",
    },
  ];

  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-10 sm:p-16 overflow-hidden">
          {/* Subtle gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD60A]/20 to-transparent" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFD60A]/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#FFD60A]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#FFD60A] tracking-wider uppercase">
                Privacy First
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Your data never leaves
              <br />
              your device.
            </h2>
            <p className="text-zinc-400 text-lg mb-12 max-w-xl">
              LockIn is built on Apple&apos;s privacy-first Screen Time framework. We
              physically cannot see which apps you use.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {points.map((point) => (
                <div key={point.title}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 mb-4">
                    {point.icon}
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {point.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="relative">
          {/* Background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,214,10,0.05) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-[#FFD60A] to-[#FF9500] bg-clip-text text-transparent">
                lock in?
              </span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-md mx-auto">
              Join the waitlist and be first to know when LockIn launches.
            </p>
            <WaitlistForm size="large" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600">
              &copy; 2026 LockIn. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="mailto:hello@locked-in.dev"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Nav />
      <Hero />
      <HowItWorks />
      <Features />
      <Privacy />
      <CtaSection />
      <Footer />
    </main>
  );
}
