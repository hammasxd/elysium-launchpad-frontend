import { saleToken } from '@/app/constants/baseUrl'
import { timeConverter } from '@/app/constants/helper'
import { NFTObject } from '@/app/constants/types'
import { Button, Card, CardBody, CardHeader, Link, Progress, Skeleton,Image } from '@nextui-org/react'
import { list } from 'postcss'
import React from 'react'

function NftCard({poolName,nft,index,isLoaded,isLoadedImage}:{poolName:string,nft:NFTObject,index:number,isLoaded:boolean,isLoadedImage:boolean}) {
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

            <p className="text-white w-full inline-flex mb-2">INO POOL</p>
            <div className="flex w-full justify-between">
                <Skeleton
                    className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                    isLoaded={isLoaded}
                >
                    <p className="text-white text-tiny flex-initial">
                        {nft.Purchased} / {nft.NFTMaxCap } 
                    </p>

                </Skeleton>
                <Skeleton
                    className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                    isLoaded={isLoaded}
                >
                    <p className="text-white text-tiny flex-initial">
                        {parseFloat((nft.FilledPercentage.toString())).toFixed(1)}%
                    </p>
                </Skeleton>
            </div>
            <Progress className=" mb-8 mt-2 h-3 rounded-lg" isStriped color="secondary" value={nft.FilledPercentage} aria-label="Loading..." />
            <div className="grid grid-cols-2 grid-rows-2 gap-x-10 self-center mb-8" >
                <div className="col-span-1 flex-initial">
                    <small className="w-full inline-flex text-tiny text-white">INO CLOSED</small>
                    <Skeleton
                        className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                        isLoaded={isLoaded}
                    >
                        <small className="font-bold">{timeConverter(nft.EndTime)}
                        </small>
                    </Skeleton>
                </div>
                <div className="col-span-1 flex-initial">
                    <small className="w-full inline-flex text-tiny text-white">NFT Sold</small>
                    <Skeleton
                        className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                        isLoaded={isLoaded}
                    >
                        <small className="font-bold">
                           {nft.Purchased}
                        </small >
                    </Skeleton>

                </div>
               
            </div>
            <Skeleton
                className=' bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                isLoaded={isLoaded}
            >
                <Button className="w-full bg-primary-PAROT text-slate-50 font-semibold text-[14px] border-[2px] border-primary-PAROT hover:bg-primary-btnHover"
                    // onPress={() => settingList(list)}

                    href="#"><Link href={`/nftLaunchpad/lpTokens/${nft.NFTPoolType}/${nft.NFTPoolAddress}`}  className=' text-white'> LEARN MORE</Link></Button>
            </Skeleton>
        </CardHeader>

    </Card>
  

</div>
  )
}

export default NftCard