import NftDetailsCard from '@/app/Components/nftDetails/NftDetailsCard'
import NftImage from '@/app/Components/nftDetails/NftImage'
import NftMatrics from '@/app/Components/nftDetails/NftMatrics'
import { baseUrl, chainName, saleToken } from '@/app/constants/baseUrl'
import { timeConverter } from '@/app/constants/helper'
import { Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react'
import { useSDK } from '@thirdweb-dev/react'
import React from 'react'


async function getNFTData(nftAdress:any) {
    
   
    const response= await fetch(`${baseUrl}/singleNFTPool`,{
        method:'POST',
        cache:'no-cache',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            
             NFTPoolAddress: nftAdress,
        })
    })
    if(!response.ok){
        console.log('error in response', response.status);
    }
    const data=await response.json();
    return data.data;
    
    
   
   
}




async function page({params}:{params:{nftDetails:string}}) {
    


const nftData = await getNFTData(params.nftDetails);


 
    return (


   
<>




<div className=' bg-transparent backdrop-blur flex flex-col gap-10 w-[1150px] mx-auto p-10 rounded-2xl shadow-lg '>
<div className='flex flex-row justify-between w-full'>
<div className='NFTImgage w-1/2'>
<NftImage url={nftData.NFTImageURL} />
</div>
<div className='NftDetail w-1/2'>
<NftDetailsCard nftData={nftData}/>
</div>
</div>
<div className='flex flex-row justify-between w-full'>
<div className='flex flex-col gap-12 w-1/2'>
    <h1 className='text-4xl'>About the NFT</h1>
    <p>{nftData.AboutProject}</p>
</div>
<NftMatrics nftData={nftData} />
</div>
</div>


  
 

</>
               
)
}

export default page