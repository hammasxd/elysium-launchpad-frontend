'use client'
import { Link } from '@nextui-org/react'
import React from 'react'

function BuyOnVulcan() {
  return (
    <div className='relative' >
    <div className="absolute fireplace">
  <div className="blur">
  <div className="fireplace__flame_big"></div>
    </div>
   <main className="fireplace__spark"></main>
  <main className="fireplace__spark"></main>
  <main className="fireplace__spark"></main>
  <main className="fireplace__spark"></main>
  <div className="blur fix">
  <div className="fireplace__flame"></div>
    </div>
  <div className="fireplace__light"></div>
</div>
    <Link
                href='https://vulcandex.vulcanforged.com/swap'
                target='_blank'
                className='  bg-[#ECCC3D] bg-opacity-0 px-4 py-4 rounded-xl text-white text-xl font-extrabold ' 
                > <span className='fire mr-1'> BUY </span>  <span className='burn mr-1'> ON </span> <span className='fire mr-1'> VULCAN </span> </Link>
                 <Link
                href='https://vulcandex.vulcanforged.com/swap'
                target='_blank'
                className=' ml-12  bg-primary px-4 py-4 rounded-xl text-white text-xl font-extrabold ' 
                > BUY ON BINANCE </Link>
                
  </div>
  )
}

export default BuyOnVulcan