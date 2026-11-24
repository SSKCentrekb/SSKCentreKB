# SSK Centre website

Static site. Upload this whole `site` folder to Netlify (drag and drop the folder in Netlify → Deploys). No build step.

```
index.html        home page: SSKC profile, then the 3D tour and content
aktiviti.html     past activities with photo viewer
css/site.css      tokens, base styles, 3D tour, calendar
css/sections.css  content sections, chatbot
css/profil.css    profile and activities
css/components.css shared cards, services, Selangkah, club, booking form, footer
js/core.js        loaded first: settings and the BM/EN language engine
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
| Profile text (home page main screen) | `index.html` (the `#profil` block) for Malay, `js/profil.js` for both languages. Text comes from "Profil Syarikat SSK". |
| Past activities (`aktiviti.html` + the 3 latest on the home page) | `js/aktiviti-data.js`. Put photos in `assets/aktiviti/` (JPG, about 1200px wide), then add a block with `date`, `cat`, `title`, `desc` and the photo names. Newest first automatically. |
| Upcoming events | `js/content.js` → `EVENTS`. Add `{date:'2026-12-12', title:{ms:'…',en:'…'}, desc:{ms:'…',en:'…'}}`. Past events hide themselves. |
| Grants / courses / financing | `js/content.js` → `OPP` |
| FAQ | `js/content.js` → `FAQ` |
| WhatsApp number | `WA` in `js/core.js` (used by every script), plus the `wa.me/…` links in `index.html` and `aktiviti.html` |
| Selangkah ke Peluang (programmes open now) | `js/peluang.js` → `SELANGKAH`; videos and covers in `assets/selangkah/` |

## How the calendar decides a slot is taken
Slots: Pagi 8:30–12:30, Petang 13:30–17:00, Malam 18:00–23:00. A booking blocks every slot its start–end time overlaps. "Special" (outdoor + dewan) blocks the Dewan. Cancelled bookings are ignored. Bookings start from tomorrow because the admin confirms within 24 hours.

## Booking form (`#tempah`, `js/tempah.js`)
The website's booking form sends answers straight to the Google Form **"BORANG TEMPAHAN FASILITI"**.
The website stores nothing. Answers appear in Google Forms → Responses (and the linked sheet) like any normal submission.

- Choosing a date and slot in the calendar and pressing **Isi borang tempahan** fills in the facility, date, start/end time and length.
- **If you edit the Google Form**, update `js/tempah.js` at the same time, otherwise answers can be rejected without the visitor noticing:
  - new or renamed **options** (for example a new membership status): change the `O('EXACT TEXT', …)` lines. The first text must match the form exactly.
  - new **required question**: add a field with its `entry.…` id (open the form → ⋮ → *Get pre-filled link*, fill the question, copy the link and read the number after `entry.`).
  - new or moved **sections**: update `pageHistory()` (it lists the section numbers a visitor passes through).
- The form collects email (Settings → Responses → Collect email addresses), so the website asks for it too.
- After any change, make one test booking on the website and check it arrives, then delete the test response.
