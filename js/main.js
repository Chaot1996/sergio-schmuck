document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  toggle?.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
  });
  nav?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );

  // Produktfilter (nur auf shop.html vorhanden)
  const filterBtns = document.querySelectorAll("[data-filter]");
  const grid = document.getElementById("productGrid");
  if (grid && typeof PRODUCTS !== "undefined") {
    const renderProducts = (filter) => {
      const list = filter === "alle" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
      grid.innerHTML = list
        .map(
          (p) => `
        <article class="product-card">
          <div class="product-media">
            ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
            <img src="${p.img}" alt="${p.name}" loading="lazy">
          </div>
          <div class="product-body">
            <span class="product-cat">${p.categoryLabel}</span>
            <h3>${p.name}</h3>
            <p class="product-desc">${p.desc}</p>
            <div class="product-price">${p.price} € <small>ca. / Einzelstück</small></div>
            <button class="product-add" data-add-to-cart="${p.id}">In die Anfrage legen</button>
          </div>
        </article>`
        )
        .join("");

      grid.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
        btn.addEventListener("click", () => {
          addToCart(btn.dataset.addToCart);
          const original = btn.textContent;
          btn.textContent = "Hinzugefügt ✓";
          btn.classList.add("added");
          setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove("added");
          }, 1400);
        });
      });
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts(btn.dataset.filter);
      });
    });

    renderProducts("alle");
  }

  // Kontakt-/Anfrageformular
  const form = document.getElementById("inquiryForm");
  if (form) {
    const summaryField = document.getElementById("cartSummaryField");
    const summaryPreview = document.getElementById("cartSummaryPreview");
    if (typeof buildCartSummaryText === "function") {
      const summary = buildCartSummaryText();
      if (summaryField) summaryField.value = summary;
      if (summaryPreview) {
        summaryPreview.textContent = summary || "Keine Artikel im Warenkorb — du kannst auch ohne Auswahl eine allgemeine Anfrage senden.";
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const summary = summaryField ? summaryField.value : "";

      const subject = encodeURIComponent("Bestellanfrage über sergio-schmuck.de");
      const bodyLines = [
        `Name: ${name}`,
        `E-Mail: ${email}`,
        form.phone?.value ? `Telefon: ${form.phone.value.trim()}` : "",
        "",
        "Nachricht:",
        message,
      ];
      if (summary) {
        bodyLines.push("", "— Warenkorb —", summary);
      }
      const body = encodeURIComponent(bodyLines.filter(Boolean).join("\n"));

      window.location.href = `mailto:${SHOP_EMAIL}?subject=${subject}&body=${body}`;

      document.getElementById("formSuccess")?.classList.add("show");
      form.reset();
      if (typeof clearCart === "function") clearCart();
    });
  }
});
