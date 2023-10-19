'use client'
import { useAppSelector } from '@/redux/store';
import { Card, CardHeader, Divider, Pagination,Image } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import ProfileIdoClaimableSliderCard from '../Cards/ProfileIdoClaimableSliderCard';
import axios from 'axios';
import { baseUrl } from '@/app/constants/baseUrl';
import useSWR from 'swr'
import { useAddress, useSDK } from '@thirdweb-dev/react';
import { Ido_ABI } from '@/app/constants/info';
import bgImageSrc from '../../assets/images/No-Participations.png'
import web3 from 'web3'
import ProfileIdoInprogressSliderCard from '../Cards/ProfileIdoInprogressSliderCard';



function ProfileIdosSliders() {
  const participatedIdos = useAppSelector((state) => state.participatedIdosReducer);
  const itemsPerPage = 1; // Set the number of items to display per page
  const [currentPage, setCurrentPage] = useState(1); // For Claims Available
  const [currentPageInprogress, setCurrentPageInprogress] = useState(1); // For Inprogress IDOs
  const [currentPageClaimed, setCurrentPageClaimed] = useState(1); // For Claimed IDOs
  const sdk=useSDK()
  const account=useAddress();
  let IDO_ABI = Ido_ABI();
 const [invested,setInvested]=useState<any>([]);
  const [arrLength, setArrLength] = useState(0);
  const [ParticipatedDetails, setParticipatedDetails] = useState([]);
const [totalIDOs,setTotalIDOs]=useState();
  const [completed,setCompletedDetails]=useState();
  var inProgressArray: any[] = [];


useEffect(
  () => {

    var array:any = [];
    var invest:any = [];
    var completedArray:any = [];
    if (account) {
      try {
        // const intervalId = setInterval(async () => {  //assign interval to a variable to clear it.
        axios
          .post(`${baseUrl}/getUserParticipatedIDOs`, { address: account })
          .then(function (response) {
            //Response Of IDOS

            response.data.data.forEach(async (Ido:any) => {
              //For User Invested IDOS
              if(account!=undefined&&Ido.IDO!=null||''||undefined){
                let ido = await sdk?.getContractFromAbi(Ido.IDO,IDO_ABI)
            
                const maxParticipants = async () => {
                  return await ido?.call('getTotalParticipants');
                };
                await maxParticipants();
                await ido
                  ?.call('buyInOneTier',[account])
                  .then(async (res1:any) => {
                    if (res1.buyAmount.toString() == 0) {
                      await ido
                        ?.call('buyInTwoTier',[account])
                        .then(async (res2:any) => {
                          if (res2.buyAmount.toString() == 0) {
                            await ido
                              ?.call('buyInThreeTier',[account])
                              .then(async (res3:any) => {
                                if (res3.buyAmount.toString() == 0) {
                                 await ido
                                    ?.call('buyInFourTier',[account])
                                    .then(async (res4:any) => {
                                      if (res4.buyAmount.toString() == 0) {
                                        await ido
                                          ?.call('buyInFiveTier',[account])
                                          .then(async (res5:any) => {
                                            if (
                                              res5.buyAmount.toString() == 0
                                            ) {
                                             await ido
                                                ?.call('buyInSixTier',[account])
                                                .then(async (res6:any) => {
                                                  if (
                                                    res6.buyAmount.toString() ==
                                                    0
                                                  ) {
                                                    await ido
                                                      ?.call('buyInSevenTier',[account])
                                                      .then(async (res7:any) => {
                                                        if (
                                                          res7.buyAmount.toString() ==
                                                          0
                                                        ) {
                                                          await ido
                                                            ?.call('buyInEightTier',[account])
                                                            .then(async (res8:any) => {
                                                              if (
                                                                res8.buyAmount.toString() ==
                                                                0
                                                              ) {
                                                               await ido
                                                                  ?.call('buyInNineTier',[account])
                                                                  .then(
                                                                    (res9:any) => {
                                                                      if (
                                                                        res9.buyAmount.toString() ==
                                                                        0
                                                                      ) {
                                                                      } else {
                                                                        invest.push(
                                                                          parseFloat(
                                                                            web3.utils.fromWei(
                                                                              res9.buyAmount.toString(),
                                                                              "ether"
                                                                            )
                                                                          )
                                                                        );
            
                                                                        axios
                                                                          .post(
                                                                            `${baseUrl}/singleIDO`,
                                                                            {
                                                                              LaunchPoolAddress:
                                                                                Ido.IDO,
                                                                            }
                                                                          )
                                                                          .then(
                                                                            (
                                                                              ido
                                                                            ) => {
                                                                              ido.data.data.tierNum = 9;
                                                                              ido.data.data.Claimed =
                                                                                res9.claimed;
                                                                              ido.data.data.buyAmount =
                                                                                parseFloat(
                                                                                  web3.utils.fromWei(
                                                                                    res9.buyAmount.toString(),
                                                                                    "ether"
                                                                                  )
                                                                                );
                                                                              if (
                                                                                ido
                                                                                  .data
                                                                                  .data
                                                                                  .Claimed ==
                                                                                  false &&
                                                                                ido
                                                                                  .data
                                                                                  .data
                                                                                  .ProjectStatus ==
                                                                                  "Completed"
                                                                              ) {
                                                                                completedArray.push(
                                                                                  ido
                                                                                    .data
                                                                                    .data
                                                                                );
                                                                                setCompletedDetails(
                                                                                  completedArray
                                                                                );
                                                                              }
                                                                              array.push(
                                                                                ido
                                                                                  .data
                                                                                  .data
                                                                              );
                                                                              setArrLength(
                                                                                array.length
                                                                              );
                                                                              setParticipatedDetails(
                                                                                array
                                                                              );
                                                                            }
                                                                          )
                                                                          .catch(
                                                                            (err)=>{
                                                                              console.log(err)
                                                                            }
                                                                            
                                                                          );
                                                                      }
                                                                    }
                                                                  )
                                                                  .catch(
                                                                   (err)=>{
                                                                    console.log(err)
                                                                   }
                                                                  );
                                                              } else {
                                                                invest.push(
                                                                  parseFloat(
                                                                    web3.utils.fromWei(
                                                                      res8.buyAmount.toString(),
                                                                      "ether"
                                                                    )
                                                                  )
                                                                );
                                                                axios
                                                                  .post(
                                                                    `${baseUrl}/singleIDO`,
                                                                    {
                                                                      LaunchPoolAddress:
                                                                        Ido.IDO,
                                                                    }
                                                                  )
                                                                  .then(
                                                                    (ido) => {
                                                                      ido.data.data.tierNum = 8;
                                                                      ido.data.data.Claimed =
                                                                        res8.claimed;
                                                                      ido.data.data.buyAmount =
                                                                        parseFloat(
                                                                          web3.utils.fromWei(
                                                                            res8.buyAmount.toString(),
                                                                            "ether"
                                                                          )
                                                                        );
                                                                      if (
                                                                        ido
                                                                          .data
                                                                          .data
                                                                          .Claimed ==
                                                                          false &&
                                                                        ido
                                                                          .data
                                                                          .data
                                                                          .ProjectStatus ==
                                                                          "Completed"
                                                                      ) {
                                                                        completedArray.push(
                                                                          ido
                                                                            .data
                                                                            .data
                                                                        );
                                                                        setCompletedDetails(
                                                                          completedArray
                                                                        );
                                                                      }
                                                                      array.push(
                                                                        ido
                                                                          .data
                                                                          .data
                                                                      );
                                                                      setArrLength(
                                                                        array.length
                                                                      );
                                                                      setParticipatedDetails(
                                                                        array
                                                                      );
                                                                    }
                                                                  )
                                                                  .catch(
                                                                   (err)=>{
                                                                    console.log(err)
                                                                   }
                                                                  );
                                                              }
                                                            })
                                                            .catch(
                                                             (err)=>{
                                                              console.log(err)
                                                             }
                                                            );
                                                        } else {
                                                          invest.push(
                                                            parseFloat(
                                                              web3.utils.fromWei(
                                                                res7.buyAmount.toString(),
                                                                "ether"
                                                              )
                                                            )
                                                          );
                                                          axios
                                                            .post(
                                                              `${baseUrl}/singleIDO`,
                                                              {
                                                                LaunchPoolAddress:
                                                                  Ido.IDO,
                                                              }
                                                            )
                                                            .then((ido) => {
                                                              ido.data.data.tierNum = 7;
                                                              ido.data.data.Claimed =
                                                                res7.claimed;
                                                              ido.data.data.buyAmount =
                                                                parseFloat(
                                                                  web3.utils.fromWei(
                                                                    res7.buyAmount.toString(),
                                                                    "ether"
                                                                  )
                                                                );
                                                              if (
                                                                ido.data.data
                                                                  .Claimed ==
                                                                  false &&
                                                                ido.data.data
                                                                  .ProjectStatus ==
                                                                  "Completed"
                                                              ) {
                                                                completedArray.push(
                                                                  ido.data
                                                                    .data
                                                                );
                                                                setCompletedDetails(
                                                                  completedArray
                                                                );
                                                              }
                                                              array.push(
                                                                ido.data.data
                                                              );
                                                              setArrLength(
                                                                array.length
                                                              );
                                                              setParticipatedDetails(
                                                                array
                                                              );
                                                            })
                                                            .catch(
                                                            (err)=>{
                                                              console.log(err)
                                                            }
                                                            );
                                                        }
                                                      })
                                                      .catch(
                                                        (err)=>{
                                                          console.log(err)
                                                        }
                                                      );
                                                  } else {
                                                    invest.push(
                                                      parseFloat(
                                                        web3.utils.fromWei(
                                                          res6.buyAmount.toString(),
                                                          "ether"
                                                        )
                                                      )
                                                    );
                                                    axios
                                                      .post(
                                                        `${baseUrl}/singleIDO`,
                                                        {
                                                          LaunchPoolAddress:
                                                            Ido.IDO,
                                                        }
                                                      )
                                                      .then((ido) => {
                                                        ido.data.data.tierNum = 6;
                                                        ido.data.data.Claimed =
                                                          res6.claimed;
                                                        ido.data.data.buyAmount =
                                                          parseFloat(
                                                            web3.utils.fromWei(
                                                              res6.buyAmount.toString(),
                                                              "ether"
                                                            )
                                                          );
                                                        if (
                                                          ido.data.data
                                                            .Claimed ==
                                                            false &&
                                                          ido.data.data
                                                            .ProjectStatus ==
                                                            "Completed"
                                                        ) {
                                                          completedArray.push(
                                                            ido.data.data
                                                          );
                                                          setCompletedDetails(
                                                            completedArray
                                                          );
                                                        }
                                                        array.push(
                                                          ido.data.data
                                                        );
                                                        setArrLength(
                                                          array.length
                                                        );
                                                        setParticipatedDetails(
                                                          array
                                                        );
                                                      })
                                                      .catch(
                                                       (err)=>{
                                                        console.log(err)
                                                       }
                                                      );
                                                  }
                                                })
                                                .catch(
                                                  (err)=>{
                                                   console.log(err)
                                                  }
                                                );
                                            } else {
                                              invest.push(
                                                parseFloat(
                                                  web3.utils.fromWei(
                                                    res5.buyAmount.toString(),
                                                    "ether"
                                                  )
                                                )
                                              );
                                              axios
                                                .post(
                                                  `${baseUrl}/singleIDO`,
                                                  {
                                                    LaunchPoolAddress:
                                                      Ido.IDO,
                                                  }
                                                )
                                                .then((ido) => {
                                                  ido.data.data.tierNum = 5;
                                                  ido.data.data.Claimed =
                                                    res5.claimed;
                                                  ido.data.data.buyAmount =
                                                    parseFloat(
                                                      web3.utils.fromWei(
                                                        res5.buyAmount.toString(),
                                                        "ether"
                                                      )
                                                    );
            
                                                  if (
                                                    ido.data.data.Claimed ==
                                                      false &&
                                                    ido.data.data
                                                      .ProjectStatus ==
                                                      "Completed"
                                                  ) {
                                                    completedArray.push(
                                                      ido.data.data
                                                    );
                                                    setCompletedDetails(
                                                      completedArray
                                                    );
                                                  }
                                                  array.push(ido.data.data);
                                                  setArrLength(array.length);
                                                  setParticipatedDetails(
                                                    array
                                                  );
                                                })
                                                .catch(
                                                  (err)=>{
                                                   console.log(err)
                                                  }
                                                );
                                            }
                                          })
                                          .catch(
                                            (err)=>{
                                             console.log(err)
                                            });
                                      } else {
                                        invest.push(
                                          parseFloat(
                                            web3.utils.fromWei(
                                              res4.buyAmount.toString(),
                                              "ether"
                                            )
                                          )
                                        );
                                        axios
                                          .post(`${baseUrl}/singleIDO`, {
                                            LaunchPoolAddress: Ido.IDO,
                                          })
                                          .then((ido) => {
                                            ido.data.data.tierNum = 4;
                                            ido.data.data.Claimed =
                                              res4.claimed;
                                            ido.data.data.buyAmount =
                                              parseFloat(
                                                web3.utils.fromWei(
                                                  res4.buyAmount.toString(),
                                                  "ether"
                                                )
                                              );
                                            if (
                                              ido.data.data.Claimed ==
                                                false &&
                                              ido.data.data.ProjectStatus ==
                                                "Completed"
                                            ) {
                                              completedArray.push(
                                                ido.data.data
                                              );
                                              setCompletedDetails(
                                                completedArray
                                              );
                                            }
                                            array.push(ido.data.data);
                                            setArrLength(array.length);
                                            setParticipatedDetails(array);
                                          })
                                          .catch(
                                            (err)=>{
                                             console.log(err)
                                            });
                                      }
                                    })
                                    .catch(
                                      (err)=>{
                                       console.log(err)
                                      });
                                } else {
                                  invest.push(
                                    parseFloat(
                                      web3.utils.fromWei(
                                        res3.buyAmount.toString(),
                                        "ether"
                                      )
                                    )
                                  );
                                  axios
                                    .post(`${baseUrl}/singleIDO`, {
                                      LaunchPoolAddress: Ido.IDO,
                                    })
                                    .then((ido) => {
                                      ido.data.data.tierNum = 3;
                                      ido.data.data.Claimed = res3.claimed;
                                      ido.data.data.buyAmount = parseFloat(
                                        web3.utils.fromWei(
                                          res3.buyAmount.toString(),
                                          "ether"
                                        )
                                      );
                                      if (
                                        ido.data.data.Claimed == false &&
                                        ido.data.data.ProjectStatus ==
                                          "Completed"
                                      ) {
                                        completedArray.push(ido.data.data);
                                        setCompletedDetails(completedArray);
                                      }
                                      array.push(ido.data.data);
                                      setArrLength(array.length);
                                      setParticipatedDetails(array);
                                    })
                                    .catch(
                                      (err)=>{
                                       console.log(err)
                                      });
                                }
                              })
                              .catch(
                                (err)=>{
                                 console.log(err)
                                });
                          } else {
                            invest.push(
                              parseFloat(
                                web3.utils.fromWei(
                                  res2.buyAmount.toString(),
                                  "ether"
                                )
                              )
                            );
                            axios
                              .post(`${baseUrl}/singleIDO`, {
                                LaunchPoolAddress: Ido.IDO,
                              })
                              .then((ido) => {
                                ido.data.data.tierNum = 2;
                                ido.data.data.Claimed = res2.claimed;
                                ido.data.data.buyAmount = parseFloat(
                                  web3.utils.fromWei(
                                    res2.buyAmount.toString(),
                                    "ether"
                                  )
                                );
                                if (
                                  ido.data.data.Claimed == false &&
                                  ido.data.data.ProjectStatus == "Completed"
                                ) {
                                  completedArray.push(ido.data.data);
                                  setCompletedDetails(completedArray);
                                }
                                array.push(ido.data.data);
                                setArrLength(array.length);
                                setParticipatedDetails(array);
                              })
                              .catch(
                                (err)=>{
                                 console.log(err)
                                });
                          }
                        })
                        .catch(
                          (err)=>{
                           console.log(err)
                          });
                    } else {
                      invest.push(
                        parseFloat(
                          web3.utils.fromWei(
                            res1.buyAmount.toString(),
                            "ether"
                          )
                        )
                      );
                      axios
                        .post(`${baseUrl}/singleIDO`, {
                          LaunchPoolAddress: Ido.IDO,
                        })
                        .then((ido) => {
                          ido.data.data.tierNum = 1;
                          ido.data.data.Claimed = res1.claimed;
                          ido.data.data.buyAmount = parseFloat(
                            web3.utils.fromWei(
                              res1.buyAmount.toString(),
                              "ether"
                            )
                          );
                          if (
                            ido.data.data.Claimed == false &&
                            ido.data.data.ProjectStatus == "Completed"
                          ) {
                            completedArray.push(ido.data.data);
                            setCompletedDetails(completedArray);
                          }
                          array.push(ido.data.data);
                          setArrLength(array.length);
                          setParticipatedDetails(array);
                        })
                        .catch(
                          (err)=>{
                           console.log(err)
                          });
                    }
                  })
                  .catch(
                    (err)=>{
                     console.log(err)
                    });
                    setInvested(invest);

            }

            });
          });
      } catch (err) {}

    
    }


  },
  [ account, 1000] //useEffect will run only one time
  //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
);
 
let claimableOnly : Array<any> =[];
let inProgressOnly : Array<any> = [];
let claimedOnly: Array<any>=[];
ParticipatedDetails.forEach((Ido:any)=>{
  if(Ido?.ProjectStatus=='Completed'&& Ido.Claimed==false){
    claimableOnly.push(Ido);
  }
  if(Ido?.ProjectStatus=='In-progress' && Ido.Claimed==false){
    inProgressOnly.push(Ido)

  }
  if(Ido?.ProjectStatus=='Completed'&& Ido.Claimed==true){
    claimedOnly.push(Ido)

  }

})

const pageCount = claimableOnly.length;
const pageCountInprogress = inProgressOnly.length;
const pageCountClaimed = claimedOnly.length;




  


  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const startIndexClaimed = (currentPageClaimed - 1) * itemsPerPage;
  const endIndexClaimed = startIndexClaimed + itemsPerPage;
  const startIndexInprogress = (currentPageInprogress - 1) * itemsPerPage;
  const endIndexInprogress = startIndexInprogress + itemsPerPage;


  // Slice the array to get the items for the current page
  const displayedIdos = claimableOnly.slice(startIndex, endIndex);
  const dipslayedIdosInprogress = inProgressOnly.slice(startIndexInprogress, endIndexInprogress)
  const dipslayedIdosClaimed = claimedOnly.slice(startIndexClaimed, endIndexClaimed);

  return (
    <div className='flex flex-col gap-20'>
      <div className='flex flex-col justify-center items-center gap-14 w-full'>
      <div className='heading'>
        <h1 className='text-5xl font-bold'>Inprogress IDOs</h1>
      </div>
      { dipslayedIdosInprogress.length>0  ? 
      <div className=' flex flex-col justify-center w-full gap-10'>
      {dipslayedIdosInprogress.map((list, index) => (
        //inProgress
        <ProfileIdoInprogressSliderCard key={index} index={index} Ido={list} />
      ))}
       <Pagination
  className='bg-transparent flex justify-center'
  loop
  showControls
  color="primary"
  total={pageCountInprogress}
  initialPage={1}
  page={currentPageInprogress}
  onChange={(newPage) => setCurrentPageInprogress(newPage)}
/>
      </div> : 
     <div className="w-full text-center flex flex-col items-center">
     <Image
         src={bgImageSrc.src}
         className=" w-full max-h-[300px]"
     />
 </div>
      
      
        
      }
      
     
    </div>
    <div className='flex flex-col justify-center items-center gap-14 w-full'>
      <div className='heading'>
        <h1 className='text-5xl font-bold'>Claimed IDOs</h1>
      </div>
      { dipslayedIdosClaimed.length>0  ? 
      <div className=' flex flex-col justify-center w-full gap-10'>
      {dipslayedIdosClaimed.map((list, index) => (
        //inProgress
        <ProfileIdoInprogressSliderCard key={index} index={index} Ido={list} />
      ))}
      <Pagination
  className='bg-transparent flex justify-center'
  loop
  showControls
  color="primary"
  total={pageCountClaimed}
  initialPage={1}
  page={currentPageClaimed}
  onChange={(newPage) => setCurrentPageClaimed(newPage)}
/>
      </div> : 
     <div className="w-full text-center flex flex-col items-center">
     <Image
         src={bgImageSrc.src}
         className=" w-full max-h-[300px]"
     />
 </div>
      
      
        
      }
      
     
    </div>
    <div className='flex flex-col justify-center items-center gap-14'>
      <div className='heading'>
        <h1 className='text-5xl font-bold'>Claims Available</h1>
      </div>

      { displayedIdos.length>0  ? 
      <div className=' w-full flex flex-col justify-center gap-10'>
      {displayedIdos.map((list, index) => (
        //inProgress
        <div key={index}>
        <ProfileIdoClaimableSliderCard key={index} index={index} Ido={list} />
        </div>
      ))}
<div>       <Pagination
  className='bg-transparent flex justify-center'
  loop
  showControls
  color="primary"
  total={pageCount}
  initialPage={1}
  page={currentPage}
  onChange={(newPage) => setCurrentPage(newPage)}
/>
</div>
      </div> : 
     <div className="w-full flex flex-col justify-center text-center items-center">
     <Image
         src={bgImageSrc.src}
         className=" w-full max-h-[300px]"
     />
 </div>
      
      
        
      }
      
    </div>
    







    </div>
  );
}

export default ProfileIdosSliders;
