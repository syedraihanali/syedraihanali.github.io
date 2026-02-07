import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

// Viewport configuration
export const viewport: Viewport = {
  themeColor: "#3b82f6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tahirtaim.dev"),
  title: {
    default: "Syed Raihan Ali - Flutter Developer | Mobile & Web Expert",
    template: "%s | Syed Raihan Ali",
  },
  description:
    "Syed Raihan Ali (Tahir Taim) is a passionate Flutter Developer & Full-Stack Developer from Bangladesh. Specializing in mobile apps, TypeScript, React.js, Next.js, and clean architecture.",
  keywords: [
    "Flutter Developer",
    "Syed Raihan Ali",
    "Tahir Taim",
    "Raihan",
    "Tahir",
    "Mobile App Developer",
    "Full Stack Developer",
    "TypeScript",
    "React.js",
    "Next.js",
    "Dart",
    "Flutter Apps",
    "Web Development",
    "Portfolio",
    "Bangladesh",
    "Clean Architecture",
    "RxDart",
    "GetIt",
  ],
  authors: [
    { name: "Syed Raihan Ali", url: "https://tahirtaim.dev" },
    { name: "Tahir Taim", url: "https://tahirtaim.dev" },
  ],
  creator: "Syed Raihan Ali",
  publisher: "Syed Raihan Ali",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tahirtaim.dev",
    siteName: "Syed Raihan Ali Portfolio",
    title: "Syed Raihan Ali - Flutter Developer & Full-Stack Expert",
    description:
      "Passionate Flutter Developer & Full-Stack Developer from Bangladesh. Building beautiful mobile apps and modern web applications with clean architecture.",
    images: [
      {
        url: "https://tahirtaim.dev/profile.jpg",
        width: 400,
        height: 400,
        alt: "Syed Raihan Ali - Flutter Developer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Raihan Ali - Flutter Developer",
    description:
      "Passionate Flutter Developer & Full-Stack Developer from Bangladesh",
    images: ["https://tahirtaim.dev/profile.jpg"],
    creator: "@syedraihanali",
  },
  alternates: {
    canonical: "https://tahirtaim.dev",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>",
    apple: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>",
  },
  manifest: "/manifest.json",
  category: "technology",
  classification: "Portfolio",
  other: {
    "geo.region": "BD",
    "geo.placename": "Bangladesh",
    "revisit-after": "7 days",
    "msapplication-TileColor": "#3b82f6",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Syed Raihan Ali",
  alternateName: ["Tahir Taim", "Tahir", "Raihan"],
  jobTitle: "Flutter Developer",
  description:
    "Passionate Flutter Developer & Full-Stack Developer from Bangladesh. Building beautiful mobile apps and modern web applications with clean architecture.",
  url: "https://tahirtaim.dev",
  image: "https://tahirtaim.dev/profile.jpg",
  sameAs: [
    "https://github.com/syedraihanali",
    "https://www.linkedin.com/in/syedraihanali/",
  ],
  knowsAbout: [
    "Flutter",
    "Dart",
    "Mobile App Development",
    "Clean Architecture",
    "RxDart",
    "GetIt",
    "TypeScript",
    "React.js",
    "Next.js",
    "JavaScript",
    "Node.js",
    "Python",
    "TailwindCSS",
    "Prisma",
    "Full Stack Development",
    "Web Development",
  ],
  knowsLanguage: [
    { "@type": "Language", name: "English" },
    { "@type": "Language", name: "Bengali" },
  ],
  nationality: {
    "@type": "Country",
    name: "Bangladesh",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "BD",
  },
  email: "mailto:syedraihanali65@gmail.com",
  telephone: "+8801841626387",
};

// Website Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Syed Raihan Ali Portfolio",
  alternateName: "Tahir Taim Dev",
  url: "https://tahirtaim.dev",
  description: "Portfolio of Syed Raihan Ali - Flutter Developer & Full-Stack Developer",
  author: {
    "@type": "Person",
    name: "Syed Raihan Ali",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://tahirtaim.dev/projects?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.iconify.design" />
        <link rel="dns-prefetch" href="https://api.iconify.design" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([jsonLd, websiteSchema]),
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
