'use client'
import { baseUrl } from '@/app/constants/baseUrl'
import { Card, CardBody, CardHeader, Progress } from '@nextui-org/react'
import { useAddress } from '@thirdweb-dev/react'

import React, { useEffect, useState } from 'react'
import useSWR from "swr"



function ProfileParticipatedCard() {
  const walletAddress=useAddress();
  const fetcher = async (url:string, walletAddress:any) => {


    console.log( "api url : ", url)
    if(url[0]=='undefined'){
      return 'wallet is undefined';
    }
    const response = await fetch(url[0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address: url[1] }),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  };
  

    const { data, error, isLoading } = useSWR([`https://elysium-launchpad-adminbackend-nft-dev.vulcanforged.com/api/getUserParticipatedIDOs`,'0xd060173a26934010c9D97491732b84e6Fa688556'], fetcher)

  

  

  console.log('i am data  : ', data?.data?.length)
 
  return (
<>
      {data && 
    <Card className='p-10 bg-transparent backdrop-blur shadow-xl'>
    <CardHeader>
        <h1 className='text-center text-2xl w-full '> IDOs Participated </h1>
    </CardHeader>
    <CardBody>
        <small className='text-right text-sm'>{16}%</small>
        <Progress value={16} />
        <h1 className=' font-bold mt-20 text-right text-5xl '>{2}/{data?.data?.length}</h1>
    </CardBody>
</Card>

      }
      </>


  )
}

export default ProfileParticipatedCard