"use client";

import { useEffect, useState } from "react";
import LoginGate from "@/components/LoginGate";
import RawExperience from "@/components/RawExperience";

const SESSION_KEY = "cretivox-raw-session";

export default function Home() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setUnlocked(window.localStorage.getItem(SESSION_KEY) === "unlocked");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function handleUnlock() {
    window.localStorage.setItem(SESSION_KEY, "unlocked");
    setUnlocked(true);
  }

  function handleReset() {
    window.localStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
  }

  if (unlocked === null) return null;

  return unlocked ? <RawExperience onReset={handleReset} /> : <LoginGate onUnlock={handleUnlock} />;
}
