import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "react-hot-toast"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Optional: to use as a CSS variable
})

export const metadata: Metadata = {
  title: {
    default: "Typeform Clone",
    template: `%s - Typeform Clone`,
  },
  description:
    "An open source typeform clone built with everything new in Next.js",
  keywords: [
    "nextjs",
    "react",
    "react server components",
    "typeform",
    "forms",
    "form",
    "survey",
    "google form clone",
  ],
  authors: [
    {
      name: "AnushDeokar",
      url: "https://github.com/AnushDeokar",
    },
  ],
  creator: "AnushDeokar",
  twitter: {
    card: "summary_large_image",
    title: "Typeform Clone",
    description:
      "An open source typeform clone built with everything new in Next.js",
    creator: "@AnushDeokar",
  },
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Typeform Clone",
    description:
      "An open source typeform clone built with everything new in Next.js",
    url: "https://github.com/AnushDeokar",
    siteName: "Typeform Clone",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Typeform Clone Logo",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Toaster position="bottom-center" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
