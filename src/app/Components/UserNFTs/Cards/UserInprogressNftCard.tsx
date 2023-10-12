'use client'
import ImagesURL from '@/app/constants/ImagesURL'
import { printCountdownOther} from '@/app/constants/helper'
import { NFTObject } from '@/app/constants/types'
import { Button, Card, CardBody, CardHeader, Link, Progress, Skeleton,Image, Snippet, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent } from '@nextui-org/react'
import React, { useState } from 'react'

function UserInprogressNftCard({poolName,nft,index,isLoaded,isLoadedImage}:{poolName:string,nft:NFTObject,index:number,isLoaded:boolean,isLoadedImage:boolean}) {
    console.log('nft object endtimee : ',nft.EndTime)
    const [isOpenModal,setIsOpenModal]=useState(false)
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

           
            <div className="grid grid-cols-2 grid-rows-1 gap-x-10 self-center mb-8" >
                <div className="col-span-1 flex-row">
                    <small className="w-full inline-flex text-tiny text-white">Sesion Join Ends In</small>
                    
                        <>                        
                        
                        {
                          printCountdownOther(
                              `timer${nft.NFTPoolAddress}`,
                              new Date(
                                Number(nft.EndTime) * 1000
                              ).toString()
                            )}


                            </>

                        <small className="font-bold" id={`timer${nft.NFTPoolAddress}`}>
                        </small>
                    
                </div>
                <div className="col-span-1 flex-row">
                    <small className="w-full inline-flex text-tiny text-white">Unlock In</small>
                    
                        <>                        
                        
                        {
                          printCountdownOther(
                              `timer-unlock-${nft.NFTPoolAddress}`,
                              new Date(
                                Number(nft.UnlockTime) * 1000
                              ).toString()
                            )}


                            </>

                        <small className="font-bold" id={`timer-unlock-${nft.NFTPoolAddress}`}>
                        </small>
                    
                </div>
                
               
               
            </div>
            <div className="w-full flex flex-col gap-1 mb-5">
                    <small className=" text-center w-full text-tiny text-white">NFT Contract Address</small>
                    
                       <Snippet 
                                             symbol=''
                                             variant='flat'
                                             color='primary'
                                             className=" bg-transparent p-0"
                                             >{nft.NFTPoolAddress.substring(0, 15)+'...'+nft.NFTPoolAddress.substring(nft.NFTPoolAddress.length - 4)}</Snippet>
                   

                </div>
            
            <div className='flex flex-row gap-5 justify-center w-full'>
                <Button  onPress={()=> setIsOpenModal(true)} className="w-full bg-primary text-slate-50 font-semibold text-[14px] border-[2px] border-primary hover:bg-opacity-50  "> LOCK DETAILS</Button>
                                {
                                    isOpenModal && 
                                    <Modal
                                    backdrop='blur'
                                    isOpen={isOpenModal} 
                                    onOpenChange={()=>setIsOpenModal(false)}
                                    placement="top-center"
                                    className='bg-primary-50 bg-opacity-70 backdrop-blur'
                                    >
                                        <ModalContent>
                                        <ModalHeader className='w-full flex flex-col justify-center'>
                                            <div className='flex flex-col gap-5 justify-center content-center items-center'>
                                            <Image
                                            src={ImagesURL[`${nft.NFTPoolType}`]}
                                            width={50}
                                            height={50}
                                            />
                                            <h1>{nft.NFTPoolType}-PYR</h1>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody>
                                    <div className='grid grid-cols-2 grid-rows-2'>
                                        <div>
                                            <p></p>
                                        </div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                        </ModalBody>
                                        <ModalFooter>

                                        </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                }





<Button className="w-full bg-primary-PAROT text-slate-50 font-semibold text-[14px] border-[2px] border-primary-PAROT hover:bg-primary-btnHover"
                    

><Link href={`/nftLaunchpad/lpTokens/${nft.NFTPoolType}/${nft.NFTPoolAddress}`}  className=' text-white'> LEARN MORE</Link></Button>
            

</div>
        </CardHeader>

    </Card>
  

</div>
  )
}

export default UserInprogressNftCard