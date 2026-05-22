"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RawExperienceProps = {
  onReset: () => void;
};

const proofCards = [
  {
    label: "01 / Frontend",
    title: "Interfaces that move with intent",
    copy: "React, Vue, Tailwind, and product thinking shaped into clear interaction systems.",
  },
  {
    label: "02 / Design",
    title: "Visual taste under pressure",
    copy: "UI/UX, information architecture, and layout decisions that keep the story readable.",
  },
  {
    label: "03 / Motion",
    title: "Editing rhythm meets web rhythm",
    copy: "Video timing becomes scroll timing: pacing, reveal, pause, punchline, repeat.",
  },
];

const modes = [
  {
    id: "build",
    title: "Build Mode",
    text: "I turn messy ideas into shippable screens with structure, hierarchy, and motion.",
  },
  {
    id: "design",
    title: "Design Mode",
    text: "I care about the feeling of a click: tension, contrast, readability, and timing.",
  },
  {
    id: "edit",
    title: "Edit Mode",
    text: "I read web sections like cuts: every scroll should earn the next frame.",
  },
];

const fierceShots = [
  { src: "/assets/fierce/fierce-front.png", label: "Front / placeholder" },
  { src: "/assets/fierce/fierce-left.png", label: "Left / placeholder" },
  { src: "/assets/fierce/fierce-right.png", label: "Right / placeholder" },
];

export default function RawExperience({ onReset }: RawExperienceProps) {
  const container = useRef<HTMLElement>(null);
  const [activeMode, setActiveMode] = useState(modes[0]);

  useGSAP(
    () => {
      gsap.from(".hero-kicker, .hero-title span, .hero-copy, .hero-actions", {
        y: 44,
        opacity: 0,
        duration: 1.05,
        ease: "power4.out",
        stagger: 0.08,
      });

      gsap.to(".signal-line", {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: ".raw-page",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".story-panel").forEach((panel) => {
        gsap.from(panel.querySelectorAll(".panel-index, h2, p, .panel-chip"), {
          y: 36,
          opacity: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.to(".portrait-card:nth-child(1)", {
        y: -80,
        rotate: -2,
        scrollTrigger: { trigger: ".fierce-stage", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(".portrait-card:nth-child(2)", {
        y: 58,
        rotate: 2,
        scrollTrigger: { trigger: ".fierce-stage", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(".portrait-card:nth-child(3)", {
        y: -48,
        rotate: 4,
        scrollTrigger: { trigger: ".fierce-stage", start: "top bottom", end: "bottom top", scrub: 1 },
      });
    },
    { scope: container },
  );

  return (
    <main className="raw-page" ref={container}>
      <div className="grain" />
      <div className="signal-line" />

      <header className="site-header">
        <Image src="/assets/brand/cretivox-logo.png" alt="Cretivox" width={142} height={35} priority />
        <nav aria-label="Page sections">
          <a href="#proof">Proof</a>
          <a href="#fierce">Fierce</a>
          <button type="button" onClick={onReset}>Lock</button>
        </nav>
      </header>

      <section className="hero-section" aria-label="RAW Signal introduction">
        <div className="hero-kicker">M. Raffa Mizanul Insan / Bandung / Frontend wanted most</div>
        <h1 className="hero-title">
          <span>Not just</span>
          <span>ngoding.</span>
          <span>Signal, taste,</span>
          <span>motion.</span>
        </h1>
        <p className="hero-copy">
          A one-page personal site built like an endurance test should feel: sharp, interactive,
          self-aware, and alive on scroll.
        </p>
        <div className="hero-actions">
          <a href="#proof">Read the proof</a>
          <a href="#fierce">View placeholders</a>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span>GSAP</span>
          <span>API</span>
          <span>DEPLOY</span>
          <span>RAW</span>
        </div>
      </section>

      <section className="story-stack" id="proof" aria-label="Personal proof sections">
        <article className="story-panel panel-one">
          <span className="panel-index">01</span>
          <div>
            <span className="panel-chip">Identity</span>
            <h2>Computer science student with designer eyes.</h2>
            <p>
              Raffa sits between frontend, UI/UX, and video editing. The advantage is not being
              split across disciplines; it is knowing how code, visuals, and pacing affect each other.
            </p>
          </div>
        </article>

        <article className="story-panel panel-two">
          <span className="panel-index">02</span>
          <div>
            <span className="panel-chip">Interaction</span>
            <h2>Every scroll should change the temperature.</h2>
            <p>
              This page uses ScrollTrigger for progressive reveals, a page progress signal, and
              parallax portrait frames instead of static portfolio blocks.
            </p>
          </div>
        </article>

        <article className="story-panel panel-three">
          <span className="panel-index">03</span>
          <div>
            <span className="panel-chip">API Login</span>
            <h2>The page opens only after a real token request.</h2>
            <p>
              The gate calls the provided DummyJSON login endpoint, stores the unlocked state in
              local storage, and lets the visitor relock the experience from the header.
            </p>
          </div>
        </article>
      </section>

      <section className="proof-grid" aria-label="Skill proof cards">
        {proofCards.map((card) => (
          <article className="proof-card" key={card.title}>
            <span>{card.label}</span>
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
          </article>
        ))}
      </section>

      <section className="mode-console" aria-label="Interactive build mode selector">
        <div>
          <p className="eyebrow">Interactive layer</p>
          <h2>{activeMode.title}</h2>
          <p>{activeMode.text}</p>
        </div>
        <div className="mode-buttons">
          {modes.map((mode) => (
            <button
              className={mode.id === activeMode.id ? "active" : ""}
              key={mode.id}
              onClick={() => setActiveMode(mode)}
              type="button"
            >
              {mode.title}
            </button>
          ))}
        </div>
      </section>

      <section className="fierce-stage" id="fierce" aria-label="Fierce portrait placeholders">
        <div className="fierce-copy">
          <p className="eyebrow">Fierce photo set</p>
          <h2>Placeholder now. Real face later.</h2>
          <p>
            These are reference frames from the PDF assets. Final submission should replace them
            with Raffa&apos;s own front, left, and right 9:16 portraits.
          </p>
        </div>
        <div className="portrait-grid">
          {fierceShots.map((shot) => (
            <figure className="portrait-card" key={shot.label}>
              <Image src={shot.src} alt={shot.label} width={941} height={1672} />
              <figcaption>{shot.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="final-cta">
        <p>Next checkpoint</p>
        <h2>Replace portraits, wire final content, deploy to Vercel.</h2>
        <a href="https://github.com/piipapoy/cretivox-frontend" target="_blank" rel="noreferrer">
          GitHub repository
        </a>
      </footer>
    </main>
  );
}
