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

const proofScenes = [
  {
    number: "01",
    kicker: "front-end",
    title: "Interfaces first. Vibes second. Shipping always.",
    body: "I care about the part people touch, but I also care whether the thing survives real users, weird screens, and deadline panic.",
    tags: ["React", "Vue", "Tailwind", "API"],
  },
  {
    number: "02",
    kicker: "design",
    title: "I like pretty things that do not fall apart.",
    body: "That sounds simple. It is not. Good UI needs restraint, layout taste, and enough technical sense to avoid impossible designs.",
    tags: ["Figma", "UX", "Systems", "Visuals"],
  },
  {
    number: "03",
    kicker: "motion",
    title: "Scroll should feel edited, not decorated.",
    body: "A reveal needs timing. A pause needs a reason. Motion should guide the eye the same way a cut guides a viewer.",
    tags: ["GSAP", "ScrollTrigger", "Pacing", "Reels"],
  },
  {
    number: "04",
    kicker: "proof",
    title: "The portfolio already has receipts.",
    body: "GymAI, Ma'rifah, SampahKita!, Peduli Kucing, Qiroaat, and video work are the raw material. This page just frames it for Cretivox.",
    tags: ["Product", "Motion", "Research", "Build"],
  },
];

const mixerCards = [
  { label: "code", title: "Make it work", text: "Clean enough to ship. Weird enough to remember." },
  { label: "design", title: "Make it feel right", text: "Spacing, contrast, taste. The small annoying stuff matters." },
  { label: "motion", title: "Make it hit", text: "Scroll should have rhythm. No sleepy portfolio blocks." },
];

const modes = [
  {
    label: "code",
    title: "I build the thing people actually touch.",
    text: "Frontend first: responsive layout, real API login, motion that does not break the page, and enough structure to keep editing fast.",
  },
  {
    label: "design",
    title: "I can see when a screen feels off.",
    text: "Spacing, contrast, hierarchy, weirdness. The design brain helps the code avoid looking like a template with nicer colors.",
  },
  {
    label: "cut",
    title: "I treat scroll like an edit timeline.",
    text: "Set up the beat, hold attention, cut to the next frame. Video editing habits make motion feel paced instead of random.",
  },
];

const heroModes = [
  {
    label: "code",
    word: "frontend",
  },
  {
    label: "design",
    word: "taste",
  },
  {
    label: "cut",
    word: "timing",
  },
];

const heroTiles = Array.from({ length: 84 }, (_, index) => index);
const marqueeText = "FRONTEND ENDURANCE TEST CRETIVOX";

const portraits = [
  { src: "/assets/fierce/fierce-front.png", label: "front placeholder" },
  { src: "/assets/fierce/fierce-left.png", label: "left placeholder" },
  { src: "/assets/fierce/fierce-right.png", label: "right placeholder" },
];

export default function RawExperience({ onReset }: RawExperienceProps) {
  const container = useRef<HTMLElement>(null);
  const [activeMode, setActiveMode] = useState(0);
  const [activeHero, setActiveHero] = useState(0);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      const cursor = root.querySelector<HTMLElement>(".dossier-cursor");
      const hero = root.querySelector<HTMLElement>(".dossier-hero");
      const tiles = gsap.utils.toArray<HTMLElement>(".hero-tile");
      const xTo = cursor ? gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" }) : null;
      const yTo = cursor ? gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" }) : null;
      const tiltX = gsap.utils.mapRange(0, window.innerWidth, -8, 8);
      const tiltY = gsap.utils.mapRange(0, window.innerHeight, 7, -7);
      let activeTile = -1;
      let activeTileSet: number[] = [];

      const resetActiveTiles = () => {
        if (!activeTileSet.length) return;
        gsap.to(activeTileSet.map((index) => tiles[index]).filter(Boolean), {
          y: 0,
          z: 0,
          opacity: 0.28,
          backgroundColor: "rgba(128, 77, 250, 0.024)",
          boxShadow: "0 0 0 rgba(128, 77, 250, 0)",
          duration: 0.45,
          ease: "power3.out",
        });
        activeTile = -1;
        activeTileSet = [];
      };

      const movePointer = (event: PointerEvent) => {
        xTo?.(event.clientX);
        yTo?.(event.clientY);
        gsap.to(".hero-type-stage", {
          x: tiltX(event.clientX),
          y: tiltY(event.clientY),
          rotateY: tiltX(event.clientX) * 0.8,
          rotateX: tiltY(event.clientY) * 0.7,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto",
        });

        if (hero && tiles.length) {
          const rect = hero.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const columns = window.innerWidth <= 640 ? 6 : 12;
          const rows = Math.ceil(tiles.length / columns);
          const col = Math.max(0, Math.min(columns - 1, Math.floor((x / rect.width) * columns)));
          const row = Math.max(0, Math.min(rows - 1, Math.floor((y / rect.height) * rows)));
          const nextTile = row * columns + col;

          if (nextTile !== activeTile && tiles[nextTile]) {
            activeTile = nextTile;

            if (activeTileSet.length) {
              gsap.to(activeTileSet.map((index) => tiles[index]).filter(Boolean), {
                y: 0,
                z: 0,
                opacity: 0.28,
                backgroundColor: "rgba(128, 77, 250, 0.024)",
                boxShadow: "0 0 0 rgba(128, 77, 250, 0)",
                duration: 0.45,
                ease: "power3.out",
              });
            }

            const affectedTiles = [nextTile, nextTile - 1, nextTile + 1, nextTile - columns, nextTile + columns]
              .filter((index) => tiles[index]);
            activeTileSet = affectedTiles;

            gsap.to(affectedTiles.map((index) => tiles[index]), {
              y: (index) => (index === 0 ? -11 : -6),
              z: (index) => (index === 0 ? 38 : 18),
              opacity: (index) => (index === 0 ? 0.82 : 0.52),
              backgroundColor: (index) => (index === 0 ? "rgba(128, 77, 250, 0.18)" : "rgba(181, 157, 248, 0.1)"),
              boxShadow: (index) => (index === 0 ? "0 12px 28px rgba(128, 77, 250, 0.16)" : "0 8px 18px rgba(128, 77, 250, 0.08)"),
              duration: 0.28,
              stagger: 0.015,
              ease: "power3.out",
            });
          }
        }
      };

      window.addEventListener("pointermove", movePointer);
      hero?.addEventListener("pointerleave", resetActiveTiles);

      const hoverTargets = gsap.utils.toArray<HTMLElement>("a, button, .scene-card, .portrait-frame, .hero-lens-button, .hero-wordmark");
      const cleanupHover = hoverTargets.map((target) => {
        const enter = () => {
          gsap.to(cursor, { scale: 1.8, duration: 0.2, ease: "power2.out" });
        };
        const leave = () => {
          gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" });
        };
        target.addEventListener("pointerenter", enter);
        target.addEventListener("pointerleave", leave);
        return () => {
          target.removeEventListener("pointerenter", enter);
          target.removeEventListener("pointerleave", leave);
        };
      });

      const mm = gsap.matchMedia(root);

      mm.add(
        {
          desktop: "(min-width: 900px)",
          mobile: "(max-width: 899px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduce } = context.conditions as { desktop: boolean; reduce: boolean };

          if (reduce) {
            gsap.set(".hero-line, .hero-type-stage, .hero-lens-button, .scene-card, .portrait-frame", { autoAlpha: 1, clearProps: "transform" });
            gsap.set(".signature-stage", { autoAlpha: 0 });
            gsap.set(".signature-path", { strokeDasharray: 1300, strokeDashoffset: 0 });
            return;
          }

          gsap.set(".signature-path", { strokeDasharray: 1300, strokeDashoffset: 1300 });

          const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
          intro
            .from(".hero-line", { yPercent: 112, rotate: 2.5, autoAlpha: 0, duration: 1, stagger: 0.08 })
            .from(".hero-accent-word", { yPercent: 100, autoAlpha: 0, duration: 0.65 }, "-=0.56")
            .from(".hero-lens-button, .hero-lock", { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.06 }, "-=0.36");

          gsap.timeline({
            scrollTrigger: {
              trigger: ".dossier-hero",
              start: "top top",
              end: desktop ? "+=1750" : "+=1200",
              pin: true,
              scrub: 1,
            },
            defaults: { ease: "none" },
          })
            .to(".hero-scroll-bg", { autoAlpha: 1, duration: 0.22 }, 0)
            .to(".hero-scroll-frame", {
              scale: desktop ? 0.48 : 0.68,
              y: desktop ? 16 : 10,
              borderRadius: desktop ? 30 : 18,
              filter: "saturate(0) contrast(1.06)",
              boxShadow: "0 32px 90px rgba(18, 7, 54, 0.45)",
              duration: 1,
            }, 0)
            .to(".hero-wordmark", { scale: 0.96, duration: 0.72 }, 0.12)
            .to(".signature-stage", { autoAlpha: 1, duration: 0.16 }, 0.2)
            .to(".signature-path", { strokeDashoffset: 0, duration: 0.78 }, 0.22);

          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              gsap.set(".progress-fill", { scaleX: self.progress });
            },
          });

          gsap.to(".cloud-layer", {
            yPercent: desktop ? 18 : 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".dossier-hero",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          if (desktop) {
            const rail = root.querySelector<HTMLElement>(".scene-rail");
            const cards = gsap.utils.toArray<HTMLElement>(".scene-card");
            if (rail && cards.length > 1) {
              const railTween = gsap.to(rail, {
                x: () => -(rail.scrollWidth - window.innerWidth + 120),
                ease: "none",
                scrollTrigger: {
                  trigger: ".proof-reel",
                  pin: true,
                  scrub: 0.8,
                  end: () => `+=${rail.scrollWidth}`,
                  invalidateOnRefresh: true,
                },
              });

              cards.forEach((card, index) => {
                gsap.from(card, {
                  y: index % 2 ? 110 : -80,
                  rotate: index % 2 ? -4 : 4,
                  autoAlpha: 0.25,
                  scale: 0.88,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: railTween,
                    start: "left 82%",
                    end: "right 22%",
                    scrub: true,
                  },
                });
              });
            }
          } else {
            gsap.from(".scene-card", {
              y: 46,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: ".proof-reel",
                start: "top 72%",
              },
            });
          }

          gsap.from(".mode-copy, .mode-panel", {
            y: 52,
            autoAlpha: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".mode-room",
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          });

          if (desktop) {
            const mixerTl = gsap.timeline({
              scrollTrigger: {
                trigger: ".signal-room",
                start: "top top",
                end: "+=1800",
                pin: true,
                scrub: 1,
              },
              defaults: { ease: "none" },
            });

            mixerTl
              .to(".signal-room", { "--pulse": 1, duration: 1 }, 0)
              .fromTo(".signal-title span", { yPercent: 110 }, { yPercent: 0, stagger: 0.08, duration: 0.6 }, 0)
              .fromTo(".mixer-card", { y: 160, autoAlpha: 0, rotate: 0 }, { y: 0, autoAlpha: 1, stagger: 0.16, duration: 0.8 }, 0.1)
              .to(".mixer-card:nth-child(1)", { x: "-32vw", y: "-8vh", rotate: -10, duration: 1.2 }, 0.55)
              .to(".mixer-card:nth-child(2)", { x: "3vw", y: "14vh", rotate: 4, scale: 1.08, duration: 1.2 }, 0.55)
              .to(".mixer-card:nth-child(3)", { x: "31vw", y: "-5vh", rotate: 11, duration: 1.2 }, 0.55)
              .to(".mixer-core", { scale: 1.28, rotate: 50, duration: 1.2 }, 0.55)
              .to(".mixer-line", { scaleX: 1, stagger: 0.08, duration: 0.7 }, 0.85)
              .to(".mixer-card", { y: "-=34", stagger: 0.08, duration: 0.5 }, 1.45)
              .to(".mixer-core", { scale: 0.9, rotate: 120, duration: 0.5 }, 1.45);
          } else {
            gsap.from(".mixer-card", {
              y: 42,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".signal-room",
                start: "top 72%",
              },
            });
          }

          gsap.utils.toArray<HTMLElement>(".portrait-frame").forEach((frame, index) => {
            gsap.fromTo(
              frame,
              { y: 90 + index * 18, rotate: index === 1 ? 0 : index === 0 ? -4 : 4, autoAlpha: 0.35, scale: 0.92 },
              {
                y: index === 1 ? -38 : 0,
                rotate: index === 1 ? 2 : index === 0 ? -1 : 3,
                autoAlpha: 1,
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: ".fierce-room",
                  start: `top+=${index * 80} 72%`,
                  end: "bottom 38%",
                  scrub: 0.7,
                },
              },
            );
          });
        },
      );

      return () => {
        window.removeEventListener("pointermove", movePointer);
        hero?.removeEventListener("pointerleave", resetActiveTiles);
        cleanupHover.forEach((cleanup) => cleanup());
        mm.revert();
      };
    },
    { scope: container },
  );

  return (
    <main className="dossier" ref={container}>
      <div className="dossier-cursor" aria-hidden="true" />
      <div className="progress-line" aria-hidden="true"><span className="progress-fill" /></div>
      <div className="cloud-layer" aria-hidden="true" />

      <section className="dossier-hero" aria-label="Arap Cretivox intro">
        <div className="hero-scroll-bg" aria-hidden="true">
          <div className="hero-marquee-row">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
          <div className="hero-marquee-row reverse">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>

        <div className="hero-scroll-frame">
          <div className="hero-tile-field" aria-hidden="true">
            {heroTiles.map((tile) => <span className="hero-tile" key={tile} />)}
          </div>
          <Image className="hero-brand-logo" src="/assets/brand/cretivox-logo.png" alt="Cretivox" width={160} height={40} priority />
          <button className="hero-lock" type="button" onClick={onReset}>lock</button>

          <div className="hero-type-stage">
            <h1 className="hero-wordmark" aria-label={`Arap ${heroModes[activeHero].word}`}>
              {['arap', 'builds'].map((word) => (
                <span className="hero-line" key={word}><span className="hero-word">{word}</span></span>
              ))}
              <span className="hero-line hero-line-accent">
                <span className="hero-word hero-accent-word" key={heroModes[activeHero].word}>{heroModes[activeHero].word}</span>
              </span>
            </h1>

            <div className="hero-lens-row" role="tablist" aria-label="Hero text mode">
              {heroModes.map((mode, index) => (
                <button
                  aria-selected={activeHero === index}
                  className={activeHero === index ? "hero-lens-button active" : "hero-lens-button"}
                  key={mode.label}
                  onPointerEnter={() => setActiveHero(index)}
                  onFocus={() => setActiveHero(index)}
                  role="tab"
                  type="button"
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <svg className="signature-stage" viewBox="0 0 900 520" aria-hidden="true">
          <path className="signature-path" d="M120 340 C240 210 360 180 450 245 C530 302 450 398 355 380 C245 358 315 190 505 112 C690 38 804 96 740 188 C690 260 536 312 378 356 C252 390 206 434 290 448 C414 468 600 390 774 316" />
        </svg>
      </section>

      <section className="proof-reel" id="proof" aria-label="Pinned proof reel">
        <div className="scene-rail">
          {proofScenes.map((scene) => (
            <article className="scene-card" key={scene.number}>
              <span className="scene-num">{scene.number} / {scene.kicker}</span>
              <h2>{scene.title}</h2>
              <p>{scene.body}</p>
              <div className="tag-row">
                {scene.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mode-room" aria-label="Choose the lens">
        <div className="mode-copy">
          <p className="mono-kicker">choose the lens</p>
          <h2>Code, design, or cut. Same person.</h2>
          <p>
            This is the little switchboard version of me: frontend when the browser needs to work,
            design when the page needs taste, editing when the scroll needs rhythm.
          </p>
          <div className="mode-actions" role="tablist" aria-label="Profile lens selector">
            {modes.map((mode, index) => (
              <button
                aria-selected={activeMode === index}
                className={activeMode === index ? "active" : ""}
                key={mode.label}
                onClick={() => setActiveMode(index)}
                role="tab"
                type="button"
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
        <article className="mode-panel" role="tabpanel">
          <span>{activeMode + 1 < 10 ? `0${activeMode + 1}` : activeMode + 1}</span>
          <h2>{modes[activeMode].title}</h2>
          <p>{modes[activeMode].text}</p>
        </article>
      </section>

      <section className="signal-room" aria-label="Motion mixer section">
        <div className="signal-copy">
          <p className="mono-kicker">motion mixer</p>
          <h2 className="signal-title" aria-label="Code design cut">
            {['Code', 'Design', 'Cut'].map((word) => (
              <span key={word}>{word}</span>
            ))}
          </h2>
          <p>
            This is the part that needed more punch. Three parts of my work get pulled apart, then
            snap back into one little system.
          </p>
        </div>
        <div className="mixer-stage" aria-hidden="true">
          <div className="mixer-core">
            <span />
            <span />
            <span />
          </div>
          <div className="mixer-lines">
            <span className="mixer-line" />
            <span className="mixer-line" />
            <span className="mixer-line" />
          </div>
          <div className="mixer-card-stack">
            {mixerCards.map((card) => (
              <article className="mixer-card" key={card.label}>
                <span>{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fierce-room" id="portraits" aria-label="Fierce portrait placeholders">
        <div className="fierce-copy">
          <p className="mono-kicker">fierce set / placeholder</p>
          <h2>Real portraits go here. For now, the brief refs are holding the frame.</h2>
          <p>
            Final PDF needs my own front, left, and right 9:16 photos. These placeholders keep the
            layout honest while the site gets built.
          </p>
        </div>
        <div className="portrait-deck">
          {portraits.map((portrait) => (
            <figure className="portrait-frame" key={portrait.label}>
              <Image src={portrait.src} alt={portrait.label} width={941} height={1672} />
              <figcaption>{portrait.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="dossier-footer">
        <p className="mono-kicker">next cut</p>
        <h2>Swap the photos, tighten the story, ship the link.</h2>
        <a href="https://github.com/piipapoy/cretivox-frontend" target="_blank" rel="noreferrer">open GitHub</a>
      </footer>
    </main>
  );
}
