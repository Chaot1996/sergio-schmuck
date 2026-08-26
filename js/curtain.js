/**
 * Vorhang-Intro: spielt einmal pro Browser-Sitzung ab (sessionStorage),
 * danach wird die Seite ohne Verzögerung angezeigt. Das Ausblenden bei
 * Wiederholung passiert bereits per Inline-Script im <head> (kein Flackern).
 *
 * Die eigentliche Choreografie (6 Ringfragmente fliegen von den Rändern
 * ein und setzen sich zusammen → Markenname blendet ein → Vorhang öffnet
 * sich) steckt als CSS-Keyframe-Animation in style.css (siehe
 * "Vorhang-Intro"); hier wird nur gestartet, respektiert und nach
 * Ablauf aufgeräumt.
 */
(function () {
  const KEY = "sergio_curtain_shown";
  const TOTAL_MS = 3100;
  const curtain = document.getElementById("curtain");
  if (!curtain) return;

  if (sessionStorage.getItem(KEY)) {
    curtain.classList.add("is-hidden");
    return;
  }

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    sessionStorage.setItem(KEY, "1");
    curtain.classList.add("is-hidden");
    return;
  }

  document.documentElement.classList.add("curtain-lock");
  sessionStorage.setItem(KEY, "1");

  requestAnimationFrame(() => {
    curtain.classList.add("is-playing");
  });

  setTimeout(() => {
    curtain.classList.add("is-hidden");
    document.documentElement.classList.remove("curtain-lock");
  }, TOTAL_MS + 100);
})();
