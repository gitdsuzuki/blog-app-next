'use client'

import "./globals.css"
import Header from "@/components/Header"

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <html lang="jp">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}

export default RootLayout