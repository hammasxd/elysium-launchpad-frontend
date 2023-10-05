'use client'
import React, { useState, useEffect } from "react";
import { Ido_ABI } from "../../constants/info";
import { useSDK } from "@thirdweb-dev/react";
import completed from '../../assets/images/no-completed-IDO.png'
import { Image, Pagination, Spinner } from "@nextui-org/react";
import { utils } from "ethers";
import IdoCard from "@/app/Components/Cards/IdoCard";
import { baseUrl } from "@/app/constants/baseUrl";
import { Fascinate } from "next/font/google";

let IDO_ABI: any = Ido_ABI();

const Page = () => {
  const sdk = useSDK();
  let IDO3;
  const [completedIDOs, setCompletedIDOs] = useState<any[]>([]);
  const [status, setStatus] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedImage, setIsLoadedImage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [completedIDOsCount, setCompletedIDOsCount] = useState(1);

  const fetchCompletedCount = async () => {
    try {
      const response = await fetch(`${baseUrl}/allIDOsCnt`,{
        cache:'force-cache',
      });
      const data = await response.json();
      setCompletedIDOsCount(data.data.UpComing);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    var array:any = [];
    try {
      const response = await fetch(`${baseUrl}/getUpcommingIDOsPaginated`, {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offset: indexOfFirstItem,
          limit: itemsPerPage,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      array = responseData.data;

      if (array == "" || array == null) {
        array = [];
        setStatus("In-progress");
      } else {
        for (var iteration = 0; iteration < array.length; iteration++) {
          if (array[iteration]) {
            var address = await array[iteration].LaunchPoolAddress;
            try {
              IDO3 = sdk?.getContractFromAbi(address, IDO_ABI);
            } catch (err) {
              continue;
            }

            if (array[iteration].project_File != null) {
              array[iteration].base64 = btoa(
                new Uint8Array(array[iteration].project_File.data.data).reduce(function (data, byte) {
                  return data + String.fromCharCode(byte);
                }, "")
              );
            }

            var address = await array[iteration].LaunchPoolAddress;
            IDO3 = await sdk?.getContractFromAbi(address, IDO_ABI);
            await IDO3?.call('totalBUSDReceivedInAllTier').then(async (a) => {
              array[iteration].raised = utils.formatEther(await a)
            })

            await IDO3?.call('getParameters').then(async (a: any) => {
              array[iteration].maxCap = utils.formatEther(await a?.maxCap)
              array[iteration].tokenPrice = a.IdoTokenPrice / 100;
            })

            await IDO3?.call('getTotalParticipants').then(async (a: any) => {
              array[iteration].maxParticipants = a;
            })

            let TotalTokenSold = array[iteration].tokenPrice * array[iteration].raised;
            let filledPercentage = (TotalTokenSold / array[iteration].totalSupply) * 100;
            array[iteration].filledPercentage = filledPercentage;
            array[iteration].SetTotalTokenSold = TotalTokenSold;
            setCompletedIDOs([...array]);
            setIsLoaded(true);

          } else {
            setStatus("In-progress");
            setCompletedIDOs([...array]);
          }
        }
      }
      setIsLoadedImage(true);
    } catch (err) {
      console.error('Error fetching data:', err);
      setStatus("In-progress");
    }
  };
  useEffect(() => {
    fetchCompletedCount();
    fetchData();
  }, [currentPage]); // Make sure to fetch data when the page changes

  const handlePageChange = (newPage: number) => {
    setIsLoaded(false);
    setIsLoadedImage(false)
    setCurrentPage(newPage);

  };

  // Calculate the range of items to display on the current page
  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <section className="flex flex-col mt-10 mb-10">
      <div className="w-full m-auto text-center">
        <h3 className="text-7xl font-bold">Upcomming Projects</h3>
      </div>
      <div className="flex flex-wrap gap-10 z-40 mt-20 mx-auto h-auto items-center justify-center top-0 inset-x-0 mb-20 bg-transparent capitalize">
        {completedIDOs.length > 0 ? (
          completedIDOs.map((list: any, index) => {
            return (
              <IdoCard key={index} index={index} list={list} isLoaded={isLoaded} isLoadedImage={isLoadedImage} />
            );
          })
        ) : completedIDOs.length === 0 && status === "In-progress" ? (
          <div className="w-full text-center items-center">
            <Image src={completed.src} className="w-full" />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
      <div className="pagination-container">
        <Pagination
          className="flex justify-center"
          loop
          showControls
          total={Math.ceil(completedIDOsCount / itemsPerPage)}
          initialPage={1}
          page={currentPage}
          onChange={(newPage:number)=>{handlePageChange(newPage)}}
        />
      </div>
    </section>
  );
};

export default Page;
