'use client'
import { Tabs, Tab, Button, ButtonGroup } from '@nextui-org/react'
import React, { useState } from 'react'
import IdosTab from './IdosTab'
import NftsTab from './NftsTab'

function TabsButton() {
  
  const [currentTab, setCurrentTab] = useState('IDOs');
  
  return (

    <div className='w-full '>
      <div className='w-full'>
        <div className='Buttonss my-10'>
          <ButtonGroup fullWidth className=' backdrop-blur backdrop-brightness-150 rounded-lg shadow-lg' >
            <Button aria-pressed={currentTab == 'IDOs' ? 'true' : 'false'} onPress={() => setCurrentTab('IDOs')} className=' bg-transparent  aria-pressed:bg-primary text-lg font-bold' role='button' >IDOs</Button>
            <Button aria-pressed={currentTab == 'NFTs' ? 'true' : 'false'} onPress={() => setCurrentTab('NFTs')} className=' bg-transparent aria-pressed:bg-primary text-lg font-bold' role='button' >NFTs</Button>
          </ButtonGroup>
        </div>

      </div>
      <div className='ActiveTab'>
        {
          currentTab == 'IDOs' ? <IdosTab /> : <NftsTab />
        }
      </div>
    </div>
  )
}

export default TabsButton