# SSK Centre website

Static site. Upload this whole `site` folder to Netlify (drag and drop the folder in Netlify → Deploys). No build step.

```
index.html        page structure
css/site.css      3D tour, calendar, base styles
css/sections.css  content sections, chatbot, footer
js/main.js        3D building, scroll tour (phone) / explorer (PC), availability calendar
js/content.js     rates, grant quiz, opportunities, membership, events, FAQ, contact, chatbot
assets/           logos
```

## Things the admin can change

| What | Where |
|---|---|
| Bookings shown in the calendar | Just fill **Log Booking** in "SSK CENTRE LAPORAN FASILITI" as usual. The website reads it through the tab **Web Kalendar** → file **SSK Web Kalendar (Awam - tarikh sahaja)**. Do not rename or delete either, and do not move the Log Booking columns (C date, H facility, J start, K end, AE status). |
| Rental rates | `js/content.js` → `RATES` (copied from the "Kadar & SOP" tab). Also update the hourly/daily figures in the Dewan and Bilik Mesyuarat panels in `index.html` and the chatbot `price` answer. |
| Membership fees | `js/content.js` → `TIERS` |
| Upcoming events | `js/content.js` → `EVENTS`. Add `{date:'2026-12-12', title:{ms:'…',en:'…'}, desc:{ms:'…',en:'…'}}`. Past events hide themselves. |
| Grants / courses / financing | `js/content.js` → `OPP` |
| FAQ | `js/content.js` → `FAQ` |
| WhatsApp number | `js/content.js` → `WA` and `js/main.js` → `WA` (calendar) |

## How the calendar decides a slot is taken
Slots: Pagi 8:30–12:30, Petang 13:30–17:00, Malam 18:00–23:00. A booking blocks every slot its start–end time overlaps. "Special" (outdoor + dewan) blocks the Dewan. Cancelled bookings are ignored. Bookings start from tomorrow because the admin confirms within 24 hours.
