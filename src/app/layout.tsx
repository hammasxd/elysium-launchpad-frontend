'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {NextUIProvider} from "@nextui-org/react";
import AppProvider from './Components/AppProvider/page';
const inter = Inter({ subsets: ['latin'] })
import ElysiumBanner from "./assets/images/ElysiumBanner.png";
import Header from './header';

// export const metadata: Metadata = {
//   title: 'Elysium Launchpad',
//   description: 'Elysium NFT launchpad by Vulcanforged',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='purple-dark'>
      <body className={inter.className} style={{ backgroundImage: `url(${ElysiumBanner.src})`,backgroundPosition:'top',backgroundRepeat:'no-repeat', backgroundSize:'contain' }}  >
        <AppProvider>
        
        <div className='wrapper' >
        <Header/>
        {children}
        </div>
        </AppProvider>
        
        </body>
    </html>
  )
}
