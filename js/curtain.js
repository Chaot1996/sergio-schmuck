/**
 * Vorhang-Intro: spielt einmal pro Browser-Sitzung ab (sessionStorage),
 * danach wird die Seite ohne Verzögerung angezeigt. Das Ausblenden bei
 * Wiederholung passiert bereits per Inline-Script im <head> (kein Flackern).
 */
(function () {
  const KEY = "sergio_curtain_shown";
  const curtain = document.getElementById("curtain");
  if (!curtain) return;

  if (sessionStorage.getItem(KEY)) {
    curtain.classList.add("is-hidden");
    return;
  }

  document.documentElement.classList.add("curtain-lock");

  const open = () => {
    curtain.classList.add("is-opening");
    sessionStorage.setItem(KEY, "1");
    setTimeout(() => {
      curtain.classList.add("is-hidden");
      document.documentElement.classList.remove("curtain-lock");
    }, 1250);
  };

  // Kurzer Moment, damit der geschlossene Vorhang sichtbar ist, bevor er aufgeht.
  window.setTimeout(open, 450);
})();
