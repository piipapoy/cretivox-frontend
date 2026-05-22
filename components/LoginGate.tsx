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
  const [status, setStatus] = useState("API lock armed. Use the brief credentials.");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("Contacting dummy JWT endpoint...");

    try {
      const result = await loginWithDummyJwt(username, password);
      setStatus(`Access granted for ${result.firstName}. Token received.`);
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
              RAW SIGNAL
              <span>needs a token first.</span>
            </h1>
            <p>
              Before the page opens, it proves the API requirement: a real POST request to the
              supplied login endpoint, then the experience unlocks.
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
              {loading ? "Checking token" : "Unlock website"}
            </button>
            <p className="status-line">{status}</p>
          </form>
        </div>
      </section>
    </main>
  );
}
