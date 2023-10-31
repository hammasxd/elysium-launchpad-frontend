'use client'
import { baseUrl } from '@/app/constants/baseUrl'
import { partiIdo } from '@/app/constants/types'
import { setParticipatedIdos } from '@/redux/features/participatedIDOsSlice'
import { AppDispatch } from '@/redux/store'
import { Card, CardBody, CardHeader, Progress, Skeleton } from '@nextui-org/react'
import { useAddress } from '@thirdweb-dev/react'
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'



function ProfileParticipatedCard() {
  const dispatch = useDispatch<AppDispatch>()
  const [partiIdo,setpartiIdo]=useState<partiIdo>({
    participatedIDO:0,
    total:0
  })
  const [isLoading,setIsLoading]=useState(true);
  const walletAddress=useAddress();
  let dataiNeed:partiIdo={
    participatedIDO:0,
    total:0
  }
useEffect(() => {
  if(walletAddress!=undefined){
    fetch(`${baseUrl}/getUserParticipatedIDOs`, {
      cache:'force-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address: walletAddress }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        let toSet = data.data;
        dispatch(setParticipatedIdos(toSet));
        toSet = toSet[toSet.length - 1];
        setpartiIdo(toSet);
        setIsLoading(false);
        // Response Of IDOS
      })
      .catch(error => {
        // Handle error here
        console.error('Error:', error);
      });
    }
}, [walletAddress])

  return (
<>
<Skeleton isLoaded={!isLoading} className=' rounded-lg bg-primary-500 h-full '>
    <Card className='p-10 bg-transparent backdrop-blur shadow-xl h-[345px] backdrop-brightness-150'>
    <CardHeader>
        <h1 className='text-left text-2xl w-full '> IDOs Participated </h1>
    </CardHeader>
    <CardBody>
        <small className='text-right text-sm'>{((partiIdo.participatedIDO/partiIdo.total)*100).toFixed(1)}%</small>
        <Progress value={(partiIdo.participatedIDO/partiIdo.total)*100} />
        <h1 className=' font-bold mt-20 text-right text-5xl '>{partiIdo?.participatedIDO}/{partiIdo?.total}</h1>
    </CardBody>
</Card>
</Skeleton>
      
      </>


  )
}

  
export default ProfileParticipatedCard