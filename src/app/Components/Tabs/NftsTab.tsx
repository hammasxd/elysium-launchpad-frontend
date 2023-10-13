import { Tabs, Tab } from '@nextui-org/react'
import React from 'react'
import IdosTab from './IdosTab'
import UserCompletedNfts from '../UserNFTs/UserCompletedNfts'
import UserInprogressNfts from '../UserNFTs/UserInprogressNfts'
import UserLikedNfts from '../UserNFTs/UserLikedNfts'

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
      <Tab key="inProgress" title="InProgress" className=''>
        <UserInprogressNfts/>
      </Tab>
      <Tab key="completed" title="Completed" className=''>
      <UserCompletedNfts/>

      </Tab>

      <Tab key="liked" title="Liked" className=''>
        <UserLikedNfts/>
      </Tab>
    </Tabs>
    </>
  )
}

export default NftsTab