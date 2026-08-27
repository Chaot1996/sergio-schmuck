/**
 * Vorhang-Intro: spielt bei jedem Seitenaufruf/Reload erneut ab.
 *
 * Die eigentliche Choreografie (6 Ringfragmente fliegen von den Rändern
 * ein und setzen sich zusammen → Baum blendet in der Mitte ein → Ring
 * dreht sich um den Baum, dabei immer schneller werdend → Baum und
 * Ring verschwinden gemeinsam in den Hintergrund → Markenname blitzt
 * kurz auf → Vorhang öffnet sich) steckt als CSS-Keyframe-Animation in
 * style.css (siehe "Vorhang-Intro"); hier wird nur gestartet,
 * respektiert und nach Ablauf aufgeräumt.
 */
(function () {
  const TOTAL_MS = 4600;
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
