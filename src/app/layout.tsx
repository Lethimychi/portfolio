import type { Metadata, Viewport } from "next";
import "./globals.css";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts";
import { siteConfig, profile } from "@/data/profile";
import { AuroraBackground } from "@/components/layout/aurora-background";
import { CursorGlow } from "@/components/layout/cursor-glow";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { BugHuntProvider } from "@/components/bug-hunt/bug-hunt";
import { BugHuntHud } from "@/components/bug-hunt/bug-hunt-hud";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${profile.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <body className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
        <PageTransition />
        <AuroraBackground />
        <CursorGlow />
        <ScrollProgress />
        <BugHuntProvider>
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
          <BugHuntHud />
        </BugHuntProvider>
        <BackToTop />
      </body>
    </html>
  );
}
