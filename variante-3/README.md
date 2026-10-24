# MTB Tec – Website (One-Page)

Statische Website für einen Elektrotechnik-Meisterbetrieb in Deutschland.
Reines HTML, CSS und JavaScript – **kein Build, keine externen Abhängigkeiten** (keine Google Fonts,
keine CDNs, keine Tracker). Damit ist die Seite DSGVO-freundlich und lädt sehr schnell.

Geeignet für GitHub Pages, Netlify, Cloudflare Pages oder jeden klassischen Webspace.

---

## 1. Struktur

```
mtb-tec4/
├── index.html            # Startseite (One-Page: Hero, Leistungen, Vorteile, Ablauf,
│                         # Referenzen, Stimmen, FAQ, Kontakt)
├── impressum.html        # Impressum (§ 5 DDG) – Pflicht in Deutschland
├── datenschutz.html      # Datenschutzerklärung (DSGVO)
├── 404.html              # Fehlerseite (wird von GitHub Pages automatisch genutzt)
├── robots.txt            # Suchmaschinen
├── sitemap.xml           # Sitemap (Domain anpassen!)
├── .nojekyll             # verhindert Jekyll-Verarbeitung auf GitHub Pages
└── assets/
    ├── css/styles.css    # komplettes Design, Design-Tokens in :root
    ├── js/main.js        # Menü, Scroll-Effekte, Formularprüfung
    └── img/favicon.svg   # Favicon (Blitz auf Dunkelblau)
```

---

## 2. Lokal ansehen

Im Projektordner:

```bash
cd ~/mtb-tec4
python3 -m http.server 8080
```

Dann <http://localhost:8080> öffnen. (Doppelklick auf `index.html` funktioniert auch, aber
lokaler Server ist realistischer.)

---

## 3. Auf GitHub Pages veröffentlichen

### Variante A – Repository `mtb-tec4` (URL: `usuario.github.io/mtb-tec4/`)

```bash
cd ~/mtb-tec4
git init -b main
git add .
git commit -m "Website MTB Tec"
git remote add origin https://github.com/DEIN-USER/mtb-tec4.git
git push -u origin main
```

Dann im Repository: **Settings → Pages → Source: Deploy from a branch → Branch: `main`, Ordner: `/ (root)` → Save**.

Nach 1–2 Minuten ist die Seite unter `https://DEIN-USER.github.io/mtb-tec4/` erreichbar.
Alle Links im Projekt sind **relativ**, deshalb funktioniert auch dieser Unterordner ohne Änderungen.

### Variante B – Repository `DEIN-USER.github.io` (URL direkt `https://DEIN-USER.github.io/`)

Gleiche Schritte, Repository-Name muss exakt `DEIN-USER.github.io` heißen.

### Eigene Domain (optional)

1. Datei `CNAME` im Projektordner anlegen mit einer Zeile: `www.mtb-tec.de`
2. Beim Domain-Anbieter DNS setzen:
   - `A`-Records für die Hauptdomain (`@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` für `www` → `DEIN-USER.github.io`
3. In GitHub: **Settings → Pages → Custom domain** eintragen, danach **Enforce HTTPS** aktivieren.

---

## 4. Platzhalter ersetzen (wichtig!)

Die Seite enthält bewusst Beispieltexte. Vor dem Livegang alles ersetzen:

| Platzhalter | Vorkommen |
|---|---|
| `Max Mustermann` | index (Impressum-Link), impressum.html |
| `Musterstraße 12` / `12345 Musterstadt` | index, impressum, datenschutz, JSON-LD |
| `+49 123 456789` / `tel:+49123456789` | index (mehrfach), impressum, datenschutz |
| `info@mtb-tec.de` | index, impressum, datenschutz, Formular-Fallback |
| `DE123456789` (USt-IdNr.) | impressum.html |
| `Handwerkskammer Musterstadt` | impressum.html |
| `https://ihre-domain.de/` | index (`canonical`, `og:url`), sitemap.xml, robots.txt |
| `IHRE_FORM_ID` | index.html (Formular-Action) |
| Öffnungszeiten, Zahlen (15+ Jahre, 850+, 4,9/5) | index.html |
| Referenzen & Kundenstimmen | index.html |

Schnell ersetzen (Beispiel, vorher Backup/Commit anlegen):

```bash
grep -rl "Musterstadt" . | xargs sed -i 's/Musterstadt/Echte Stadt/g'
grep -rl "+49 123 456789" . | xargs sed -i 's/+49 123 456789/+49 170 1234567/g'
grep -rl "tel:+49123456789" . | xargs sed -i 's/tel:+49123456789/tel:+491701234567/g'
```

Danach mit `grep -rn "Muster\|IHRE_FORM_ID\|ihre-domain" .` prüfen, ob noch etwas übrig ist.

---

## 5. Kontaktformular aktivieren

GitHub Pages kann keine Formulare verarbeiten. Die Seite ist für **Formspree** vorbereitet:

1. Kostenloses Konto auf <https://formspree.io> anlegen und ein Formular erstellen.
2. In `index.html` die Action ersetzen:
   ```html
   <form class="form" id="contact-form" action="https://formspree.io/f/DEINE_ID" method="POST">
   ```
3. Solange `IHRE_FORM_ID` stehen bleibt, zeigt das Formular einen freundlichen Hinweis mit
   E-Mail und Telefonnummer an – es geht also nichts verloren.
4. Datenschutzerklärung, Abschnitt 4, um den Anbieter ergänzen (Name, Anschrift, Übermittlungsgrundlage).

Alternativen: Netlify Forms, Web3Forms, eigener PHP-Endpunkt.

---

## 6. Anpassen

- **Farben / Abstände:** `assets/css/styles.css`, Block `:root` (Dunkelblau `--ink`, Gelb `--accent`).
- **Texte:** direkt in `index.html`, Abschnitte sind kommentiert (`<!-- Leistungen -->` usw.).
- **Bilder:** Aktuell gibt es keine Fotos – die Referenzkarten nutzen Farbverläufe + Icons, damit
  die Seite ohne Lizenzbilder professionell aussieht. Eigene Fotos können z. B. so eingebaut werden:
  ```html
  <div class="ref-thumb">
    <img src="assets/img/projekt-1.jpg" alt="Neue Unterverteilung nach der Sanierung" loading="lazy">
  </div>
  ```
  Dazu in `styles.css` ergänzen: `.ref-thumb img { width:100%; height:100%; object-fit:cover; }`
  und `.ref-thumb::after { display:none; }`.
- **Impressum/Datenschutz:** Mustertexte – bitte rechtlich prüfen lassen (Pflicht in Deutschland).

---

## 7. Technische Hinweise

- **Barrierefreiheit:** Skip-Link, sichtbare Fokus-Stile, `aria`-Attribute am Menü, nativer
  FAQ-Akkordeon (`<details>`), `prefers-reduced-motion` wird respektiert.
- **SEO:** Meta-Description, Open Graph, JSON-LD (`Electrician`), semantische Struktur,
  `sitemap.xml` + `robots.txt`.
- **Performance:** keine externen Requests, keine Bilder, SVG-Icons als Sprite → sehr kleiner
  Payload, gute Core-Web-Vitals-Werte.
- **DSGVO:** Systemschriften statt Google Fonts, kein Tracking, kein Cookie-Banner nötig.

---

## 8. Deployment-Checkliste

- [ ] Alle Platzhalter ersetzt (`grep -rn "Muster\|IHRE_FORM_ID\|ihre-domain" .`)
- [ ] Echte Telefonnummer in allen `tel:`-Links
- [ ] Impressum vollständig und geprüft
- [ ] Datenschutz an tatsächliches Hosting/Formular angepasst
- [ ] Domain in `sitemap.xml`, `robots.txt`, `canonical` und `og:url` eingetragen
- [ ] Formular getestet (Testmail kommt an)
- [ ] Auf Handy getestet (Menü und feste Kontaktleiste unten)
- [ ] GitHub Pages aktiviert und HTTPS erzwungen
