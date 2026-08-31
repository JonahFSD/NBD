import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'The View — Scripture, Seen Anew',
  description: 'An interactive cinematic demo for The View, the AI-powered Bible experience.',
  openGraph: {
    title: 'The View — Scripture, Seen Anew',
    description: 'Any passage. Every detail. Scripture brought to life.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The View — Scripture, Seen Anew',
    description: 'Any passage. Every detail. Scripture brought to life.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
