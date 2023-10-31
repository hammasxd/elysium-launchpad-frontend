'use client'
import { saleToken } from '@/app/constants/baseUrl'
import { useAppSelector } from '@/redux/store'
import { Card, CardBody, CardHeader,Divider,Image, Skeleton } from '@nextui-org/react'
import { delay } from 'framer-motion';
import React, { useEffect, useState } from 'react'

function AllPoolStatsCard() {
  const [isLoaded,setIsLoaded]=useState(false);
  useEffect(()=>{
    delay(()=>{setIsLoaded(true)},1500)
  },[])
const totalInvest=useAppSelector((state)=> state.stakedReducer.value);
  return (
    <>
                <Skeleton isLoaded={isLoaded} className='rounded-lg bg-primary-500 h-full ' content='true'>

    <Card className='p-10 bg-transparent backdrop-blur shadow-xl h-[345px] backdrop-brightness-150'>
        <CardHeader className='flex justify-start'>
            <h1 className='text-left text-2xl'>All Staking Pool Stats</h1>
        </CardHeader>
        <CardBody>
           
           
        <>
    <div className='flex flex-col justify-center h-full gap-6' >
                    <div className='flex flex-col ml-4 text-left'>
                    <p className='text-left text-sm'>Total PYR Amount</p>
                    <p className='text-lg font-bold'> {totalInvest} PYR</p>
                    </div>
                    <Divider/>

                
             
    
    </div>
            
            </>
        
        </CardBody>
    </Card>
    </Skeleton>
    </>
  )
}

export default AllPoolStatsCard