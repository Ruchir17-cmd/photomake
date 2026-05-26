# PhotoMake — Your Printing Partner, Online 🖨️

> A modern, production-ready website for PhotoMake print shop — Dadri's trusted local printing service.

![PhotoMake](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?logo=tailwindcss) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)

---

## 🌟 Features

- **Modern landing page** with hero, services, pricing, testimonials, and FAQ
- **Upload & Print page** with drag-and-drop file upload, print settings, order simulation
- **Services page** with detailed pricing table
- **Contact page** with form, info cards, and map placeholder
- **WhatsApp floating button** for instant customer support
- **Order ID generation** after submission
- **Mobile-first responsive design**
- **Glassmorphism UI** with smooth hover animations
- **Dark theme** with orange/rose gradient accents

---

## 📁 Folder Structure

```
photomake/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx        # Sticky nav with mobile hamburger
│   │   │   └── Footer.jsx        # Footer with links and contact
│   │   ├── home/
│   │   │   ├── HeroSection.jsx   # Hero with CTA buttons
│   │   │   ├── ServicesGrid.jsx  # 6-service card grid
│   │   │   ├── WhyUsSection.jsx  # 4-feature highlight section
│   │   │   ├── PricingSection.jsx# 3-plan pricing cards
│   │   │   ├── TestimonialsSection.jsx
│   │   │   └── FAQSection.jsx    # Accordion FAQ
│   │   ├── about/
│   │   │   └── AboutSection.jsx  # Story + map + hours
│   │   └── ui/
│   │       └── WhatsAppButton.jsx# Floating WhatsApp CTA
│   ├── pages/
│   │   ├── HomePage.jsx          # Assembles all home sections
│   │   ├── ServicesPage.jsx      # Detailed services + pricing table
│   │   ├── UploadPage.jsx        # File upload + print order form
│   │   └── ContactPage.jsx       # Contact form + map
│   ├── data/
│   │   └── index.js              # All static content & dummy data
│   ├── App.jsx                   # Root with client-side routing
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles + Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/photomake.git
cd photomake
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` — the site opens automatically.

### 3. Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## ☁️ Deploy to Vercel

### Option A: Vercel CLI (Fastest)

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option B: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Vercel auto-detects Vite — just click **Deploy**
5. Your site is live in ~60 seconds 🚀

> The `vercel.json` in the root handles SPA routing automatically.

---

## 🎨 Customization

### Change Business Details

Edit `src/data/index.js` to update:
- Service names, descriptions, and prices
- Testimonials
- FAQ answers
- WhatsApp number (search `wa.me/919876543210` and replace)

### Update Contact Info

Search for `Dadri` and `919876543210` across files and replace with your actual details.

### Colors

The site uses an orange/rose gradient theme. To change the primary accent:
- Replace `orange-400`, `orange-500`, `rose-500` in Tailwind classes
- Update the gradient in `Navbar.jsx` logo and CTA buttons

### Connect Google Maps

Replace the map placeholder in `AboutSection.jsx` and `ContactPage.jsx` with a real Google Maps iframe:

```jsx
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
  width="100%"
  height="320"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
/>
```

### Add Real Backend

The upload form currently simulates order submission. To connect a real backend:

1. Replace the `setTimeout` in `UploadPage.jsx` `handleSubmit` with a `fetch()` call
2. Send files via `FormData` to your API endpoint
3. Return a real order ID from the server

Example:
```js
const formData = new FormData();
files.forEach(f => formData.append("files", f));
formData.append("settings", JSON.stringify(form));

const res = await fetch("/api/orders", { method: "POST", body: formData });
const { orderId } = await res.json();
```

---

## 📱 WhatsApp Integration

Update the WhatsApp number across these files:
- `src/components/ui/WhatsAppButton.jsx`
- `src/components/home/HeroSection.jsx`
- `src/pages/ContactPage.jsx`
- `src/components/home/PricingSection.jsx`

Replace `919876543210` with your actual number (country code + number, no + or spaces).

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| TailwindCSS 3 | Utility-first styling |
| Lucide React | Icon library |
| Google Fonts (DM Sans + Syne) | Typography |

---

## 📄 License

MIT — Free to use and modify for your business.

---

*Built with ❤️ for PhotoMake — Dadri's favourite print shop.*
