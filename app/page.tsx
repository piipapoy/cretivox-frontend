"use client";

import { useState } from "react";
import LoginGate from "@/components/LoginGate";
import RawExperience from "@/components/RawExperience";

const SESSION_KEY = "cretivox-raw-session";

export default function Home() {
  const [unlocked, setUnlocked] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem(SESSION_KEY) === "unlocked",
  );

  function handleUnlock() {
    window.localStorage.setItem(SESSION_KEY, "unlocked");
    setUnlocked(true);
  }

  function handleReset() {
    window.localStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
  }

  return unlocked ? <RawExperience onReset={handleReset} /> : <LoginGate onUnlock={handleUnlock} />;
}
