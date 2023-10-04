import { Tabs, Tab } from '@nextui-org/react'
import React from 'react'
import IdosTab from './IdosTab'

function NftsTab() {
  return (
    <>
    <Tabs
      
      size="md"
      aria-label="Tabs form"
      color='primary'
      
      variant={'underlined'}
      className='  bg-transparent backdrop-blur shadow-md mb-16 backdrop-brightness-150 rounded-xl'
    >
      <Tab key="idos" title="IDOs" className=''>
          
      </Tab>
      <Tab key="nfts" title="NFTs" className=''>
        
      </Tab>
    </Tabs>
    </>
  )
}

export default NftsTab