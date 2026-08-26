/**
 * Anfrage-Warenkorb: rein clientseitig (localStorage), kein Zahlungsanbieter.
 * Der Kunde stellt eine unverbindliche Bestellanfrage zusammen, die per
 * Kontaktformular (siehe kontakt.html) an SERGIO gesendet wird.
 */
const CART_KEY = "sergio_cart_v1";
const SHOP_EMAIL = "info@sergio-schmuck.de"; // TODO: echte Adresse eintragen

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

function findProduct(id) {
  return (typeof PRODUCTS !== "undefined" ? PRODUCTS : []).find((p) => p.id === id);
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart(cart);
  openCart();
}

function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    saveCart(cart.filter((i) => i.id !== id));
  } else {
    saveCart(cart);
  }
}

function removeFromCart(id) {
  saveCart(getCart().filter((i) => i.id !== id));
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function cartTotal() {
  return getCart().reduce((sum, i) => {
    const p = findProduct(i.id);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
}

function renderCart() {
  const countEls = document.querySelectorAll("[data-cart-count]");
  countEls.forEach((el) => (el.textContent = cartCount()));

  const itemsEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!itemsEl) return;

  const cart = getCart();
  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Dein Warenkorb ist noch leer.<br>Stöbere im <a href="shop.html" style="text-decoration:underline;">Shop</a>.</p>';
  } else {
    itemsEl.innerHTML = cart
      .map((item) => {
        const p = findProduct(item.id);
        if (!p) return "";
        return `
        <div class="cart-item">
          <img src="${p.img}" alt="${p.name}">
          <div>
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-meta">${p.price} € · ${p.categoryLabel}</div>
            <div class="qty-control">
              <button type="button" onclick="updateQty('${p.id}', -1)" aria-label="Menge verringern">−</button>
              <span>${item.qty}</span>
              <button type="button" onclick="updateQty('${p.id}', 1)" aria-label="Menge erhöhen">+</button>
            </div>
          </div>
          <button type="button" class="cart-item-remove" onclick="removeFromCart('${p.id}')">Entfernen</button>
        </div>`;
      })
      .join("");
  }

  if (totalEl) totalEl.textContent = cartTotal().toFixed(2).replace(".", ",") + " €";

  const checkoutBtn = document.getElementById("cartCheckoutBtn");
  if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
}

function openCart() {
  document.getElementById("cartDrawer")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("open");
}
function closeCart() {
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.getElementById("cartOverlay")?.classList.remove("open");
}

/** Baut den Bestellanfrage-Text für das Kontaktformular / mailto-Fallback. */
function buildCartSummaryText() {
  const cart = getCart();
  if (cart.length === 0) return "";
  const lines = cart.map((item) => {
    const p = findProduct(item.id);
    if (!p) return "";
    return `• ${item.qty} × ${p.name} (${p.price} €) — ${p.categoryLabel}`;
  });
  lines.push("", `Voraussichtliche Summe: ${cartTotal().toFixed(2).replace(".", ",")} € (unverbindlich, zzgl. eventueller Anpassungen)`);
  return lines.join("\n");
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  document.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.addToCart);
      btn.classList.add("added");
      const original = btn.textContent;
      btn.textContent = "Hinzugefügt ✓";
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("added");
      }, 1400);
    });
  });

  document.getElementById("cartToggle")?.addEventListener("click", openCart);
  document.getElementById("cartClose")?.addEventListener("click", closeCart);
  document.getElementById("cartOverlay")?.addEventListener("click", closeCart);
});
