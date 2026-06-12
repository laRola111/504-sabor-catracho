import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

const siteUrl = "https://504saborcatracho.com"; // Update when deployed

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "504 Sabor Catracho | Auténtica Comida Hondureña en Austin TX",
    template: "%s | 504 Sabor Catracho",
  },
  description:
    "Menú digital de 504 Sabor Catracho — Auténtica comida hondureña en Austin, TX. Desayunos, baleadas, tajadas, mariscos, sopas y bebidas tradicionales. 907 Kramer Ln Austin, TX 78758. ☎ (512) 783-0737",
  keywords: [
    "comida hondureña Austin TX",
    "baleadas Austin",
    "504 Sabor Catracho",
    "restaurante hondureño Austin",
    "menú digital hondureño",
    "desayuno hondureño Austin",
    "sopa de mondongo Austin",
    "tajadas Austin Texas",
    "comida centroamericana Austin",
    "honduran food Austin",
    "authentic honduran restaurant",
  ],
  authors: [{ name: "504 Sabor Catracho" }],
  creator: "504 Sabor Catracho",
  publisher: "504 Sabor Catracho",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_US",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "504 Sabor Catracho",
    title: "504 Sabor Catracho | Auténtica Comida Hondureña — Austin TX",
    description:
      "🇭🇳 Menú digital — Baleadas, Desayunos, Tajadas, Mariscos y más. Auténtica comida hondureña en Austin, TX. 907 Kramer Ln · (512) 783-0737",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "504 Sabor Catracho — Auténtica Comida Hondureña en Austin TX",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "504 Sabor Catracho | Auténtica Comida Hondureña — Austin TX",
    description:
      "🇭🇳 Baleadas, Desayunos, Tajadas, Mariscos y más. Austin, TX · 907 Kramer Ln · (512) 783-0737",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  category: "restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Local Business structured data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "504 Sabor Catracho",
              description:
                "Auténtica comida hondureña en Austin, TX — Baleadas, Desayunos, Tajadas, Mariscos y Sopas tradicionales.",
              url: siteUrl,
              image: `${siteUrl}/og-image.jpg`,
              logo: `${siteUrl}/logo-504-catracha.png`,
              telephone: "+15127830737",
              address: {
                "@type": "PostalAddress",
                streetAddress: "907 Kramer Ln",
                addressLocality: "Austin",
                addressRegion: "TX",
                postalCode: "78758",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 30.388,
                longitude: -97.71,
              },
              servesCuisine: ["Honduran", "Central American", "Latin American"],
              priceRange: "$$",
              hasMap:
                "https://maps.google.com/?q=907+Kramer+Ln+Austin+TX+78758",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                },
              ],
              sameAs: [
                "https://www.facebook.com/504saborcatracho",
                "https://www.instagram.com/504saborcatracho",
              ],
            }),
          }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
