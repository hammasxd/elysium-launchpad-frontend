'use client'
import { baseUrl, saleToken } from '@/app/constants/baseUrl'
import { useAppSelector } from '@/redux/store'
import { Card, CardHeader, CardBody ,Skeleton} from '@nextui-org/react'
import axios from 'axios'
import { delay } from 'framer-motion'
import React, { useEffect, useState } from 'react'


function UserTierCard() {
const addressOfUser=useAppSelector((state)=> state.addressReducer.value)
  const userTier= useAppSelector((state)=> state.userReducer.value.response?.tier )
const [isLoaded,setIsLoaded]=useState(false);

useEffect(() => {
  delay(()=>{setIsLoaded(true)},1500)
}, [])

  return (
    <>
                <Skeleton isLoaded={isLoaded} className='rounded-lg bg-primary-500 h-full ' content='true'>

    <Card className='p-10 bg-transparent backdrop-blur shadow-xl h-[345px] backdrop-brightness-150'>
        <CardHeader className='flex justify-start'>
            <h1 className='text-left text-2xl'>Tier as per Staked PYR Amount</h1>
        </CardHeader>
        <CardBody>
           
           
        <>
    <div className='flex flex-col justify-center h-full gap-6' >
                
                    
                    <div className='flex flex-col ml-4 text-left'>

                    <p className=' text-sm'>Your current Tier is  </p>
                    <h1 className={`text-5xl text-right font-bold`}>{JSON.stringify(userTier)}</h1>
                    </div>
                    

               
    
    </div>
            
            </>
        
        </CardBody>
    </Card>
    </Skeleton>
    </>
  )
}

export default UserTierCard