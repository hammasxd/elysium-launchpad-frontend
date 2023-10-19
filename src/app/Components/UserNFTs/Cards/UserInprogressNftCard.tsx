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

function UserInprogressNftCard({ poolName, nft, index, isLoaded, isLoadedImage }: { poolName: string, nft: NFTObject, index: number, isLoaded: boolean, isLoadedImage: boolean }) {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const sdk = useSDK();
    const nftAbi = nftPool_ABI();
    const walletAddress = useAddress();
    const [boughtNfts, setBoughtNfts] = useState(0);
    const tokenLocks = nft.TokenLocks;


    const userBoughtNfts = async () => {
        const nftPool = await sdk?.getContractFromAbi(nft.NFTPoolAddress, nftAbi).then(async (a) => {
            await a.call('getUserCntLocksForToken', [walletAddress]).then((result: any) => {
                let inString = result?.toString();
                setBoughtNfts(result?.toString());
            })
        })

    }
    useEffect(() => {
        if (walletAddress) {
            userBoughtNfts();
        }


    }, [walletAddress])

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
                    <Divider className='my-5'/>

                    <div className="w-full flex flex-col gap-1 mb-5">
                        <small className=" text-center w-full text-tiny text-white">NFT Contract Address</small>

                        <Snippet
                            symbol=''
                            variant='flat'
                            color='primary'
                            className=" bg-transparent p-0"
                        >{nft.nftContractAddress.substring(0, 15) + '...' + nft.nftContractAddress.substring(nft.NFTPoolAddress.length - 4)}</Snippet>


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
                                            tokenLocks.map((item: any, index: number) => {
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
                                                                <Button className=' cursor-not-allowed bg-primary-PAROT bg-opacity-50 border-[2px] border-primary-PAROT' disabled>UNLOCK/CLAIM</Button>

                                                            </CardFooter>
                                                        </Card>
                                                    </div>

                                                )
                                            })
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

export default UserInprogressNftCard