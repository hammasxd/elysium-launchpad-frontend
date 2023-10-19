'use client'
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader,Divider,Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import {  timeConverter } from '@/app/constants/helper'
import { useAddress, useSDK } from '@thirdweb-dev/react'
import { nftPool_ABI, token_ABI } from '@/app/constants/info'
import {baseUrl} from '@/app/constants/baseUrl'
import axios from 'axios'
import { toast } from 'react-toastify'
import lava from '../../assets/images/LAVA-PYR.png'
import Web3 from 'web3'
import { delay } from 'framer-motion'
import ImagesURL from '@/app/constants/ImagesURL'
import { useAppSelector } from '@/redux/store'
function NftDetailsCard({nftData}:any) {

    const [purchased,setPurchased]=useState<any>('');
    const [participant,setParticipant]=useState<any>();
    const [filledPercentage,setFilledPercentage]=useState<any>();
    const [liked,setLiked]=useState<boolean>(false)
    const WalleAddress=useAddress();
    let lpTokenAbi = token_ABI();
    let nftPoolAbi = nftPool_ABI();
    const [userWhitelisted,setUserWhitelisted]=useState(false);
  const[tokenAlloance,setTokenAllowance]=useState<string>();
    const sdk=useSDK();
    let nftAdditional=nftData;
    let address = nftAdditional.NFTPoolAddress;
    
    const nftPool =async () =>{
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
              setFilledPercentage(filledPercentage);

        })
       
       
      }
      const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
      const [approvalValue,setApprovalValue]=useState();
      const [boughtNfts,setBoughtNfts]=useState<number>(0);
      useEffect(() => {
        if(WalleAddress){
            alreadyLikeNft();
            userBoughtNfts();
            checkWhitelisted();
            checkAllowance();
        }
       
       nftPool();
      }, [WalleAddress,liked])

      function Countdown({ unixTimestamp }:any) {
        const [countdown, setCountdown] = useState('');
      
        useEffect(() => {
          const updateCountdown = () => {
            const currentTime = new Date().getTime();
            const timeRemaining = unixTimestamp * 1000 - currentTime;
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            const countdownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            setCountdown(countdownString);
          };
      
          // Update the countdown initially
          updateCountdown();
      
          // Update the countdown every second
          const intervalId = setInterval(updateCountdown, 1000);
      
          // Cleanup when the component unmounts
          return () => clearInterval(intervalId);
        }, [unixTimestamp]);
      
        return <p>{countdown}</p>;
      }
//like nft
const likeNft=()=> {
    axios
      .post(`${baseUrl}/likeNFT`, {
        userAddress: WalleAddress,
        NFTPoolAddress: nftAdditional.NFTPoolAddress,
      })
      .then((res) => {
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
        fill = '#fff',
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
      const FacebookIcon = ({
        fill = '#fff',
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
    <path d="M20.5,1H3.5A2.5,2.5,0,0,0,1,3.5v17A2.5,2.5,0,0,0,3.5,23h9v-7.63h-2V13h2V10.87c0-2.49,1.48-3.87,3.77-3.87,1.08,0,2.1.08,2.38.11v2.62h-1.62c-1.28,0-1.53.61-1.53,1.5V13h3.07l-.4,2.37h-2.67V23h5.21A2.5,2.5,0,0,0,23,20.5v-17A2.5,2.5,0,0,0,20.5,1Z" fill={fill} />
            </svg>
        );
      };
      const DiscordIcon = ({
        fill = '#fff',
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
    <path d="M19,1a2.00591,2.00591,0,0,1,2,2V19a2.00591,2.00591,0,0,1-2,2H5a2.00591,2.00591,0,0,1-2-2V3A2.00591,2.00591,0,0,1,5,1ZM8.04,16.76A2.9919,2.9919,0,0,0,7,17H5V13h3.04a2.00591,2.00591,0,0,0,2-2v-2.24L8.04,12,7,10.24V8.43h-2V7h2V4a2.00591,2.00591,0,0,0-2-2H5V0h4.608C8.04,0,9.32,1.344,9.32,3.792v2.256h3V9H9.32ZM19,21H5a2.00591,2.00591,0,0,1-2-2V3A2.00591,2.00591,0,0,1,5,1H7V5H5a2.00591,2.00591,0,0,0-2,2v2a2.00591,2.00591,0,0,0,2,2H9.32v2.95259C9.32,9.34341,10.61406,10.688,12,10.688s2.68794-1.34459,2.68794-2.73541V9H19a2.00591,2.00591,0,0,1,2,2v14A2.00591,2.00591,0,0,1,19,21Z" fill={fill} />
            </svg>
        );
      };
      const InstaIcon = ({
        fill = '#fff',
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
    <path d="M12,1A11,11,0,0,1,23,12,11,11,0,0,1,12,23,11,11,0,0,1,1,12,11,11,0,0,1,12,1Zm0,2A9,9,0,0,0,3,12a9,9,0,0,0,9,9,9,9,0,0,0,9-9A9,9,0,0,0,12,3Zm2,15.82a6.3566,6.3566,0,0,1-6,3.18,6.3566,6.3566,0,0,1-6-3.18H2v5.654A10.90243,10.90243,0,0,0,12,22a10.90243,10.90243,0,0,0,10-10.146Zm1.8-6.073a8.5,8.5,0,1,1-17,0,1,1,0,0,1,2,0,6.5,6.5,0,0,1,13,0Z" fill={fill} />
            </svg>
        );
      };
     
      const TwiterIcon = ({
        fill = '#fff',
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
<path d="M 34.21875 5.46875 C 28.238281 5.46875 23.375 10.332031 23.375 16.3125 C 23.375 16.671875 23.464844 17.023438 23.5 17.375 C 16.105469 16.667969 9.566406 13.105469 5.125 7.65625 C 4.917969 7.394531 4.597656 7.253906 4.261719 7.277344 C 3.929688 7.300781 3.632813 7.492188 3.46875 7.78125 C 2.535156 9.386719 2 11.234375 2 13.21875 C 2 15.621094 2.859375 17.820313 4.1875 19.625 C 3.929688 19.511719 3.648438 19.449219 3.40625 19.3125 C 3.097656 19.148438 2.726563 19.15625 2.425781 19.335938 C 2.125 19.515625 1.941406 19.839844 1.9375 20.1875 L 1.9375 20.3125 C 1.9375 23.996094 3.84375 27.195313 6.65625 29.15625 C 6.625 29.152344 6.59375 29.164063 6.5625 29.15625 C 6.21875 29.097656 5.871094 29.21875 5.640625 29.480469 C 5.410156 29.742188 5.335938 30.105469 5.4375 30.4375 C 6.554688 33.910156 9.40625 36.5625 12.9375 37.53125 C 10.125 39.203125 6.863281 40.1875 3.34375 40.1875 C 2.582031 40.1875 1.851563 40.148438 1.125 40.0625 C 0.65625 40 0.207031 40.273438 0.0507813 40.71875 C -0.109375 41.164063 0.0664063 41.660156 0.46875 41.90625 C 4.980469 44.800781 10.335938 46.5 16.09375 46.5 C 25.425781 46.5 32.746094 42.601563 37.65625 37.03125 C 42.566406 31.460938 45.125 24.226563 45.125 17.46875 C 45.125 17.183594 45.101563 16.90625 45.09375 16.625 C 46.925781 15.222656 48.5625 13.578125 49.84375 11.65625 C 50.097656 11.285156 50.070313 10.789063 49.777344 10.445313 C 49.488281 10.101563 49 9.996094 48.59375 10.1875 C 48.078125 10.417969 47.476563 10.441406 46.9375 10.625 C 47.648438 9.675781 48.257813 8.652344 48.625 7.5 C 48.75 7.105469 48.613281 6.671875 48.289063 6.414063 C 47.964844 6.160156 47.511719 6.128906 47.15625 6.34375 C 45.449219 7.355469 43.558594 8.066406 41.5625 8.5 C 39.625 6.6875 37.074219 5.46875 34.21875 5.46875 Z M 34.21875 7.46875 C 36.769531 7.46875 39.074219 8.558594 40.6875 10.28125 C 40.929688 10.53125 41.285156 10.636719 41.625 10.5625 C 42.929688 10.304688 44.167969 9.925781 45.375 9.4375 C 44.679688 10.375 43.820313 11.175781 42.8125 11.78125 C 42.355469 12.003906 42.140625 12.53125 42.308594 13.011719 C 42.472656 13.488281 42.972656 13.765625 43.46875 13.65625 C 44.46875 13.535156 45.359375 13.128906 46.3125 12.875 C 45.457031 13.800781 44.519531 14.636719 43.5 15.375 C 43.222656 15.578125 43.070313 15.90625 43.09375 16.25 C 43.109375 16.65625 43.125 17.058594 43.125 17.46875 C 43.125 23.71875 40.726563 30.503906 36.15625 35.6875 C 31.585938 40.871094 24.875 44.5 16.09375 44.5 C 12.105469 44.5 8.339844 43.617188 4.9375 42.0625 C 9.15625 41.738281 13.046875 40.246094 16.1875 37.78125 C 16.515625 37.519531 16.644531 37.082031 16.511719 36.683594 C 16.378906 36.285156 16.011719 36.011719 15.59375 36 C 12.296875 35.941406 9.535156 34.023438 8.0625 31.3125 C 8.117188 31.3125 8.164063 31.3125 8.21875 31.3125 C 9.207031 31.3125 10.183594 31.1875 11.09375 30.9375 C 11.53125 30.808594 11.832031 30.402344 11.816406 29.945313 C 11.800781 29.488281 11.476563 29.097656 11.03125 29 C 7.472656 28.28125 4.804688 25.382813 4.1875 21.78125 C 5.195313 22.128906 6.226563 22.402344 7.34375 22.4375 C 7.800781 22.464844 8.214844 22.179688 8.355469 21.746094 C 8.496094 21.3125 8.324219 20.835938 7.9375 20.59375 C 5.5625 19.003906 4 16.296875 4 13.21875 C 4 12.078125 4.296875 11.03125 4.6875 10.03125 C 9.6875 15.519531 16.6875 19.164063 24.59375 19.5625 C 24.90625 19.578125 25.210938 19.449219 25.414063 19.210938 C 25.617188 18.96875 25.695313 18.648438 25.625 18.34375 C 25.472656 17.695313 25.375 17.007813 25.375 16.3125 C 25.375 11.414063 29.320313 7.46875 34.21875 7.46875 Z"></path>
            </svg>
        );
      };
      const CompletedIcon = ({
        fill = '#fff',
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
      const totalInvest=useAppSelector((state)=> state.userReducer.value.response.tier);


      const checkWhitelisted = async () => {
        const nftPool = sdk?.getContractFromAbi(nftData.NFTPoolAddress,nftPoolAbi).then((a)=>{
          a.call('getCheck',[WalleAddress],{
            gasLimit:7000000
          }).then((b:any)=>{
            setUserWhitelisted(b);

          })
        })
      };
      const checkAllowance = async () => {
        const contract = await sdk?.getContractFromAbi(nftData.LPTokenAddress,lpTokenAbi).then((a)=>{
          a.call('allowance',[WalleAddress,nftData.NFTPoolAddress],{
            gasLimit:7000000
          }).then((b:any)=>{
            setTokenAllowance(Web3.utils.fromWei(b.toString(), "ether"));

          })
        })
       
      };
      //approve nft
      const approve=async ()=>{
        toast.loading('Transaction in Progress', {
          position: "top-right",
          autoClose: false,
          progress: undefined,
          toastId: "buyProgress",
        });
          const contract = await sdk?.getContractFromAbi(nftData.LPTokenAddress,lpTokenAbi).then((a)=>{
            let amounttoApprove = nftData.AmounttoLock;
            let _amountWei = Web3.utils.toWei(amounttoApprove.toString(), "ether");
            a.call('approve',[nftData.NFTPoolAddress,_amountWei]).then((a)=>{
              toast.dismiss('buyProgress');
              delay(()=>{
                toast.success(` ${nftData.AmounttoLock} ${nftData.NFTPoolType} Approved`,
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId: "existtier",
              })
              checkAllowance();

              onClose();

               },1000);
            }).catch((err)=>{
              toast.dismiss('buyProgress');
              toast.error("Transaction Failed",
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId: "existtier",
              })
              onClose();

            })
          })
          

      
        }
        //
        const userBoughtNfts=async ()=>{
          const nftPool =await sdk?.getContractFromAbi(nftData.NFTPoolAddress,nftPoolAbi).then(async (a)=>{
           await a.call('getUserCntLocksForToken',[WalleAddress]).then((result:any)=>{
              let inString= result?.toString();
              setBoughtNfts(result?.toString());
             
            })
          })

        }
      //buy nft
      const buyNft=async ()=>{
        toast.loading('Transaction in Progress', {
          position: "top-right",
          autoClose: false,
          progress: undefined,
          toastId: "buyProgress",
        });
        const nftPool =await sdk?.getContractFromAbi(nftData.NFTPoolAddress,nftPoolAbi).then(async (a)=>{

          let _amountWei = Web3.utils.toWei(nftData.AmounttoLock.toString(), "ether");
          await a.call('lockLPTokenWithFixedTime',[_amountWei],{
            gasLimit:7000000,
          }).then((tx:any)=>{
            toast.dismiss('buyProgress');
              delay(async ()=>{
                toast.success(` ${nftData.AmounttoLock} ${nftData.NFTPoolType} Approved`,
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId: "existtier",
              })
              checkAllowance();
              await a.call('totalNFTSoldInAllTier').then((result:any)=>{
                let inInt=parseInt(result._hex,16)
                setPurchased(inInt);
              }).catch((err)=>{
                console.log('err in getting total sold nft : ',err)
              })
              onClose();

               },1000);
          }).catch((err)=>{

            if (err.hasOwnProperty("reason")) {
              toast.dismiss('buyProgress');
              toast.error(err.reason, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId: "TokenLockReceiptErr",
              });
            }
          

            else {
              toast.dismiss('buyProgress');

              toast.error("Transaction Failed",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              toastId: "existtier",
            })
            }
            
            console.log('err in locking tokens : ',err)
            onClose();
          })
        }).catch((err)=>{
          console.log('error invoking the contract : ' , err)
        });
      }
    const LAVALogo = () =>(
      <>
      <Image src={ImagesURL[`${nftData.NFTPoolType}`]} width={30} height={30}/>     
      </>  
        )
     
        const [expanded, setExpanded] = useState(false);
      
        const handleShare = () => {
          setExpanded(!expanded);
        };
        
        
  return (
        <Card className='bg-transparent shadow-none p-5'>
<CardHeader>
<div className='flex flex-row justify-between w-full'>
        <div className='conmpletedButton'>
            <Button className=' text-lg bg-primary-50' startContent={<CompletedIcon filled/>} >{nftData.ProjectStatus}</Button>
        </div>
        <div className='LikeShare flex flex-row gap-5'>
        {liked ? <Button onPress={unLikeNft} className=' bg-white' isIconOnly  aria-label="Like">
        <HeartIcon fill={ 'red' } filled />
      </Button> : 
      <Button onPress={likeNft} className=' bg-white' isIconOnly  aria-label="Like">
      <HeartIcon fill={'#000'} filled />
    </Button> 
      } 

       <Button className="bg-primary-50" onClick={handleShare} aria-label="Share">
        <ShareIcon filled />
      </Button>
      
        </div>
    </div>
</CardHeader>
<CardBody  className=' relative flex flex-col gap-5 '>
{expanded && (
        <ButtonGroup>
          <Button className="discord-button bg-primary-50" isIconOnly >
            <DiscordIcon fill="#7289DA" filled /> 
          </Button>
          <Button className="instagram-button bg-primary-50" isIconOnly >
            <InstaIcon fill="#bc2a8d" filled /> 
          </Button>
          <Button className="twitter-button bg-primary-50"  isIconOnly >
            <TwiterIcon fill="#1DA1F2" filled  /> 
          </Button>
          <Button className="facebook-button bg-primary-50" isIconOnly >
            <FacebookIcon fill="#1877F2" filled  /> 
          </Button>
          </ButtonGroup>
        
      )}
<div className='title'>
    <p className=' text-lg'>{nftData.ProjectShortDesc}</p>
</div>
<div className='Name'>
    <h1 className=' text-2xl'>{nftData.ProjectTitle}</h1>
</div>
{ nftData.ProjectStatus=='Completed' && <div className='closingDate' >
<p>INO Closed: {timeConverter(nftData.EndTime)}</p>
</div>}
{
  nftData.ProjectStatus=='In-progress' &&
  <div className='flex flex-row justify-between text-center'>
 <div className='startingDate' >
  <p className=' text-sm'>INO Started  </p><small className=' font-bold'>{timeConverter(nftData.StartTime)}</small> 
  </div>
  <div className='EndingDate' >
    
 
  <p className=' text-sm'>INO Ends  </p> <small className="font-bold" id={`timer1`}><Countdown unixTimestamp={nftData.EndTime}/></small>
  </div>
  </div>
 

}
<div className='totalBought flex flex-row justify-between w-full'>
    <h1 className=' text-2xl font-bold '>{purchased} / {nftAdditional.NFTMaxCap}</h1>
    <h1 className=' text-2xl font-bold ' >{filledPercentage}%</h1>
</div>
<Progress isStriped color="secondary" value={filledPercentage } aria-label="Loading..."/>
<Divider/>
<div className='salePrice flex flex-col gap-3'>
    <p>Sale Price</p>
    <h1>{nftAdditional.AmounttoLock} {nftAdditional.LPTokenName}</h1>

</div>
<div>
  {
    nftData.ProjectStatus =='In-progress' && userWhitelisted && tokenAlloance == (undefined || '0') ?
    <>
    <Button onPress={onOpen}  color="primary" className='w-1/2 hover:bg-opacity-50 '>Approve {nftData.LPTokenName}</Button>
    <Modal 
    backdrop='blur'
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      placement="top-center"
    
      className='bg-primary-50 bg-opacity-70 backdrop-blur'
    >

      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center text-primary">Approve {nftData.LPTokenName}</ModalHeader>
            <ModalBody>
                <p>Your {nftData.AmounttoLock} {nftData.LPTokenName}  will be Approved </p>
              <Input
                size='lg'
                autoFocus
                disabled
                isClearable={false}
                color='primary'
                isReadOnly
                endContent={
                  <LAVALogo />
                }
               
                defaultValue={nftData.AmounttoLock}
                variant='bordered'
                className=''

              />
             
              <div className="flex py-2 px-1 justify-between">
                
               
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button  color="primary" onPress={()=>{
                    approve()
              }}>
                Approve
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>  
    </>   : nftData.ProjectStatus =='In-progress' && userWhitelisted && tokenAlloance == nftData.AmounttoLock ? 
  
   <>
   <Button onPress={onOpen}  color="primary" className='w-1/2 hover:bg-opacity-50 '>Buy NFT</Button>
   <Modal 
   backdrop='blur'
     isOpen={isOpen} 
     onOpenChange={onOpenChange}
     placement="top-center"
   
     className='bg-primary-50 bg-opacity-70 backdrop-blur'
   >

     <ModalContent>
       {(onClose) => (
         <>
           <ModalHeader className="flex flex-col gap-1 text-center text-primary">Lock {nftData.LPTokenName}</ModalHeader>
           <ModalBody>
               <p>Your {nftData.AmounttoLock} {nftData.LPTokenName}  will be Locked </p>
             <Input
               size='lg'
               autoFocus
               disabled
               isClearable={false}
               color='primary'
               isReadOnly
               endContent={
                 <LAVALogo />
               }
              
               defaultValue={nftData.AmounttoLock}
               variant='bordered'
               className=''

             />
            
             <div className="flex py-2 px-1 justify-between">
               
              
             </div>
           </ModalBody>
           <ModalFooter>
             <Button color="danger" variant="flat" onPress={onClose}>
               Close
             </Button>
             <Button  color="primary" onPress={()=>{
                   buyNft()
             }}>
               Confirm
             </Button>
           </ModalFooter>
         </>
       )}
     </ModalContent>
   </Modal>  
   </> 
              :  ''
  }
    
</div>
</CardBody>
<CardFooter>

</CardFooter>

        </Card>
    )
}

export default NftDetailsCard