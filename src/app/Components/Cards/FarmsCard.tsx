 'use client'
 import {baseUrl} from '@/app/constants/baseUrl'
import { Card, CardHeader, Divider, CardBody, CardFooter,Image,Link } from '@nextui-org/react'
import React from 'react'
import pyrIcon from '../../assets/images/PYRicon.png'
import ImagesURL from "../../constants/ImagesURL";



 async function FarmCard({poolname,count}:any) {

 

 
   return (
<Link href='#' className=' backdrop-blur bg-transparent'>
<Card className=" p-5 backdrop-blur bg-transparent rounded-3xl hover:-translate-y-7  hover:backdrop-blur shadow-glow">
    <CardHeader className="flex flex-row justify-center">
    
      <Image
        alt="nextui logo"
       className='w-[80px]  '
        radius="sm"
        as='img'
        src={ImagesURL[`${poolname}`]}
        
      />
      <Image
        alt="nextui logo"
       className='w-[40px]  -left-6 -bottom-2 '
        radius="sm"
        as='img'
        src={pyrIcon.src}
        
      />
      <div>
      <h1 className=' text-5xl font-bold'>{poolname}</h1>
      </div>
     
    </CardHeader>
    <Divider/>
    <CardBody>
      <small>Pools count</small>
      <h2 className=' text-4xl font-bold text-center'> {count}</h2>
    </CardBody>
   
  </Card>
</Link>
   
   )
 }
 
 export default FarmCard