'use client'
import  {baseUrl, saleToken } from '@/app/constants/baseUrl'
import { timeConverter } from '@/app/constants/helper'
import { Card, CardBody, Progress, Snippet, Image, Skeleton, Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure,Link } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import youtube from '../../assets/images/icon-youtube.svg'
import axios from 'axios'
import { BaseContract, BigNumberish, Transaction, utils } from 'ethers'
import { SmartContract, approveErc20Allowance, useAddress, useSDK } from '@thirdweb-dev/react'
import { Ido_ABI, TokenContract_Add, token_ABI } from '@/app/constants/info'
import { delay } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import { setTimeout } from 'timers/promises'
import busd from '../../assets/images/busd-logo.png'


const IDO_ABI=Ido_ABI()

function IdoDetails({params}:{params:{idoId:string}}) {
    const [ShowCompleted, setShowCompleted] = useState([]);
    const [CompletedIDOs, SetCompletedIDO]:any = useState({});
    const [Status, setStatus] = useState("");
    const [approved,setApproved]=useState();
    const [userApprovedTier,setUserApprovedTier]=useState<number>();
    const [maxAmount,setMaxAmount]=useState();
    const [maxAllocation,setMaxAlloc]=useState<string>('');
    const [transactionProgress,setTransactionProgress]=useState<boolean>(true);
    const [showApprovalButton,setShowApprovalButton]=useState(true)
const sdk=useSDK()
const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();

 const acountAddress=useAddress();
 let IDO3 : SmartContract<BaseContract> | undefined;
const [isLoading,setIsLoading]=useState(true);
let TokenABI = token_ABI();
  let TokenContractAddr = TokenContract_Add();
const [isBuyModalOpen,setIsBuyModalOpen]=useState(false);
const [approvalValue,setApprovalValue]=useState<string>('')
const [buyValue,setBuyValue]=useState<string>('')
 
  

  

  useEffect(() => {
 
    
    var resData: any ;
    try {
        axios
            .post(`${baseUrl}/singleIDO`, {
                LaunchPoolAddress:params.idoId
            })
            .then(async function (response) {
                resData = await response.data.data;
                if (resData == "" || resData == null) {
                    resData = null;
                    setStatus("In-progress");
                } else {
                   
                        if (resData) {
                            var address = await resData.LaunchPoolAddress;
                            try {
                                IDO3 =await sdk?.getContractFromAbi(address, IDO_ABI)
                            } catch (err) {
                                console.log('failed : ',err)
                            }

                            if (resData.project_File != null) {
                                resData.base64 = btoa(
                                    new Uint8Array(
                                        resData.project_File.data.data
                                    ).reduce(function (data, byte) {
                                        return data + String.fromCharCode(byte);
                                    }, "")
                                );
                            }

                            var address = await resData.LaunchPoolAddress;
                            IDO3 = await sdk?.getContractFromAbi(address, IDO_ABI);
                            await IDO3?.call('totalBUSDReceivedInAllTier').then(async (a) => {
                                resData.raised = utils.formatEther(await a)
                            })


                            await IDO3?.call('getParameters').then(async (a: any) => {
                                
                                resData.maxCap = utils.formatEther(await a?.maxCap)
                                resData.minAlloca = utils.formatEther(await a?.minAllocaPerUserTierOne).toString();
                                resData.tokenPrice = a.IdoTokenPrice / 100;
                            })


                            await IDO3?.call('getTotalParticipants').then(async (a: any) => {
                                resData.maxParticipants = utils.formatUnits(a,'wei');
                            })
                           
                            if(acountAddress!=undefined){
                            await IDO3?.call('getWhitelistOne',[acountAddress]).then(async (a: any) => {
                                    if(a==true){
                                        setApproved(a)
                                        setUserApprovedTier(1)
                                      IDO3?.call('maxAllocaPerUserTierOne').then((a:any)=>{
                                        resData.maxAlloc = utils.formatEther(a);
                                        setMaxAlloc(resData.maxAlloc)
                                      })
                                    }
                            })
                            await IDO3?.call('getWhitelistTwo',[acountAddress]).then(async (a: any) => {
                                if(a==true){
                                    setApproved(a)
                                    setUserApprovedTier(2)
                                    
                                    IDO3?.call('maxAllocaPerUserTierTwo').then((a:any)=>{
                                        resData.maxAlloc = utils.formatEther(a);
                                        setMaxAlloc(resData.maxAlloc)
                                      })
                                }
                                })
                                
                                await IDO3?.call('getWhitelistThree',[acountAddress]).then(async (a: any) => {
                                    if(a==true){
                                        setApproved(a)
                                        setUserApprovedTier(3)
                                        
                                        IDO3?.call('maxAllocaPerUserTierThree').then((a:any)=>{
                                            resData.maxAlloc = utils.formatEther(a);
                                            setMaxAlloc(resData.maxAlloc)
                                          })
                                    }
                                    })
                            await IDO3?.call('getWhitelistFour',[acountAddress]).then(async (a: any) => {
                                    if(a==true){
                                        setApproved(a)
                                        setUserApprovedTier(4)
                                        
                                        IDO3?.call('maxAllocaPerUserTierFour').then((a:any)=>{
                                            resData.maxAlloc = utils.formatEther(a);
                                            setMaxAlloc(resData.maxAlloc)
                                          })
                                    }
                                })
                            await IDO3?.call('getWhitelistFive',[acountAddress]).then(async (a: any) => {
                                    if(a==true){
                                        setApproved(a)
                                        setUserApprovedTier(5)
                                        
                                        IDO3?.call('maxAllocaPerUserTierFive').then((a:any)=>{
                                            resData.maxAlloc = utils.formatEther(a);
                                            setMaxAlloc(resData.maxAlloc)
                                          })
                                    }
                                })
                            await IDO3?.call('getWhitelistSix',[acountAddress]).then(async (a: any) => {
                                    if(a==true){
                                        setApproved(a)
                                        setUserApprovedTier(6)
                                        
                                        IDO3?.call('maxAllocaPerUserTierSix').then((a:any)=>{
                                            resData.maxAlloc = utils.formatEther(a);
                                            setMaxAlloc(resData.maxAlloc)
                                          })
                                    }
                                })
                            await IDO3?.call('getWhitelistSeven',[acountAddress]).then(async (a: any) => {
                                    if(a==true){
                                        setApproved(a)
                                        setUserApprovedTier(7)
                                        
                                        IDO3?.call('maxAllocaPerUserTierSeven').then((a:any)=>{
                                            resData.maxAlloc = utils.formatEther(a);
                                            setMaxAlloc(resData.maxAlloc)
                                          })
                                    }
                                })
                            await IDO3?.call('getWhitelistEight',[acountAddress]).then(async (a: any) => {
                                    if(a==true){
                                        setApproved(a)
                                        setUserApprovedTier(8)
                                        
                                        IDO3?.call('maxAllocaPerUserTierEight').then((a:any)=>{
                                            resData.maxAlloc = utils.formatEther(a);
                                            setMaxAlloc(resData.maxAlloc)
                                          })
                                    }
                                })
                            await IDO3?.call('getWhitelistNine',[acountAddress]).then(async (a: any) => {
                                    if(a==true){
                                        setApproved(a)
                                        setUserApprovedTier(9)
                                        
                                        IDO3?.call('maxAllocaPerUserTierNine').then((a:any)=>{
                                            resData.maxAlloc = utils.formatEther(a);
                                            setMaxAlloc(resData.maxAlloc)
                                          })
                                    }
                                })
}
                            let TotalTokenSold =
                                resData.tokenPrice * resData.raised;
                            let filledPercentage =
                                (((TotalTokenSold / resData.totalSupply) * 100)as number).toFixed(9);
                            resData.filledPercentage = filledPercentage;
                            resData.SetTotalTokenSold = TotalTokenSold;
                            SetCompletedIDO(resData);
                        } else {
                            setStatus("In-progress");
                            setShowCompleted(resData);

                        }
                    
                }
                SetCompletedIDO(resData);
               setIsLoading(false);

                
                

            });
    } catch (err) {
        setStatus("In-progress");
    }


    
  }, [acountAddress])
  
  
  const approve=async (e:string)=>{
    
      toast.loading('Transaction in Progress', {
        position: "top-right",
        autoClose: false,   
       
        progress: undefined,
        toastId: "loading",
        theme:'colored'
      });
      const Msg = ({ txHash }:any) =>{
        onClose();
        return(
            <div className='flex flex-col gap-1 ml-3'>
              <p>Tokens Approved</p>
              <Link target='_blank' href={`https://blockscout.atlantischain.network/tx/${txHash}`} className=' text-primary-PAROT underline' >View on BlocksScout</Link>
              
            </div>
          )
      } 
      
  let tokenContract =await sdk?.getContractFromAbi(TokenContractAddr,TokenABI);
    const inWei= utils.parseUnits(e,18);
    let args = [params.idoId, inWei];
    await tokenContract?.call('approve',args,{
        gasLimit:7000000,
    }).then((tx:any)=>{
        toast.dismiss('loading');
        toast.success(<Msg txHash={tx?.receipt?.transactionHash}/>,{
            toastId:'trans',
            autoClose:3000,

        }
        
        )
       
        
        setShowApprovalButton(false);
    }).catch((error)=>{
        toast.dismiss('loading');
        toast.error('Approval Failed',
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
          console.log(error);
    });

   
  }
  const buyTokens=async (e:string)=>{
    const inWei= utils.parseUnits(e,18);
    let contract= await sdk?.getContractFromAbi(params.idoId,IDO_ABI);
    toast.loading('Transaction in Progress', {
        position: "top-right",
        autoClose: false,
        progress: undefined,
        toastId: "buyProgress",
      });
    await contract?.call('buyTokens',[inWei],{
        gasLimit:7000000,
    }).then(()=>{
        toast.dismiss('buyProgress');
        delay(()=>{
            toast.success(` ${inWei}  Tokens Bought`,
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
          setIsBuyModalOpen(false)
        },5000);
        

    }).catch((err)=>{
        toast.dismiss('buyProgress');
        if(err?.hasOwnProperty('data')){
            let error = err.data.message;
                          let x = err.replace(
                            "VM Exception while processing transaction:",
                            ""
                          );
        toast.error(x,{
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

        else {
            toast.error('Buy Failed',
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
          console.log(err);
    })
}

   
         
const BusdLogo = ({ }:any) => (
    <>
    <Image src={busd.src} width={30} height={30}/>     
    <span className=' text-yellow-400 font-extrabold'>BUSD</span>     
    </>  
      )
  return (
   
<> 
   
         <div className=" w-9/12 mx-auto p-10 pb-5 rounded-2xl backdrop-blur shadow-xl shadow-primary-50 ">
           
         <div className=" flex flex-col gap-10 scrollbar-hide"> 
         <Skeleton className=' bg-primary before:bg-primary after:bg-purple-300 rounded-2xl' isLoaded={!isLoading }>   
                 <div className="flex flex-row justify-between align-middle">
                 <div className=" flex flex-row align-middle gap-10">
                         <Image
                             src={CompletedIDOs.TokenImageURL}
                                alt={'token image'}
                             className=" w-[70px] max-h-[70px] max-w-none rounded-full justify-start"
                         />
                         <div className="flex flex-col justify-center">
                             <h1 className=" text-2xl">
                                 {CompletedIDOs.ProjectTitle}
                             </h1>
                         </div>



                     </div>
                 <div className="links flex flex-col justify-center align-middle">
                 <div className="flex flex-row">   

                 <a href={CompletedIDOs.ProjectFB} target="_blank">
<span>
<svg
xmlns="http://www.w3.org/2000/svg"
id="Component_20_1"
data-name="Component 20 – 1"
width={36}
height={36}
viewBox="0 0 36 36"
>
<rect
id="Rectangle_8889"
data-name="Rectangle 8889"
width={36}
height={36}
fill="none"
/>
<g
id="Group_20409"
data-name="Group 20409"
transform="translate(11.551 6.397)"
>
<g id="Group_20408" data-name="Group 20408">
<path
id="Path_44107"
data-name="Path 44107"
d="M25.516,105.725H20.154v-9.7H16.646V90.965h3.508V88.449a6.113,6.113,0,0,1,1.58-4.393,5.766,5.766,0,0,1,4.176-1.537,15.71,15.71,0,0,1,2.2.135c.569.077.888.12.956.126l.471.042.012.473v3.938H27.3a1.566,1.566,0,0,0-1.78,1.649v2.084h3.938l-.762,5.059H25.516Zm-4.331-1.031h3.3v-9.7h3.32l.451-3H24.485V88.881a2.7,2.7,0,0,1,.643-1.807,2.644,2.644,0,0,1,2.151-.873h1.234V83.75l-.55-.074a14.762,14.762,0,0,0-2.053-.125,4.708,4.708,0,0,0-3.452,1.24,5.13,5.13,0,0,0-1.273,3.666V92H17.677v3h3.508Z"
transform="translate(-16.646 -82.519)"
fill="#fff"
/>
</g>
</g>
</svg>
</span>
</a>

<a href={CompletedIDOs.ProjectInsta} target="_blank">
<span>
<svg
xmlns="http://www.w3.org/2000/svg"
id="icon-instagram"
width={36}
height={36}
viewBox="0 0 36 36"
>
<rect
id="Rectangle_8886"
data-name="Rectangle 8886"
width={36}
height={36}
fill="none"
/>
<g
id="Group_20401"
data-name="Group 20401"
transform="translate(7.949 7.948)"
>
<g id="Group_20398" data-name="Group 20398">
<path
id="Path_44098"
data-name="Path 44098"
d="M-8.57,104.18h-7.508a6.3,6.3,0,0,1-6.3-6.3V90.375a6.3,6.3,0,0,1,6.3-6.3H-8.57a6.3,6.3,0,0,1,6.3,6.3v7.509A6.3,6.3,0,0,1-8.57,104.18Zm-7.508-19.071a5.272,5.272,0,0,0-5.266,5.266v7.509a5.271,5.271,0,0,0,5.266,5.265H-8.57A5.271,5.271,0,0,0-3.3,97.884V90.375A5.271,5.271,0,0,0-8.57,85.109Z"
transform="translate(22.375 -84.078)"
fill="#fff"
/>
</g>
<g
id="Group_20399"
data-name="Group 20399"
transform="translate(5.001 5.08)"
>
<path
id="Path_44099"
data-name="Path 44099"
d="M-10.7,100.872a5.016,5.016,0,0,1-5.011-5.011A5.016,5.016,0,0,1-10.7,90.851a5.016,5.016,0,0,1,5.011,5.011A5.016,5.016,0,0,1-10.7,100.872Zm0-8.99a3.984,3.984,0,0,0-3.979,3.98A3.984,3.984,0,0,0-10.7,99.841a3.984,3.984,0,0,0,3.979-3.979A3.984,3.984,0,0,0-10.7,91.882Z"
transform="translate(15.707 -90.851)"
fill="#fff"
/>
</g>
<g
id="Group_20400"
data-name="Group 20400"
transform="translate(14.217 3.451)"
>
<circle
id="Ellipse_917"
data-name="Ellipse 917"
cx="1.18"
cy="1.18"
r="1.18"
fill="#fff"
/>
</g>
</g>
</svg>
</span>
</a>

<a href={CompletedIDOs.ProjectYoutube} target="_blank">
<Image src={youtube.src} style={{ width: 36, height: 36 }} alt="youtubelogo" />
</a>

<a href={CompletedIDOs.ProjectTweeter} target="_blank">
<span>
<svg
xmlns="http://www.w3.org/2000/svg"
id="icon-twitter"
width={36}
height={36}
viewBox="0 0 36 36"
>
<rect
id="Rectangle_8885"
data-name="Rectangle 8885"
width={36}
height={36}
fill="none"
/>
<g
id="Group_20396"
data-name="Group 20396"
transform="translate(6.776 9.887)"
>
<g id="Group_20395" data-name="Group 20395">
<path
id="Path_44097"
data-name="Path 44097"
d="M16.3,112.8a12.948,12.948,0,0,1-7.025-2.049.516.516,0,0,1,.323-.947c.322.027.655.04,1,.04a8.479,8.479,0,0,0,4.1-1.061A4.623,4.623,0,0,1,13.168,108a4.83,4.83,0,0,1-1.682-2.383.517.517,0,0,1,.34-.652,4.852,4.852,0,0,1-.79-.77,4.981,4.981,0,0,1-1.121-3.115v-.1a.516.516,0,0,1,.771-.448l.019.011a5.363,5.363,0,0,1-.79-2.632,5.2,5.2,0,0,1,.7-2.5.515.515,0,0,1,.845-.065,11.974,11.974,0,0,0,3.811,3.089,11.71,11.71,0,0,0,4.24,1.272c-.01-.147-.015-.292-.015-.438a4.962,4.962,0,0,1,1.4-3.454,4.915,4.915,0,0,1,6.856-.12,8.435,8.435,0,0,0,2.375-.929.515.515,0,0,1,.745.617,5.319,5.319,0,0,1-.664,1.3c.186-.068.37-.143.552-.224a.515.515,0,0,1,.635.763,10.211,10.211,0,0,1-2.1,2.24c.009.108.013.212.013.311a13.15,13.15,0,0,1-1.521,6.05A12.657,12.657,0,0,1,16.3,112.8Zm-4.71-1.982a12.292,12.292,0,0,0,4.705.95,11.624,11.624,0,0,0,10.575-6.408,12.118,12.118,0,0,0,1.41-5.583,3.53,3.53,0,0,0-.037-.473.514.514,0,0,1,.2-.484,9.2,9.2,0,0,0,.96-.82q-.437.1-.88.157a.509.509,0,0,1-.551-.336.516.516,0,0,1,.208-.611,4.238,4.238,0,0,0,.981-.851,9.606,9.606,0,0,1-1.484.412.516.516,0,0,1-.474-.153,3.881,3.881,0,0,0-5.575-.072,3.9,3.9,0,0,0-1.1,2.743,5.565,5.565,0,0,0,.076.908.515.515,0,0,1-.125.43.508.508,0,0,1-.415.169,12.871,12.871,0,0,1-5.27-1.439,13.018,13.018,0,0,1-3.6-2.739,4.251,4.251,0,0,0-.242,1.3,4.006,4.006,0,0,0,1.747,3.242.515.515,0,0,1-.337.935,5.411,5.411,0,0,1-1.333-.269,3.848,3.848,0,0,0,3.029,3.057.516.516,0,0,1,.007,1.007,5.726,5.726,0,0,1-1.283.139,3.81,3.81,0,0,0,3.313,1.939.516.516,0,0,1,.3.921A9.219,9.219,0,0,1,11.586,110.814Z"
transform="translate(-9.036 -94.364)"
fill="#fff"
/>
</g>
</g>
</svg>
</span>
</a>

<a href={CompletedIDOs.ProjectDiscord} target="_blank">
<span>
<svg
xmlns="http://www.w3.org/2000/svg"
id="Component_19_1"
data-name="Component 19 – 1"
width={36}
height={36}
viewBox="0 0 36 36"
>
<rect
id="Rectangle_8886"
data-name="Rectangle 8886"
width={36}
height={36}
fill="none"
/>
<g
id="Group_22808"
data-name="Group 22808"
transform="translate(-1382 -203)"
>
<path
id="Subtraction_5"
data-name="Subtraction 5"
d="M-4648.283-5927.454a2.458,2.458,0,0,1-2.317-2.573,2.458,2.458,0,0,1,2.317-2.573,2.458,2.458,0,0,1,2.317,2.573A2.458,2.458,0,0,1-4648.283-5927.454Zm0-4.14a1.457,1.457,0,0,0-1.31,1.566,1.457,1.457,0,0,0,1.31,1.566,1.457,1.457,0,0,0,1.311-1.566A1.457,1.457,0,0,0-4648.283-5931.593Z"
transform="translate(6044.961 6151.197)"
fill="#fff"
/>
<path
id="Subtraction_4"
data-name="Subtraction 4"
d="M-4648.283-5927.454a2.458,2.458,0,0,1-2.317-2.573,2.458,2.458,0,0,1,2.317-2.573,2.458,2.458,0,0,1,2.317,2.573A2.458,2.458,0,0,1-4648.283-5927.454Zm0-4.14a1.457,1.457,0,0,0-1.31,1.566,1.457,1.457,0,0,0,1.31,1.566,1.457,1.457,0,0,0,1.311-1.566A1.457,1.457,0,0,0-4648.283-5931.593Z"
transform="translate(6051.605 6151.197)"
fill="#fff"
/>
<path
id="Subtraction_3"
data-name="Subtraction 3"
d="M-4634.111-5915.25h-.054a.5.5,0,0,1-.392-.19l-1.876-2.381a.2.2,0,0,0-.158-.076h-.022a19.427,19.427,0,0,1-2.187.123,19.451,19.451,0,0,1-2.188-.123h-.024a.2.2,0,0,0-.156.076l-1.875,2.381a.5.5,0,0,1-.392.19h-.053c-3.969,0-6.862-3.169-6.983-3.3a.508.508,0,0,1-.128-.365c.017-.3.437-7.279,3.077-11.44a.533.533,0,0,1,.153-.153c3.151-2.029,5.294-2.087,5.528-2.087h.006a.5.5,0,0,1,.445.281l1.135,2.176a.2.2,0,0,0,.176.107h.014c.435-.027.861-.042,1.266-.042s.829.014,1.264.042h.014a.2.2,0,0,0,.177-.107l1.136-2.177a.5.5,0,0,1,.444-.28,11.1,11.1,0,0,1,5.535,2.087.521.521,0,0,1,.153.153c2.639,4.158,3.06,11.145,3.076,11.44a.506.506,0,0,1-.128.365C-4627.25-5918.419-4630.144-5915.25-4634.111-5915.25Zm3.357-5.619a.5.5,0,0,1,.418.222.491.491,0,0,1,.076.378.5.5,0,0,1-.213.32,12.952,12.952,0,0,1-4.567,1.8.2.2,0,0,0-.147.128.2.2,0,0,0,.031.192l1.172,1.487a.206.206,0,0,0,.158.076h.009a9.487,9.487,0,0,0,5.728-2.747.2.2,0,0,0,.06-.159c-.128-1.6-.709-7.079-2.816-10.515a.2.2,0,0,0-.064-.065,11.6,11.6,0,0,0-4.415-1.8l-.029,0a.2.2,0,0,0-.177.107l-.667,1.278a.193.193,0,0,0,0,.183.2.2,0,0,0,.149.107,15.262,15.262,0,0,1,4.234,1.223.5.5,0,0,1,.24.67.5.5,0,0,1-.456.289.509.509,0,0,1-.213-.048,15.751,15.751,0,0,0-6.558-1.325,15.747,15.747,0,0,0-6.558,1.325.513.513,0,0,1-.214.048.507.507,0,0,1-.456-.289.5.5,0,0,1-.018-.385.5.5,0,0,1,.259-.285,15.26,15.26,0,0,1,4.233-1.223.2.2,0,0,0,.149-.107.2.2,0,0,0,0-.183l-.668-1.278a.2.2,0,0,0-.176-.107l-.029,0a11.6,11.6,0,0,0-4.415,1.8.226.226,0,0,0-.064.065c-2.106,3.438-2.687,8.917-2.815,10.514a.2.2,0,0,0,.059.159,9.536,9.536,0,0,0,5.729,2.749h.009a.2.2,0,0,0,.158-.076l1.173-1.487a.2.2,0,0,0,.03-.192.2.2,0,0,0-.147-.128,12.953,12.953,0,0,1-4.566-1.8.5.5,0,0,1-.213-.32.5.5,0,0,1,.076-.376.5.5,0,0,1,.418-.223.5.5,0,0,1,.28.084,14.342,14.342,0,0,0,7.768,2,14.349,14.349,0,0,0,7.768-2A.5.5,0,0,1-4630.753-5920.869Z"
transform="translate(6038.801 6144.801)"
fill="#fff"
/>
</g>
</svg>
</span>
</a>

<a href={CompletedIDOs.ProjectMedium} target="_blank">
<span>
<svg
xmlns="http://www.w3.org/2000/svg"
id="Component_18_1"
data-name="Component 18 – 1"
width={36}
height={36}
viewBox="0 0 36 36"
>
<rect
id="Rectangle_9957"
data-name="Rectangle 9957"
width={36}
height={36}
fill="none"
/>
<path
id="Subtraction_2"
data-name="Subtraction 2"
d="M-4641.867-5917.173a.48.48,0,0,1-.435-.27l-4.573-9.218a.1.1,0,0,0-.088-.055.1.1,0,0,0-.022,0,.1.1,0,0,0-.079.1v5.208a.1.1,0,0,0,.021.063l2.641,3.387a.49.49,0,0,1,.054.512.491.491,0,0,1-.436.272h-5.53a.493.493,0,0,1-.438-.272.492.492,0,0,1,.054-.512l2.642-3.387a.107.107,0,0,0,.021-.062v-7.5a.1.1,0,0,0-.022-.063l-2.479-3.036a.486.486,0,0,1-.062-.515.485.485,0,0,1,.438-.279h5.485a.489.489,0,0,1,.442.283l4.021,8.748a.1.1,0,0,0,.09.058.1.1,0,0,0,.095-.064l2.192-5.684a.1.1,0,0,0,.007-.037v-2.817a.487.487,0,0,1,.486-.487h5.857a.486.486,0,0,1,.45.3.482.482,0,0,1-.112.53l-1.764,1.72a.108.108,0,0,0-.03.071v10.134a.1.1,0,0,0,.021.061l1.577,2.022a.492.492,0,0,1,.054.512.491.491,0,0,1-.437.272h-7.317a.486.486,0,0,1-.436-.272.491.491,0,0,1,.053-.512l1.576-2.022a.1.1,0,0,0,.022-.061v-6.2a.1.1,0,0,0-.082-.1h-.019a.1.1,0,0,0-.093.064l-3.391,8.791a.49.49,0,0,1-.432.311Zm5.109-14.655a.1.1,0,0,0-.1.1v11.888a.482.482,0,0,1-.1.3l-.962,1.234a.1.1,0,0,0-.01.1.1.1,0,0,0,.089.057h4.917a.1.1,0,0,0,.089-.057.1.1,0,0,0-.01-.1l-.963-1.234a.492.492,0,0,1-.1-.3v-10.583a.49.49,0,0,1,.146-.348l.91-.886a.1.1,0,0,0,.022-.108.1.1,0,0,0-.092-.062Zm-10.792,11.474a.1.1,0,0,0-.078.039l-1.566,2.009a.1.1,0,0,0-.01.1.1.1,0,0,0,.089.057h3.131a.1.1,0,0,0,.089-.057.1.1,0,0,0-.011-.1l-1.565-2.009A.1.1,0,0,0-4647.55-5920.354Zm-1.376-11.474a.1.1,0,0,0-.091.058.1.1,0,0,0,.013.105l1.829,2.238,0,.006a.368.368,0,0,1,.027.038l.009.013c.006.011.012.021.018.033l0,0,5.091,10.263a.1.1,0,0,0,.089.055.1.1,0,0,0,.094-.064l1.223-3.171a.1.1,0,0,0,0-.078l-4.342-9.443a.1.1,0,0,0-.091-.058Z"
transform="translate(4658.9 5942.9)"
fill="#fff"
/>
</svg>
</span>
</a>

<a href={CompletedIDOs.ProjectTelegram} target="_blank">
<span>
<svg
xmlns="http://www.w3.org/2000/svg"
id="Component_17_1"
data-name="Component 17 – 1"
width={36}
height={36}
viewBox="0 0 36 36"
>
<rect
id="Rectangle_9958"
data-name="Rectangle 9958"
width={36}
height={36}
fill="none"
/>
<path
id="Subtraction_1"
data-name="Subtraction 1"
d="M-4635.624-5915.643a1.1,1.1,0,0,1-.7-.251l-3.773-3.087a.107.107,0,0,0-.064-.024.1.1,0,0,0-.06.021l-.391.292-2.837,2.124-.01.008a.816.816,0,0,1-.468.223.44.44,0,0,1-.112-.015.537.537,0,0,1-.381-.471c-.046-.207-1.305-6.053-1.312-6.085a.1.1,0,0,0-.058-.07l-4.349-1.9a1.1,1.1,0,0,1-.663-1.067,1.1,1.1,0,0,1,.759-1l17.586-5.8a1.092,1.092,0,0,1,.345-.055,1.109,1.109,0,0,1,.749.291,1.108,1.108,0,0,1,.331,1.069l-3.515,14.942a1.1,1.1,0,0,1-.722.795A1.091,1.091,0,0,1-4635.624-5915.643Zm-.34-13.346a.481.481,0,0,1,.386.189.483.483,0,0,1-.033.634l-6.146,6.427a.1.1,0,0,0-.027.074.1.1,0,0,0,.036.071l1.912,1.565,4.13,3.379a.123.123,0,0,0,.082.031.129.129,0,0,0,.044-.008.127.127,0,0,0,.086-.1l3.514-14.942a.126.126,0,0,0-.039-.127.124.124,0,0,0-.087-.036.139.139,0,0,0-.037.006h-.006l-17.586,5.8a.123.123,0,0,0-.091.119.126.126,0,0,0,.079.128l4.358,1.906a.1.1,0,0,0,.042.009.094.094,0,0,0,.048-.013l9.1-5.055A.483.483,0,0,1-4635.963-5928.989Zm-6.264,8.292a.1.1,0,0,0-.03,0,.1.1,0,0,0-.067.067l-.646,2.259a.1.1,0,0,0,.039.11.1.1,0,0,0,.057.018.1.1,0,0,0,.061-.021l1.778-1.331a.1.1,0,0,0,.04-.078.1.1,0,0,0-.036-.08l-1.133-.926A.093.093,0,0,0-4642.228-5920.7Zm3.16-5.508a.1.1,0,0,0-.049.012l-5.583,3.1a.1.1,0,0,0-.05.11l.813,3.764a.1.1,0,0,0,.094.079.1.1,0,0,0,.1-.073l.728-2.541v-.007a.01.01,0,0,0,0-.008.475.475,0,0,1,.112-.187l3.9-4.082a.1.1,0,0,0,.007-.131A.1.1,0,0,0-4639.068-5926.2Z"
transform="translate(4658.9 5942.9)"
fill="#fff"
/>
</svg>
</span>
</a>

                 </div>
                 </div>
                 </div>
                 </Skeleton>
                 
        <div className=" scrollbar-hide">
                  
                         <div className=' mb-5'>
                         <Skeleton className=' bg-primary rounded-2xl' isLoaded={!isLoading}>
                             <p className="">
                                 {CompletedIDOs.ProjectShortDesc}.
                             </p>
                             </Skeleton>
                         </div>
                        


                         <div className="flex flex-col gap-10">
                         <Skeleton isLoaded={!isLoading} className=' bg-primary rounded-2xl'>
                         <div className="imageAndDetail flex flex-row gap-14 justify-between content-end">
                            
                        
                             <div className="imageWali">
                                
                                    <Image
                                     alt="Card background"
                                     width={700}
                                     height={500}
                                     src={`data:image/png;base64,${CompletedIDOs.base64}`}
                                 />
                                
                               
                             </div>
                             
                             
                             <div className="DetailsNft ">
                                 <Card  className=" bg-transparent shadow-none ">

                                     <CardBody className=" overflow-visible py-0 w-ful justify-center px-0 rounded-none">

                                        
                                        
                                       
                                         <p className="text-white w-full inline-flex  mb-2">Total Raised</p>
                                         <div className="flex w-full justify-between">
                                            
                                                 <p className="text-white text-tiny flex-initial">
                                                     {CompletedIDOs.raised ? CompletedIDOs.raised : "-"} {saleToken}
                                                 </p>

                                           
                                            
                                                 <p className="text-white text-tiny flex-initial">
                                                     {CompletedIDOs.filledPercentage} %
                                                 </p>
                                             

                                         </div>
                                         <Progress className=" mb-8 mt-2 h-3 rounded-lg " isStriped color="secondary" value={CompletedIDOs.filledPercentage} aria-label="Loading..." />
                                         { CompletedIDOs.ProjectStatus=='In-progress' && 
                                         <>
                                          <div className="grid grid-cols-2 grid-rows-4 gap-x-20 mb-8" >
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Filled</small>
                                                 
                                                     <small className="font-bold">{CompletedIDOs.raised} / {CompletedIDOs.totalSupply}
                                                     </small>
                                                
                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Sale Price</small>
                                                
                                                     <small className="font-bold">
                                                         1 {saleToken} = {CompletedIDOs.tokenPrice} {CompletedIDOs.TokenSymbol}
                                                     </small >
                                                

                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Max Cap</small>
                                                
                                                     <small className="font-bold">
                                                          {CompletedIDOs.MaxCap}
                                                     </small >
                                                

                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">MAX ALLOC.</small>
                                                 
                                                     <small className="font-bold"> {maxAllocation}
                                                     </small>
                                                

                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Current Participants</small>
                                                
                                                     <small className="font-bold">
                                                          {CompletedIDOs.maxParticipants}
                                                     </small >
                                                

                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">MIN ALLOC.</small>
                                                 
                                                     <small className="font-bold"> {CompletedIDOs.minAlloca}
                                                     </small>
                                                

                                             </div>
                                            
                                            
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Starting Time</small>
                                                
                                                     <small className="font-bold">
                                                         {timeConverter(CompletedIDOs.StartTime)}
                                                     </small>
                                                

                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Sesion End Date</small>
                                                
                                                     <small className="font-bold">
                                                         {timeConverter(CompletedIDOs.EndTime)}
                                                     </small>
                                                

                                             </div>
                                         </div>
                                         <div className='flex justify-center'>
                                            {
                                                approved && showApprovalButton &&
                                                <>
                                                <Button onPress={onOpen}  color="primary" className='w-1/2 hover:bg-opacity-50 '>Approve BUSD</Button>
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
                                                        <ModalHeader className="flex flex-col gap-1 text-center text-primary">Approve BUSD</ModalHeader>
                                                        <ModalBody>
                                                            <p>Tier : {userApprovedTier}</p>
                                                            <p> Range : {CompletedIDOs.minAlloca} BUSD - {maxAllocation} BUSD</p>
                                                          <Input
                                                            size='lg'
                                                            autoFocus
                                                            endContent={
                                                              <BusdLogo />
                                                            }
                                                            onChange={(e) => {
                                                                setApprovalValue(e.target.value);
                                                              }}
                                                            defaultValue={maxAllocation}
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
                                                                approve(approvalValue)
                                                          }}>
                                                            Approve
                                                          </Button>
                                                        </ModalFooter>
                                                      </>
                                                    )}
                                                  </ModalContent>
                                                </Modal>  
                                                </>                                              

                                            }
                                            {

                                                !showApprovalButton &&
                                                <>
                                                <Button onPress={()=>setIsBuyModalOpen(true)}  color="primary" className='w-1/2 hover:bg-opacity-50 '>Buy Token</Button>
                                                <Modal 
                                                backdrop='blur'
                                                  isOpen={isBuyModalOpen} 
                                                  onOpenChange={()=>setIsBuyModalOpen(false)}
                                                  placement="top-center"
                                                  className='bg-primary-50 bg-opacity-70 backdrop-blur'
                                                >

                                                  <ModalContent>
                                                    {(onClose) => (
                                                      <>
                                                        <ModalHeader className="flex flex-col gap-1 text-center text-primary">Buy Tokens</ModalHeader>
                                                        <ModalBody>
                                                            
                                                            <p> Approved Tokens : {approvalValue}  BUSD</p>
                                                          <Input
                                                            size='lg'
                                                            autoFocus
                                                            endContent={
                                                              <BusdLogo />
                                                            }
                                                            onChange={(e) => {
                                                                setBuyValue(e.target.value);
                                                              }}
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
                                                                buyTokens(approvalValue)
                                                          }}>
                                                            Buy
                                                          </Button>
                                                        </ModalFooter>
                                                      </>
                                                    )}
                                                  </ModalContent>
                                                </Modal>  
                                                </>    
                                                 }
                                         </div>
                                         </>

                                         }

                                         { CompletedIDOs.ProjectStatus=='Up-coming' &&  <div className="grid grid-cols-2 grid-rows-3 gap-x-20 mb-8" >
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Tokens Offered</small>
                                                 
                                                     <small className="font-bold">TBA
                                                     </small>
                                                
                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Sale Price</small>
                                                
                                                     <small className="font-bold">
                                                         1 {saleToken} = TBA
                                                     </small >
                                                

                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Min Allocation</small>
                                                 
                                                     <small className="font-bold"> {CompletedIDOs.minAlloca}
                                                     </small>
                                                

                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Max Allocation</small>
                                                
                                                     <small className="font-bold">
                                                          TBA
                                                     </small >
                                                

                                             </div>
                                            
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Initiate Time</small>
                                                
                                                     <small className="font-bold">
                                                         {timeConverter(CompletedIDOs.StartTime)}
                                                     </small>
                                                

                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Total Tiers</small>
                                                
                                                     <small className="font-bold">
                                                         {CompletedIDOs.Tiers}
                                                     </small>
                                                

                                             </div>
                                         </div>}

                                        { CompletedIDOs.ProjectStatus=='Completed' &&  <div className="grid grid-cols-2 grid-rows-3 gap-x-20 mb-8" >
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Tokens Offered</small>
                                                 
                                                     <small className="font-bold">{CompletedIDOs.totalSupply}
                                                     </small>
                                                
                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Sale Price</small>
                                                
                                                     <small className="font-bold">
                                                         1 {saleToken} = {CompletedIDOs.tokenPrice} {CompletedIDOs.TokenSymbol}
                                                     </small >
                                                

                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Tokens Remaining</small>
                                                 
                                                     <small className="font-bold"> {CompletedIDOs.totalSupply - CompletedIDOs.SetTotalTokenSold}
                                                     </small>
                                                

                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Max Cap</small>
                                                
                                                     <small className="font-bold">
                                                          {CompletedIDOs.MaxCap}
                                                     </small >
                                                

                                             </div>
                                            
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Initiate Time</small>
                                                
                                                     <small className="font-bold">
                                                         {timeConverter(CompletedIDOs.StartTime)}
                                                     </small>
                                                

                                             </div>
                                             <div className="col-span-1 flex-initial">
                                                 <small className="w-full inline-flex text-tiny text-white">Sesion End Date</small>
                                                
                                                     <small className="font-bold">
                                                         {timeConverter(CompletedIDOs.EndTime)}
                                                     </small>
                                                

                                             </div>
                                         </div>}

                                     </CardBody>



                                 </Card>
                             </div>
                            
                             
                         </div>
                         </Skeleton>
                         <Skeleton className=' bg-primary rounded-2xl' isLoaded={!isLoading}>
                         <div className="extraMaterial flex flex-row justify-between content-end">
                             <div className="AboutProject">
                                 <h1 className=" text-4xl font-bold mb-7">About the Project</h1>
                                 <p>{CompletedIDOs.AboutProject}</p>
                             </div>

                             <div className="extraDetails">
                                 <Card className="bg-transparent shadow-none">
                                     <CardBody className=" overflow-visible py-0 w-full px-0 rounded-none">

                                         <div className="tokenMatrics flex flex-col gap-3">
                                             <div className="HeadingWali">
                                                 <h1 className="text-4xl font-bold">Token Metrics</h1>
                                             </div>
                                             <div className="matricsDetail grid grid-cols-2 grid-rows-2 gap-5">
                                                 <div className="1">
                                                 <p>Name</p>
                                                 <p>{CompletedIDOs.TokenName}</p>
                                                 </div>
                                                 <div className="2">
                                                 <p>Symbol</p>
                                                 <p>{CompletedIDOs.TokenSymbol}</p>
                                                 </div>
                                                 <div className="3">
                                                 <p>Total Supply</p>
                                                 {CompletedIDOs.ProjectStatus != 'Up-coming' ?  <p>{CompletedIDOs.totalSupply}</p> : 
                                                 <p>TBA</p>
                                                 }
                                                 </div>
                                                 <div className="4">
                                                 <p>Decimals</p>
                                                 <p>{CompletedIDOs.TokenDecimal}</p>
                                                 </div>
                                             </div>
                                             <div className="adrWali">
                                             <p>Address</p>
                                             {CompletedIDOs.ProjectStatus != 'Up-coming' ? 
                                             <Snippet 
                                             symbol=''
                                             variant='flat'
                                             color='primary'
                                             className=" bg-transparent p-0"
                                             >{CompletedIDOs.TokenAddress}</Snippet>
                                             : <p>TBA</p>}
                                             </div>


                                         </div>

                                        


                                        
                                     </CardBody>

                                 </Card>
                             </div>

                         </div>
                         </Skeleton>
                         <div className="claiming">


                         </div>
                         </div>
                         





            </div>

                
             
         </div>
     </div>
   
       

            </>    
  )
}

export default IdoDetails