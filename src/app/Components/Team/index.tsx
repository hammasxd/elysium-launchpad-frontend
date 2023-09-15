import { Card,CardBody,CardFooter,CardHeader,Image } from '@nextui-org/react'
import profileImg1 from "../../assets/images/profile-img-1.png";

import React from 'react'

function OurTeam() {
  return (
    <div className='flex flex-col justify-center items-center gap-10 mb-36 mt-16 w-1/2 mx-auto'>
        <h1 className='text-5xl font-bold' >Meet Our Team</h1>
        <p className='text-xl text-center'>Elysium is the flagship project by VulcanForged, a Greece Foundation founded to facilitate a fully functional and user-friendly decentralized web.</p>
        <Card className="bg-transparent px-10 py-12 rounded-xl" isBlurred>
     
      <CardBody className="overflow-visible py-2 ">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={profileImg1.src}
          width={300}
        />
      </CardBody>
      <CardFooter className="pb-0 pt-2 px-4  flex-col items-center gap-4">
      <h1 className="font-bold text-2xl">Jamie Thomson</h1>
        <p className="uppercase font-bold text-lg">Daily Mix</p>
      
       
      </CardFooter>
    </Card>
    </div>
  )
}

export default OurTeam