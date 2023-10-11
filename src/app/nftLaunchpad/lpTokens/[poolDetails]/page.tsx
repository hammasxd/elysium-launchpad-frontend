'use client'
import ImagesURL from '@/app/constants/ImagesURL'
import { Card, CardHeader, Divider, CardBody, Image } from '@nextui-org/react'
import React from 'react'
import pyrIcon from '../../../assets/images/PYRicon.png'
import completed from '../../../assets/images/No-Completed-NFT.png'
import upcomming from '../../../assets/images/No-Upcoming-NFT.png'
import inprogressBg from '../../../assets/images/no-active-nft.png'
import { baseUrl } from '@/app/constants/baseUrl'
import NftIntroCompleted from '@/app/Components/NftIntroCompleted'
import NftIntroUpcomming from '@/app/Components/NftIntroUpcomming'
import NftIntroInprogress from '@/app/Components/NftIntroInprogress'
function page({ params }: { params: { poolDetails: string } }) {


  return (
    <div className=' flex flex-col justify-center  shadow-none'>
      <div className='poolInfo'>
        <Card className=" p-5 bg-transparent shadow-none  ">
          <CardHeader className="flex flex-row justify-center">

            <Image
              alt="nextui logo"
              className='w-[80px]  '
              radius="sm"
              as='img'
              src={ImagesURL[`${params.poolDetails}`]}

            />
            <Image
              alt="nextui logo"
              className='w-[40px]  -left-6 -bottom-2 '
              radius="sm"
              as='img'
              src={pyrIcon.src}

            />


          </CardHeader>
          <CardBody>
            <div className='text-center'>
              <p>Farms</p>
              <h1 className=' text-5xl font-bold mt-4'>{params.poolDetails}</h1>
            </div>
          </CardBody>
          <Divider className='w-1/2 self-center mt-7' />

          <NftIntroInprogress poolName={params.poolDetails} IntroTitle={'Active NFTs'} bgImageSrc={inprogressBg.src} learnMore={`/nftLaunchpad/lpTokens/${params.poolDetails}/inprogress`} />
          <NftIntroUpcomming poolName={params.poolDetails} IntroTitle={'Upcomming NFTs'} bgImageSrc={upcomming.src} learnMore={`/nftLaunchpad/lpTokens/${params.poolDetails}/upcomming`} />
          <NftIntroCompleted poolName={params.poolDetails} IntroTitle={'Completed NFTs'} bgImageSrc={completed.src} learnMore={`/nftLaunchpad/lpTokens/${params.poolDetails}/completed`} />


        </Card>

      </div>
      <div>

      </div>
    </div>
  )
}

export default page