'use client'
import React, { useState } from 'react'
import InfoCard from '../Components/Profile/InfoProfile';
import { Tabs ,Tab, Card, CardBody, CardHeader, Progress } from '@nextui-org/react';
import IdosTab from '../Components/Tabs/IdosTab';
import NftsTab from '../Components/Tabs/NftsTab';
import { useAddress } from '@thirdweb-dev/react';

function ProfilePage() {
    const walletAddress=useAddress();
    
  return (
    <div className='w-full '>
        
        <div className='flex flex-col justify-center max-w-[1320px] mx-auto items-center gap-10'>
         <InfoCard /> 
         <div className='w-full '>
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            color='primary'
            variant={'underlined'}
            className='  bg-transparent backdrop-blur shadow-md mb-16'
          >
            <Tab key="idos" title="IDOs" className=''>
                <IdosTab />
            </Tab>
            <Tab key="nfts" title="NFTs" className=''>
              <NftsTab/>
            </Tab>
          </Tabs>
        
    

         </div>
        </div>
       
        
    </div>
  )
}

export default ProfilePage;