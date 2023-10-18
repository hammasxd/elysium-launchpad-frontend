import React from 'react'
import ChooseUs from '../Components/ChooseUs'
import FarmCard from '../Components/Cards/FarmsCard'
import {baseUrl} from '../constants/baseUrl';

async function getPoolData() {
    const response= await fetch(`${baseUrl}/distinctPoolTypes`,{
      cache:'no-cache'
    });
    const data: any= response.json();
    return data;
}
async function nftLaunchpad() {
    const poolData= await getPoolData();
  return (
    <div className='  w-full mb-28'>
    <div className="container h-full m-auto">
    <div className="flex justify-center">
      <div className="w-full">
        <figure className="text-white text-center mb-0">
          <figcaption className="mx-auto">
            <p className="text-center text-2xl mb-8 font-light" >
            Getting the{" "}
              <span className=" text-primary-PAROT">best NFTs</span> just became easier.
            </p>
            <h2 className=" Roboto-Light font-bold text-7xl mb-10 w-1/3 mx-auto">
            Elysium<span className=' font-light '>  NFT Launchpad</span> 
            </h2>
            <p className="text-center w-1/2 mx-auto mb-4">
              Elysium offers its users an early & easy access to new high-quality projects. Invest in new projects on Elysium now!
            </p>
          </figcaption>
        </figure>
      </div>
    </div>
    <div className='lpTokenPool felx flex-col align-middle justify-center w-full mx-auto text-center mt-20'>
    <div className='FarmHeading'>
        <h1 className='text-6xl font-bold '>Farms</h1>
        <p className=' mt-11'>Stake LP tokens to earn.</p>
    </div>
    <div className='Farms flex flex-wrap mx-auto justify-center gap-4 mt-14 '>
    
    {poolData.data.map((item:any, index:any) => (

        <FarmCard key={index} poolname={item.poolName} count={item.count} />
        
      ))}

   
    </div>
  </div>
  </div>
 
  </div>
 
  )

}

export default nftLaunchpad