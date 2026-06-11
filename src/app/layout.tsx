import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "504 Sabor Catracho | Auténtica Comida Hondureña en Austin TX",
  description:
    "Menú digital de 504 Sabor Catracho — Auténtica comida hondureña en Austin, TX. Desayunos, baleadas, tajadas, mariscos, sopas y bebidas. 907 Kramer Ln Austin, TX 78758.",
  keywords: [
    "comida hondureña Austin",
    "baleadas Austin TX",
    "504 Sabor Catracho",
    "restaurante hondureño Austin",
    "menú digital hondureño",
  ],
  openGraph: {
    title: "504 Sabor Catracho | Auténtica Comida Hondureña",
    description: "Menú digital — Baleadas, Desayunos, Tajadas y más. Austin TX.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
