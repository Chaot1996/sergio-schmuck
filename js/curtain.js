/**
 * Vorhang-Intro: spielt bei jedem Seitenaufruf/Reload erneut ab.
 *
 * Die eigentliche Choreografie (6 Ringfragmente fliegen von den Rändern
 * ein und setzen sich zusammen → Ring dreht sich einmal → Markenname
 * blendet ein → Vorhang öffnet sich) steckt als CSS-Keyframe-Animation
 * in style.css (siehe "Vorhang-Intro"); hier wird nur gestartet,
 * respektiert und nach Ablauf aufgeräumt.
 */
(function () {
  const TOTAL_MS = 3100;
  const curtain = document.getElementById("curtain");
  if (!curtain) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    curtain.classList.add("is-hidden");
    return;
  }

  document.documentElement.classList.add("curtain-lock");

  requestAnimationFrame(() => {
    curtain.classList.add("is-playing");
  });

  setTimeout(() => {
    curtain.classList.add("is-hidden");
    document.documentElement.classList.remove("curtain-lock");
  }, TOTAL_MS + 100);
})();
