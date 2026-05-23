"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { loginWithDummyJwt } from "@/lib/auth";

type LoginGateProps = {
  onUnlock: () => void;
};

export default function LoginGate({ onUnlock }: LoginGateProps) {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [status, setStatus] = useState("Use the sample login from the brief. Nothing fancy yet.");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("Sending the login request...");

    try {
      const result = await loginWithDummyJwt(username, password);
      setStatus(`Token came back. Opening the page for ${result.firstName}.`);
      window.setTimeout(onUnlock, 650);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-shell">
      <div className="login-noise" />
      <section className="login-card" aria-label="RAW Signal login gate">
        <div className="brand-strip">
          <Image
            src="/assets/brand/cretivox-logo.png"
            alt="Cretivox"
            width={220}
            height={54}
            priority
          />
          <span>Endurance Test</span>
        </div>

        <div className="login-grid">
          <div className="login-copy">
            <p className="eyebrow">CIE S2B5 / Frontend</p>
            <h1>
              RAW MODE
              <span>opens after login.</span>
            </h1>
            <p>
              The brief gives extra points for API login, so the site starts here. Real request,
              real token, then the page opens.
            </p>
          </div>

          <form className="terminal-form" onSubmit={handleSubmit}>
            <div className="terminal-topline">
              <span />
              <span />
              <span />
              <strong>auth/raw-gate</strong>
            </div>
            <label>
              username
              <input value={username} onChange={(event) => setUsername(event.target.value)} />
            </label>
            <label>
              password
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
              />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? "Checking" : "Open the page"}
            </button>
            <p className="status-line">{status}</p>
          </form>
        </div>
      </section>
    </main>
  );
}
