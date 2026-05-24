"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

const introPhotos = [
  {
    src: "/assets/fierce/fierce-left.png",
    removedSrc: "/assets/fierce/fierce-left-removed.png",
    number: "01",
    label: "left profile",
  },
  {
    src: "/assets/fierce/fierce-front.png",
    removedSrc: "/assets/fierce/fierce-front-removed.png",
    number: "02",
    label: "front portrait",
  },
  {
    src: "/assets/fierce/fierce-right.png",
    removedSrc: "/assets/fierce/fierce-right-removed.png",
    number: "03",
    label: "right profile",
  },
];

const INTRO_PHOTO_SLIDE_MS = 340;

const dissolveCharacters = "RAFFA<>/{}[]01TIMINGTASTEWORKSUX";
const dissolveCells = Array.from({ length: 720 }, (_, index) => ({
  index,
  char: dissolveCharacters[(index * 17 + 11) % dissolveCharacters.length],
}));

export default function RawExperience({ onReset }: RawExperienceProps) {
  const container = useRef<HTMLElement>(null);
  const introCardHoverCleanup = useRef<(() => void)[]>([]);
  const [activeMode, setActiveMode] = useState(0);
  const [activeHero, setActiveHero] = useState(0);
  const [activeIntroPhoto, setActiveIntroPhoto] = useState<number | null>(null);
  const [introPhotoDirection, setIntroPhotoDirection] = useState<"initial" | "prev" | "next">("initial");
  const [outgoingIntroPhoto, setOutgoingIntroPhoto] = useState<number | null>(null);

  const openIntroPhoto = (index: number) => {
    setIntroPhotoDirection("initial");
    setOutgoingIntroPhoto(null);
    setActiveIntroPhoto(index);
  };
  const closeIntroPhoto = () => {
    setOutgoingIntroPhoto(null);
    setActiveIntroPhoto(null);
  };
  const showPrevIntroPhoto = () => {
    if (activeIntroPhoto === null) return;
    setOutgoingIntroPhoto(activeIntroPhoto);
    setIntroPhotoDirection("prev");
    setActiveIntroPhoto((current) => (current === null ? 0 : (current + introPhotos.length - 1) % introPhotos.length));
  };
  const showNextIntroPhoto = () => {
    if (activeIntroPhoto === null) return;
    setOutgoingIntroPhoto(activeIntroPhoto);
    setIntroPhotoDirection("next");
    setActiveIntroPhoto((current) => (current === null ? 0 : (current + 1) % introPhotos.length));
  };

  useEffect(() => {
    if (outgoingIntroPhoto === null) return;
    const timeout = window.setTimeout(() => setOutgoingIntroPhoto(null), INTRO_PHOTO_SLIDE_MS);
    return () => window.clearTimeout(timeout);
  }, [activeIntroPhoto, outgoingIntroPhoto]);

  useEffect(() => {
    if (activeIntroPhoto === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOutgoingIntroPhoto(null);
        setActiveIntroPhoto(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setOutgoingIntroPhoto(activeIntroPhoto);
        setIntroPhotoDirection("prev");
        setActiveIntroPhoto((current) => (current === null ? 0 : (current + introPhotos.length - 1) % introPhotos.length));
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setOutgoingIntroPhoto(activeIntroPhoto);
        setIntroPhotoDirection("next");
        setActiveIntroPhoto((current) => (current === null ? 0 : (current + 1) % introPhotos.length));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIntroPhoto, outgoingIntroPhoto]);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      const cursor = root.querySelector<HTMLElement>(".dossier-cursor");
      const hero = root.querySelector<HTMLElement>(".dossier-hero");
      const tileField = root.querySelector<HTMLElement>(".hero-tile-field");
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

      let updateIntroCardHoverFromPoint: (x: number, y: number) => void = () => {};

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
        updateIntroCardHoverFromPoint(event.clientX, event.clientY);

        if (tileField && tiles.length) {
          const rect = tileField.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
            resetActiveTiles();
            return;
          }

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

      const hoverTargets = gsap.utils.toArray<HTMLElement>("a, button, .scene-card, .portrait-frame, .hero-lens-button, .hero-wordmark, .intro-photo-card");
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

      introCardHoverCleanup.current.forEach((cleanup) => cleanup());
      introCardHoverCleanup.current = [];
      let introCardsCanHover = false;
      let activeIntroCardIndex: number | null = null;
      const introCards = gsap.utils.toArray<HTMLElement>(".intro-photo-card");
      const introCardHoverTweens: gsap.core.Tween[] = [];
      const trackIntroCardTween = (tween: gsap.core.Tween) => {
        introCardHoverTweens.push(tween);
      };
      const killIntroCardHoverTweens = () => {
        introCardHoverTweens.splice(0).forEach((tween) => tween.kill());
      };
      const resetIntroCards = () => {
        if (activeIntroCardIndex === null) return;
        activeIntroCardIndex = null;
        killIntroCardHoverTweens();
        trackIntroCardTween(gsap.to(".intro-card-left", {
          x: -185,
          y: 28,
          rotate: -11,
          scale: 1,
          zIndex: 2,
          duration: 0.42,
          ease: "power3.out",
        }));
        trackIntroCardTween(gsap.to(".intro-card-center", {
          x: 0,
          y: -16,
          rotate: 0,
          scale: 1.08,
          zIndex: 4,
          duration: 0.42,
          ease: "power3.out",
        }));
        trackIntroCardTween(gsap.to(".intro-card-right", {
          x: 185,
          y: 28,
          rotate: 11,
          scale: 1,
          zIndex: 2,
          duration: 0.42,
          ease: "power3.out",
        }));
      };

      const activateIntroCard = (index: number) => {
        if (!introCardsCanHover) return;
        if (activeIntroCardIndex === index) return;
        activeIntroCardIndex = index;
        killIntroCardHoverTweens();
        const card = introCards[index];
        const isLeft = index === 0;
        const isCenter = index === 1;
        const isRight = index === 2;

        trackIntroCardTween(gsap.to(".intro-photo-card", {
          filter: "saturate(0.82) brightness(0.82)",
          duration: 0.28,
          ease: "power3.out",
        }));

        trackIntroCardTween(gsap.to(card, {
          x: isLeft ? -230 : isRight ? 230 : 0,
          y: isCenter ? -34 : 8,
          rotate: isLeft ? -8 : isRight ? 8 : 0,
          scale: isCenter ? 1.16 : 1.1,
          zIndex: 8,
          filter: "saturate(1.04) brightness(1)",
          duration: 0.34,
          ease: "power3.out",
        }));

        trackIntroCardTween(gsap.to(".intro-card-left", {
          x: isLeft ? -230 : isCenter ? -260 : -210,
          y: isLeft ? 8 : 42,
          rotate: isLeft ? -8 : -15,
          scale: isLeft ? 1.1 : 0.92,
          duration: 0.34,
          ease: "power3.out",
        }));

        trackIntroCardTween(gsap.to(".intro-card-center", {
          x: isLeft ? 60 : isRight ? -60 : 0,
          y: isCenter ? -34 : -12,
          rotate: isLeft ? 5 : isRight ? -5 : 0,
          scale: isCenter ? 1.16 : 1.02,
          duration: 0.34,
          ease: "power3.out",
        }));

        trackIntroCardTween(gsap.to(".intro-card-right", {
          x: isRight ? 230 : isCenter ? 260 : 210,
          y: isRight ? 8 : 42,
          rotate: isRight ? 8 : 15,
          scale: isRight ? 1.1 : 0.92,
          duration: 0.34,
          ease: "power3.out",
        }));
      };

      updateIntroCardHoverFromPoint = (x: number, y: number) => {
        if (!introCardsCanHover) return;

        const element = document.elementFromPoint(x, y);
        const card = element?.closest?.(".intro-photo-card") as HTMLElement | null;
        const index = card ? introCards.indexOf(card) : -1;

        if (index >= 0) {
          activateIntroCard(index);
          return;
        }

        resetIntroCards();
      };

      introCards.forEach((card, index) => {
        const focus = () => activateIntroCard(index);
        const blur = () => {
          if (!introCardsCanHover) return;
          resetIntroCards();
        };
        card.addEventListener("focus", focus);
        card.addEventListener("blur", blur);
        introCardHoverCleanup.current.push(() => {
          card.removeEventListener("focus", focus);
          card.removeEventListener("blur", blur);
        });
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
          gsap.set(".intro-word", { yPercent: 120, rotate: 4, autoAlpha: 0 });
          gsap.set(".intro-copy-left, .intro-copy-right, .intro-front, .intro-photo-card, .intro-card-hint, .intro-card-copy", { autoAlpha: 0 });
          gsap.set(".intro-card-bg-wipe", { autoAlpha: 0, xPercent: -50, yPercent: -50, scale: 0 });
          gsap.set(".intro-stage-a, .intro-stage-b, .intro-side, .intro-center-copy", { autoAlpha: 1 });
          gsap.set(".intro-copy-right", { x: 70, y: 24, rotate: 2 });
          gsap.set(".intro-front", { yPercent: 70, scale: 0.88, rotate: -2 });
          gsap.set(".intro-side-left", { xPercent: -120, y: 32, rotate: -5, scale: 0.92 });
          gsap.set(".intro-side-right", { xPercent: 120, y: -32, rotate: 5, scale: 0.92 });
          gsap.set(".intro-center-copy", { y: 42, scale: 0.94, filter: "blur(12px)" });
          gsap.set(".intro-card-left", { x: -120, y: 120, rotate: -14, scale: 0.72 });
          gsap.set(".intro-card-center", { y: 170, rotate: 2, scale: 0.76 });
          gsap.set(".intro-card-right", { x: 120, y: 120, rotate: 14, scale: 0.72 });

          const dissolveCellElements = gsap.utils.toArray<HTMLElement>(".intro-dissolve-cell");
          const dissolveColumns = desktop ? 48 : 28;
          const dissolveRows = Math.ceil(dissolveCellElements.length / dissolveColumns);
          const dissolveChars = dissolveCharacters;
          const hash = (row: number, col: number, seed: number) => {
            const value = Math.sin(row * 127.1 + col * 311.7 + seed * 74.7) * 43758.5453123;
            return value - Math.floor(value);
          };
          const dissolveCellData = dissolveCellElements.map((cell, index) => {
            const row = Math.floor(index / dissolveColumns);
            const col = index % dissolveColumns;
            const y = dissolveRows <= 1 ? 0 : row / (dissolveRows - 1);
            const threshold = 0.08 + hash(row, col, 1) * 0.68;
            const scatter = (hash(row, col, 2) - 0.5) * 0.22;
            return { cell, row, col, y, threshold, scatter };
          });
          const hideDissolveCells = () => {
            dissolveCellData.forEach(({ cell }) => {
              cell.style.visibility = "hidden";
              cell.style.opacity = "0";
            });
          };
          const renderStageClips = (progress: number) => {
            const edge = gsap.utils.clamp(-8, 108, progress * 116 - 8);

            // Stable flat reveal line. This sits BEHIND the visible character blocks.
            // Stage A disappears from top to bottom; Stage B reveals from top to bottom.
            gsap.set(".intro-stage-a", {
              clipPath: `inset(${edge}% 0% 0% 0%)`,
            });
            gsap.set(".intro-stage-b", {
              clipPath: `inset(0% 0% ${100 - edge}% 0%)`,
            });
          };
          const renderDissolve = (progress: number) => {
            const front = progress * (dissolveRows + 8) - 4;
            const bandThickness = 3.15;

            dissolveCellData.forEach(({ cell, row, col, threshold, scatter }) => {
              const jitter = scatter * 7 + (threshold - 0.5) * 2.6;
              const distance = Math.abs((row + jitter) - front);
              const inBand = distance <= bandThickness;

              if (!inBand) {
                cell.style.visibility = "hidden";
                cell.style.opacity = "0";
                return;
              }

              cell.style.visibility = "visible";
              cell.style.opacity = "1";

              if (hash(row, col, Math.floor(progress * 30)) > 0.66) {
                cell.textContent = dissolveChars[(row * 11 + col * 7 + Math.floor(progress * 83)) % dissolveChars.length];
              }
            });
          };
          const dissolveState = { value: 0 };
          gsap.set(".intro-dissolve-grid", { "--dissolve-cols": dissolveColumns, autoAlpha: 0 });
          hideDissolveCells();
          renderStageClips(0);

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

          const introStoryTl = gsap.timeline({
            scrollTrigger: {
              trigger: ".intro-story",
              start: "top top",
              end: desktop ? "+=5200" : "+=3600",
              pin: true,
              scrub: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                const inCardFinale = self.progress > 0.69;

                const inSideProfile = self.progress > 0.34 && self.progress < 0.69;
                root.classList.toggle("is-side-profile-stage", inSideProfile);

                if (!inCardFinale) {
                  introCardsCanHover = false;
                  activeIntroCardIndex = null;
                  killIntroCardHoverTweens();
                  gsap.set(".intro-photo-cards", { pointerEvents: "none" });
                  gsap.set(".intro-photo-card", { clearProps: "filter,zIndex" });
                  return;
                }

                introCardsCanHover = true;
                root.classList.remove("is-side-profile-stage");
                gsap.set(".intro-photo-cards", { pointerEvents: "auto" });
              },
            },
            defaults: { ease: "none" },
          });

          introStoryTl
            .to(".intro-contours path", { strokeDashoffset: 0, duration: 0.8, stagger: 0.04 }, 0)
            .to(".intro-copy-left", { autoAlpha: 1, duration: 0.05 }, 0.12)
            .to(".intro-lead .intro-word", { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.55, stagger: 0.025, ease: "power3.out" }, 0.16)
            .to(".intro-front", { autoAlpha: 1, yPercent: 0, scale: 1, rotate: 0, duration: 0.8, ease: "power3.out" }, 0.34)
            .to(".intro-copy-right", { autoAlpha: 1, x: 0, y: 0, rotate: 0, duration: 0.45, ease: "power3.out" }, 0.62)
            .to(".intro-habit .intro-word", { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.55, stagger: 0.02, ease: "power3.out" }, 0.68)
            .to({}, { duration: 0.35 })
            .set(".intro-dissolve-grid", { autoAlpha: 1 })
            .set(dissolveState, { value: 0 })
            .to(dissolveState, {
              value: 1,
              duration: 1.02,
              ease: "none",
              onStart: () => {
                renderStageClips(0);
                renderDissolve(0);
              },
              onUpdate: () => {
                renderStageClips(dissolveState.value);
                renderDissolve(dissolveState.value);
              },
              onComplete: hideDissolveCells,
              onReverseComplete: hideDissolveCells,
            })
            .to(".intro-side", {
              xPercent: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              duration: 0.82,
              stagger: 0.05,
              ease: "power3.out",
            }, "<+0.14")
            .to(".intro-center-copy", {
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.72,
              ease: "power3.out",
            }, "<+0.16")
            .to(".intro-dissolve-grid", { autoAlpha: 0, duration: 0.22, ease: "power2.out" }, ">-0.06")
            .set(".intro-stage-a", { autoAlpha: 0 })
            .to({}, { duration: 0.4 })
            .to(".intro-side-left", { x: "-18vw", y: "8vh", rotate: -7, scale: 0.82, autoAlpha: 0.18, duration: 0.7, ease: "power2.inOut" })
            .to(".intro-side-right", { x: "18vw", y: "8vh", rotate: 7, scale: 0.82, autoAlpha: 0.18, duration: 0.7, ease: "power2.inOut" }, "<")
            .to(".intro-center-copy", { y: -70, autoAlpha: 0, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" }, "<+0.05")
            .to(".intro-side", { autoAlpha: 0, filter: "blur(10px)", scale: 0.72, duration: 0.48, ease: "power2.inOut" }, "<")
            .to(".intro-card-bg-wipe", { autoAlpha: 1, scale: 1, duration: 0.78, ease: "power3.inOut" }, "<-0.04")
            .to(".intro-photo-cards", { autoAlpha: 1, duration: 0.05 }, "<+0.24")
            .to(".intro-card-copy", { autoAlpha: 1, y: 0, duration: 0.48, ease: "power3.out" }, "<+0.04")
            .to(".intro-photo-card", { autoAlpha: 1, x: (index) => [-185, 0, 185][index], y: (index) => [28, -16, 28][index], rotate: (index) => [-11, 0, 11][index], scale: (index) => (index === 1 ? 1.08 : 1), duration: 0.72, stagger: 0.08, ease: "power3.out" }, "<+0.05")
            .to(".intro-card-hint", { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, ">-0.2")
            .to({}, { duration: 0.45 });

          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              gsap.set(".progress-fill", { scaleX: self.progress });
            },
          });

          // Keep the purple field as one fixed shared background across hero + short intro.
          // The marquee remains scoped inside .dossier-hero, but the base background should not parallax,
          // otherwise the transition reads as two stacked sections.
          gsap.set(".cloud-layer", { yPercent: 0, clearProps: "transform" });

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
        root.classList.remove("is-side-profile-stage");
        killIntroCardHoverTweens();
        window.removeEventListener("pointermove", movePointer);
        hero?.removeEventListener("pointerleave", resetActiveTiles);
        cleanupHover.forEach((cleanup) => cleanup());
        introCardHoverCleanup.current.forEach((cleanup) => cleanup());
        introCardHoverCleanup.current = [];
        mm.revert();
      };
    },
    { scope: container },
  );

  return (
    <main className={activeIntroPhoto === null ? "dossier" : "dossier is-intro-modal-open"} ref={container}>
      <div className="dossier-cursor" aria-hidden="true" />
      <div className="progress-line" aria-hidden="true"><span className="progress-fill" /></div>
      <button className="hero-lock" type="button" onClick={onReset}>lock</button>
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

      <section className="intro-story" aria-label="Raffa short intro portrait story">
        <div className="intro-story-bg" aria-hidden="true" />
        <svg className="intro-contours" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
          <path pathLength="1" d="M-120 160 C110 -20 250 330 486 150 C620 48 760 182 650 340 C540 498 270 336 194 560 C108 812 396 872 560 692 C722 514 668 388 896 310 C1070 250 1068 82 1260 42 C1430 8 1570 122 1480 340" />
          <path pathLength="1" d="M120 930 C166 668 300 638 350 480 C404 306 206 330 236 170 C270 -8 452 8 564 104 C720 238 620 394 820 438 C1010 482 956 648 1130 668 C1294 686 1270 526 1540 532" />
          <path pathLength="1" d="M-150 690 C140 500 280 735 460 602 C620 484 492 270 720 205 C940 140 1008 428 1260 334 C1410 278 1460 376 1550 470" />
        </svg>

        <div className="intro-dissolve-grid" aria-hidden="true">
          {dissolveCells.map((cell) => (
            <span className="intro-dissolve-cell" key={cell.index}>{cell.char}</span>
          ))}
        </div>

        <div className="intro-stage intro-stage-a">
          <section className="intro-copy-left">
            <div className="intro-section-index" aria-hidden="true">
              <span>01</span>
              <i />
              <span>intro</span>
            </div>
            <h2 className="intro-lead">
              <span className="intro-word intro-word-small">I&apos;m</span>
              <span className="intro-word intro-word-name">Raffa.</span>
              <span className="intro-word intro-word-line">I build <strong>frontend,</strong></span>
              <span className="intro-word intro-word-line muted">design screens,</span>
              <span className="intro-word intro-word-line">and cut <strong>videos.</strong></span>
            </h2>
            <p className="intro-body-copy">
              Different tools, same habit: I care about timing, taste, and whether the thing actually works when someone touches it.
            </p>
          </section>

          <section className="intro-copy-right" aria-label="What Raffa does">
            <div className="intro-right-heading">
              <span>what i do</span>
              <i />
            </div>
            <div className="intro-habit intro-skill-list">
              <article className="intro-word intro-skill-item">
                <span className="intro-skill-number">01</span>
                <div>
                  <h3>Build frontend</h3>
                  <p>Responsive interfaces, real flows, and code that stays maintainable.</p>
                </div>
              </article>
              <article className="intro-word intro-skill-item">
                <span className="intro-skill-number">02</span>
                <div>
                  <h3>Design screens</h3>
                  <p>Clean layouts with taste, hierarchy, and clear visual focus.</p>
                </div>
              </article>
              <article className="intro-word intro-skill-item">
                <span className="intro-skill-number">03</span>
                <div>
                  <h3>Cut videos</h3>
                  <p>Timing, pacing, and motion that make the moment land right.</p>
                </div>
              </article>
            </div>
          </section>

          <figure className="intro-front" aria-label="Front fierce portrait placeholder">
            <Image src="/assets/fierce/fierce-front-removed.png" alt="front fierce placeholder" width={941} height={1672} />
          </figure>
        </div>

        <div className="intro-stage intro-stage-b">
          <figure className="intro-side intro-side-left" aria-label="Left side fierce portrait placeholder facing inward">
            <Image src="/assets/fierce/fierce-right-removed.png" alt="left inward fierce placeholder" width={941} height={1672} />
          </figure>
          <figure className="intro-side intro-side-right" aria-label="Right side fierce portrait placeholder facing inward">
            <Image src="/assets/fierce/fierce-left-removed.png" alt="right inward fierce placeholder" width={941} height={1672} />
          </figure>

          <section className="intro-center-copy">
            <p className="mono-kicker">about</p>
            <h2>UPI computer science student, building digital things with clarity, curiosity, and care.</h2>
            <p className="intro-center-body">I like turning ideas into simple experiences that feel intentional, useful, and easy to touch.</p>
          </section>
        </div>

        <div className="intro-card-bg-wipe" aria-hidden="true" />

        <div className="intro-photo-cards" aria-label="Fierce photo card set">
          <div className="intro-card-copy">
            <p>photo details</p>
            <h2>See the full photo</h2>
          </div>
          {introPhotos.map((photo, index) => (
            <button
              className={`intro-photo-card ${index === 0 ? "intro-card-left" : index === 1 ? "intro-card-center" : "intro-card-right"}`}
              key={photo.label}
              onClick={() => openIntroPhoto(index)}
              type="button"
            >
              <span className="intro-card-tape" aria-hidden="true" />
              <Image src={photo.src} alt={`${photo.label} placeholder`} width={941} height={1672} />
              <span className="intro-card-caption"><span>{photo.number}</span> {photo.label}</span>
            </button>
          ))}
        </div>

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

      {activeIntroPhoto !== null && (
        <div className="intro-photo-modal" role="dialog" aria-modal="true" aria-label={`${introPhotos[activeIntroPhoto].label} preview`} onClick={closeIntroPhoto}>
          <button className="intro-modal-close" onClick={closeIntroPhoto} type="button" aria-label="Close photo preview">×</button>
          <button className="intro-modal-nav intro-modal-prev" onClick={(event) => { event.stopPropagation(); showPrevIntroPhoto(); }} type="button" aria-label="Previous photo">←</button>
          <div className="intro-modal-stage" onClick={(event) => event.stopPropagation()}>
            {outgoingIntroPhoto !== null && outgoingIntroPhoto !== activeIntroPhoto && (
              <figure className={`intro-modal-card intro-modal-card-out-${introPhotoDirection}`} key={`out-${outgoingIntroPhoto}-${activeIntroPhoto}`}>
                <Image src={introPhotos[outgoingIntroPhoto].src} alt={`${introPhotos[outgoingIntroPhoto].label} preview`} width={941} height={1672} sizes="(max-width: 899px) 68vw, 44vw" priority />
              </figure>
            )}
            <figure className={`intro-modal-card intro-modal-card-in-${introPhotoDirection}`} key={`in-${activeIntroPhoto}`}>
              <Image src={introPhotos[activeIntroPhoto].src} alt={`${introPhotos[activeIntroPhoto].label} preview`} width={941} height={1672} sizes="(max-width: 899px) 68vw, 44vw" priority />
            </figure>
          </div>
          <button className="intro-modal-nav intro-modal-next" onClick={(event) => { event.stopPropagation(); showNextIntroPhoto(); }} type="button" aria-label="Next photo">→</button>
        </div>
      )}
    </main>
  );
}
