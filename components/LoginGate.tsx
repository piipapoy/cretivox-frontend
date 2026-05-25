"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { loginWithDummyJwt } from "@/lib/auth";

type LoginGateProps = {
  onUnlock: () => void;
};

export default function LoginGate({ onUnlock }: LoginGateProps) {
  const [email, setEmail] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginWithDummyJwt(email, password);
      onUnlock();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-card" aria-label="Login">
        <div className="brand-strip" aria-label="Cretivox">
          <Image
            src="/assets/brand/cretivox-logo.png"
            alt="Cretivox"
            width={220}
            height={54}
            priority
          />
        </div>

        <form className="terminal-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" />
          </label>
          <label>
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Loading" : "Login"}
          </button>
          {error && <p className="status-line">{error}</p>}
        </form>
      </section>
    </main>
  );
}
