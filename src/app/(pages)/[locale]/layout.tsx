import React from 'react'
import { Metadata } from 'next'

import { AdminBar } from '~/app/_components/AdminBar'
import { Footer } from '~/app/_components/Footer'
import { Header } from '~/app/_components/Header'
import { Providers } from '~/app/_providers'
import { InitTheme } from '~/app/_providers/Theme/InitTheme'
import { mergeOpenGraph } from '~/app/_utilities/mergeOpenGraph'

import '~/app/_css/app.scss'

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <InitTheme />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar />
          {/* @ts-expect-error */}
          <Header />
          {children}
          {/* @ts-expect-error */}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
  openGraph: mergeOpenGraph(),
}
