import { saleToken } from '@/app/constants/baseUrl'
import { useAppSelector } from '@/redux/store'
import { Card, CardBody, CardHeader,Divider,Image } from '@nextui-org/react'
import React from 'react'

function AllPoolStatsCard() {
const totalInvest=useAppSelector((state)=> state.stakedReducer.value);
  return (
    <>
    <Card className='p-10 bg-transparent backdrop-blur shadow-xl h-full backdrop-brightness-150'>
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
    </>
  )
}

export default AllPoolStatsCard