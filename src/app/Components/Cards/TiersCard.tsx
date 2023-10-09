'use client'
import React from 'react'
import { Card, CardHeader, Divider, CardBody, CardFooter,Image,Link } from '@nextui-org/react'

export type tiers = {
    tierName:string,
    price:number,
   
    currentPrice:number
}

function TiersCard(tiers:tiers) {
    
  return (
    <Card className="CardBodyBg w-96  gap-2 py-5 justify-center">
      <CardHeader className="flex gap-3 justify-center">
       
       
          <h1 className="text-2xl text-center font-extrabold">{tiers.tierName}</h1>
         
       
      </CardHeader>
      <CardBody className='text-center'>
        <h1 className=' text-4xl text-center text-primary-PAROT font-extrabold '>${tiers.price}</h1>
        <p>Fund</p>
        
      </CardBody>
      <Divider className='w-2/3 mx-auto' />
      <CardFooter className='text-center flex flex-col justify-center '>
        <h1 className='text-3xl font-extrabold'>{(tiers.price/tiers.currentPrice).toFixed(2)}</h1>
        <p>PYR</p>
      </CardFooter>
    </Card>
  )
}

TiersCard.propTypes = {}

export default TiersCard
