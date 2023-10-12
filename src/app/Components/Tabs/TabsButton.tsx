'use client'
import { Tabs, Tab } from '@nextui-org/react'
import React from 'react'
import IdosTab from './IdosTab'
import NftsTab from './NftsTab'

function TabsButton() {
  return (
    <div className='w-full '>
    <Tabs
      fullWidth
      size="md"
      aria-label="Tabs form"
      color='primary'
      variant='underlined'
      className='  bg-transparent backdrop-blur shadow-md mb-16 backdrop-brightness-150 rounded-xl'
    >
      <Tab key="idos" title="IDOs" className=''>
          <IdosTab />
      </Tab>
      <Tab key="nfts" title="NFTs" className=''>
        <NftsTab/>
      </Tab>
    </Tabs>
   </div>
  )
}

export default TabsButton