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
      const tiltX = gsap.utils.mapRange(0, window.innerWidth, -13, 13);
      const tiltY = gsap.utils.mapRange(0, window.innerHeight, 10, -10);
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
          overwrite: true,
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
          z: 34,
          transformPerspective: 850,
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
            const affectedTiles = [nextTile, nextTile - 1, nextTile + 1, nextTile - columns, nextTile + columns]
              .filter((index) => tiles[index]);
            const affectedTileSet = new Set(affectedTiles);

            if (activeTileSet.length) {
              gsap.to(activeTileSet.filter((index) => !affectedTileSet.has(index)).map((index) => tiles[index]).filter(Boolean), {
                y: 0,
                z: 0,
                opacity: 0.28,
                backgroundColor: "rgba(128, 77, 250, 0.024)",
                boxShadow: "0 0 0 rgba(128, 77, 250, 0)",
                duration: 0.45,
                ease: "power3.out",
                overwrite: true,
              });
            }

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
              overwrite: true,
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
            gsap.set(".signature-path", { strokeDashoffset: 0 });
            return;
          }

          const signaturePaths = gsap.utils.toArray<SVGPathElement>(".signature-path");
          signaturePaths.forEach((path) => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          });
          gsap.set(".hero-scroll-frame", { "--hero-desat": 0 });

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
              scrub: true,
              anticipatePin: 1,
            },
            defaults: { ease: "none" },
          })
            .to(".hero-scroll-bg", { autoAlpha: 1, duration: 0.22 }, 0)
            .to(".hero-scroll-frame", {
              scale: desktop ? 0.48 : 0.68,
              y: desktop ? 16 : 10,
              borderRadius: desktop ? 30 : 18,
              boxShadow: "0 32px 90px rgba(18, 7, 54, 0.45)",
              duration: 1,
            }, 0)
            .to(".hero-wordmark", { "--hero-lockup-scale": desktop ? 0.88 : 0.82, duration: 0.72 }, 0.12)
            .to(".hero-scroll-frame", { "--hero-desat": 1, duration: 0.58 }, 0.34)
            .to(".signature-stage", { autoAlpha: 1, duration: 0.16 }, 0.2)
            .to(signaturePaths, { strokeDashoffset: 0, duration: 0.78 }, 0.22);

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

        <svg className="signature-stage" viewBox="0 0 576 263" aria-hidden="true">
          <path className="signature-path" d="M11.9889 182.474C11.2318 183.245 10.4747 184.016 12.3559 184.413C14.2371 184.81 18.7796 184.81 48.7527 168.624C78.7259 152.439 133.992 120.068 168.141 99.1527C202.289 78.2377 213.645 69.7595 225.173 57.2992C250.041 30.4211 259.758 9.66525 258.244 6.93263C255.947 2.78818 236.197 28.9104 210.995 64.2709C199.747 80.0536 193.365 92.6948 178.877 115.618C164.39 138.542 142.435 171.684 126.203 194.537C101.189 229.757 86.3998 247.76 56.1788 254.13C40.821 257.367 25.4056 257.213 16.4354 254.13C7.46526 251.047 4.24238 240.151 8.02774 231.965C17.0504 212.453 44.7265 198.146 99.075 167.55C138.266 145.487 204.147 116.144 239.202 99.8767C274.257 83.6095 277.285 82.8387 279.602 83.9832C281.919 85.1276 284.542 88.8793 279.671 95.9646C257.191 128.662 235.325 138.846 228.454 144.673C225.306 147.343 223.097 149.73 231.769 150.921C259.894 154.784 305.388 142.092 341.349 126.526C352.627 121.644 348.541 120.208 345.456 120.196C325.699 120.121 307.178 147.417 307.166 151.691C307.12 169.072 363.591 142.863 383.596 126.864C386.884 124.235 385.936 120.255 384.422 123.676C382.908 127.098 379.88 137.117 380.212 138.425C382.096 145.832 391.259 115.607 397.74 90.8147C408.066 51.3131 408.878 19.0543 408.878 11.6271C408.878 5.95169 407.364 34.4457 405.069 73.1461C403.417 101.017 404.289 145.759 402.775 174.568C399.868 229.877 390.525 236.94 390.525 239.684C390.525 240.023 390.525 235.492 392.417 231.965C396.553 224.259 410.323 216.784 423.319 207.068C430.633 201.6 384.101 196.488 320.197 194.175C301.59 193.502 311.56 187.239 324.958 182.544C338.355 177.85 355.011 173.225 395.767 166.604C436.522 159.983 500.873 151.505 569.469 138.098M365.289 91.387L473.114 70.3669" />
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
