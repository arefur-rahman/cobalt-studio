<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/cobalt-studio-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="public/cobalt-studio-light.png">
    <img alt="Cobalt Studio Logo" src="public/cobalt-studio-dark.png" width="260">
  </picture>

  <h1>Cobalt Studio</h1>

  <p><b>Modern Web Development Learning Platform & Developer Utility Suite</b></p>

  <p>
    <a href="https://cobalt-studio-xi.vercel.app/"><img src="https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License"></a>
  </p>

  <p>
    🌐 <b>Live Demo:</b> <a href="https://cobalt-studio-xi.vercel.app/">https://cobalt-studio-xi.vercel.app/</a>
  </p>
</div>

<br />

> **Cobalt Studio** is a modern full-stack learning platform and developer suite empowering engineers with hands-on MERN stack mentorship, real-world project experience, and essential client-side productivity tools.

---

## ✨ Features

### 🌐 Internationalization (i18n)
- Full bilingual support for **Bengali (bn)** and **English (en)** using `next-intl`.
- Seamless locale switching across all routes and interactive components.

### 📚 Course Platform & Landing Page
- **MERN Stack Industry Master**: Interactive curriculum breakdown across 10 modules and 60+ live classes.
- **Dynamic Pricing & Offers**: Limited-time promotional offers with localized price and percentage formatting.
- **Bonus & Value Breakdown**: Clear value proposition, mentor showcase, and student benefits.
- **Localized FAQ System**: Accordion-based FAQ component with translations for both languages.

### 🛠️ Developer Utility Suite
Cobalt Studio provides a suite of free, client-side developer utility tools:
- **ENV Example Generator**: Automatically converts `.env` files into clean `.env.example` templates by stripping sensitive values.
- **JSON to TypeScript Converter**: Transforms raw JSON objects into type-safe TypeScript interface definitions.
- **JWT Decoder**: Decodes JSON Web Tokens (Header & Payload) safely on the client side.
- **MongoDB ObjectId Decoder**: Extracts creation timestamps and machine identifiers from MongoDB ObjectIDs.
- **Regex Tester**: Interactive real-time regex pattern validator and string tester.
- **Code & Number Snippets**: Helpful code utilities and Bengali/English number format converters.

### 📰 Curated Resources & Student Showcase
- **Resource Vault**: Filterable articles and technical cheat sheets for scalable system architecture, database design, and modern web tech.
- **Student Feedbacks & Showcase**: Student project showcases and testimonials.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library & React** | [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/) |
| **Animations** | [Motion (Framer Motion)](https://motion.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/), [Tabler Icons](https://tabler.io/icons) |
| **Internationalization** | [next-intl](https://next-intl-docs.vercel.app/) |
| **Database & ORM** | [Prisma ORM](https://www.prisma.io/) |
| **Authentication & Backend** | [Firebase SDK](https://firebase.google.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```text
cobalt-studio/
├── app/
│   └── [locale]/                 # Locale-scoped App Router routes
│       ├── courses/              # Course landing pages & batch info
│       ├── tools/                # Developer tools suite
│       ├── resources/            # Articles & resource vault
│       ├── feedbacks/            # Reviews & student showcase
│       ├── signin/ & signup/     # Authentication pages
│       └── dashboard/            # Student learning dashboard
├── components/
│   ├── global/                   # Reusable global layout & header components
│   └── ui/                       # Shadcn UI primitive components
├── messages/                     # Translation dictionaries
│   ├── en.json                   # English translations
│   └── bn.json                   # Bengali translations
├── lib/                          # Helper utilities, formatters & constants
├── prisma/                       # Database schemas and migrations
└── public/                       # Static media and assets
```

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.x` or higher
- **pnpm**: `v8.x` or higher (recommended package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arefur-rahman/cobalt-studio.git && cd cobalt-studio
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="your-database-connection-string"
   NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-firebase-auth-domain"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-firebase-project-id"
   ```

4. **Generate Prisma Client:**
   ```bash
   pnpm prisma generate
   ```

5. **Run the development server:**
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 📜 Available Scripts

- `pnpm dev`: Starts the Next.js development server with Turbopack.
- `pnpm build`: Generates Prisma client and builds the application for production.
- `pnpm start`: Runs the built production server.
- `pnpm lint`: Runs ESLint check across the codebase.
- `pnpm db:push`: Generates Prisma client and pushes schema changes to database.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
