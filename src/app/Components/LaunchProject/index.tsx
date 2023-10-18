'use client'
import React from 'react'
import GirlLaptop from '../../assets/images/GirlLaptop.png'
import { Image } from '@nextui-org/react'
function LaunchProject() {
  return (
    <div id='gettingStarted'>
    <div className='spaceunder pt-12'  >
      </div>
<div className="flex flex-wrap mt-20 mb-20 justify-center" >

  <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4 justify-center">
    <h2 className="mb-5 text-7xl font-bold ">Launch a Project on Elysium Now!</h2>
    <p>Elysium Launchpad is a platform that helps and advises project teams on how to best issue and launch their project. We provide a full-service offering starting from advisory services from before the project is even issued, to post-release support. Please contact Admin for more information.</p>
  </div>
  <div className="p-4">
    <Image 
      src={GirlLaptop.src} 
      alt="Processing" 
      className="" 
    />
  </div>
</div>
</div>
  )
}

export default LaunchProject