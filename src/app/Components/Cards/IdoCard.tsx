import { saleToken } from '@/app/constants/baseUrl'
import { timeConverter } from '@/app/constants/helper'
import { Card, CardBody, Skeleton, CardHeader, Progress, Button , Image } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

function IdoCard({list,isLoadedImage,isLoaded,index}:any) {
  return (
    <div key={index}>
                                <Card  className=" pb-4 w-[350px] bg-transparent backdrop-brightness-125 backdrop-blur ">

                                    <CardBody className=" overflow-visible py-0 w-full px-0 rounded-none">
                                        <Skeleton
                                            className=' bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                            isLoaded={isLoadedImage}
                                        >
                                            <Image
                                                alt="Card background"
                                                className=" max-h-[218px] min-h-[218px] "
                                                src={`data:image/png;base64,${list.base64}`}
                                                width={400}
                                                

                                            />
                                        </Skeleton>
                                    </CardBody>

                                    <CardHeader className="pb-4 pt-2 px-8 flex-col items-start">
                                        <Skeleton
                                            className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                            isLoaded={isLoaded}
                                        >
                                            <h4 className="font-bold gap-6 text-2xl text-center w-full my-6 ">{list.ProjectTitle}
                                            </h4>
                                        </Skeleton>
                                        <Skeleton
                                            className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                            isLoaded={isLoaded}
                                        >
                                            <p className="text-tiny uppercase font-bold mb-8">
                                                {list.ProjectShortDesc}
                                            </p>
                                        </Skeleton>

                                        <p className="text-white w-full inline-flex mb-2">Total Raised</p>
                                        <div className="flex w-full justify-between">
                                            <Skeleton
                                                className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                isLoaded={isLoaded}
                                            >
                                                <p className="text-white text-tiny flex-initial">
                                                    {list.raised ? list.raised : "-"} {saleToken}
                                                </p>

                                            </Skeleton>
                                            <Skeleton
                                                className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                isLoaded={isLoaded}
                                            >
                                                <p className="text-white text-tiny flex-initial">
                                                    {list.filledPercentage}%
                                                </p>
                                            </Skeleton>
                                        </div>
                                        <Progress className=" mb-8 mt-2 h-3 rounded-lg" isStriped color="secondary" value={list.filledPercentage} aria-label="Loading..." />
                                        <div className="grid grid-cols-2 grid-rows-2 gap-x-20 mb-8" >
                                            <div className="col-span-1 flex-initial">
                                                <small className="w-full inline-flex text-tiny text-white">Tokens Offered</small>
                                                <Skeleton
                                                    className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                    isLoaded={isLoaded}
                                                >
                                                    <small className="font-bold">{list.totalSupply}
                                                    </small>
                                                </Skeleton>
                                            </div>
                                            <div className="col-span-1 flex-initial">
                                                <small className="w-full inline-flex text-tiny text-white">Sale Price</small>
                                                <Skeleton
                                                    className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                    isLoaded={isLoaded}
                                                >
                                                    <small className="font-bold">
                                                        1 {saleToken} = {list.tokenPrice} {list.TokenSymbol}
                                                    </small >
                                                </Skeleton>

                                            </div>
                                            { 
                                            list.ProjectStatus=='In-progress' ? <div className="col-span-1 flex-initial">
                                            <small className="w-full inline-flex text-tiny text-white">Participants</small>
                                            <Skeleton
                                                className='rounded-3lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                isLoaded={isLoaded}
                                            >
                                                <small className="font-bold"> {(list.maxParticipants)}
                                                </small>
                                            </Skeleton>

                                        </div> :
                                            <div className="col-span-1 flex-initial">
                                                <small className="w-full inline-flex text-tiny text-white">Tokens Remaining</small>
                                                <Skeleton
                                                    className='rounded-3lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                    isLoaded={isLoaded}
                                                >
                                                    <small className="font-bold"> {list.totalSupply - list.SetTotalTokenSold}
                                                    </small>
                                                </Skeleton>

                                            </div>
                                            }
                                            
                                            <div className="col-span-1 flex-initial">
                                                <small className="w-full inline-flex text-tiny text-white">Sesion End Date</small>
                                                <Skeleton
                                                    className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                    isLoaded={isLoaded}
                                                >
                                                    <small className="font-bold">
                                                        {timeConverter(list.EndTime)}
                                                    </small>
                                                </Skeleton>

                                            </div>
                                        </div>
                                        <Skeleton
                                            className=' bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                            isLoaded={isLoaded}
                                        >
                                            <Button className="w-full bg-primary-PAROT font-semibold text text-[14px] border-[2px] border-primary-PAROT hover:bg-primary-btnHover"
                                                // onPress={() => settingList(list)}

                                                href="#"><Link href={`/ido/${list.LaunchPoolAddress}`}> LEARN MORE</Link></Button>
                                        </Skeleton>
                                    </CardHeader>

                                </Card>
                              

                            </div>

  )
}

export default IdoCard