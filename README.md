# WEBHEAD — Spider-Verse Developer Portfolio 🕷️

> Interactive Spider-Verse / Miles Morales-inspired developer workstation built with Next.js 16, React 19, TypeScript, and Supabase Realtime.

**Owner:** Hassan Ali Shah ([@Hassan-Ali-17](https://github.com/Hassan-Ali-17))  
**Deployment:** Vercel + Supabase  
**Live Demo:** [https://webhead-portfolio.vercel.app](https://webhead-portfolio.vercel.app)

---

## ⚡ Highlights & Key Features

- 🌆 **Spider-Verse Desktop OS**: Dark cyberpunk Brooklyn skyline, halftone comic textures, animated web accents, and glowing Spider Start menu.
- 💬 **Real-Time Public Chat**: Multi-visitor live chat powered by **Supabase Realtime** & PostgreSQL, with Spider-Verse avatar selection, active presence indicators, anti-spam, and moderation workflows.
- 🎵 **Spotify Music Room**: Official Spotify embed player featuring curated Spider-Verse soundtracks, Metro Boomin OST, and cyberpunk coding beats with a quick playlist switcher.
- 🌦️ **Weather Patrol**: Real-time atmospheric conditions powered by the Open-Meteo API, default Brooklyn patrol area, and on-demand browser geolocation.
- 📅 **Interactive Clock & Calendar**: System tray flyout with live digital clock, 12h/24h toggle, interactive month calendar, leap-year calculations, and today marker.
- ❤️ **Interactive Like Counter**: Animated floating web-burst heart counter with persistent cloud sync and local offline fallback.
- ⚙️ **Custom Desktop Settings**: Switch wallpapers (Brooklyn Night, Multiverse Portal, Carbon Grid), theme accents (Crimson Red, Electric Cyan, Neon Violet), and motion preferences with local persistence.
- 📂 **Portfolio Applications**: Dedicated windows for About Dossier, Projects Showcase, Resume Viewer & PDF download, Discord Comms, and Cyberpunk Terminal.
- 📱 **Responsive Mobile Launcher**: Seamless mobile-friendly experience replacing breakpoint blocks with responsive window sheets.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (Pages Router, Turbopack)
- **UI & Logic**: React 19, TypeScript 6
- **Animations & Windows**: [motion](https://motion.dev), `react-rnd`, `react-selecto`
- **Realtime & Backend**: Supabase Realtime, PostgreSQL, Row Level Security (RLS)
- **Styling**: Vanilla CSS & CSS Modules (Glassmorphism, Neon glow, Responsive grids)
- **External APIs**: Open-Meteo Weather API, Spotify Web Embeds, GitHub REST API

---

## 🚀 Getting Started

### Prerequisites

- Node.js `20.9+` or `24.x`
- `pnpm` or `npm`

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Hassan-Ali-17/WEBHEAD.git
cd WEBHEAD
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description | Required? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL (`https://xyz.supabase.co`) | Yes (for live chat) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Public Key | Yes (for live chat) |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | GA4 Measurement ID (optional) | No |
| `CLOUDINARY_API_KEY` | Cloudinary Storage Key (optional) | No |
| `SPOTIFY_CLIENT_ID` | Spotify App ID (optional) | No |

*Note: The application operates gracefully in offline/dev mode even without Supabase credentials.*

### 3. Setup Supabase Database & Realtime

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor** tab.
3. Paste and run the migration script located at [`supabase/schema.sql`](supabase/schema.sql).
4. Verify that the `messages` and `site_stats` tables have Row Level Security (RLS) enabled and Realtime replication active.

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to enter the Spider-Verse workstation.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Launch Next.js Turbopack dev server |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server |
| `npm run typecheck` | Execute TypeScript strict check (`tsc --noEmit`) |
| `npm run lint` | Run ESLint |

---

## 🛡️ Security & Privacy

- **Row Level Security (RLS)**: Enforced on all Supabase tables (`messages`, `site_stats`).
- **No Service Role Keys**: Client code only uses the public anonymous key.
- **XSS Prevention**: Strict HTML escaping on user-generated messages and chat avatars.
- **Privacy First**: Geolocation is only requested upon explicit user interaction in the Weather app.

---

## 📄 License & Credits

Base portfolio architecture adapted from [windows11-portfolio](https://github.com/KasperiP/windows11-portfolio) under MIT License.  
Redesigned with original Spider-Verse & Miles Morales-inspired aesthetic for **Hassan Ali Shah**.
