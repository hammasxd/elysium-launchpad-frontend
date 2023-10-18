'use client'
import { chainName } from '@/app/constants/baseUrl'
import { nftPool_ABI } from '@/app/constants/info';
import { useAddress, useSDK } from '@thirdweb-dev/react'
import React, { useEffect, useState } from 'react'

function NftMatrics({nftData}:any) {
    const [purchased,setPurchased]=useState<any>('');
    const [participant,setParticipant]=useState<any>();
    const [filledPercentage,setFilledPercentage]=useState<any>();
    const WalleAddress=useAddress();
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
                (nftAdditional.Purchased / parseFloat(nftAdditional.NFTMaxCap)) * 100;
              setFilledPercentage(filledPercentage);
        })
       
        
       
      }
      useEffect(() => {
        
      
       nftPool();
      }, [])
      

    


  return (
    <div className='matricss flex flex-col w-1/2 gap-10'>
    <div className=''>
        <h1 className='text-4xl'>Matrics</h1>
    </div>
    <div className='grid grid-cols-2 grid-rows-6'>
        <p className='text-sm text-gray-300 font-bold'>NFT Purchased</p>
        <p className='text-sm text-gray-300 font-bold'>NFT Remaining</p>
        <p>{purchased}</p>
        <p>{nftAdditional.NFTMaxCap-purchased}</p>
        <p className='text-sm text-gray-300 font-bold'> Collection Size</p>
        <p className='text-sm text-gray-300 font-bold'>NFT Artist</p>
        <p> {nftAdditional.NFTMaxCap*nftAdditional.AmounttoLock}</p>
        <p>{nftAdditional.NFTArtist}</p>
        <p className='text-sm text-gray-300 font-bold'>Network</p>
        <p className='text-sm text-gray-300 font-bold'>Participants</p>
        <p>{chainName}</p>
        <p>{participant}</p>
    </div>
</div>
  )
}

export default NftMatrics