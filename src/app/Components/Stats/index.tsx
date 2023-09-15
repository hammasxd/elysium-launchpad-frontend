'use client'
import { Card, CardHeader,  CardBody,  Image, Skeleton} from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import idos from "../../assets/images/icon-pyr.png";
const baseUrl = process.env.NEXT_API_BASE_URL;

function Stats() {
    const [UseTotal, SetTotalIDO] = useState('');
  const [UseInprogress, SetInprogressIDO] = useState('');
  const [UseUpComing, SetUpComingIDO] = useState('');
  const [UseCompleted, SetCompletedIDO] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(baseUrl);
useEffect(() => {
    const fetchData = () => {
      axios
        .get(`https://elysium-launchpad-adminbackend-nft-dev.vulcanforged.com/api/allIDOsCnt`)
        .then(function (response) {
          SetTotalIDO(response.data.data.total);
          SetInprogressIDO(response.data.data.InProgress);
          SetUpComingIDO(response.data.data.UpComing);
          SetCompletedIDO(response.data.data.Completed);
        }).then(()=>{
            setIsLoaded(true)
        })
        .catch(function (error) {
          // Handle errors here
          console.error("error in api data",error);
        });
    };

    fetchData(); // Call the function when the component mounts

    // If you want to fetch data periodically, you can use setInterval
    // Example: setInterval(fetchData, 5000);

    return () => {
      // This is the cleanup function, you can perform cleanup here if needed
      // For example, if you set up an interval, clear it here:
      // clearInterval(intervalId);
    };
  }, [5000]); // Empty dependency array for componentDidMount behavior
  const idosCards:{title:string,value:string}[]=[
    {title:'TOTAL IDOS',value:UseTotal},
    {title:'INPROGRESS IDOS',value:UseInprogress},
    {title:'UPCOMMING IDOS',value:UseUpComing},
    {title:'COMPLETED IDOS',value:UseCompleted}
  ]
  return (
    <div className="flex gap-10 z-40 w-2/3 mx-auto h-auto items-center justify-center top-0 inset-x-0 mb-20 bg-transparent capitalize">
      {idosCards.map((item, index) => (

<Card key={index} className="w-[300px] p-4 bg-transparent rounded-3xl backdrop-blur ">
    <Skeleton
    className='rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0  before:animate-[shimmer_0.75s_infinite]'
    isLoaded={isLoaded}
    >
<CardHeader className="flex gap-3">
  <Image
    alt="nextui logo"
    height={40}
    radius="sm"
    src={idos.src}
    width={40}
  />
  <div className="flex flex-col text-5xl">
    <h1>{item.value}</h1>
    
  </div>
</CardHeader>
</Skeleton>

<CardBody className='my-0'>
<Skeleton
    className=' rounded-lg bg-primary-400 before:opacity-100 before:bg-primary-500 after:bg-primary-500 after:opacity-0 before:animate-[shimmer_0.75s_infinite]'
    isLoaded={isLoaded}
    
    >
  <h1 className='item-titlee text-lg'>{item.title}</h1>
  </Skeleton>
</CardBody>

</Card>

      ))}
      
    </div>
    
  )
}

export default Stats