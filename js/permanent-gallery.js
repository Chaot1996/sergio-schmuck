/**
 * Bildergalerie auf permanent-schmuck.html, gefiltert nach Kategorie.
 * Bilder liegen in assets/img/permanent/ (Quelle: screenshots/<Kategorie>/).
 */
const PERMANENT_GALLERY = {
  unikate: {
    label: "Handgefertigte Unikate",
    images: [
      "assets/img/permanent/unikate-1.png",
      "assets/img/permanent/unikate-2.png",
      "assets/img/permanent/unikate-3.png",
      "assets/img/permanent/unikate-4.png",
      "assets/img/permanent/unikate-5.png",
    ],
  },
  fusskettchen: {
    label: "Fußkettchen",
    images: [
      "assets/img/permanent/fusskettchen-1.png",
      "assets/img/permanent/fusskettchen-2.png",
      "assets/img/permanent/fusskettchen-3.png",
      "assets/img/permanent/fusskettchen-4.png",
    ],
  },
  armkettchen: {
    label: "Armkettchen",
    images: [
      "assets/img/permanent/armkettchen-1.png",
      "assets/img/permanent/armkettchen-2.png",
      "assets/img/permanent/armkettchen-3.png",
      "assets/img/permanent/armkettchen-4.png",
      "assets/img/permanent/armkettchen-5.png",
      "assets/img/permanent/armkettchen-6.png",
      "assets/img/permanent/armkettchen-7.png",
      "assets/img/permanent/armkettchen-8.png",
      "assets/img/permanent/armkettchen-9.png",
    ],
  },
  "hals-bauchketten": {
    label: "Hals- und Bauchketten",
    images: [
      "assets/img/permanent/hals-bauchketten-1.png",
      "assets/img/permanent/hals-bauchketten-2.png",
      "assets/img/permanent/hals-bauchketten-3.png",
      "assets/img/permanent/hals-bauchketten-4.png",
      "assets/img/permanent/hals-bauchketten-5.png",
      "assets/img/permanent/hals-bauchketten-6.png",
    ],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("permGalleryGrid");
  const buttons = document.querySelectorAll("#permFilterBar .filter-btn");
  if (!grid) return;

  const allImages = () =>
    Object.values(PERMANENT_GALLERY).flatMap((cat) =>
      cat.images.map((src) => ({ src, label: cat.label }))
    );

  function render(filter) {
    const items =
      filter === "alle"
        ? allImages()
        : PERMANENT_GALLERY[filter].images.map((src) => ({
            src,
            label: PERMANENT_GALLERY[filter].label,
          }));
    grid.innerHTML = items
      .map(({ src, label }) => `<img src="${src}" alt="${label} von SERGIO" loading="lazy">`)
      .join("");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.filter);
    });
  });

  render("alle");
});
