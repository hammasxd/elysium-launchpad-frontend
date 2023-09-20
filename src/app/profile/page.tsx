'use client'
import { useAddress } from '@thirdweb-dev/react'
import React from 'react'
import InfoDemoCard from '../Components/Profile/InfoDemoCard';
import InfoCard from '../Components/Profile/InfoProfile';

function Page() {
    
    const userAddress=useAddress();

  return (
    <div className='w-full '>
        
        <div className='flex flex-col justify-center max-w-[1320px] mx-auto items-center'>
        {userAddress ? <InfoCard walletAddress={userAddress}/> :<InfoDemoCard/>}
        </div>
       
        
    </div>
  )
}

export default Page;