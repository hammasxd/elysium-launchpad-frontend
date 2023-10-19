'use client'
import { Card, CardHeader, CardBody,Image } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import pyrLogo from '../../assets/images/PYRicon.png'
import busdIcon from '../../assets/images/busd-logo.png'
import { baseUrl, saleToken, tokenName } from '@/app/constants/baseUrl'
import { useAppSelector } from '@/redux/store'
function TotalUserInvestmentCard() {
    const [deposits,setDeposits]=useState<any>();
    const userDeposits= useAppSelector((state)=> state.depositsReduder.value)
    const userAddress= useAppSelector((state)=> state.addressReducer.value)
    const gettingDeposits=()=>{
        return fetch(`${baseUrl}/userStakings`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address: userAddress }),
        }).then((response)=>response.json()).then((data)=>{
            setDeposits(data?.data);
        }
        )
    }
   useEffect(() => {
     
   if(userAddress){
    gettingDeposits();
   }
    
   }, [userAddress])
   

  return (
    <>
        <Card className='p-10 bg-transparent backdrop-blur shadow-xl h-full backdrop-brightness-150'>
            <CardHeader className='flex justify-start'>
                <h1 className='text-left text-2xl'>User Total Investment</h1>
            </CardHeader>
            <CardBody>
               
               
            <>
        <div className='flex flex-col justify-center h-full gap-6' >
                    <div className='flex flex-row'>
                        <Image
                        src={busdIcon.src}
                        width={50}
                        height={50}
                        />
                        <div className='flex flex-col ml-4 text-left'>
                        <p className='text-right text-sm'>Total {saleToken}</p>
                        <p className='text-lg font-bold'>170.0000</p>
                        </div>
                        

                    </div>
                    <div className='flex flex-row'>
                        <Image 
                        src={pyrLogo.src}
                        width={50}
                        height={50}
                        />
                            <div className='flex flex-col ml-4 text-left'>
                        <p className='text-right text-sm'>Current PYR</p>
                        <p className=' text-lg font-bold'>{deposits?.amount}</p>
                        </div>
                    </div>
                 
        
        </div>
                
                </>
            
            </CardBody>
        </Card>
        </>
  )
}

export default TotalUserInvestmentCard