import { Button, Card, CardBody, CardHeader , Image } from '@nextui-org/react'
import React from 'react'
import demoProfile from '../../assets/images/ProfileImg.png'
function InfoDemoCard() {
  
  return (
     
      <Card className="py-4 w-full bg-transparent backdrop-blur rounded-3xl px-10 backdrop-brightness-150">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
      <div className='flex flex-row justify-start items-center gap-24'>
      <Image
          alt="Card background"
          className="object-cover rounded-full"
          src={demoProfile.src}
          width={350}
        />
       <Button className="w-full bg-primary-PAROT text-slate-50 font-semibold text-[14px] border-[2px] border-primary-PAROT hover:bg-primary-btnHover"
        href="#"> ADD PROFILE</Button>
      </div>
     
        
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        
      </CardBody>
    </Card>
    
  )
}

export default InfoDemoCard