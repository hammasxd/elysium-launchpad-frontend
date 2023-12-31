
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {NextUIProvider} from "@nextui-org/react";
import AppProvider from './Components/AppProvider';
const inter = Inter({ subsets: ['latin'] })
import ElysiumBanner from "./assets/images/ElysiumBanner.png";
import Header from './header';
import Cursors from './Components/Cursor/Cursors';
import Footer from './footer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";
export const metadata: Metadata = {
  title: 'Elysium Launchpad',
  description: 'Elysium NFT launchpad by Vulcanforged',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='purple-dark'>
      <head>
      <link rel="icon" href="/icon.png" />
      </head>
      <body  className={`${inter.className} w-full scroll-smooth scrollbar-hide`} style={{ backgroundImage: `url(${ElysiumBanner.src})`,backgroundPosition:'top',backgroundRepeat:'no-repeat',backgroundAttachment:'fixed' }}  >
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer
/>
      <div className="box">
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
        <AppProvider>
        
        <div className='wrapper' >
          
        <Header/>
        {children}
        
          
        <Footer/>
        </div>
        </AppProvider>
        
        </body>
    </html>
  )
}
