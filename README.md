<div align="center">

```
██╗    ██╗███████╗██████╗ ██╗  ██╗███████╗ █████╗ ██████╗ 
██║    ██║██╔════╝██╔══██╗██║  ██║██╔════╝██╔══██╗██╔══██╗
██║ █╗ ██║█████╗  ██████╔╝███████║█████╗  ███████║██║  ██║
██║███╗██║██╔══╝  ██╔══██╗██╔══██║██╔══╝  ██╔══██║██║  ██║
╚███╔███╔╝███████╗██████╔╝██║  ██║███████╗██║  ██║██████╔╝
 ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ 
```

# 🕷️ SPIDER-VERSE DEVELOPER PORTFOLIO 🕷️

**An interactive Spider-Verse / Miles Morales-inspired developer workstation**
**built with Next.js 16, React 19, TypeScript, and Supabase Realtime.**

<br />

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Realtime-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<br />

### [🌐 Live Demo](https://webhead-teal.vercel.app) &nbsp;•&nbsp; [💻 Source Code](https://github.com/Hassan-Ali-17/WEBHEAD) &nbsp;•&nbsp; [👤 Author](https://github.com/Hassan-Ali-17)

<br />

**Owner:** Hassan Ali Shah ([@Hassan-Ali-17](https://github.com/Hassan-Ali-17))
**Deployment:** Vercel + Supabase

</div>

---

## 📑 Table of Contents

- [Highlights & Key Features](#-highlights--key-features)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Security & Privacy](#️-security--privacy)
- [License & Credits](#-license--credits)

---

## ⚡ Highlights & Key Features

| Feature | Description |
|---|---|
| 🌆 **Spider-Verse Desktop OS** | Dark cyberpunk Brooklyn skyline, halftone comic textures, animated web accents, and a glowing Spider Start menu. |
| 💬 **Real-Time Public Chat** | Multi-visitor live chat powered by **Supabase Realtime** and PostgreSQL, with Spider-Verse avatar selection, active presence indicators, anti-spam, and moderation workflows. |
| 🎵 **Spotify Music Room** | Official Spotify embed player with curated Spider-Verse soundtracks, Metro Boomin OST, and cyberpunk coding beats, plus a quick playlist switcher. |
| 🌦️ **Weather Patrol** | Real-time conditions via the Open-Meteo API, a default Brooklyn patrol area, and on-demand browser geolocation. |
| 📅 **Clock & Calendar** | System tray flyout with a live digital clock, 12h/24h toggle, interactive month calendar, leap-year calculations, and a today marker. |
| ❤️ **Interactive Like Counter** | Animated floating web-burst heart counter with persistent cloud sync and a local offline fallback. |
| ⚙️ **Desktop Settings** | Switch wallpapers (Brooklyn Night, Multiverse Portal, Carbon Grid), theme accents (Crimson Red, Electric Cyan, Neon Violet), and motion preferences, all persisted locally. |
| 📂 **Portfolio Apps** | Dedicated windows for About Dossier, Projects Showcase, Resume Viewer & PDF download, Discord Comms, File Explorer, and a Cyberpunk Terminal. |
| 📱 **Responsive Mobile Launcher** | A mobile-friendly experience that replaces breakpoint blocks with responsive window sheets. |

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16 (Pages Router, Turbopack) |
| **UI & Logic** | React 19, TypeScript 6 |
| **Animations & Windows** | [motion](https://motion.dev), `react-rnd`, `react-selecto` |
| **Realtime & Backend** | Supabase Realtime, PostgreSQL, Row Level Security (RLS) |
| **Styling** | Vanilla CSS & CSS Modules (glassmorphism, neon glow, responsive grids) |
| **External APIs** | Open-Meteo Weather API, Spotify Web Embeds, GitHub REST API |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `20.9+` or `24.x`
- `npm` or `pnpm`

### 1. Clone & Install

```bash
git clone https://github.com/Hassan-Ali-17/WEBHEAD.git
cd WEBHEAD
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

| Variable | Description | Required? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (`https://xyz.supabase.co`) | Yes (live chat) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key | Yes (live chat) |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | GA4 Measurement ID | No |
| `CLOUDINARY_API_KEY` | Cloudinary storage key | No |
| `SPOTIFY_CLIENT_ID` | Spotify app ID | No |

> **Note:** The app runs gracefully in offline/dev mode even without Supabase credentials.

### 3. Set Up Supabase Database & Realtime

1. Open your [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to the **SQL Editor** tab.
3. Paste and run the migration script at [`supabase/schema.sql`](supabase/schema.sql).
4. Verify that the `messages` and `site_stats` tables have **RLS enabled** and **Realtime replication active**.

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to enter the Spider-Verse workstation.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Launch the Next.js Turbopack dev server |
| `npm run build` | Build the optimized production bundle |
| `npm run start` | Start the production server |
| `npm run typecheck` | Run the TypeScript strict check (`tsc --noEmit`) |
| `npm run lint` | Run ESLint |

---

## 🛡️ Security & Privacy

- **Row Level Security (RLS):** Enforced on all Supabase tables (`messages`, `site_stats`).
- **No Service Role Keys:** Client code only uses the public anonymous key.
- **XSS Prevention:** Strict HTML escaping on user-generated messages and chat avatars.
- **Privacy First:** Geolocation is requested only on explicit user interaction in the Weather app.

---

## 📄 License & Credits

Redesigned with an original Spider-Verse & Miles Morales-inspired aesthetic for **Hassan Ali Shah**.

<sub>This is a fan-inspired, non-commercial portfolio project. Spider-Man, Miles Morales, and related names are trademarks of their respective owners (Marvel / Sony) and are not affiliated with or endorsed by this project.</sub>

<div align="center">

<br />

**🕷️ With great power comes great `git push`. 🕷️**

</div>
