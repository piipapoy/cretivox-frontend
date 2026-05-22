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

const cells = Array.from({ length: 154 }, (_, index) => index);

const levels = [
  {
    id: "boot",
    marker: "LVL 01",
    title: "Boot the hybrid file",
    copy: "Frontend is the entry point, but the system is fed by UI taste, editing rhythm, and the habit of shipping real things.",
    stats: ["React", "Vue", "Tailwind", "Design Systems"],
    icon: "/assets/pixel-icons/battery.png",
  },
  {
    id: "build",
    marker: "LVL 02",
    title: "Code with a director's timeline",
    copy: "Scroll is treated like pacing: reveal, hold, cut, impact. Motion is not decoration; it controls attention.",
    stats: ["GSAP", "ScrollTrigger", "API Login", "Responsive"],
    icon: "/assets/pixel-icons/bookmark.png",
  },
  {
    id: "proof",
    marker: "LVL 03",
    title: "Proof beats claims",
    copy: "Foundation Event Ticketing Dashboard, GymAI, SampahKita!, Peduli Kucing, Ma'rifah EduApp, Qiroaat, and motion reels show range.",
    stats: ["Product UI", "UX Flow", "Motion", "Frontend"],
    icon: "/assets/pixel-icons/alert.png",
  },
  {
    id: "fierce",
    marker: "BOSS",
    title: "Fierce assets pending",
    copy: "The current photos are reference placeholders. The final build swaps in Raffa's own front, left, and right 9:16 portraits.",
    stats: ["Front", "Left", "Right", "9:16"],
    icon: "/assets/pixel-icons/bin.png",
  },
];

const portraits = [
  { src: "/assets/fierce/fierce-front.png", label: "FRONT_PLACEHOLDER" },
  { src: "/assets/fierce/fierce-left.png", label: "LEFT_PLACEHOLDER" },
  { src: "/assets/fierce/fierce-right.png", label: "RIGHT_PLACEHOLDER" },
];

const modes = [
  ["DEV", "I structure the system, then make every interaction earn its place."],
  ["DESIGN", "I tune hierarchy, contrast, and weirdness until the page has a pulse."],
  ["EDIT", "I cut sections like footage: setup, beat, payoff, next frame."],
];

export default function RawExperience({ onReset }: RawExperienceProps) {
  const container = useRef<HTMLElement>(null);
  const [activeMode, setActiveMode] = useState(0);

  useGSAP(
    () => {
      const cursor = container.current?.querySelector<HTMLElement>(".pixel-cursor");
      let removePointerMove = () => {};
      if (cursor) {
        const moveX = gsap.quickTo(cursor, "x", { duration: 0.32, ease: "steps(8)" });
        const moveY = gsap.quickTo(cursor, "y", { duration: 0.32, ease: "steps(8)" });
        const onPointerMove = (event: PointerEvent) => {
          moveX(event.clientX - 12);
          moveY(event.clientY - 12);
        };
        window.addEventListener("pointermove", onPointerMove);
        removePointerMove = () => window.removeEventListener("pointermove", onPointerMove);
      }

      gsap.from(".pixel-cell", {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "steps(5)",
        stagger: { amount: 1.1, grid: "auto", from: "random" },
      });

      gsap.from(".hero-char", {
        yPercent: 110,
        rotate: () => gsap.utils.random(-18, 18),
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.8)",
        stagger: 0.045,
        delay: 0.25,
      });

      gsap.from(".boot-card, .hud-card", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.5,
      });

      gsap.to(".hud-fill", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".pixel-world",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      gsap.to(".pixel-cell", {
        backgroundColor: "#b6ff2d",
        opacity: 0.42,
        stagger: { amount: 1.8, grid: "auto", from: "center" },
        scrollTrigger: {
          trigger: ".level-track",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      const panels = gsap.utils.toArray<HTMLElement>(".level-panel");
      const world = container.current?.querySelector<HTMLElement>(".level-world");
      if (world && panels.length > 1) {
        const horizontalTween = gsap.to(world, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            id: "level-scroll",
            trigger: ".level-track",
            pin: true,
            scrub: 0.85,
            end: () => `+=${world.scrollWidth}`,
          },
        });

        panels.forEach((panel) => {
          gsap.from(panel.querySelectorAll(".level-marker, .level-title, .level-copy, .stat-chip"), {
            y: 56,
            opacity: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: "left 65%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }

      gsap.utils.toArray<HTMLElement>(".portrait-tile").forEach((tile, index) => {
        gsap.fromTo(
          tile,
          { clipPath: "inset(45% 45% 45% 45%)", filter: "contrast(2) saturate(0)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            filter: "contrast(1.25) saturate(0.95)",
            ease: "steps(12)",
            scrollTrigger: {
              trigger: ".portrait-boss",
              start: `top+=${index * 80} 70%`,
              end: "bottom 30%",
              scrub: true,
            },
          },
        );
      });

      return removePointerMove;
    },
    { scope: container },
  );

  return (
    <main className="pixel-world" ref={container}>
      <div className="pixel-cursor" aria-hidden="true" />
      <div className="pixel-grid-bg" aria-hidden="true">
        {cells.map((cell) => (
          <span className="pixel-cell" key={cell} />
        ))}
      </div>

      <aside className="game-hud" aria-label="Progress HUD">
        <div className="hud-track"><span className="hud-fill" /></div>
        <p>SCROLL<br />POWER</p>
      </aside>

      <header className="pixel-header">
        <Image src="/assets/brand/cretivox-logo.png" alt="Cretivox" width={146} height={36} priority />
        <nav aria-label="Pixel world navigation">
          <a href="#levels">levels</a>
          <a href="#portraits">portraits</a>
          <button type="button" onClick={onReset}>lock</button>
        </nav>
      </header>

      <section className="pixel-hero" aria-label="RAW Signal pixel intro">
        <div className="hero-console">
          <p className="pixel-eyebrow">CIE S2B5_FRONTEND // ACCESS_GRANTED</p>
          <h1 aria-label="RAFFA RAW">
            {"RAFFA RAW".split("").map((char, index) => (
              <span className="hero-char" key={`${char}-${index}`}>{char === " " ? "\u00A0" : char}</span>
            ))}
          </h1>
          <p className="hero-transmission">
            A pixel-y personal website where scroll behaves like a level map, the cursor acts like
            an input signal, and GSAP drives the whole interface instead of only fading sections in.
          </p>
        </div>

        <div className="boot-stack" aria-label="Signal cards">
          <article className="boot-card boot-card-hot">
            <span>PLAYER</span>
            <strong>M. RAFFA MIZANUL INSAN</strong>
            <p>frontend developer / ui ux designer / video editor</p>
          </article>
          <article className="boot-card">
            <span>MISSION</span>
            <strong>MAKE THE PAGE FEEL ALIVE</strong>
            <p>api login, gsap, scroll-triggered storytelling, public deploy</p>
          </article>
          <article className="hud-card">
            <span>MODE</span>
            <div className="mode-switcher">
              {modes.map(([label], index) => (
                <button
                  className={activeMode === index ? "active" : ""}
                  key={label}
                  onClick={() => setActiveMode(index)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
            <p>{modes[activeMode][1]}</p>
          </article>
        </div>
      </section>

      <section className="level-track" id="levels" aria-label="Pinned horizontal level progression">
        <div className="level-world">
          {levels.map((level) => (
            <article className={`level-panel level-${level.id}`} key={level.id}>
              <div className="level-icon">
                <Image src={level.icon} alt="" width={64} height={64} />
              </div>
              <div className="level-content">
                <p className="level-marker">{level.marker}</p>
                <h2 className="level-title">{level.title}</h2>
                <p className="level-copy">{level.copy}</p>
                <div className="stat-row">
                  {level.stats.map((stat) => (
                    <span className="stat-chip" key={stat}>{stat}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portrait-boss" id="portraits" aria-label="Fierce photo placeholder boss stage">
        <div className="boss-copy">
          <p className="pixel-eyebrow">BOSS_STAGE // FIERCE_SET</p>
          <h2>Three portraits, currently running in placeholder mode.</h2>
          <p>
            These frames are intentionally treated like pixel sprites. Replace them with the real
            front, left, and right 9:16 fierce photos before final PDF submission.
          </p>
        </div>
        <div className="portrait-rig">
          {portraits.map((portrait) => (
            <figure className="portrait-tile" key={portrait.label}>
              <Image src={portrait.src} alt={portrait.label} width={941} height={1672} />
              <figcaption>{portrait.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="pixel-footer">
        <p>READY_FOR_NEXT_BUILD</p>
        <h2>Now we tune the copy, add real portraits, and deploy this cartridge.</h2>
        <a href="https://github.com/piipapoy/cretivox-frontend" target="_blank" rel="noreferrer">
          open repo
        </a>
      </footer>
    </main>
  );
}
