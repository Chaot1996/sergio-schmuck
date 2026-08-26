# SERGIO Schmuck — Website-Grundlage

Statische Website (HTML/CSS/Vanilla-JS, kein Build-Tool nötig) für die Goldschmiede **SERGIO** (Sergio Ebeling, Bad Wildbad) inkl. Online-Shop mit Anfrage-Warenkorb.

## Struktur

- `index.html` — Startseite (Hero, Über SERGIO, Leistungen, Permanent Schmuck, Galerie)
- `shop.html` — Produktkatalog mit Filter und Warenkorb
- `kontakt.html` — Kontakt- und Anfrageformular
- `impressum.html`, `datenschutz.html` — rechtliche Grundgerüste (⚠️ vor Livegang prüfen lassen)
- `css/style.css` — gesamtes Styling
- `js/products.js` — Produktdaten (Platzhalterpreise, siehe Kommentar im Code)
- `js/cart.js` — Warenkorb-Logik (LocalStorage, kein Zahlungsanbieter)
- `js/main.js` — Navigation, Produktfilter, Formular-Handling
- `assets/img/` — ausgewählte Produkt-/Werkstattfotos für die Website
- `Screenshot *.png`, `logo.jpg` — Rohmaterial aus Instagram/Logo (Quelle für `assets/img`)

## Shop-Prinzip

Bewusst **kein** Zahlungsanbieter integriert: Kund:innen stellen im Shop eine unverbindliche **Anfrage** zusammen (passend zu handgefertigten Einzelstücken), die über das Kontaktformular per `mailto:` an SERGIO gesendet wird. Für einen späteren "echten" Checkout kann z. B. Stripe Checkout ergänzt werden.

## Lokal ansehen

Kein Build nötig — reines HTML/CSS/JS. Wie bei den anderen Projekten per npm auf Port 3000:

```bash
npm install
npm run dev
```

und `http://localhost:3000` öffnen (Ctrl+C zum Beenden).

## Offene Punkte vor Veröffentlichung

- [ ] Echte E-Mail-Adresse in `kontakt.html`, `impressum.html`, `datenschutz.html`, `js/cart.js` (`SHOP_EMAIL`) eintragen
- [ ] Telefonnummer prüfen (aus Instagram-Material übernommen: 0172 18 47 54 4)
- [ ] Umsatzsteuer-ID im Impressum ergänzen
- [ ] Preise in `js/products.js` durch echte Preise ersetzen
- [ ] Produktfotos ggf. durch einheitliche Studiofotos ersetzen
- [ ] Impressum/Datenschutz rechtlich prüfen lassen
- [ ] Hosting einrichten (z. B. GitHub Pages, Netlify) und Formular ggf. an echten Formular-Backend-Dienst anbinden
