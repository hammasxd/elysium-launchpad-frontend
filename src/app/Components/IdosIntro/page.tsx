import React, { useState, useEffect } from "react";
import axios from "axios";
import { Ido_ABI } from "../../constants/info";
import { baseUrl, RPC_URL, saleToken } from "../../constants/baseUrl";
import { timeConverter } from "../../constants/helper";
import { useRouter } from "next/navigation";
import completed from '../../../assets/images/no-completed-IDO.png'
import { useSDK, useWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import { Card, CardFooter, Button, Image, CardBody, CardHeader, Divider, Progress, Spinner, Skeleton, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { utils } from "ethers";
let IDO_ABI: any = Ido_ABI();


const IdoIntro = ({ apiUrl, apiUrlPaginated, IntroTitle, bgImageSrc, key }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalList, setModalList] = useState([]);
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
        <section
            className=" flex flex-col  mt-10 mb-10"
        >
            
                <div className=" w-full m-auto text-center">
                    <h3 className=" text-7xl font-bold">{IntroTitle}</h3>
                </div>
                <div className="flex  gap-10 z-40 w-1/2 mt-20 mx-auto h-auto items-center justify-center top-0 inset-x-0 mb-20 bg-transparent capitalize">
                    {ShowCompleted.length > 0 ? (
                        ShowCompleted.map((list: any, index) => {
                            return (
                                <div >
                                    <Card key={index} className=" pb-4 w-96 bg-transparent backdrop-brightness-125 ">

                                        <CardBody className="overflow-visible py-0 w-full px-0 rounded-none">
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
                                            <h4 className="font-bold gap-6 text-2xl text-center w-full my-6 "> <Skeleton
                                                className='rounded-2xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                isLoaded={isLoaded}
                                            > {list.ProjectTitle}
                                            </Skeleton></h4>


                                            <p className="text-tiny uppercase font-bold mb-8">
                                                <Skeleton
                                                    className='rounded-2xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                    isLoaded={isLoaded}
                                                >{list.ProjectShortDesc}
                                                </Skeleton></p>

                                            <p className="text-white w-full inline-flex mb-2">Total Raised</p>
                                            <div className="flex w-full justify-between">

                                                <p className="text-white text-tiny flex-initial">
                                                    <Skeleton
                                                        className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                        isLoaded={isLoaded}
                                                    >{list.raised ? list.raised : "-"} {saleToken}
                                                    </Skeleton></p>



                                                <p className="text-white text-tiny flex-initial">
                                                    <Skeleton
                                                        className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                        isLoaded={isLoaded}
                                                    >{list.filledPercentage}%
                                                    </Skeleton></p>

                                            </div>
                                            <Progress className=" mb-8 mt-2 h-3 rounded-lg" isStriped color="secondary" value={list.filledPercentage} aria-label="Loading..." />
                                            <div className="grid grid-cols-2 grid-rows-2 gap-x-20 mb-8" >
                                                <div className="col-span-1 flex-initial">
                                                    <small className="w-full inline-flex text-tiny text-white">Tokens Offered</small>

                                                    <small className="font-bold"><Skeleton
                                                        className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                        isLoaded={isLoaded}
                                                    >{list.totalSupply}
                                                    </Skeleton></small>

                                                </div>
                                                <div className="col-span-1 flex-initial">
                                                    <small className="w-full inline-flex text-tiny text-white">Sale Price</small>

                                                    <small className="font-bold">
                                                        <Skeleton
                                                            className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                            isLoaded={isLoaded}
                                                        >1 {saleToken} = {list.tokenPrice} {list.TokenSymbol}
                                                        </Skeleton></small >

                                                </div>
                                                <div className="col-span-1 flex-initial">
                                                    <small className="w-full inline-flex text-tiny text-white">Tokens Remaining</small>

                                                    <small className="font-bold"> <Skeleton
                                                        className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                        isLoaded={isLoaded}
                                                    > {list.totalSupply - list.SetTotalTokenSold}
                                                    </Skeleton></small>

                                                </div>
                                                <div className="col-span-1 flex-initial">
                                                    <small className="w-full inline-flex text-tiny text-white">Sesion End Date</small>

                                                    <small className="font-bold">
                                                        <Skeleton
                                                            className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                            isLoaded={isLoaded}
                                                        >{timeConverter(list.EndTime)}
                                                        </Skeleton></small>

                                                </div>
                                            </div>
                                            <Skeleton
                                                className=' bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
                                                isLoaded={isLoaded}
                                            >
                                                <Button className="w-full bg-primary-PAROT font-semibold text text-[14px] border-[2px] border-primary-PAROT hover:bg-primary-btnHover"
                                                    onPress={() => settingList(list)}

                                                    href="#"> LEARN MORE</Button>
                                            </Skeleton>
                                        </CardHeader>

                                    </Card>
                                    {/* fdsfdf */}



                                  













                                </div>
                            );
                        })
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
                        <div className="col-md-12 text-center">
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






















////{ modalList!=null ?<Modal
// size="full"
// isOpen={isOpen}
// onClose={onClose}
// scrollBehavior="normal"
// className="p-10 backdrop-blur bg-transparent"
// >
// <ModalContent>
//     {(onClose) => (
//         <>
//             <ModalHeader className=" flex m-0 p-0 justify-center  gap-8">
//                 <Image
//                     src={modalList.TokenImageURL}
//                     width={50}
//                     height={50}
//                     className=" flex-col rounded-full"
//                 />
//                 <h1 className="flex-col text-4xl">
//                     {modalList.ProjectTitle}
//                 </h1>
                
//                 <p className=" flex-col text-2xl uppercase">
//                     {modalList.ProjectShortDesc}
//                 </p>
//             </ModalHeader>

//             <ModalBody className="grid grid-cols-2 grid-rows-2 gap-8 mt-10 px-20">
                
//                     <div className="">
//                         <Image
//                             alt="Card background"
//                             width={700}
//                             src={`data:image/png;base64,${modalList.base64}`}
//                         />
//                     </div>
//                     <Card key={index} className=" text-white bg-primary-50  py-5 px-10 rounded-3xl ">
//                         <CardHeader className="  text-white flex-col items-start ">
//                             <p className="  text-white w-full inline-flex mb-2 text-l">Total Raised</p>
//                             <div className="flex w-full justify-between">
//                                 <p className="text-white text-xl font-bold flex-initial ">
//                                     <Skeleton
//                                         className='rounded-3xl bg-primary-400  before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
//                                         isLoaded={isLoaded}
//                                     >{modalList.raised ? modalList.raised : "-"} {saleToken}
//                                     </Skeleton>
//                                 </p>
//                                 <p className="text-white text-xl font-bold flex-initial">
//                                     <Skeleton
//                                         className='rounded-3xl  bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
//                                         isLoaded={isLoaded}
//                                     >{modalList.filledPercentage}%
//                                     </Skeleton></p>

//                             </div>
//                             <Progress className=" mb-8 mt-10 h-3 rounded-lg " isStriped color="secondary" value={modalList.filledPercentage} aria-label="Loading..." />
//                             <div className="grid grid-cols-2 grid-rows-2 gap-x-20 mb-8" >
//                                 <div className="col-span-1 flex-initial">
//                                     <small className="w-full inline-flex text-lg text-white">Tokens Offered</small>

//                                     <small className="font-bold text-lg "><Skeleton
//                                         className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
//                                         isLoaded={isLoaded}
//                                     >{modalList.totalSupply}
//                                     </Skeleton></small>

//                                 </div>
//                                 <div className="col-span-1 flex-initial">
//                                     <small className="w-full inline-flex text-lg text-white">Sale Price</small>

//                                     <small className="font-bold text-lg">
//                                         <Skeleton
//                                             className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
//                                             isLoaded={isLoaded}
//                                         >1 {saleToken} = {modalList.tokenPrice} {modalList.TokenSymbol}
//                                         </Skeleton></small >

//                                 </div>
//                                 <div className="col-span-1 flex-initial">
//                                     <small className="w-full inline-flex text-lg text-white">Tokens Remaining</small>

//                                     <small className="font-bold text-lg "> <Skeleton
//                                         className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
//                                         isLoaded={isLoaded}
//                                     > {modalList.totalSupply - modalList.SetTotalTokenSold}
//                                     </Skeleton></small>

//                                 </div>
//                                 <div className="col-span-1 flex-initial">
//                                     <small className="w-full inline-flex text-lg text-white">Sesion End Date</small>

//                                     <small className="font-bold text-lg">
//                                         <Skeleton
//                                             className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
//                                             isLoaded={isLoaded}
//                                         >{timeConverter(modalList.EndTime)}
//                                         </Skeleton></small>

//                                 </div>
//                             </div>

//                         </CardHeader>
                

//                     </Card>
               
//                     <div className="">
//                         <h1 className=" text-2xl font-bold" >ABOUT THE PROJECT</h1>
//                         <p>{modalList.AboutProject}</p>
//                     </div>
//                     <div className="">
//                     <Card key={index} className=" bg-transparent flex-col py-5 px-10 rounded-3xl ">
//                         <CardHeader className="flex-col items-start ">
//                             <h1 className="  text-white w-full text-center mb-2 text-5xl font-bold">Token Metrics</h1>
//                             <div className="flex w-full justify-between">
//                                 <p className="text-white text-xl font-bold flex-initial ">
//                                     <Skeleton
//                                         className='rounded-3xl bg-primary-400  before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
//                                         isLoaded={isLoaded}
//                                     >{modalList.raised ? modalList.raised : "-"} {saleToken}
//                                     </Skeleton>
//                                 </p>
//                                 <p className="text-white text-xl font-bold flex-initial">
//                                     <Skeleton
//                                         className='rounded-3xl  bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
//                                         isLoaded={isLoaded}
//                                     >{modalList.filledPercentage}%
//                                     </Skeleton></p>

//                             </div>
                           
//                             <div className="grid grid-cols-2 grid-rows-2 gap-x-20 mb-8" >
//                                 <div className="col-span-1 flex-initial">
//                                     <small className="w-full inline-flex text-lg text-white">Tokens Offered</small>

//                                     <small className="font-bold text-lg "><Skeleton
//                                         className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
//                                         isLoaded={isLoaded}
//                                     >{modalList.totalSupply}
//                                     </Skeleton></small>

//                                 </div>
//                                 <div className="col-span-1 flex-initial">
//                                     <small className="w-full inline-flex text-lg text-white">Sale Price</small>

//                                     <small className="font-bold text-lg">
//                                         <Skeleton
//                                             className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
//                                             isLoaded={isLoaded}
//                                         >1 {saleToken} = {modalList.tokenPrice} {modalList.TokenSymbol}
//                                         </Skeleton></small >

//                                 </div>
//                                 <div className="col-span-1 flex-initial">
//                                     <small className="w-full inline-flex text-lg text-white">Tokens Remaining</small>

//                                     <small className="font-bold text-lg "> <Skeleton
//                                         className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
//                                         isLoaded={isLoaded}
//                                     > {modalList.totalSupply - modalList.SetTotalTokenSold}
//                                     </Skeleton></small>

//                                 </div>
//                                 <div className="col-span-1 flex-initial">
//                                     <small className="w-full inline-flex text-lg text-white">Sesion End Date</small>

//                                     <small className="font-bold text-lg">
//                                         <Skeleton
//                                             className='rounded-3xl bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
//                                             isLoaded={isLoaded}
//                                         >{timeConverter(modalList.EndTime)}
//                                         </Skeleton></small>

//                                 </div>
//                             </div>

//                         </CardHeader>
                

//                     </Card>
//                     </div>

//             </ModalBody>

//         </>
//     )}
// </ModalContent>
// </Modal> :'' }  
