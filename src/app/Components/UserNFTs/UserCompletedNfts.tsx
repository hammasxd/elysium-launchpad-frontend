'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@nextui-org/react';
import { useAddress, useSDK } from '@thirdweb-dev/react';
import { nftPool_ABI } from '@/app/constants/info';
import { Pagination , Image } from '@nextui-org/react'; // Import Pagination
import {baseUrl} from '@/app/constants/baseUrl';
import bgCompleted from '@/app/assets/images/No-Completed-NFT.png'
import UserCompletedNftsCard from './Cards/UserCompletedNftsCard';

const UserCompletedNfts = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedImage, setIsLoadedImage] = useState(false);
  const [completedNFTPool, setCompletedNFTPool] = useState([]);
  const [status, setStatus] = useState('');
  const sdk = useSDK();
  const nftPoolAbi = nftPool_ABI();
  let nftPool;
  const walletAddress = useAddress();
  const [revalidation,setRevalidation]=useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Items per page

  const getUserCompletedNFTPools = () => {
    let poolArray: any = [];
    try {
      fetch(`${baseUrl}/userCompletedNfts`, {
        cache:'no-cache',
        method: 'POST',
        
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAddress: walletAddress }),
      })
        .then(async (response) =>response.json() .then(async (response) => {

          poolArray = await response.data;

          if (poolArray == '' || poolArray === null || poolArray == 'null') {
            setStatus('In-progress');
            setCompletedNFTPool([])
          } else {
            for (var i = 0; i < poolArray.length; i++) {
              if (poolArray[i]) {
                let address = poolArray[i].NFTPoolAddress;
                try {
                  nftPool = await sdk?.getContractFromAbi(address, nftPoolAbi);
                } catch (err) {
                  continue;
                }

                await nftPool?.call('totalNFTSoldInAllTier').then((result: any) => {
                  let inInt = parseInt(result._hex, 16);
                  poolArray[i].Purchased = inInt;
                });

                await nftPool?.call('totalPoolParticipant').then((result: any) => {
                  let inInt = parseInt(result._hex, 16);
                  poolArray[i].Participants = inInt;
                });

                let filledPercentage =
                  (poolArray[i].Purchased / parseFloat(poolArray[i].NFTMaxCap)) * 100;
                poolArray[i].FilledPercentage = filledPercentage;
              } else {
                setStatus('In-progress');
                setCompletedNFTPool(poolArray);
              }
            }
            setCompletedNFTPool(poolArray);
            setIsLoaded(true);
          setIsLoadedImage(true);
          }
          
          
        }))
        .catch((err) => {
          setStatus('In-progress');
          setCompletedNFTPool(poolArray);
        });
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if(walletAddress){
    getUserCompletedNFTPools();
  }
  }, [walletAddress,revalidation]);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedNFTPool = completedNFTPool?.slice(startIndex, endIndex);

  return (
    <section className="flex flex-col justify-center ">
      <div className="w-full m-auto text-center mb-10">
        <h3 className="text-7xl font-bold">Completed</h3>
      </div>
      {completedNFTPool.length > 0 ? 
      
      <div className='flex flex-col gap-10 '>
        <div className='flex flex-row flex-wrap gap-10 justify-center' >
        {
        displayedNFTPool.map((nft: any, index) => {
          return (
            <UserCompletedNftsCard
              key={index}
              poolName={nft.NFTPoolType}
              index={index}
              nft={nft}
              isLoaded={isLoaded}
              isLoadedImage={isLoadedImage}
              revalidation={revalidation}
              setRevalidation={setRevalidation}
            />
          );
        })
      }
      </div>

<Pagination
    className="flex justify-center"
    loop
    showControls
      page={currentPage}
      onChange={(newPage) => setCurrentPage(newPage)}
      total={Math.ceil(completedNFTPool.length/3)}
      initialPage={1}
    />

      </div>
      : displayedNFTPool.length === 0 && status === 'In-progress' ? (
        <div className="w-full text-center items-center">
          
        <Image 
        src={bgCompleted.src}
        alt='bg image'
        />
      
        </div>

      ) : (
        <div className="loader mx-auto">
          <CircularProgress />
        </div>
      )}
     




     
      
      
      
      
     
     
     
    </section>
  );
};

export default UserCompletedNfts;
