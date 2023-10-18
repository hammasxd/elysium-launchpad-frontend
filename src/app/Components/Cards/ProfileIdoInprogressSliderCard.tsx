import { Button, Card, CardHeader, Divider,Image } from '@nextui-org/react'
import React from 'react'
import testImg from  '../../assets/images/Active-PixelVerse.png'
import { saleToken } from '@/app/constants/baseUrl'
import { useSDK, useWallet } from '@thirdweb-dev/react'
import { Ido_ABI } from '@/app/constants/info'
import bgImageSrc from '../../assets/images/No-Participations.png'


function ProfileIdoInprogressSliderCard({key,index,Ido}:any) {
    const current=useWallet();
    const sdk=useSDK();
    let IDO_ABI = Ido_ABI();


   
    const addToken=async (add:any, symbol:any, decimal:any, image:any)=>{
        await window.ethereum.request({
            "method": "wallet_watchAsset",
            "params": {
              "type": "ERC20",
              "options": {
                "address": add,
                "symbol": symbol,
                "decimals": decimal,
                "image": image
              }
            }
          });
      
    }


    Ido.base64 = btoa(
        new Uint8Array(Ido.project_File.data.data).reduce(
          function (data, byte) {
            return data + String.fromCharCode(byte);
          },
          ""
        )
      );
  return (

    <Card key={key} className=' w-full py-10 px-5 bg-transparent backdrop-blur backdrop-brightness-150 rounded-xl'>
    <CardHeader className='flex flex-col items-start gap-10'>
        {
            Ido ?
            <>
        
            <div className='flex flex-row justify-between w-full'>
            <div className='flex flex-row gap-10'>
            <Image
            src={`data:image/png;base64,${Ido.base64}`}
            alt='testImage'
            width={300}
            className='min-h-[180px] max-h-[180px]'
            />
            <div className='flex flex-col gap-10 '>
                <div className='title'>
                    <h1 className=' font-bold text-lg mb-3'> { Ido?.ProjectTitle
     }</h1>
                    <p>{Ido?.ProjectShortDesc}</p>
                </div>
                <div className=' attributes flex flex-row w-full justify-between items-center gap-10'>
                    <div className='flex flex-col'>
                        <small className='font-bold opacity-60'>Sale Price</small>
                        <p>1 {" "}{saleToken} = {Ido.tokenPrice}{" "}
                                      {Ido.TokenSymbol}</p>
                    </div>
                    <div className='flex flex-col'>
                    <small className='font-bold opacity-60'>Tokens Offered</small>
                        <p>{Ido.totalSupply} {Ido.TokenSymbol}</p>
    
                    </div>
                    <div className='flex flex-col'>
                    <small className='font-bold opacity-60'>Status</small>
                        <p>{Ido.ProjectStatus}</p>
    
                    </div>
                    <div className='flex flex-col'>
                    <small className='font-bold opacity-60'>IDO Tier</small>
                        <p>{Ido.tierNum}</p>
    
                    </div>
                    <div className='flex flex-col'>
                    <small className='font-bold opacity-60'>Buy Amount</small>
                        <p>{Ido.buyAmount} {saleToken}</p>
    
                    </div>
                </div>
            </div>
            
            </div>

            <div className='flex flex-col gap-10 justify-between'>
            
            <Button  onPress={()=>{
                addToken(Ido?.TokenAddress,
                    Ido?.TokenSymbol,
                    Ido?.TokenDecimal,
                    Ido?.TokenImageURL);
            }} className=' bg-amber-600'>Add to MetaMask</Button>
            </div>
            </div>
            
            <Divider/>
            
            </> :
            <div className="w-full text-center items-center">
            <Image
                src={bgImageSrc.src}
                className=" w-full"
            />
        </div>
        }
       
    </CardHeader>
</Card>

    
    )
}

export default ProfileIdoInprogressSliderCard