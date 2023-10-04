import React from 'react'
import InfoCard from '../Components/Profile/InfoProfile';
import { Tabs ,Tab} from '@nextui-org/react';
import IdosTab from '../Components/Tabs/IdosTab';
import NftsTab from '../Components/Tabs/NftsTab';
import TabsButton from '../Components/Tabs/TabsButton';

function ProfilePage() {
    
  return (
    <div className='w-full '>
        
        <div className='flex flex-col justify-center max-w-[1320px] mx-auto items-center gap-10'>
         <InfoCard /> 
        <TabsButton/>
        </div>
       
        
    </div>
  )
}

export default ProfilePage;