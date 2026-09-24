import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

import { LanguageProvider } from "@/context/LanguageContext";
import { ChatBot } from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "Vexus Labs | High-Velocity Software Engineering Studio for Startups",
  description: "From zero-to-one MVPs to production web applications, autonomous AI agents, and cloud backbones. Senior full-stack architects shipping in 14-day production sprints.",
  icons: {
    icon: [
      { url: "/logo-icon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo-icon.png", type: "image/png" },
    ],
    shortcut: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-icon.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#fdfdfd] text-[#181a24] font-sans" suppressHydrationWarning>
        <LanguageProvider>
          {children}
          <ChatBot />
        </LanguageProvider>
      </body>
    </html>
  );
}
