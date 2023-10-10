'use client'
import React from 'react'
import { Image } from '@nextui-org/react'
function NftImage({url}:any) {
  return (

   <Image
   src={url}
   className='w-full h-full'
   alt='nft image'
   />
  )
}

export default NftImage