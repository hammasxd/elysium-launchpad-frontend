'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../../constants/baseUrl';
import { CircularProgress } from '@nextui-org/react';
import { useSDK } from '@thirdweb-dev/react';
import { nftPool_ABI } from '@/app/constants/info';
import NftCard from '@/app/Components/Cards/NftCard';
import { Pagination } from '@nextui-org/react'; // Import Pagination

const Page = ({ params }: { params: { poolDetails: string } }) => {
  let PoolName = params.poolDetails;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedImage, setIsLoadedImage] = useState(false);
  const [completedNFTPool, setCompletedNFTPool] = useState([]);
  const [status, setStatus] = useState('');
  const sdk = useSDK();
  const nftPoolAbi = nftPool_ABI();
  let nftPool;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Items per page

  const getCompletedNFTPools = () => {
    let poolArray: any = [];
    try {
      axios
        .post(`${baseUrl}/allCompletedNftPool`, {
          NFTPoolType: PoolName,
        })
        .then(async (response) => {
          poolArray = await response.data.data;

          if (poolArray == '' || poolArray == null) {
            setStatus('In-progress');
            setCompletedNFTPool(poolArray);
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
          }
          setCompletedNFTPool(poolArray);
          setIsLoaded(true);
          setIsLoadedImage(true);
        })
        .catch((err) => {
          setStatus('In-progress');
          setCompletedNFTPool(poolArray);
        });
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getCompletedNFTPools();
  }, []);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedNFTPool = completedNFTPool.slice(startIndex, endIndex);

  return (
    <section className="flex flex-col justify-center mt-10 mb-10">
      <div className="w-full m-auto text-center">
        <h3 className="text-7xl font-bold">Completed</h3>
      </div>
      <div className="flex gap-10 z-40 mt-20 mx-auto h-auto items-center justify-center top-0 inset-x-0 mb-20 bg-transparent capitalize">
        {displayedNFTPool.length > 0 ? (
          displayedNFTPool.map((item: any, index) => {
            return (
              <NftCard
                key={index}
                poolName={PoolName}
                index={index}
                nft={item}
                isLoaded={isLoaded}
                isLoadedImage={isLoadedImage}
              />
            );
          })
        ) : displayedNFTPool.length === 0 && status === 'In-progress' ? (
          <div className="w-full text-center items-center">
            {/* No items to display */}
          </div>
        ) : (
          <div className="loader">
            <CircularProgress />
          </div>
        )}
      </div>
      <div className='paginationContainer'>
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
    </section>
  );
};

export default Page;
