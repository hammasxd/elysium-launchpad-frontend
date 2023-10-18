'use client'
import ImagesURL from '@/app/constants/ImagesURL'
import { printCountdownOther, timeConverter } from '@/app/constants/helper'
import { nftPool_ABI } from '@/app/constants/info'
import { NFTObject } from '@/app/constants/types'
import { Button, Card, CardBody, CardHeader, Link, Progress, Skeleton, Image, Snippet, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, CardFooter, Divider } from '@nextui-org/react'
import { useAddress, useSDK } from '@thirdweb-dev/react'
import React, { useEffect, useState } from 'react'
import Cursors from '../../Cursor/Cursors'
import Web3 from 'web3'
import { toast } from 'react-toastify'
import { error } from 'console'

function UserCompletedNftCard({ poolName, nft, index, isLoaded, isLoadedImage,setRevalidation ,revalidation}: { poolName: string, nft: NFTObject, index: number, isLoaded: boolean, isLoadedImage: boolean,setRevalidation:any ,revalidation:boolean}) {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const sdk = useSDK();
    const nftAbi = nftPool_ABI();
    const walletAddress = useAddress();
    const tokenLocks = nft.TokenLocks;
    
    const [unlockStatus,setUnlockStatus] = useState(false);
    const withdrawandClaim = async (contractAddress:any, index:any, lockId:any, amount:any) => {
     

        let nftPool =await sdk?.getContractFromAbi(contractAddress,nftAbi).then(
            async (a)=>{
                toast.loading('Clain and Unlock in Progress', {
                    position: "top-right",
                    autoClose: false,
                    progress: undefined,
                    toastId: "claimProgress",
                  });
    
                    await a.call('withdrawAndClaim',[index,lockId,amount],{
                        gasLimit:7000000,
                    }).then(
                        (tx)=>{
                            setRevalidation(!revalidation);
                            toast.dismiss('claimProgress');
                            setIsOpenModal(false);
                            let poolNum = index + 1;
                        toast.success("Unlock and Claim Pool No. " + poolNum +" Successfully!", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          toastId: 'WithdrawSuccess',
                        });
                        
                        }
                    ).catch((error)=>{
                        toast.dismiss('claimProgress');
                        setIsOpenModal(false);
                        let poolNum = index + 1;
                        toast.error("Unlock and Claim Pool No. " + poolNum +" Failed!", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          toastId: 'WithdrawError',
                        });
                    })
            }
        ).catch((error)=>{
            toast.error('error invoking contract');
        })

       
    
    }

        useEffect(() => {
          if((new Date().getTime() / 1000)>nft.UnlockTime)
            setUnlockStatus(true);
        else{
            setUnlockStatus(false);
        }
        }, [])
        
   
    return (

        <div key={index}>
            <Card className=" py-4 w-[350px] bg-transparent backdrop-brightness-125 backdrop-blur  ">

                <CardBody className=" flex flex-row justify-center overflow-visible py-0 w-full px-0 rounded-r-2xl">
                    
                        <Image
                            alt="Card background"
                            className=" max-w-[300px] max-h-[218px] min-h-[218px] rounded-r-2xl m-0 p-0"
                            src={`${nft.NFTImageURL}`}
                            width={250}

                        />
                    
                </CardBody>
<Divider className='my-5'/>
                <CardHeader className=" mx-5 self-center  flex-col items-start">
                    
                        <p className="text-tiny uppercase font-bold ">
                            {nft.ProjectTitle}
                        </p>

                   
                    
                        <h4 className="font-bold text-2xl w-full ">{nft.NFTName}
                        </h4>
                    
                        <Divider className='my-5'/>


                    <div className="grid grid-cols-2 grid-rows-1 gap-x-10 self-center" >
                        <div className="col-span-1 flex-row">
                            <small className="w-full inline-flex text-tiny text-white">Sesion Join Ended</small>

                            <>

                                {
                                  
                                           timeConverter( nft.EndTime)
                                     
                                    }


                            </>

                            <small className="font-bold" id={`timer${nft.NFTPoolAddress}`}>
                            </small>

                        </div>
                        <div className="col-span-1 flex-row">
                            <small className="w-full inline-flex text-tiny text-white">Unlock Date</small>

                            <>

                               { timeConverter( nft.UnlockTime)}


                            </>

                            <small className="font-bold" id={`timer-unlock-${nft.NFTPoolAddress}`}>
                            </small>

                        </div>



                    </div>
                    <Divider className='my-5'/>

                    <div className="w-full flex flex-col gap-1 mb-5">
                        <small className=" text-center w-full text-tiny text-white">NFT Contract Address</small>

                        <Snippet
                            symbol=''
                            variant='flat'
                            color='primary'
                            className=" bg-transparent p-0 text-[11px]"
                        >{nft.nftContractAddress}</Snippet>


                    </div>

                    <div className='flex flex-row gap-5 justify-center w-full'>
                        <Button onPress={() => setIsOpenModal(true)} className="w-full bg-primary text-slate-50 font-semibold text-[14px] border-[2px] border-primary hover:bg-opacity-50  "> LOCK DETAILS</Button>
                        {
                            isOpenModal &&
                            <Modal
                                backdrop='blur'
                                scrollBehavior='inside'
                                shouldBlockScroll={true}
                                isOpen={isOpenModal}
                                onOpenChange={() => setIsOpenModal(false)}
                                placement="top-center"
                                className='bg-primary-50 bg-opacity-70 backdrop-blur'
                            >
                                <ModalContent>
                                    <ModalHeader className='w-full flex flex-col justify-center'>
                                        <div className='flex flex-col gap-5 justify-center content-center items-center'>

                                            <h1>Your Farms</h1>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody>
                                        { 
                                        tokenLocks.length>0 ? tokenLocks.map((item: any, index: number) => {
                                            return (
                                                <div key={index} className=' flex flex-col flex-wrap'>
                                                    <Card key={index} className='bg-primary bg-opacity-10'>
                                                        <CardHeader className='flex flex-row gap-10'>
                                                            <div className='flex flex-row '>
                                                                <Image
                                                                    width={40}
                                                                    height={40}
                                                                    src={ImagesURL[`${nft.NFTPoolType}`]} />
                                                                <Image
                                                                    className='mt-[18px] -ml-[15px] bg-primary-50 rounded-full'
                                                                    width={40}
                                                                    height={40}

                                                                    src={ImagesURL['PYR']} />
                                                            </div>
                                                            <div className='-ml-[50px]'>
                                                                <h1 className=' font-bold'>{nft.NFTPoolType}-PYR</h1>
                                                            </div>
                                                        </CardHeader>
                                                        <CardBody className='grid grid-cols-3 grid-rows-2 align-middle items-center justify-center text-center '>
                                                            <h1>Locked Amount</h1>
                                                            <h1>Locked Date</h1>
                                                            <h1>Unlock Date</h1>
                                                            <p className=' font-bold text-gray-400'>{(Web3.utils.fromWei(item.lockAmount.toString(), "ether"))}</p>
                                                            <p className=' font-bold text-gray-400'>{timeConverter(item.lockTime)}</p>
                                                            <p className=' font-bold text-gray-400'>{timeConverter(item.unlockTime)}</p>

                                                        </CardBody>
                                                        <CardFooter className=' justify-end'>
                                                            <Button onPress={()=>{
                                                                withdrawandClaim(nft.NFTPoolAddress,index,item.lockId,item.lockAmount)
                                                                
                                                                }} className=' bg-primary-PAROT hover:bg-opacity-50 border-[2px] border-primary-PAROT' disabled={unlockStatus}>UNLOCK/CLAIM</Button>

                                                        </CardFooter>
                                                    </Card>
                                                </div>

                                            )
                                        }) 
                                        :
                                        <h1>NO LOCKS</h1>
                                            
                                        }






                                    </ModalBody>
                                    <ModalFooter className=' justify-center items-end'>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        }





                        <Button className="w-full bg-primary-PAROT text-slate-50 font-semibold text-[14px] border-[2px] border-primary-PAROT hover:bg-primary-btnHover"


                        ><Link href={`/nftLaunchpad/lpTokens/${nft.NFTPoolType}/${nft.NFTPoolAddress}`} className=' text-white'> LEARN MORE</Link></Button>



                    </div>
                </CardHeader>

            </Card>


        </div>
    )
}

export default UserCompletedNftCard