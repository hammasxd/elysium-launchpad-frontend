'use client'
import React, { useState } from 'react'
import ProfileParticipatedCard from '../Cards/ProfileParticipatedCard'
import ProfileStakingInfoCard from '../Cards/ProfileStakingInfoCard'
import PYRInfoCard from '../Cards/PYRInfoCard'
import TotalUserInvestmentCard from '../Cards/TotalUserInvestmentCard'
import AllPoolStatsCard from '../Cards/AllPoolStatsCard'
import UserTierCard from '../Cards/UserTierCard'
import ProfileIdosSliders from '../Profile/ProfileIdosSliders'

function IdosTab() {
  
  return (
    <div className='flex flex-col gap-16'>
      <div className='manyCards grid grid-cols-3 grid-rows-2 gap-8'>
        <div className=' w-full ' >
       <ProfileParticipatedCard />
        </div >
        <div className=' w-full h-full '>
        <ProfileStakingInfoCard  />
        
        </div>
        <div className=' w-full h-full'>
        <PYRInfoCard/>
        </div>
        <div className=' h-full w-full'>
        <TotalUserInvestmentCard/>
        </div>
        <div className=' h-full w-full'>
        <AllPoolStatsCard/>
        </div>
        <div className=' h-full w-full'>
        <UserTierCard/>
        </div>

      </div>
      <div className='InProgressIdos'>
          <ProfileIdosSliders/>
      </div>
    </div>
  )
}

export default IdosTab