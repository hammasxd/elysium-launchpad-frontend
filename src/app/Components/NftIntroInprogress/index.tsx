import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import PixelVerse from '../../assets/images/PixelVerse.png';
import NoActive from '../../assets/images/no-active-nft.png'
import { baseUrl } from '../../constants/baseUrl';
import NftCard from '../Cards/NftCard';
import { Spinner ,Link, Image} from '@nextui-org/react';
import { useSDK } from '@thirdweb-dev/react';
import { nftPool_ABI } from '@/app/constants/info';
import NFTInprogressCard from '../Cards/NFTInprogressCard';

const NftIntroInprogress = ({poolName,IntroTitle,learnMore,bgImageSrc}:any) => {
    let PoolName = poolName;
    const [isLoaded,setIsLoaded]=useState(false)
    const [isLoadedImage,setIsLoadedImage]=useState(false)
    const [upcommingNftPool, setupcommingNftPool] = useState([]);
    const [status, setStatus] = useState("");
    const sdk=useSDK();
    const nftPoolAbi=nftPool_ABI();
    let nftPool;
    const getUpcommingNFTPools = () => {
        let poolArray :any= [];
    
        try {
          axios
            .post(`${baseUrl}/firstFourActiveNftPool`, {
              NFTPoolType: PoolName,
            })
            .then(async (response) => {
              poolArray = await response.data.data;
              if (poolArray == "" || poolArray == null) {
                setStatus("In-progress");
                setupcommingNftPool(poolArray);
              } else {
                for (var i = 0; i < poolArray.length; i++) {
                  if (poolArray[i]) {
                    let address = poolArray[i].NFTPoolAddress;
                    try {
                      nftPool =await sdk?.getContractFromAbi(address,nftPoolAbi);
                    } catch (err) {
                      continue;
                    }
                    
                    await nftPool?.call('totalNFTSoldInAllTier').then((result)=>{
                      poolArray[i].Purchased = result.toString();
                    });
                    
                    await nftPool?.call('totalPoolParticipant').then((result)=>{
                      poolArray[i].Participants = result;
                    })
                    
    
                    let filledPercentage =
                      (poolArray[i].Purchased / poolArray[i].NFTMaxCap) * 100;
                    poolArray[i].FilledPercentage = filledPercentage;
                  } else {
                    setStatus("In-progress");
                    setupcommingNftPool(poolArray);
                  }
                }
                setupcommingNftPool(poolArray);
              }
              setupcommingNftPool(poolArray);
              setIsLoaded(true);
              setIsLoadedImage(true);
            })
            .catch((err) => {
              setStatus("In-progress");
              setupcommingNftPool(poolArray);
            });
        } catch (err) {
          throw err;
        }
      };
   

    useEffect(() => {
        getUpcommingNFTPools();
        
    }, [])

    return (
        <section 
            className=" flex flex-col  mt-10 mb-10"
        >

            <div className=" w-full m-auto text-center">
                <h3 className=" text-7xl font-bold">{IntroTitle}</h3>
            </div>
            <div className="flex  gap-10 z-40  mt-20 mx-auto h-auto items-center justify-center top-0 inset-x-0 mb-20 bg-transparent capitalize">
                {upcommingNftPool.length > 0 ? (
                    upcommingNftPool.map((item: any, index) => {
                        return (

                            <NFTInprogressCard key={index} poolName={poolName} index={index} nft={item} isLoaded={isLoaded} isLoadedImage={isLoadedImage}/>
                        );
                    } )
                    
                    
                ) : upcommingNftPool.length == 0 && status == "In-progress" ? (
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
                {upcommingNftPool.length > 0 ? (
                    <div  className="col-md-12 text-center">
                        <Link
                            className=" text-primary-PAROT underline "
                            href={learnMore}
                        >
                            View More
                        </Link>
                    </div>
                ) : upcommingNftPool.length == 0 && status == "In-progress" ? null : (
                    <div className="w-full text-center content-center">
                        <Spinner className=" mx-auto" />
                    </div>
                )}
            </div>

        </section>

    )

}

export default NftIntroInprogress;

