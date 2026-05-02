# WORK NATTY Website

A modern, animated Next.js website built with TypeScript, Tailwind CSS, and Framer Motion.

## 🎨 Customizing to Match Your Figma Design

### Colors

Update the color variables in `app/globals.css`:

```css
:root {
  --primary: #6366f1;      /* Main brand color - Update this */
  --primary-dark: #4f46e5; /* Darker shade for hover states */
  --secondary: #8b5cf6;    /* Secondary accent color */
  --accent: #ec4899;       /* Call-to-action color */
  --foreground: #0f172a;   /* Text color */
  --muted: #64748b;        /* Muted text color */
  --light-bg: #f8fafc;     /* Light background */
}
```

### Fonts

The site currently uses **Geist Sans** and **Geist Mono**. To change fonts:

1. Open `app/layout.tsx`
2. Import your desired Google Font:
```typescript
import { YourFont } from "next/font/google";

const yourFont = YourFont({
  variable: "--font-your-font",
  subsets: ["latin"],
});
```

3. Update the className in the `<html>` tag
4. Update the CSS variable in `app/globals.css`

### Popular Font Options
- Inter
- Poppins
- Montserrat
- Roboto
- Open Sans
- Plus Jakarta Sans

## 🚀 Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
├── app/
│   ├── globals.css      # Global styles and color variables
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Main homepage
├── components/
│   ├── Navbar.tsx       # Animated navigation bar
│   ├── Hero.tsx         # Hero section with animations
│   ├── About.tsx        # About section
│   ├── Services.tsx     # Services grid
│   ├── Portfolio.tsx    # Portfolio showcase
│   ├── Contact.tsx      # Contact form
│   └── Footer.tsx       # Footer section
```

## ✨ Features

- 🎭 Smooth scroll animations using Framer Motion
- 📱 Fully responsive design
- 🎨 Easily customizable colors and fonts
- ⚡ Fast performance with Next.js 15
- 🎯 TypeScript for type safety
- 💅 Tailwind CSS for styling
- 🌙 Dark mode support (can be customized)

## 🎬 Animation Features

- Scroll-triggered animations
- Hover effects on cards and buttons
- Smooth page transitions
- Progress bar indicating scroll position
- Parallax-style effects

## 🛠 Customization Guide

### Update Content

1. **Hero Section** - Edit `components/Hero.tsx`
2. **Services** - Update the `services` array in `components/Services.tsx`
3. **Portfolio** - Modify the `projects` array in `components/Portfolio.tsx`
4. **Contact Info** - Update `components/Contact.tsx`

### Adjust Animations

All animation timings and effects can be customized in each component file. Look for `motion` components and their props:
- `initial`: Starting state
- `animate`: End state
- `transition`: Animation timing
- `whileHover`: Hover effects
- `whileTap`: Click effects

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎯 Color Extraction from Figma

To extract exact colors from your Figma design:

1. Select an element in Figma
2. Check the Fill color in the right panel
3. Copy the HEX code
4. Paste it into `app/globals.css` variables

## 📝 License

This project is open source and available under the MIT License.
