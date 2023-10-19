'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

import { baseUrl } from '../../constants/baseUrl';
import NftCard from '../Cards/NftCard';
import { Spinner ,Link, Image} from '@nextui-org/react';
import { useSDK } from '@thirdweb-dev/react';
import { nftPool_ABI } from '@/app/constants/info';

const NftIntroCompleted = ({poolName,IntroTitle,learnMore,bgImageSrc}:any) => {
    let PoolName = poolName;
   
    const [isLoaded,setIsLoaded]=useState(false)
    const [isLoadedImage,setIsLoadedImage]=useState(false)
    const [completedNFTPool, setCompletedNFTPool] = useState([]);
    const [status, setStatus] = useState("");
    const sdk=useSDK();
    const nftPoolAbi=nftPool_ABI();
    let nftPool;
    const getCompletedNFTPools = () => {
        let poolArray :any= [];
    
        try {
          axios
            .post(`${baseUrl}/firstFourCompletedNftPool`, {
              NFTPoolType: PoolName,
            })
            .then(async (response) => {
              poolArray = await response.data.data;
              if (poolArray == "" || poolArray == null) {
                setStatus("In-progress");
                setCompletedNFTPool(poolArray);
              } else {
                for (var i = 0; i < poolArray.length; i++) {
                  if (poolArray[i]) {
                    let address = poolArray[i].NFTPoolAddress;
                    try {
                      nftPool =await sdk?.getContractFromAbi(address,nftPoolAbi);
                    } catch (err) {
                      continue;
                    }
                    
                    await nftPool?.call('totalNFTSoldInAllTier').then((result:any)=>{
                      let inInt=parseInt(result._hex,16)

                      poolArray[i].Purchased = inInt;
                    });
                    
                    await nftPool?.call('totalPoolParticipant').then((result:any)=>{
                      let inInt=parseInt(result._hex,16)
                      poolArray[i].Participants = inInt;
                    })
                    
    
                    let filledPercentage =
                      (poolArray[i].Purchased / parseFloat(poolArray[i].NFTMaxCap)) * 100;
                    poolArray[i].FilledPercentage = filledPercentage;
                  } else {
                    setStatus("In-progress");
                    setCompletedNFTPool(poolArray);
                  }
                }
                setCompletedNFTPool(poolArray);
              }
              setCompletedNFTPool(poolArray);
              setIsLoaded(true);
              setIsLoadedImage(true);
            })
            .catch((err) => {
              setStatus("In-progress");
              setCompletedNFTPool(poolArray);

            });
        } catch (err) {
          throw err;
        }
      };

    useEffect(() => {
        getCompletedNFTPools();
        
    }, [])

    return (
        <section 
            className=" flex flex-col  mt-10 mb-10"
        >

            <div className=" w-full m-auto text-center">
                <h3 className=" text-7xl font-bold">{IntroTitle}</h3>
            </div>
            <div className="flex  gap-10 z-40  mt-20 mx-auto h-auto items-center justify-center top-0 inset-x-0 mb-20 bg-transparent capitalize">
                {completedNFTPool.length > 0 ? (
                    completedNFTPool.map((item: any, index) => {
                        return (

                            <NftCard key={index} poolName={poolName} index={index} nft={item} isLoaded={isLoaded} isLoadedImage={isLoadedImage}/>
                        );
                    } )
                    
                    
                ) : completedNFTPool.length == 0 && status == "In-progress" ? (
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
                {completedNFTPool.length > 0 ? (
                    <div  className="col-md-12 text-center">
                        <Link
                            className=" text-primary-PAROT underline "
                            href={learnMore}
                        >
                            View More
                        </Link>
                    </div>
                ) : completedNFTPool.length == 0 && status == "In-progress" ? null : (
                    <div className="w-full text-center content-center">
                        <Spinner className=" mx-auto" />
                    </div>
                )}
            </div>

        </section>

    )

}

export default NftIntroCompleted;

