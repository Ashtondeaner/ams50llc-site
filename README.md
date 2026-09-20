# Arnold Management Services, LLC — AMS50LLC.com

Vacation rental website for four properties managed by Arnold Management Services, LLC.

| Property | Location | Rate |
|----------|----------|------|
| I102 Naples Bay Resort | Naples, FL | $375/night + Resort fees |
| 107 Tahiti Street | Naples, FL | $275/night + fees |
| 119 Tahiti Street | Naples, FL | $475/night + fees |
| 2001 Bahama Beach Club | Treasure Cay, Abaco | $675/night + fees |

## Partners / contact

- **Andrea Arnold Jeppesen** — Partner / Host
- **Tam Arnold Wright** — Partner / Host
- **D. Ashton Arnold** — Chairman / Partner

- Email: **AALLC@ArnoldCompanies.Net**
- Phone: **(239) 643-6333**
- HQ: **1100 Commercial Blvd., Suite 118, Naples, FL 34104**
- Domain: **AMS50LLC.com**

## Stack

React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + React Router 7 + Zustand

## Run locally

```bash
npm install
npm run dev
```

Dev server: `http://localhost:8080`

```bash
npm run build
npm run preview
```

## Photos

Listing photos live in `public/images/`:

- `i102-naples-bay/` (12)
- `107-tahiti/` (23)
- `119-tahiti/` (8)
- `2001-bahama/` (12)

If those folders are empty after clone, copy the restored image set into the matching folders.

## Deploy

Import this repo in Cloudflare Pages or Vercel (framework: Vite), then point AMS50LLC.com DNS at the host.
