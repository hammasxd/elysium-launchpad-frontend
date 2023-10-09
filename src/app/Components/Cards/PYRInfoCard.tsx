'use client'
import { Card, CardHeader, CardBody,Image, Divider } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import idos from "../../assets/images/icon-pyr.png";
import axios from 'axios';



function PYRInfoCard() {
    const [circulatingSupply,setCirculatingSupply]=useState('')
    const [marketCap,setMarketCap]=useState('')
    const [currentPrice,setCurrentPrice]=useState('')
    const [marketRank,setMarketRank]=useState('')
    const [pyrImae,setPYRImage]=useState(idos.src)
    
   
useEffect(() => {
 
    axios({
        method: "GET",
        url: "https://api.coingecko.com/api/v3/coins/vulcan-forged?tickers=true&market_data=true",
      })
        .then((response) => {
          setCirculatingSupply(response.data.market_data.circulating_supply);
          setMarketCap(response.data.market_data.market_cap.usd);
          setCurrentPrice(response.data.market_data.current_price.usd);
          setMarketRank(response.data.market_data.market_cap_rank);
          setPYRImage(response.data.image.small);
        })
        .catch((error) => {});


  
}, [])





  return (
<>
        <Card className='p-10 bg-transparent backdrop-blur shadow-xl h-full backdrop-brightness-150'>
            <CardHeader className='flex justify-start'>
                <Image
                src={pyrImae}
                alt='PYR Logo'
                
                />
                <h1 className='text-left text-2xl'>PYR</h1>
            </CardHeader>
            <CardBody>
               
               
            <>
        <div className=' grid grid-cols-2 grid-rows-2 gap-4' >
                    <div>
                        <small className='text-right text-sm'>Price</small>
                        <p className='text-lg font-bold'>$ {currentPrice}</p>
                    </div>
                    <div>
                        <small className='text-right text-sm'>Circulating Supply</small>
                        <p className=' text-lg font-bold'>{circulatingSupply} PYR</p>
                    </div>
                 
        
                    <div>
                        <small className='text-right text-sm'>Market Cap</small>
                        <p className='text-lg font-bold'>$ {marketCap}</p>
                    </div>
                    <div>
                        <small className='text-right text-sm'>Market Cap Rank</small>
                        <p className=' text-lg font-bold'>{marketRank}</p>  
                    </div>
        </div>
                
                </>
            
            </CardBody>
        </Card>
        </>
  )
}

export default PYRInfoCard