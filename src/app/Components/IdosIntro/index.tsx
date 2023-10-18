'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Ido_ABI } from "../../constants/info";

import { useSDK, useWallet } from "@thirdweb-dev/react";
import Link from "next/link";

import {  Image,Spinner} from "@nextui-org/react";
import { utils } from "ethers";
import IdoCard from "../Cards/IdoCard";
let IDO_ABI: any = Ido_ABI();


const IdoIntro = ({ apiUrl, apiUrlPaginated, IntroTitle, bgImageSrc,learnMore }: { apiUrl: string, apiUrlPaginated: string, IntroTitle: string, bgImageSrc: string,learnMore:any}) => {
 

    const sdk = useSDK()
    let IDO3;
    const [ShowCompleted, setShowCompleted] = useState([]);
    const [CompletedIDOs, SetCompletedIDO] = useState([]);
    const [Status, setStatus] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedImage, setIsLoadedImage] = useState(false);

    //useEffect to get First #3 IDOs from Database
   
    //useEffect to get All Completed IDOs from Database
    useEffect(
        () => {
            var array: any = [];
            try {
                axios
                    .post(`${apiUrlPaginated}`, {
                        offset: 0,
                        limit: 3,
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
                                        array[iteration].maxParticipants =parseInt(a._hex, 16);
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
                        setIsLoaded(true)
                        setIsLoadedImage(true)
                    });
            } catch (err) {
                setStatus("In-progress");
            }
        },
        [5000] //useEffect will run only one time
        //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
    );
    return (
        <section 
            className=" flex flex-col  mt-10 mb-10"
        >

            <div className=" w-full m-auto text-center">
                <h3 className=" text-7xl font-bold">{IntroTitle}</h3>
            </div>
            <div className="flex  gap-10 z-40  mt-20 mx-auto h-auto items-center justify-center top-0 inset-x-0 mb-20 bg-transparent capitalize">
                {ShowCompleted.length > 0 ? (
                    ShowCompleted.map((list: any, index) => {
                        return (

                                <IdoCard key={index} index={index} list={list} isLoaded={isLoaded} isLoadedImage={isLoadedImage}/>

                        );
                    } )
                    
                    
                ) : ShowCompleted.length == 0 && Status == "In-progress" ? (
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
                {ShowCompleted.length > 0 ? (
                    <div  className="col-md-12 text-center">
                        <Link
                            className=" text-primary-PAROT underline "
                            href={learnMore}
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



















