# PadelFit — Ochtendprogramma

Persoonlijke kracht + conditie app als PWA. Werkt offline, installeerbaar op het iPhone-beginscherm, geen backend nodig — alle data staat lokaal op de telefoon (localStorage).

## Bestanden

| Bestand | Functie |
|---|---|
| `index.html` | De volledige app (HTML + CSS + JS in één bestand) |
| `manifest.json` | PWA-manifest: naam, icoon, kleuren, standalone-weergave |
| `sw.js` | Service worker: cachet de app voor offline gebruik |
| `icon-*.png`, `favicon-32.png` | App-iconen (180 voor iOS, 192/512 voor Android/manifest) — in de hoofdmap |
| `.nojekyll` | Zorgt dat GitHub Pages alle bestanden ongewijzigd serveert |

## Online zetten via GitHub Pages (eenmalig, ~10 min)

1. **Maak een GitHub-account** op [github.com](https://github.com) als je er nog geen hebt.
2. **Nieuwe repository**: klik rechtsboven op **+ → New repository**.
   - Naam: `padelfit` (of iets anders — dit wordt deel van je URL)
   - Zet op **Public** (verplicht voor gratis Pages)
   - Klik **Create repository**
3. **Bestanden uploaden**: klik op **uploading an existing file** (of **Add file → Upload files**).
   - Sleep **alle bestanden** erin (alles staat in één map, geen submappen).
   - Klik onderaan op **Commit changes**.
4. **Pages inschakelen**: ga naar **Settings → Pages** (linkermenu).
   - Bij *Source* kies **Deploy from a branch**
   - Branch: **main**, map: **/ (root)** → **Save**
5. Wacht 1-2 minuten. Bovenaan de Pages-pagina verschijnt je URL:
   `https://labribv.github.io/Fitness-app/`

## Op je iPhone zetten

1. Open de URL in **Safari** (niet Chrome — alleen Safari kan PWA's installeren op iOS).
2. Tik op het **Deel-icoon** (vierkant met pijl omhoog).
3. Kies **Zet op beginscherm** → **Voeg toe**.
4. Open de app vanaf het beginscherm. Hij draait nu fullscreen, zonder Safari-balken, en werkt ook zonder internet.
5. Tik eenmalig op **🔔 Test geluid** bovenaan zodat iOS audio vrijgeeft. Zet de stille modus (schuifje aan de zijkant) uit tijdens het trainen.

## Nieuwe versie uitrollen

1. Open `sw.js` en verhoog `CACHE_VERSION` (bv. `padelfit-v1` → `padelfit-v2`). Zonder dit blijft de iPhone de oude versie tonen.
2. Upload de gewijzigde bestanden opnieuw naar GitHub (Add file → Upload files, zelfde namen overschrijven).
3. Open de app op je iPhone — na een paar seconden verschijnt onderaan **"Nieuwe versie beschikbaar → Vernieuwen"**.

## Data en backups

- Alle data staat in de browser-opslag van je iPhone. Wis je de Safari-websitegegevens, dan is de log weg.
- Maak daarom regelmatig een backup: **Trainingslog → ⬇️ Backup (JSON)**. Het bestand belandt in je Bestanden-app; zet het in iCloud.
- Terugzetten: **Trainingslog → ⬆️ Herstel** en kies het JSON-bestand.
- **📄 CSV** exporteert alle gelogde sets (datum, oefening, gewicht, reps, geschatte 1RM) — handig voor Excel.

## Features

- Push/pull/legs-split over 7 dagen met 3 varianten per oefening
- Focus-mode per oefening, rust-overlay met countdown, spraak-aankondiging en continu alarm
- Gewicht × reps per set loggen, met geschatte 1RM (Epley) en progressie-grafieken per lift
- Auto-progressie: na elke oefening "te makkelijk / goed / moeilijk" → gewicht past zich aan
- Plate calculator: toont welke schijven per kant op de bar moeten (instelbaar via **⚖️ Schijven**)
- Deload-week: elke 4e week automatisch 60% van het gewicht; handmatig te wisselen via de weekbalk
- Export/import van de volledige state, CSV-export van alle sets
