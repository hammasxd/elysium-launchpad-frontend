'use client'
import { Button, Card, CardBody, CardFooter, CardHeader,Divider,Image, Progress } from '@nextui-org/react'
import { Butterfly_Kids } from 'next/font/google'
import buttonBg from '../../assets/images/upcoming.svg'
import React, { useEffect, useState } from 'react'
import { timeConverter } from '@/app/constants/helper'
import { useAddress, useSDK } from '@thirdweb-dev/react'
import { nftPool_ABI } from '@/app/constants/info'
import {baseUrl} from '@/app/constants/baseUrl'
import axios from 'axios'
import { toast } from 'react-toastify'

function NftDetailsCard({nftData}:any) {
    const [purchased,setPurchased]=useState<any>('');
    const [participant,setParticipant]=useState<any>();
    const [filledPercentage,setFilledPercentage]=useState<any>();
    const [liked,setLiked]=useState<boolean>(false)
    const WalleAddress=useAddress();
    const sdk=useSDK();
    let nftAdditional=nftData;
    let address = nftAdditional.NFTPoolAddress;
    const nftPool =async () =>{
        console.log(address)
        await sdk?.getContractFromAbi(address,nftPool_ABI()).then(async (a)=>{
            await a?.call('totalNFTSoldInAllTier').then((result:any)=>{
                let inInt=parseInt(result._hex,16)
                setPurchased(inInt) 
              });
              await a?.call('totalPoolParticipant').then((result:any)=>{
                let inInt=parseInt(result._hex,16)
                setParticipant(inInt);
              })
              let filledPercentage =
                (purchased / parseFloat(nftData.NFTMaxCap)) * 100;
                console.log('purchased : ',purchased,"maxCap : ",nftAdditional.NFTMaxCap );
              setFilledPercentage(filledPercentage);

        })
       
        
       
      }
      useEffect(() => {
        if(WalleAddress){
            alreadyLikeNft();
        }
       
       nftPool();
      }, [WalleAddress,liked])
//like nft
const likeNft=()=> {
    axios
      .post(`${baseUrl}/likeNFT`, {
        userAddress: WalleAddress,
        NFTPoolAddress: nftAdditional.NFTPoolAddress,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.success == true) {
          toast.success("Nft added to Liked Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "existtier",
          });
          setLiked(true);
        } else {
          toast.error("Failed to like!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "approveProgressErr",
          });
        }
      })
      .catch((err) => {
        toast.error("Failed to like!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: "approveProgressErr",
        });
      });
  }
  const unLikeNft=()=> {
    axios
      .post(`${baseUrl}/unlikeNFT`, {
        userAddress: WalleAddress,
        NFTPoolAddress: nftAdditional.NFTPoolAddress,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.success == true) {
          toast.success("Nft removed from Liked Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLiked(false);
        } else {
          toast.error("Failed to Unlike!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        toast.error("Failed to Unlike!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  const alreadyLikeNft=()=> {
    axios
      .post(`${baseUrl}/alreadyLikedNft`, {
        userAddress: WalleAddress,
        NFTPoolAddress: nftData.NFTPoolAddress,
      })
      .then((res) => {
        // console.log(res.data.success);
        console.log('cheking like : ' ,res.data.success )
        if (res.data.success == true) {
            
          setLiked(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }



      

    const HeartIcon = ({
        fill = 'red',
        filled,
        size,
        height,
        width,
        label,
        ...props
      }:any) => {
        return (
          <svg
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            fill={filled ? fill : '#fff'}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <path
              d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
              stroke={fill}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      };
      const ShareIcon = ({
        fill = 'red',
        filled,
        size,
        height,
        width,
        label,
        ...props
      }:any) => {
        return (
            <svg
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            fill={filled ? fill : 'none'}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <path d="M16.70703,2.29297l-1.41406,1.41406l2.29297,2.29297h-0.58594c-6.06341,0 -11,4.93659 -11,11v1h2v-1c0,-4.98259 4.01741,-9 9,-9h0.58594l-2.29297,2.29297l1.41406,1.41406l4.70703,-4.70703zM2,8v1v10c0,1.64497 1.35503,3 3,3h14c1.64497,0 3,-1.35503 3,-3v-1v-1h-2v1v1c0,0.56503 -0.43497,1 -1,1h-14c-0.56503,0 -1,-0.43497 -1,-1v-10v-1z"></path>
            </svg>
        );
      };
      const CompletedIcon = ({
        fill = 'red',
        filled,
        size,
        height,
        width,
        label,
        ...props
      }:any) => {
        return (
            <svg
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            fill={filled ? fill : 'none'}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
           
              <path id="Path_45507" data-name="Path 45507" d="M6,2a.8.8,0,0,1,.8.8v.8h6.4V2.8a.8.8,0,1,1,1.6,0v.8h.8A2.4,2.4,0,0,1,18,6v5.6a.8.8,0,1,1-1.6,0V8.4H3.6v7.2a.8.8,0,0,0,.8.8h4a.8.8,0,1,1,0,1.6h-4A2.4,2.4,0,0,1,2,15.6V6A2.4,2.4,0,0,1,4.4,3.6h.8V2.8A.8.8,0,0,1,6,2ZM4.4,5.2a.8.8,0,0,0-.8.8v.8H16.4V6a.8.8,0,0,0-.8-.8Z"/>
              <path id="Path_45508" data-name="Path 45508" d="M18.234,17.366a.8.8,0,0,1,1.131-1.131l1.6,1.6a.8.8,0,0,1,0,1.131l-1.6,1.6a.8.8,0,0,1-1.131-1.131L19.269,18.4Z" transform="translate(-3.2 -2.8)" />
              <path id="Path_45509" data-name="Path 45509" d="M13.234,16.234a.8.8,0,0,0,0,1.131L14.269,18.4l-1.034,1.034a.8.8,0,0,0,1.131,1.131l1.6-1.6a.8.8,0,0,0,0-1.131l-1.6-1.6A.8.8,0,0,0,13.234,16.234Z" transform="translate(-2.2 -2.8)" />
            
          </svg>
          
        );
      };

      const buyNFT=()=>{

      }
  return (
        <Card className='bg-transparent shadow-none p-5'>
<CardHeader>
<div className='flex flex-row justify-between w-full'>
        <div className='conmpletedButton'>
            <Button className=' text-lg bg-primary-50' startContent={<CompletedIcon/>} >{nftData.ProjectStatus}</Button>
        </div>
        <div className='LikeShare flex flex-row gap-5'>
        {liked ? <Button onPress={unLikeNft} className=' bg-white' isIconOnly  aria-label="Like">
        <HeartIcon fill={ 'red' } filled />
      </Button> : 
      <Button onPress={likeNft} className=' bg-white' isIconOnly  aria-label="Like">
      <HeartIcon fill={'#000'} filled />
    </Button> 
      } 
      <Button className=' bg-primary-50' isIconOnly color="primary" aria-label="Share">
        <ShareIcon/>
      </Button>
        </div>
    </div>
</CardHeader>
<CardBody className='flex flex-col gap-5'>

<div className='title'>
    <p className=' text-lg'>{nftData.ProjectShortDesc}</p>
</div>
<div className='Name'>
    <h1 className=' text-2xl'>{nftData.ProjectTitle}</h1>
</div>
<div className='closingDate' >
<p>INO Closed: {timeConverter(nftData.EndTime)}</p>
</div>
<div className='totalBought flex flex-row justify-between w-full'>
    <h1>{purchased} / {nftAdditional.NFTMaxCap}</h1>
    <h1>{filledPercentage}%</h1>
</div>
<Progress isStriped color="secondary" value={parseFloat(filledPercentage as string)} aria-label="Loading..."/>
<Divider/>
<div className='salePrice flex flex-col gap-3'>
    <p>Sale Price</p>
    <h1>{nftAdditional.AmounttoLock} {nftAdditional.NFTPoolType}-PYR</h1>

</div>
<div>
    <Button onPress={buyNFT}>Buy</Button>
</div>
</CardBody>
<CardFooter>

</CardFooter>

        </Card>
    )
}

export default NftDetailsCard