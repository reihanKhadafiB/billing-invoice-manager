# Billing & Invoice Manager

Aplikasi web untuk mengelola invoice pelanggan layanan cloud, melihat ringkasan usage, dan mengekspor laporan.

---

## Tech Stack

| Kategori | Library | Versi |
|---|---|---|
| Framework | React + Vite | React 19, Vite 8 |
| Language | TypeScript | ~5.9.3 |
| Data Fetching & Caching | TanStack Query | v5 |
| Routing | React Router DOM | v7 |
| State Management | Zustand | v5 |
| Form & Validasi | React Hook Form + Zod | RHF v7, Zod v4 |
| Form Resolver | @hookform/resolvers | v5 |
| Styling | Tailwind CSS | v3 |
| Chart | Recharts | v3 |
| Table | TanStack Table | v8 |
| Toast Notification | Sonner | v2 |
| Mock API | Async function (in-memory + localStorage) | — |

---

## Cara Run Project

### Prerequisites

- Node.js >= 18
- npm >= 9

### Instalasi dari Awal

```bash
# 1. Buat project baru
npm create vite@latest billing-invoice-manager
# Pilih: React → TypeScript

cd billing-invoice-manager

# 2. Install semua dependencies
npm install \
  @tanstack/react-query \
  @tanstack/react-query-devtools \
  react-router-dom \
  zustand \
  react-hook-form \
  zod \
  @hookform/resolvers \
  recharts \
  @tanstack/react-table \
  msw \
  react-is \
  sonner

# saya gunain nya v3 karena v4 itu masih suka ga support sama versi react terbaru, belum lagi sama dependencies dependencies yang di gunakan, dan sebaliknya.
# 3. Install Tailwind CSS v3
npm install -D tailwindcss@^3.4.19 postcss autoprefixer

# 4. Init Tailwind config
npx tailwindcss init -p

# 5. Install dev tools
npm install -D eslint prettier
```

### Kalo Clone Repository Seperti Ini

```bash
# Clone repository
git clone <repository-url>
cd billing-invoice-manager

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build Production

```bash
npm run build
npm run preview
```

---

## Konfigurasi Tailwind

Setelah `npx tailwindcss init -p`, pastikan `tailwind.config.js` berisi:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}
```

Dan `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Struktur Folder

```
src/
├── app/
│   ├── providers/
│   │   └── query-provider.tsx       # QueryClient + QueryClientProvider + DevTools
│   └── router/
│       └── router.tsx               # Route definitions (nested routes)
├── features/
│   ├── customers/
│   │   ├── api/
│   │   │   └── getCustomerById.ts
│   │   ├── hooks/
│   │   │   └── useCustomerProfile.ts
│   │   ├── pages/
│   │   │   └── customer-profile-page.tsx
│   │   └── types/
│   │       └── customer.ts
│   ├── dashboard/
│   │   ├── api/
│   │   │   └── getDashboardSummary.ts
│   │   ├── components/
│   │   │   ├── dashboard-skeleton.tsx
│   │   │   ├── invoice-status-chart.tsx
│   │   │   ├── latest-invoices-table.tsx
│   │   │   └── summary-card.tsx
│   │   ├── hooks/
│   │   │   └── useDashboardSummary.ts
│   │   ├── pages/
│   │   │   └── dashboard-page.tsx
│   │   └── types/
│   │       └── dashboard-summary.ts
│   └── invoices/
│       ├── api/
│       │   ├── createInvoice.ts
│       │   ├── getInvoiceById.ts
│       │   ├── getInvoices.ts
│       │   ├── getInvoicesByCustomer.ts
│       │   └── updateInvoiceStatus.ts
│       ├── components/
│       │   ├── invoice-filter.tsx
│       │   ├── invoice-pagination.tsx
│       │   ├── invoice-search.tsx
│       │   └── invoice-table.tsx
│       ├── hooks/
│       │   ├── useCreateInvoice.ts
│       │   ├── useInvoiceDetail.ts
│       │   └── useInvoices.ts
│       ├── pages/
│       │   ├── invoice-create-page.tsx
│       │   ├── invoice-detail-page.tsx
│       │   └── invoice-list-page.tsx
│       └── types/
│           ├── invoice-form.ts
│           ├── invoice-query.ts
│           └── invoice.ts
├── hooks/
│   └── useDebounce.ts
├── mocks/
│   └── data/
│       ├── customers.ts             # 7 mock customers
│       └── invoices.ts              # 20 mock invoices + localStorage persistence
├── shared/
│   ├── components/
│   │   ├── app-layout.tsx           # Layout wrapper: Sidebar + Header + Toaster
│   │   ├── sidebar.tsx              # Navigasi + collapse/expand
│   │   └── theme-toggle.tsx         # Dark/light toggle
│   └── utils/
│       └── format-currency.ts       # formatRupiah (Intl.NumberFormat)
├── store/
│   └── ui-store.ts                  # Zustand: theme + sidebar state
├── App.tsx                          # Theme effect + RouterProvider
└── main.tsx                         # Entry point
```

---

## Arsitektur Data Flow

```
Component (UI)
      ↓
Hooks (useQuery / useMutation)
      ↓
API layer (async functions)
      ↓
Mock data (in-memory array + localStorage)
```

**Server state** (invoice, customer, dashboard) → dikelola TanStack Query
**UI state** (theme, sidebar) → dikelola Zustand

## Alasan Pemilihan Tech Stack

**React + Vite** dipilih karena setup yang cepat, HMR yang responsif, dan ekosistem yang mature untuk project TypeScript skala menengah.

**TanStack Query** dipilih sebagai data fetching layer karena kemampuan caching, background refetch, dan mutation handling yang solid — jauh lebih terstruktur dibanding `useEffect` + `useState` manual untuk server state.

**Zustand** dipilih untuk client state karena API-nya minimal tanpa boilerplate, dengan dukungan `persist` middleware untuk localStorage yang mudah dikonfigurasi.

**React Hook Form + Zod** dipilih untuk form handling karena minimnya re-render dibanding controlled form biasa, ditambah type-safe validation via schema yang terintegrasi langsung dengan TypeScript.

**React Router DOM v7** dipilih karena dukungan nested routes yang memudahkan implementasi layout wrapper (`AppLayout`), serta URL-based state untuk filter dan pagination tanpa perlu state management tambahan.

**Tailwind CSS v3** dipilih karena utility-first approach yang cocok untuk development cepat, dengan dukungan `darkMode: "class"` yang terintegrasi dengan Zustand theme store.

**Sonner** dipilih untuk toast notification karena API-nya minimal, support dark mode otomatis, dan terintegrasi baik dengan React 19.

## Bagian Paling Challenging

yang paling challenging menurut saya itu di sini

-> Pagination minimal 10 item per halaman. Gunakan keepPreviousData (atau
placeholderData) agar tidak blank saat berpindah halaman.

saat saya next pagination, saat di klik next malah cuma glitch pindah ke pagination 2, terus balik lagi ke pagination 1, url nya pun sama, kaya glitch doang sebentar, lumayan susah, tapi gatau kenapa kalo ngoding itu seru, apalagi belajar hal baru.

## Demo

https://reihankhadafi-billing-invoice-manager.netlify.app/
