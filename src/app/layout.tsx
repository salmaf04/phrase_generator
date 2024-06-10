
import React from 'react';
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '../components/NavBar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="eng">
      <body className={inter.variable}>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}




