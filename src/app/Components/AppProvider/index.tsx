'use client'
import { NextUIProvider } from "@nextui-org/react";
import { ThirdwebProvider, metamaskWallet, walletConnect } from "@thirdweb-dev/react";
import {Elysium,ElysiumTestnet} from '@thirdweb-dev/chains'
import React, { createContext } from "react";
import logo from '../../assets/images/elysium-logo-launch.png'
import LenisProvider from "./LanisProvider";
import { ReduxProvider } from "@/redux/provider";





const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const activeChain=ElysiumTestnet;
    const walletConfig= {
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    chainId: activeChain.chainId as number,
    qrcode: true,
  };


  const dAppMeta = {
       /**
       * the name of your app
       */
       name: 'Elysium',
       /**
        * the url where your app is hosted
        */
       url: 'elysium-launchpad-investorpanel-nft-dev.vulcanforged.com',
       /**
        * optional - a description of your app
        */
       description:'Elysium NFT launchpad by Vulcan Forged' ,
       /**
        * optional - a url that points to a logo (or favicon) of your app
        */
       logoUrl: logo.src,
       /**
        * optional - whether to show the connect dialog in darkmode or not
        */
       isDarkMode:false,
  }
    

    return (
      
        <ThirdwebProvider
        activeChain={activeChain}
        clientId={process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID}
        supportedChains={[Elysium,ElysiumTestnet]}
        supportedWallets={[walletConnect(walletConfig), metamaskWallet()]}
        autoSwitch={true}
        autoConnect={true}
        dAppMeta={dAppMeta}
    > 
        <LenisProvider options={{
              lerp: 0.1,
              wheelMultiplier: 0.8,
              smoothWheel: true,
            }}>
        <NextUIProvider>
          <ReduxProvider>
            {children}
            </ReduxProvider>
        </NextUIProvider>
        </LenisProvider>
        </ThirdwebProvider>
    );
  };
  
  export default AppProvider;
  