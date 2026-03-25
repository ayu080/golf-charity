import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata: Metadata = {
  title: 'The Fairway Collective | Impact Beyond the Green',
  description: 'Premium Golf Charity Subscription Platform. Transform your game into global change.',
  keywords: ['golf', 'charity', 'philanthropy', 'subscription', 'impact'],
  authors: [{ name: 'The Fairway Collective' }],
  openGraph: {
    title: 'The Fairway Collective',
    description: 'Impact Beyond the Green',
    url: 'https://fairwaycollective.org',
    siteName: 'The Fairway Collective',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWCWBkhILiirCASHpTuSfwE1YDsotzJ5uqifkkeAFPKapCZdKAdjKsojEThn0CE3xcbnikf8OG5_W8YlfmDcMgZSHiAMolpcsObzBGrc_8QnuBjoMPopIKXGE1sxlHb0m7A-mXO6p6eZeKFr62bQI0IzxsxGEDhWvbilpta7_gdxkdFjDPY_IZ9ZcZmsbXhrubpIhl-insqBSW9DyTivQc1CF3huj-PhQ-5CxEDC9QtMFYcPrK1pr5MwYfvSq6llqXtsBUd19Y_ZEL',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Fairway Collective',
    description: 'Impact Beyond the Green',
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBWCWBkhILiirCASHpTuSfwE1YDsotzJ5uqifkkeAFPKapCZdKAdjKsojEThn0CE3xcbnikf8OG5_W8YlfmDcMgZSHiAMolpcsObzBGrc_8QnuBjoMPopIKXGE1sxlHb0m7A-mXO6p6eZeKFr62bQI0IzxsxGEDhWvbilpta7_gdxkdFjDPY_IZ9ZcZmsbXhrubpIhl-insqBSW9DyTivQc1CF3huj-PhQ-5CxEDC9QtMFYcPrK1pr5MwYfvSq6llqXtsBUd19Y_ZEL'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${manrope.variable} bg-surface text-on-surface font-body selection:bg-secondary/30 antialiased min-h-[max(884px,100dvh)] flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
