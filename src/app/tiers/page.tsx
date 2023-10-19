
import React from 'react'
import TiersCard from '../Components/Cards/TiersCard'

async function getData() {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/vulcan-forged?tickers=true&market_data=true',{
        cache:'force-cache',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    })
   
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

async function Tiers() {
    const apiData=await getData()
    const currentPrice=apiData.market_data.current_price.usd;
    const tierOneToThree=[
        {tierName:'Tier 1', price:300, currentPrice:currentPrice},
        {tierName:'Tier 2', price:1100,currentPrice:currentPrice},
        {tierName:'Tier 3', price:2250,currentPrice:currentPrice},
    ]
    const tierfourToSix=[
        {tierName:'Tier 4', price:6500, currentPrice:currentPrice},
        {tierName:'Tier 5', price:8250,currentPrice:currentPrice},
        {tierName:'Tier 6', price:11000,currentPrice:currentPrice},
    ]
    const tierSeveToNine=[
        {tierName:'Tier 7', price:22250, currentPrice:currentPrice},
        {tierName:'Tier 8', price:55000,currentPrice:currentPrice},
        {tierName:'Tier 9', price:110000,currentPrice:currentPrice},
    ]
    return (
        <div className='flex flex-col justify-center mx-auto'>
            <div className='tierSystem text-center flex flex-col gap-20 mt-20 mb-20'>
                <h1 className=' text-5xl font-normal w-[400px] mx-auto'>Our new updated <span className=' font-extrabold'>Tier</span> System</h1>
                <p className=' font-light w-[550px] mx-auto text-2xl'>New tier system based on guaranteed allocations for all tiers pool weight.</p>
            </div>
           
            <div className='Tier1to3 py-20 bg-gradient-to-b from-transparent to-[rgb(0,0,0,0.8)] mx-auto w-full'>
                <div className=' flex flex-col gap-10 w-[1150px] mx-auto  '>
                    <div className='info1 flex flex-row gap-16' >
                        <div className='heading1  w-[79%]'>
                            <h1 className=' text-5xl font-bold'>The New Tier System</h1>
                        </div>
                        <div className='detail1'>
                            <p className=' mb-12'>The next tier system of Elysium Launchpad proposes a 9 tier system that works according to “Pool Weight” system per wallet in each tier; rather than our old broken system where we were dividing the allocations in between 3 tiers regardless of how many wallets there were in each tier.</p>
                            <p>Pool weight system derives its power from mathematical formulas that creates a more fair model, with more incentives for those who want to get more allocations from gaming projects we will launch at our Launchpad.</p>
                        </div>
                    </div>
                    <div className='tiersDetail flex flex-row gap-14 w-full justify-center'>

                        {
                            tierOneToThree.map((tier,index)=>{
                                return(
                                    
                                    <TiersCard key={index} tierName={tier.tierName} price={tier.price} currentPrice={tier.currentPrice}/>

                                   
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div> 
            <div className='Tier4to6 bg-gradient-to-b from-[rgb(0,0,0,0.8)] to-[rgb(87,67,128,0.8)]  py-20 mx-auto  w-full'>
                <div className=' flex flex-col gap-10 w-[1150px] mx-auto '>
                    <div className='info1 flex flex-row gap-16' >
                        <div className='heading1  w-[79%]'>
                            <h1 className=' text-5xl font-bold'>The New Tier System</h1>
                        </div>
                        <div className='detail1'>
                            <p className=' mb-12'>The next tier system of Elysium Launchpad proposes a 9 tier system that works according to “Pool Weight” system per wallet in each tier; rather than our old broken system where we were dividing the allocations in between 3 tiers regardless of how many wallets there were in each tier.</p>
                            <p>Pool weight system derives its power from mathematical formulas that creates a more fair model, with more incentives for those who want to get more allocations from gaming projects we will launch at our Launchpad.</p>
                        </div>
                    </div>
                    <div className='tiersDetail flex flex-row gap-14 w-full justify-center'>

                        {
                            tierfourToSix.map((tier,index)=>{
                                return(
                                    
                                    <TiersCard key={index} tierName={tier.tierName} price={tier.price} currentPrice={tier.currentPrice}/>

                                   
                                )
                            })
                        }
                        
                    </div>
                </div>
                </div>
            
            <div className='Tier7to9 bg-gradient-to-b from-[rgb(87,67,128,0.8)] to-[rgb(0,0,0,0.8)] mx-auto w-full'>
            <div className=' flex flex-col gap-10 w-[1150px] mx-auto '>
                    <div className='info1 flex flex-row gap-16' >
                        <div className='heading1  w-[79%]'>
                            <h1 className=' text-5xl font-bold'>The New Tier System</h1>
                        </div>
                        <div className='detail1'>
                            <p className=' mb-12'>The next tier system of Elysium Launchpad proposes a 9 tier system that works according to “Pool Weight” system per wallet in each tier; rather than our old broken system where we were dividing the allocations in between 3 tiers regardless of how many wallets there were in each tier.</p>
                            <p>Pool weight system derives its power from mathematical formulas that creates a more fair model, with more incentives for those who want to get more allocations from gaming projects we will launch at our Launchpad.</p>
                        </div>
                    </div>
                    <div className='tiersDetail flex flex-row gap-14 w-full justify-center'>

                        {
                            tierSeveToNine.map((tier,index)=>{
                                return(
                                    
                                    <TiersCard key={index} tierName={tier.tierName} price={tier.price} currentPrice={tier.currentPrice}/>

                                   
                                )
                            })
                        }
                        
                    </div>
                </div>
                </div>
            <div className='gradientend w-full h-28  bg-gradient-to-b from-[rgb(0,0,0,0.8)] to-transparent'></div>
                
        </div>
    )
}

export default Tiers