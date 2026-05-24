"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RawExperienceProps = {
  onReset: () => void;
};

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

const projectStories = [
  {
    number: "01",
    year: "2026",
    title: "GymAI",
    label: "frontend flow",
    note: "A product flow for tracking routines, reading progress, and making workout decisions feel simple.",
    proof: "layout hierarchy / dashboard thinking / reusable UI",
  },
  {
    number: "02",
    year: "2026",
    title: "SampahKita",
    label: "public app",
    note: "Turning a serious topic into an interface that feels approachable, clear, and easy to move through.",
    proof: "information design / navigation / mobile-first structure",
  },
  {
    number: "03",
    year: "2025",
    title: "Qiroaat",
    label: "learning interface",
    note: "A text-heavy experience shaped with spacing, rhythm, and hierarchy so the content does not feel dead.",
    proof: "readability / content structure / visual restraint",
  },
  {
    number: "04",
    year: "2025",
    title: "Motion Cuts",
    label: "editing instinct",
    note: "Video editing trained the same thing I use in frontend: timing, pacing, and knowing when a moment should land.",
    proof: "motion taste / transition rhythm / storytelling",
  },
  {
    number: "05",
    year: "2026",
    title: "Raw Signal",
    label: "personal system",
    note: "A one-page identity experiment built around scroll, type, interaction, and how I want people to read me.",
    proof: "GSAP / visual direction / end-to-end build",
  },
];

const projectTransitionBars = Array.from({ length: 22 }, (_, index) => index);

const cretivoxLogoPaths = [
  "M274.04 0C408 0 470.56 71.4 463.76 163.88L463.08 170.68H340.68V163.88C339.32 113.56 312.8 89.76 263.16 89.76C191.08 89.76 128.52 157.76 128.52 286.28C128.52 368.56 165.24 398.48 209.44 398.48C257.04 398.48 293.08 369.24 312.12 317.56L314.84 310.76H437.24L435.2 317.56C403.92 430.44 314.16 488.24 196.52 488.24C79.56 488.24 0 421.6 0 294.44C0 111.52 127.84 0 274.04 0Z",
  "M942.889 115.6C942.889 187 901.409 235.28 822.529 255.68C864.689 274.04 878.289 314.16 878.289 388.28C878.289 427.04 883.729 456.28 893.929 478.72H760.649C757.249 453.56 755.889 428.4 755.889 374.68C755.889 329.8 740.929 303.28 712.369 301.24C698.769 300.56 687.889 300.56 674.289 300.56H646.409L615.129 478.72H492.729L575.689 9.52H762.009C791.249 9.52 810.289 10.2 834.769 12.92C893.929 19.72 942.889 48.96 942.889 115.6ZM662.049 212.16H706.929C719.849 212.16 730.729 212.16 739.569 211.48C775.609 208.76 809.609 195.16 809.609 147.56C809.609 116.96 788.529 107.44 761.329 105.4C752.489 104.72 741.609 104.72 728.689 104.72H681.089L662.049 212.16Z",
  "M1134.64 104.72L1119 195.84H1335.92L1318.92 291.04H1102L1085.68 383.52H1323L1306 478.72H946.284L1029.24 9.52H1382.16L1365.16 104.72H1134.64Z",
  "M1828.88 104.72H1677.24L1611.28 478.72H1488.88L1554.84 104.72H1401.84L1419.52 9.52H1846.56L1828.88 104.72Z",
  "M1925.32 478.72H1802.92L1885.88 9.52H2008.28L1925.32 478.72Z",
  "M2309.98 478.72H2151.54L2069.26 9.52H2202.54L2248.78 384.2L2427.62 9.52H2557.5L2309.98 478.72Z",
  "M2798.16 0C2941.64 0 3022.56 87.04 3022.56 203.32C3022.56 380.12 2901.52 488.24 2749.2 488.24C2605.72 488.24 2524.8 401.2 2524.8 284.92C2524.8 108.12 2645.84 0 2798.16 0ZM2753.28 398.48C2847.8 398.48 2893.36 294.44 2893.36 206.72C2893.36 138.04 2859.36 89.76 2794.08 89.76C2699.56 89.76 2654 193.8 2654 281.52C2654 350.2 2688 398.48 2753.28 398.48Z",
  "M3337.82 245.48L3473.14 478.72H3333.74L3250.1 321.64L3129.74 478.72H2982.18L3197.74 239.36L3076.7 9.52H3214.74L3284.78 164.56L3407.18 9.52H3547.94L3337.82 245.48Z",
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
  const [activeHero, setActiveHero] = useState(0);
  const [activeIntroPhoto, setActiveIntroPhoto] = useState<number | null>(null);
  const [introPhotoDirection, setIntroPhotoDirection] = useState<"initial" | "prev" | "next">("initial");
  const [outgoingIntroPhoto, setOutgoingIntroPhoto] = useState<number | null>(null);
  const [isIntroPhotoClosing, setIsIntroPhotoClosing] = useState(false);

  const openIntroPhoto = (index: number) => {
    setIsIntroPhotoClosing(false);
    setIntroPhotoDirection("initial");
    setOutgoingIntroPhoto(null);
    setActiveIntroPhoto(index);
  };
  const closeIntroPhoto = useCallback(() => {
    if (activeIntroPhoto === null || isIntroPhotoClosing) return;
    setOutgoingIntroPhoto(null);
    setIsIntroPhotoClosing(true);
    window.setTimeout(() => {
      setActiveIntroPhoto(null);
      setIsIntroPhotoClosing(false);
    }, 320);
  }, [activeIntroPhoto, isIntroPhotoClosing]);
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
        closeIntroPhoto();
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
  }, [activeIntroPhoto, closeIntroPhoto, outgoingIntroPhoto]);

  useEffect(() => {
    if (activeIntroPhoto !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let frame = 0;
    let isAnimating = false;
    const lerp = 0.105;
    const wheelMultiplier = 0.86;

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const clampScroll = (value: number) => Math.max(0, Math.min(maxScroll(), value));
    const normalizeWheelDelta = (event: WheelEvent) => {
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
      return event.deltaY;
    };
    const stopScrollAnimation = () => {
      isAnimating = false;
      window.cancelAnimationFrame(frame);
    };
    const tick = () => {
      const distance = targetY - currentY;
      currentY += distance * lerp;
      window.scrollTo(0, currentY);
      ScrollTrigger.update();

      if (Math.abs(distance) < 0.42) {
        currentY = targetY;
        window.scrollTo(0, targetY);
        ScrollTrigger.update();
        stopScrollAnimation();
        return;
      }

      frame = window.requestAnimationFrame(tick);
    };
    const startScrollAnimation = () => {
      if (isAnimating) return;
      isAnimating = true;
      frame = window.requestAnimationFrame(tick);
    };
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || event.defaultPrevented || !event.cancelable) return;

      event.preventDefault();
      targetY = clampScroll(targetY + normalizeWheelDelta(event) * wheelMultiplier);
      startScrollAnimation();
    };
    const syncTargetToScroll = () => {
      if (isAnimating) return;
      targetY = window.scrollY;
      currentY = window.scrollY;
      ScrollTrigger.update();
    };
    const handleResize = () => {
      targetY = clampScroll(targetY);
      currentY = clampScroll(window.scrollY);
      ScrollTrigger.refresh();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", syncTargetToScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      stopScrollAnimation();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", syncTargetToScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIntroPhoto]);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      gsap.ticker.lagSmoothing(1000, 16);
      ScrollTrigger.config({ ignoreMobileResize: true });

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

      const hoverTargets = gsap.utils.toArray<HTMLElement>("a, button, .hero-lens-button, .hero-wordmark, .intro-photo-card");
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
            gsap.set(".hero-line, .hero-type-stage, .hero-lens-button", { autoAlpha: 1, clearProps: "transform" });
            gsap.set(".signature-stage", { autoAlpha: 0 });
            gsap.set(".signature-path", { strokeDashoffset: 0 });
            return;
          }

          const signaturePaths = gsap.utils.toArray<SVGPathElement>(".signature-path");
          const signatureMainPath = root.querySelector<SVGPathElement>(".signature-path-main");
          const signatureFinalPath = root.querySelector<SVGPathElement>(".signature-path-final");
          signaturePaths.forEach((path) => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          });
          gsap.set(".signature-path-final", { autoAlpha: 0 });
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
              scrub: desktop ? 0.42 : true,
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
            .to(".signature-stage", { autoAlpha: 1, duration: 0.16 }, 0.14)
            .to(signatureMainPath, { strokeDashoffset: 0, duration: 0.66 }, 0.18)
            .set(signatureFinalPath, { autoAlpha: 1 }, 0.84)
            .to(signatureFinalPath, { strokeDashoffset: 0, duration: 0.16 }, 0.84);

          const introStoryTl = gsap.timeline({
            scrollTrigger: {
              trigger: ".intro-story",
              start: "top top",
              end: desktop ? "+=5200" : "+=3600",
              pin: true,
              scrub: desktop ? 0.55 : true,
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
            .to({}, { duration: 0.18 });

          const projectRail = root.querySelector<HTMLElement>(".project-rail");
          const projectSection = root.querySelector<HTMLElement>(".project-story");
          if (projectRail && projectSection) {
            const projectDistance = () => Math.max(0, projectRail.scrollWidth - window.innerWidth + window.innerWidth * 0.08);

            gsap.set(".project-transition-panel", {
              yPercent: (index) => (index % 2 === 0 ? 110 : -110),
            });

            gsap.set(".project-transition-logo", { autoAlpha: 0, scale: 0.98, y: 8 });
            gsap.set(".project-transition-logo path", {
              autoAlpha: 0,
              fillOpacity: 1,
              y: 26,
              scale: 0.96,
              transformOrigin: "50% 50%",
            });
            gsap.set(".project-card", {
              autoAlpha: 0,
              x: (index) => (desktop ? window.innerWidth * 0.56 + index * 34 : window.innerWidth * 0.34),
              y: (index) => [-34, 92, -82, 46, -18, 70][index % 6],
              rotate: (index) => [-2.5, 1.5, 0, -1, 2, -1.5][index % 6],
            });
            gsap.set(".project-kicker, .project-headline, .project-subcopy", { autoAlpha: 0, y: 34 });
            gsap.set(".project-bg-word", { autoAlpha: 0, xPercent: 0 });
            gsap.set(".project-contours path", { strokeDashoffset: 1 });

            // Covered reveal:
            // 1) Bars close while the user is still visually on the photo-card screen.
            // 2) While the screen is fully covered, the page scrolls to the project section behind it.
            // 3) Bars only open once the project section is pinned at the top.
            gsap.timeline({
              scrollTrigger: {
                trigger: projectSection,
                start: "top 118%",
                end: "top top",
                scrub: desktop ? 0.5 : true,
                invalidateOnRefresh: true,
              },
              defaults: { ease: "none" },
            })
              .to(".project-transition-panel", {
                yPercent: 0,
                duration: 0.18,
                stagger: { amount: 0.1, from: "center" },
                ease: "power3.inOut",
              }, 0)
              .to(".project-transition-logo", {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: 0.1,
                ease: "power2.out",
              }, 0.2)
              .to(".project-transition-logo path", {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.24,
                stagger: 0.035,
                ease: "power3.out",
              }, 0.22)
              .to(".project-bg-word", {
                autoAlpha: 1,
                duration: 0.16,
              }, 0.48)
              .to(".project-kicker, .project-headline, .project-subcopy", {
                y: 0,
                autoAlpha: 1,
                duration: 0.24,
                stagger: 0.04,
                ease: "power3.out",
              }, 0.52)
              .to(".project-card", {
                autoAlpha: 1,
                x: 0,
                duration: 0.34,
                stagger: 0.055,
                ease: "power3.out",
              }, 0.52)
              .to(".project-contours path", {
                strokeDashoffset: 0,
                duration: 0.32,
                stagger: 0.03,
              }, 0.56);

            gsap.timeline({
              scrollTrigger: {
                trigger: projectSection,
                start: "top top",
                end: () => `+=${desktop ? projectDistance() + 900 : projectDistance() + 620}`,
                pin: true,
                scrub: desktop ? 0.58 : true,
                anticipatePin: 0.6,
                invalidateOnRefresh: true,
              },
              defaults: { ease: "none" },
            })
              .to(".project-transition-logo path", {
                autoAlpha: 0,
                y: -18,
                scale: 0.98,
                duration: 0.14,
                stagger: { amount: 0.08, from: "end" },
                ease: "power2.inOut",
              }, 0)
              .to(".project-transition-logo", {
                autoAlpha: 0,
                scale: 0.99,
                y: -6,
                duration: 0.18,
                ease: "power2.inOut",
              }, 0.04)
              .to(".project-transition-panel", {
                yPercent: (index) => (index % 2 === 0 ? -110 : 110),
                duration: 0.22,
                stagger: { amount: 0.14, from: "center" },
                ease: "power3.inOut",
              }, 0)
              .to(".project-rail", {
                x: () => -projectDistance(),
                duration: 1,
                ease: "none",
              }, 0)
              .to(".project-bg-word", {
                xPercent: -18,
                duration: 1,
              }, 0);
          }

          const finalFooter = root.querySelector<HTMLElement>(".final-footer");
          if (finalFooter) {
            gsap.set(".footer-kicker, .footer-title, .footer-link", {
              autoAlpha: 0,
              y: 36,
            });
            gsap.set(".footer-bg-word", { autoAlpha: 0, xPercent: 8 });
            gsap.set(".footer-orbit", { scale: 0.82, autoAlpha: 0 });

            gsap.timeline({
              scrollTrigger: {
                trigger: finalFooter,
                start: "top 78%",
                end: "top 18%",
                scrub: desktop ? 0.54 : true,
              },
              defaults: { ease: "none" },
            })
              .to(".footer-bg-word", {
                autoAlpha: 1,
                xPercent: 0,
                duration: 0.44,
              }, 0)
              .to(".footer-orbit", {
                autoAlpha: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.08,
              }, 0.02)
              .to(".footer-kicker, .footer-title, .footer-link", {
                autoAlpha: 1,
                y: 0,
                duration: 0.56,
                stagger: 0.07,
                ease: "power3.out",
              }, 0.08);

            gsap.to(".footer-bg-word", {
              xPercent: -10,
              scrollTrigger: {
                trigger: finalFooter,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }

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
          <path className="signature-path signature-path-main" d="M11.9889 182.474C11.2318 183.245 10.4747 184.016 12.3559 184.413C14.2371 184.81 18.7796 184.81 48.7527 168.624C78.7259 152.439 133.992 120.068 168.141 99.1527C202.289 78.2377 213.645 69.7595 225.173 57.2992C250.041 30.4211 259.758 9.66525 258.244 6.93263C255.947 2.78818 236.197 28.9104 210.995 64.2709C199.747 80.0536 193.365 92.6948 178.877 115.618C164.39 138.542 142.435 171.684 126.203 194.537C101.189 229.757 86.3998 247.76 56.1788 254.13C40.821 257.367 25.4056 257.213 16.4354 254.13C7.46526 251.047 4.24238 240.151 8.02774 231.965C17.0504 212.453 44.7265 198.146 99.075 167.55C138.266 145.487 204.147 116.144 239.202 99.8767C274.257 83.6095 277.285 82.8387 279.602 83.9832C281.919 85.1276 284.542 88.8793 279.671 95.9646C257.191 128.662 235.325 138.846 228.454 144.673C225.306 147.343 223.097 149.73 231.769 150.921C259.894 154.784 305.388 142.092 341.349 126.526C352.627 121.644 348.541 120.208 345.456 120.196C325.699 120.121 307.178 147.417 307.166 151.691C307.12 169.072 363.591 142.863 383.596 126.864C386.884 124.235 385.936 120.255 384.422 123.676C382.908 127.098 379.88 137.117 380.212 138.425C382.096 145.832 391.259 115.607 397.74 90.8147C408.066 51.3131 408.878 19.0543 408.878 11.6271C408.878 5.95169 407.364 34.4457 405.069 73.1461C403.417 101.017 404.289 145.759 402.775 174.568C399.868 229.877 390.525 236.94 390.525 239.684C390.525 240.023 390.525 235.492 392.417 231.965C396.553 224.259 410.323 216.784 423.319 207.068C430.633 201.6 384.101 196.488 320.197 194.175C301.59 193.502 311.56 187.239 324.958 182.544C338.355 177.85 355.011 173.225 395.767 166.604C436.522 159.983 500.873 151.505 569.469 138.098" />
          <path className="signature-path signature-path-final" d="M365.289 91.387L473.114 70.3669" />
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

      <section className="project-story" aria-label="Project build log">
        <div className="project-story-bg" aria-hidden="true" />
        <svg className="project-contours" viewBox="0 0 1440 900" aria-hidden="true">
          <path pathLength="1" d="M-140 190C78 24 238 48 365 166c126 117 41 254 161 347 142 110 262-95 435-18 168 75 123 279 321 287 132 5 207-78 312-172" />
          <path pathLength="1" d="M96 828c172-126 313-99 424-28 120 77 198 142 356 77 189-77 150-273 350-322 140-34 245 12 350 96" />
          <path pathLength="1" d="M392-88c126 98 208 194 184 360-24 170-130 202-83 331 54 148 216 113 294 246" />
          <path pathLength="1" d="M1160-96c-42 176-19 306 82 392 128 109 266 39 332 174" />
        </svg>

        <div className="project-bg-word" aria-hidden="true">BUILD LOG</div>

        <div className="project-copy project-copy-minimal">
          <p className="project-kicker">02 — selected work</p>
          <p className="project-subcopy">A few things I have been shaping, testing, and learning from.</p>
        </div>

        <div className="project-rail project-photo-rail" aria-label="Horizontal project gallery">
          {projectStories.map((project, index) => (
            <article className={`project-card project-photo-item project-photo-item-${index + 1}`} key={project.title}>
              <div className="project-photo-caption">
                <span>{project.title}</span>
                <em>{project.year} / {project.label}</em>
              </div>
              <div className="project-photo-frame" aria-hidden="true">
                <div className="project-shot">
                  <span>{project.number}</span>
                </div>
              </div>
            </article>
          ))}
          <article className="project-card project-photo-item project-photo-item-closing">
            <div className="project-photo-caption">
              <span>Still building</span>
              <em>same habit / clearer each time</em>
            </div>
            <div className="project-photo-frame" aria-hidden="true">
              <div className="project-shot">
                <span>06</span>
              </div>
            </div>
          </article>
        </div>

      </section>

      <div className="project-transition-bars" aria-hidden="true">
        {projectTransitionBars.map((bar) => (
          <span className="project-transition-bar" key={bar}>
            <i className="project-transition-panel" />
          </span>
        ))}
      </div>

      <div className="project-transition-logo" aria-hidden="true">
        <svg className="cretivox-draw-logo" viewBox="0 0 3548 489" role="img">
          {cretivoxLogoPaths.map((path, index) => (
            <path d={path} key={index} />
          ))}
        </svg>
      </div>

      <section className="final-footer" aria-label="Final source link">
        <div className="footer-bg-word" aria-hidden="true">SOURCE</div>
        <span className="footer-orbit footer-orbit-one" aria-hidden="true" />
        <span className="footer-orbit footer-orbit-two" aria-hidden="true" />

        <div className="footer-inner">
          <p className="footer-kicker">project link</p>
          <h2 className="footer-title">
            Fine, here’s the GitHub.
          </h2>
          <a
            className="footer-link"
            href="https://github.com/piipapoy/cretivox-frontend"
            target="_blank"
            rel="noreferrer"
            aria-label="Open the Cretivox frontend GitHub repository"
          >
            <span>Open repository</span>
            <strong>↗</strong>
          </a>
        </div>
      </section>

      {activeIntroPhoto !== null && (
        <div className={`intro-photo-modal${isIntroPhotoClosing ? " is-closing" : ""}`} role="dialog" aria-modal="true" aria-label={`${introPhotos[activeIntroPhoto].label} preview`} onClick={closeIntroPhoto}>
          <button className="intro-modal-close" onClick={(event) => { event.stopPropagation(); closeIntroPhoto(); }} type="button" aria-label="Close photo preview" disabled={isIntroPhotoClosing}>×</button>
          <button className="intro-modal-nav intro-modal-prev" onClick={(event) => { event.stopPropagation(); if (!isIntroPhotoClosing) showPrevIntroPhoto(); }} type="button" aria-label="Previous photo" disabled={isIntroPhotoClosing}>←</button>
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
          <button className="intro-modal-nav intro-modal-next" onClick={(event) => { event.stopPropagation(); if (!isIntroPhotoClosing) showNextIntroPhoto(); }} type="button" aria-label="Next photo" disabled={isIntroPhotoClosing}>→</button>
        </div>
      )}
    </main>
  );
}
