import { saleToken } from '@/app/constants/baseUrl'
import { timeConverter } from '@/app/constants/helper'
import { NFTObject } from '@/app/constants/types'
import { Button, Card, CardBody, CardHeader, Link, Progress, Skeleton,Image } from '@nextui-org/react'
import { list } from 'postcss'
import React from 'react'

function NftCard({nft,index,isLoaded,isLoadedImage}:{poolName:string,nft:NFTObject,index:number,isLoaded:boolean,isLoadedImage:boolean}) {
  return (

    <div key={index}>
    <Card  className=" py-4 w-[350px] bg-transparent backdrop-brightness-125 backdrop-blur  ">

        <CardBody className=" flex flex-row justify-center overflow-visible py-0 w-full px-0 rounded-r-2xl">
            <Skeleton
                className=' rounder-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                isLoaded={isLoadedImage}
            >
                <Image
                    alt="Card background"
                    className=" max-w-[300px] max-h-[218px] min-h-[218px] rounded-r-2xl m-0 p-0"
                    src={`${nft.NFTImageURL}`}
                    width={250}

                />
            </Skeleton>
        </CardBody>

        <CardHeader className=" mx-5 self-center  flex-col items-start">
            <Skeleton
                className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                isLoaded={isLoaded}
            >
                <p className="text-tiny uppercase font-bold mt-8">
                    {nft.ProjectTitle}
                </p>
               
            </Skeleton>
            <Skeleton
                className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                isLoaded={isLoaded}
            >
                 <h4 className="font-bold gap-6 text-2xl text-center w-full my-6 ">{nft.NFTName}
                </h4>
            </Skeleton>
            <Skeleton
                className=' bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                isLoaded={isLoaded}
            >
                <Button className="w-full bg-primary-PAROT text-slate-50 font-semibold text-[14px] border-[2px] border-primary-PAROT hover:bg-primary-btnHover"
                    

                    href="#"><Link href={`/nftLaunchpad/lpTokens/${nft.NFTPoolType}/${nft.NFTPoolAddress}`}  className=' text-white'> LEARN MORE</Link></Button>
            </Skeleton>
        </CardHeader>

    </Card>
  

</div>
  )
}

export default NftCard