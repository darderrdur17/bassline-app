import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bassline - San Francisco Nightlife Discovery",
  description: "Discover the best bars, restaurants, and nightlife venues in San Francisco. Interactive map with mood-based venue discovery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E53935" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased" style={{ fontFamily: 'var(--font-body)' }}>
        {children}
      </body>
    </html>
  );
}
