

import React from 'react'
import BuyOnVulcan from '../Components/Buttons/BuyOnVulcan'
import StakingCard from '../Components/Cards/StakingCard'

async function getData() {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/vulcan-forged?tickers=true&market_data=true',{
        cache:'force-cache',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    })
   
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }
async function Saking() {
    const apiData=await getData()
  return (
    <div className='flex flex-row w-[1150px] mx-auto'>
        <div className='infoDiv w-1/2 flex flex-col gap-40'>
            <div className='headings'>
                <h1 className='text-5xl '><span className=' font-extrabold '>Stake</span> your <span className=' font-extrabold '>PYR</span> to join <span className=' font-extrabold '>IDOs</span>  and  <span className=' font-extrabold '>INOs</span></h1>
            </div>
            <div className='buttonStaking'>
                <BuyOnVulcan/>
                
            </div>
        </div>
        <div className='stakingAction w-1/2'>
                <StakingCard/>
        </div>
    </div>
  )
}

export default Saking