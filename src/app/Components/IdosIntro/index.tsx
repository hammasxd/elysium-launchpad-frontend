'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Ido_ABI } from "../../constants/info";
import { saleToken } from "../../constants/baseUrl";
import { timeConverter } from "../../constants/helper";
import { useRouter } from "next/navigation";
import { useSDK, useWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import youtube from '../../assets/images/icon-youtube.svg'
import { Card, CardFooter, Button, Image, CardBody, CardHeader, Divider, Progress, Spinner, Skeleton, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Snippet } from "@nextui-org/react";
import { utils } from "ethers";
let IDO_ABI: any = Ido_ABI();


const IdoIntro = ({ apiUrl, apiUrlPaginated, IntroTitle, bgImageSrc,key }: { apiUrl: string, apiUrlPaginated: string, IntroTitle: string, bgImageSrc: string,key:number }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalList, setModalList]: any = useState(null);
    const settingList = (list: any) => {
        setModalList(list)
        onOpen()
    }

    const sdk = useSDK()
    console.log(apiUrl, apiUrlPaginated, IntroTitle, bgImageSrc);
    let IDO3;
    const [ShowCompleted, setShowCompleted] = useState([]);
    const [CompletedIDOs, SetCompletedIDO] = useState([]);
    const [Status, setStatus] = useState("");
    const navigate = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedImage, setIsLoadedImage] = useState(false);

    //useEffect to get First #3 IDOs from Database
    useEffect(
        () => {
            var array: any = [];

            try {
                axios
                    .get(`${apiUrl}`)
                    .then(async function (response) {
                        array = await response.data.data;
                        if (array == "" || array == null) {
                            array = [];
                            setStatus("In-progress");
                            setShowCompleted(array);
                        } else {
                            for (var iteration = 0; iteration <= array.length; iteration++) {
                                if (array[iteration]) {
                                    var address = await array[iteration].LaunchPoolAddress;
                                    try {
                                        IDO3 = sdk?.getContractFromAbi(address, IDO_ABI)
                                    } catch (err) {
                                        continue;
                                    }
                                    if (array[iteration].project_File != null) {
                                        array[iteration].base64 = btoa(
                                            new Uint8Array(
                                                array[iteration].project_File.data.data
                                            ).reduce(function (data, byte) {
                                                return data + String.fromCharCode(byte);
                                            }, "")
                                        );

                                    }
                                    var address = await array[iteration].LaunchPoolAddress;
                                    IDO3 = await sdk?.getContractFromAbi(address, IDO_ABI);
                                    await IDO3?.call('totalBUSDReceivedInAllTier').then(async (a) => {
                                        array[iteration].raised = utils.formatEther(await a)
                                    })


                                    await IDO3?.call('getParameters').then(async (a: any) => {
                                        array[iteration].maxCap = utils.formatEther(await a?.maxCap)
                                        array[iteration].tokenPrice = a.IdoTokenPrice / 100;
                                    })


                                    await IDO3?.call('getTotalParticipants').then(async (a: any) => {
                                        array[iteration].maxParticipants = a;
                                    })

                                    let TotalTokenSold =
                                        array[iteration].tokenPrice * array[iteration].raised;
                                    let filledPercentage =
                                        (TotalTokenSold / array[iteration].totalSupply) * 100;
                                    array[iteration].filledPercentage = filledPercentage;
                                    array[iteration].SetTotalTokenSold = TotalTokenSold;
                                    setShowCompleted(array);
                                } else {
                                    setStatus("In-progress");
                                    setShowCompleted(array);
                                }
                            }
                        }
                        setShowCompleted(array);
                        setIsLoadedImage(true);
                        setIsLoaded(true);
                    }).catch((err) => {
                        console.log(err)
                    });
            } catch (err) {
                setStatus("In-progress");
            }
        },
        [5000] //useEffect will run only one time
        //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
    );
    //useEffect to get All Completed IDOs from Database
    useEffect(
        () => {
            var array: any = [];
            try {
                axios
                    .post(`${apiUrlPaginated}`, {
                        offset: 0,
                        limit: 4,
                    })
                    .then(async function (response) {
                        console.log("api response : ",response.data.data)
                        array = await response.data.data;
                        if (array == "" || array == null) {
                            array = [];
                            setStatus("In-progress");
                        } else {
                            for (var iteration = 0; iteration <= array.length; iteration++) {
                                if (array[iteration]) {
                                    var address = await array[iteration].LaunchPoolAddress;
                                    try {
                                        IDO3 = sdk?.getContractFromAbi(address, IDO_ABI)
                                    } catch (err) {
                                        continue;
                                    }

                                    if (array[iteration].project_File != null) {
                                        array[iteration].base64 = btoa(
                                            new Uint8Array(
                                                array[iteration].project_File.data.data
                                            ).reduce(function (data, byte) {
                                                return data + String.fromCharCode(byte);
                                            }, "")
                                        );
                                    }

                                    var address = await array[iteration].LaunchPoolAddress;
                                    IDO3 = await sdk?.getContractFromAbi(address, IDO_ABI);
                                    await IDO3?.call('totalBUSDReceivedInAllTier').then(async (a) => {
                                        array[iteration].raised = utils.formatEther(await a)
                                    })


                                    await IDO3?.call('getParameters').then(async (a: any) => {
                                        array[iteration].maxCap = utils.formatEther(await a?.maxCap)
                                        array[iteration].tokenPrice = a.IdoTokenPrice / 100;
                                    })


                                    await IDO3?.call('getTotalParticipants').then(async (a: any) => {
                                        array[iteration].maxParticipants = a;
                                    })

                                    let TotalTokenSold =
                                        array[iteration].tokenPrice * array[iteration].raised;
                                    let filledPercentage =
                                        (TotalTokenSold / array[iteration].totalSupply) * 100;
                                    array[iteration].filledPercentage = filledPercentage;
                                    array[iteration].SetTotalTokenSold = TotalTokenSold;
                                    setShowCompleted(array);
                                } else {
                                    setStatus("In-progress");
                                    setShowCompleted(array);
                                }
                            }
                        }
                        SetCompletedIDO(array);
                    });
            } catch (err) {
                setStatus("In-progress");
            }
        },
        [5000] //useEffect will run only one time
        //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
    );
    console.log("here is all the data", ShowCompleted)
    return (
        <section key={key}
            className=" flex flex-col  mt-10 mb-10"
        >

            <div className=" w-full m-auto text-center">
                <h3 className=" text-7xl font-bold">{IntroTitle}</h3>
            </div>
            <div className="flex  gap-10 z-40  mt-20 mx-auto h-auto items-center justify-center top-0 inset-x-0 mb-20 bg-transparent capitalize">
                {ShowCompleted.length > 0 ? (
                    ShowCompleted.map((list: any, index) => {
                        return (
                            <div key={index}>
                                <Card  className=" pb-4 w-[350px] bg-transparent backdrop-brightness-125 ">

                                    <CardBody className=" overflow-visible py-0 w-full px-0 rounded-none">
                                        <Skeleton
                                            className=' bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                            isLoaded={isLoadedImage}
                                        >
                                            <Image
                                                alt="Card background"
                                                className=""
                                                src={`data:image/png;base64,${list.base64}`}
                                                width={400}
                                                height={218}

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

                        );
                    } )
                    
                    
                ) : CompletedIDOs.length == 0 && Status == "In-progress" ? (
                    <div className="w-full text-center items-center">
                        <Image
                            src={bgImageSrc}
                            className=" w-full"
                        />
                    </div>
                ) : (
                    <div className="loader"></div>
                )}
            </div>
          
            <div className="">
                {CompletedIDOs.length > 0 ? (
                    <div  className="col-md-12 text-center">
                        <Link
                            className=" text-primary-PAROT underline "
                            href={'#'}
                        >
                            View More
                        </Link>
                    </div>
                ) : ShowCompleted.length == 0 && Status == "In-progress" ? null : (
                    <div className="w-full text-center content-center">
                        <Spinner className=" mx-auto" />
                    </div>
                )}
            </div>

        </section>
    );
};

export default IdoIntro;



















