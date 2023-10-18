'use client'
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { GasCostEstimator, SmartContract, getContractFromAbi, useAddress,useContract, useSDK } from '@thirdweb-dev/react';
import React, { useEffect, useState } from 'react'
import web3 from 'web3'

import {
    Staking_ABI,
    StakingABIContract_Add7,
    StakingABIContract_Add14,
    StakingABIContract_Add30,
    StakingABIContract_Add60,
    StakingABIContract_Add90,
    StakingABIContract_Add180,
    Ido_ABI,
  } from "../../constants/info";
import { printCountdown } from '@/app/constants/helper';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setStakedAmount } from '@/redux/features/stakedSlice';
import { setDeposits } from '@/redux/features/depositsSlice';



function ProfileStakingInfoCard() {
    let StakingABI = Staking_ABI();
    let StakingABIContractAdd7 = StakingABIContract_Add7();
    let StakingABIContractAdd14 = StakingABIContract_Add14();
    let StakingABIContractAdd30 = StakingABIContract_Add30();
    let StakingABIContractAdd60 = StakingABIContract_Add60();
    let StakingABIContractAdd90 = StakingABIContract_Add90();
    let StakingABIContractAdd180 = StakingABIContract_Add180();
    const [StakeObject7, setStakeObject7] = useState<any>({});
    const [StakeObject14, setStakeObject14] = useState<any>({});
    const [StakeObject30, setStakeObject30] = useState<any>({});
    const [StakeObject60, setStakeObject60] = useState<any>({});
    const [StakeObject90, setStakeObject90] = useState<any>({});
    const [StakeObject180, setStakeObject180] = useState<any>({});
    const [TotalStakedAmount, setTotalStakedAmount] = useState(0);

    const [UserDeposit, setUserDeposit] = useState(0);
    const dispatch = useDispatch<AppDispatch>()

    const sdk=useSDK();


    const account = useAddress();


    
    const withdraw = async (stakingContractAdress:any) => {
     const  stakingContractObj= await sdk?.getContractFromAbi(stakingContractAdress,StakingABI);
      toast('Transaction in Progress',{ position:'top-right',type:'info' });
     toast.info('Starting');
      if (!account) {
        return;
      }
      try {
        const tx = await stakingContractObj?.call('withdraw',[],{ gasLimit:7000000})
        const receipt = tx.receipt;   
        toast('Transaction Completed',{ position:'top-right',type:'info' });
        
      } catch (error) {
        console.log('error in transaction : ' ,error)
       }
    };
    let userAllStakingsCnt :any;

    
    useEffect(() => {
        
        const fetchAllStakingDurations = async () => {
            let staking7=await sdk?.getContractFromAbi(StakingABIContractAdd7,StakingABI)
            let staking14 = await sdk?.getContractFromAbi(StakingABIContractAdd14,StakingABI)
            let staking30 =  await sdk?.getContractFromAbi(StakingABIContractAdd30,StakingABI)
            let staking60 =  await sdk?.getContractFromAbi(StakingABIContractAdd60,StakingABI)

            let staking90 =  await sdk?.getContractFromAbi(StakingABIContractAdd90,StakingABI)

            let staking180 =  await sdk?.getContractFromAbi(StakingABIContractAdd180,StakingABI)
            
    
          if (account!=undefined) {
            staking7?.call('deposits',[account])
            .
              then(async (result:any) => {
                setStakeObject7({
                  StakingDespositTime: result.depositTime,
                  StakingEndTime: result.endTime,
                  StakingAmount: web3.utils.fromWei(
                    result.depositAmount.toString(),
                    "ether"
                  ),
                  StakingWithdrawl: result.paid,


                });
                if (result.paid == false) {
                  userAllStakingsCnt =
                    parseFloat(userAllStakingsCnt) +
                    parseFloat(
                      web3.utils.fromWei(result.depositAmount.toString(), "ether")
                    );
                  setUserDeposit(userAllStakingsCnt);


                }
              })
              .catch((err) => {
                console.log(err);
              });
    
            await staking14?.call('deposits',[account])
            .
              then(async (result:any) => {
                setStakeObject14({
                  StakingDespositTime: result.depositTime,
                  StakingEndTime: result.endTime,
                  StakingAmount: web3.utils.fromWei(
                    result.depositAmount.toString(),
                    "ether"
                  ),
                  StakingWithdrawl: result.paid,
                });
                if (result.paid == false) {
                  userAllStakingsCnt =
                    parseFloat(userAllStakingsCnt) +
                    parseFloat(
                      web3.utils.fromWei(result.depositAmount.toString(), "ether")
                    );
                  setUserDeposit(userAllStakingsCnt);

                }
              })
              .catch((err) => {
                console.log(err);
              });
    
            await staking30?.call('deposits',[account])
            .
              then(async (result:any) => {
                setStakeObject30({
                  StakingDespositTime: result.depositTime,
                  StakingEndTime: result.endTime,
                  StakingAmount: web3.utils.fromWei(
                    result.depositAmount.toString(),
                    "ether"
                  ),
                  StakingWithdrawl: result.paid,
                });
                if (result.paid == false) {
                  userAllStakingsCnt =
                    parseFloat(userAllStakingsCnt) +
                    parseFloat(
                      web3.utils.fromWei(result.depositAmount.toString(), "ether")
                    );
                  setUserDeposit(userAllStakingsCnt);

                }
              })
              .catch((err) => {
                console.log(err);
              });
    
            await staking60?.call('deposits',[account])
            .
              then(async (result:any) => {
                setStakeObject60({
                  StakingDespositTime: result.depositTime,
                  StakingEndTime: result.endTime,
                  StakingAmount: web3.utils.fromWei(
                    result.depositAmount.toString(),
                    "ether"
                  ),
                  StakingWithdrawl: result.paid,
                });
                if (result.paid == false) {
                  userAllStakingsCnt =
                    parseFloat(userAllStakingsCnt) +
                    parseFloat(
                      web3.utils.fromWei(result.depositAmount.toString(), "ether")
                    );
                  setUserDeposit(userAllStakingsCnt);

                }
              })
              .catch((err) => {
                console.log(err);
              });
    
            await staking90?.call('deposits',[account])
            .
              then(async (result:any) => {
                setStakeObject90({
                  StakingDespositTime: result.depositTime,
                  StakingEndTime: result.endTime,
                  StakingAmount: web3.utils.fromWei(
                    result.depositAmount.toString(),
                    "ether"
                  ),
                  StakingWithdrawl: result.paid,
                });
                if (result.paid == false) {
                  userAllStakingsCnt =
                    parseFloat(userAllStakingsCnt) +
                    parseFloat(
                      web3.utils.fromWei(result.depositAmount.toString(), "ether")
                    );
                  setUserDeposit(userAllStakingsCnt);

                }
              })
              .catch((err) => {
                console.log(err);
              });
    
            await staking180?.call('deposits',[account])
            .
              then(async (result:any) => {
                setStakeObject180({
                  StakingDespositTime: result.depositTime,
                  StakingEndTime: result.endTime,
                  StakingAmount: web3.utils.fromWei(
                    result.depositAmount.toString(),
                    "ether"
                  ),
                  StakingWithdrawl: result.paid,
                });
                if (result.paid == false) {
                  userAllStakingsCnt =
                    parseFloat(userAllStakingsCnt) +
                    parseFloat(
                      web3.utils.fromWei(result.depositAmount.toString(), "ether")
                    );
                  setUserDeposit(userAllStakingsCnt);

                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        };
       


        const fetchTotal_PYR_Staked = async () => {
            const staking7 =await sdk?.getContractFromAbi(StakingABIContractAdd7,StakingABI)
            let staking14 = await sdk?.getContractFromAbi(StakingABIContractAdd14,StakingABI)
            let staking30 =  await sdk?.getContractFromAbi(StakingABIContractAdd30,StakingABI)
            let staking60 =  await sdk?.getContractFromAbi(StakingABIContractAdd60,StakingABI)
            let staking90 =  await sdk?.getContractFromAbi(StakingABIContractAdd90,StakingABI)
            let staking180 =  await sdk?.getContractFromAbi(StakingABIContractAdd180,StakingABI)
          let totalTiersAmt : any;
          await staking7?.call('stakedBalance')
            .then(async (balance) => {
              totalTiersAmt =
                TotalStakedAmount +
                parseFloat(web3.utils.fromWei(balance.toString(), "ether"));
              setTotalStakedAmount(totalTiersAmt);
    
              await staking14?.call('stakedBalance')
                .then(async (balance14) => {
                  totalTiersAmt += parseFloat(
                    web3.utils.fromWei(balance14.toString(), "ether")
                    
                  );
                  setTotalStakedAmount(totalTiersAmt);
    
                  await staking30?.call('stakedBalance')
                    .then(async (balance30) => {
                      totalTiersAmt += parseFloat(
                        web3.utils.fromWei(balance30.toString(), "ether")
                      );
                      setTotalStakedAmount(totalTiersAmt);
    
                      await staking60?.call('stakedBalance')
                        .then(async (balance60) => {
                          totalTiersAmt += parseFloat(
                            web3.utils.fromWei(balance60.toString(), "ether")
                          );
                          setTotalStakedAmount(totalTiersAmt);
    
                          await staking90?.call('stakedBalance')
                            .then(async (balance90) => {
                              totalTiersAmt += parseFloat(
                                web3.utils.fromWei(balance90.toString(), "ether")
                              );
                              setTotalStakedAmount(totalTiersAmt);
    
                              await staking180?.call('stakedBalance')
                                .then(async (balance180) => {
                                  totalTiersAmt += parseFloat(
                                    web3.utils.fromWei(
                                      balance180.toString(),
                                      "ether"
                                    )
                                  );
                                  // alert(totalTiersAmt)
                                  setTotalStakedAmount(totalTiersAmt);
                                      dispatch(setStakedAmount(totalTiersAmt));
                                      dispatch(setDeposits(totalTiersAmt));

                                  })
                                .catch((err)=>{
                                    console.log('error : ',err)
                                });
                            })
                            .catch((err)=>{
                                console.log('error : ',err)
                            });
                        })
                        .catch((err)=>{
                            console.log('error : ',err)
                        });
                    })
                    .catch((err)=>{
                        console.log('error : ',err)
                    });
                })
                .catch((err)=>{
                    console.log('error : ',err)
                });
            })
            .catch((err)=>{
                console.log('error : ',err)
            });
        };
    
        fetchAllStakingDurations().catch(console.error);
        fetchTotal_PYR_Staked().catch(console.error);

      }, [account]);
    
    return (
        <>
        <Card className='p-10 bg-transparent backdrop-blur shadow-xl h-full backdrop-brightness-150'>
            <CardHeader>
                <h1 className='text-left text-2xl w-full'>Current Staking Pool</h1>
            </CardHeader>
            <CardBody>
               
               
            {StakeObject7.StakingAmount != 0 &&
        StakeObject7.StakingWithdrawl == false ? ( 
            <>
        <div className='flex flex-row w-full justify-between' >
                    <div>
                        <small className='text-right text-sm'> Days</small>
                        <p className='text-3xl font-bold'>{7}</p>
                    </div>
                    <div>
                        <small className='text-right text-sm'>Amount</small>
                        <p className=' text-3xl font-bold'>{parseFloat(
                                          StakeObject7.StakingAmount
                                        ).toFixed(2)}</p>
                    </div>

                </div>
                <Divider className=' mt-3'/>
                {parseInt((((new Date().getTime())/1000).toFixed(0)).toString()) <= parseInt((StakeObject7.StakingEndTime as number).toLocaleString()) ?
                  <div className='mt-2'>
                  <small>Time Left </small>

                  <>
                  {printCountdown(
                                    "timer7",
                                    new Date(
                                      Number(StakeObject7.StakingEndTime) *
                                        1000
                                    ).toString()
                                  )}
                  <p className='text-3xl font-bold' id={'timer7'}> </p>
                  
                 

                  </>
              </div> :

               <Button className='w-full' onPress={()=>{
                withdraw(StakingABIContractAdd7);
            }}>Claim</Button>

                }
                
                </>
                ) : ''}
                {StakeObject14.StakingAmount != 0 &&
        StakeObject14.StakingWithdrawl == false ? ( 
            <>
        <div className='flex flex-row w-full justify-between' >
                    <div>
                        <small className='text-right text-sm'> Days</small>
                        <p className='text-3xl font-bold'>{14}</p>
                    </div>
                    <div>
                        <small className='text-right text-sm'>Amount</small>
                        <p className=' text-3xl font-bold'>{parseFloat(
                                          StakeObject14.StakingAmount
                                        ).toFixed(2)}</p>
                    </div>

                </div>
                <Divider className=' mt-3'/>
                {parseInt((((new Date().getTime())/1000).toFixed(0)).toString()) <= parseInt((StakeObject14.StakingEndTime as number).toLocaleString()) ?
                  <div className='mt-2'>
                  <small>Time Left</small>
                  <>
                  {printCountdown(
                                    "timer14",
                                    new Date(
                                      Number(StakeObject14.StakingEndTime) *
                                        1000
                                    ).toString()
                                  )}
                  <p className='text-3xl font-bold' id={'timer14'}> </p>
                  
                 

                  </>
              </div> :

               <Button className='w-full' onPress={()=>{
                withdraw(StakingABIContractAdd14);
            }}>Claim</Button>

                }
                </>
                ) : ''}
                {StakeObject30.StakingAmount != 0 &&
        StakeObject30.StakingWithdrawl == false ? ( 
            <>
        <div className='flex flex-row w-full justify-between' >
                    <div>
                        <small className='text-right text-sm'> Days</small>
                        <p className='text-3xl font-bold'>{30}</p>
                    </div>
                    <div>
                        <small className='text-right text-sm'>Amount</small>
                        <p className=' text-3xl font-bold'>{parseFloat(
                                          StakeObject30.StakingAmount
                                        ).toFixed(2)}</p>
                    </div>

                </div>
                <Divider className=' mt-3'/>
                {parseInt((((new Date().getTime())/1000).toFixed(0)).toString()) <= parseInt((StakeObject30.StakingEndTime as number).toLocaleString()) ?
                  <div className='mt-2'>
                  <small>Time Left</small>
                  <>
                  {printCountdown(
                                    "timer30",
                                    new Date(
                                      Number(StakeObject30.StakingEndTime) *
                                        1000
                                    ).toString()
                                  )}
                  <p className='text-3xl font-bold' id={'timer30'}> </p>
                  
                 

                  </>
              </div> :

               <Button className='w-full' onPress={()=>{
                withdraw(StakingABIContractAdd30);
            }}>Claim</Button>

                }
                </>
                ) : ''}
                {StakeObject60.StakingAmount != 0 &&
        StakeObject60.StakingWithdrawl == false ? ( 
            <>
        <div className='flex flex-row w-full justify-between' >
                    <div>
                        <small className='text-right text-sm'> Days</small>
                        <p className='text-3xl font-bold'>{60}</p>
                    </div>
                    <div>
                        <small className='text-right text-sm'>Amount</small>
                        <p className=' text-3xl font-bold'>{parseFloat(
                                          StakeObject60.StakingAmount
                                        ).toFixed(2)}</p>
                    </div>

                </div>
                <Divider className=' mt-3'/>
                {parseInt((((new Date().getTime())/1000).toFixed(0)).toString()) <= parseInt((StakeObject60.StakingEndTime as number).toLocaleString()) ?
                  <div className='mt-2'>
                  <small>Time Left</small>
                  <>
                  {printCountdown(
                                    "timer60",
                                    new Date(
                                      Number(StakeObject60.StakingEndTime) *
                                        1000
                                    ).toString()
                                  )}
                  <p className='text-3xl font-bold' id={'timer60'}> </p>
                  
                 

                  </>
              </div> :

               <Button className='w-full' onPress={()=>{
                withdraw(StakingABIContractAdd60);
            }}>Claim</Button>

                }
                </>
                ) : ''}
                {StakeObject90.StakingAmount != 0 &&
        StakeObject90.StakingWithdrawl == false ? ( 
            <>
        <div className='flex flex-row w-full justify-between' >
                    <div>
                        <small className='text-right text-sm'> Days</small>
                        <p className='text-3xl font-bold'>{90}</p>
                    </div>
                    <div>
                        <small className='text-right text-sm'>Amount</small>
                        <p className=' text-3xl font-bold'>{parseFloat(
                                          StakeObject90.StakingAmount
                                        ).toFixed(2)}</p>
                    </div>

                </div>
                <Divider className=' mt-3'/>
                {parseInt((((new Date().getTime())/1000).toFixed(0)).toString()) <= parseInt((StakeObject90.StakingEndTime as number).toLocaleString()) ?
                  <div className='mt-2'>
                  <small>Time Left</small>
                  <>
                  {printCountdown(
                                    "timer90",
                                    new Date(
                                      Number(StakeObject90.StakingEndTime) *
                                        1000
                                    ).toString()
                                  )}
                  <p className='text-3xl font-bold' id={'timer90'}> </p>
                  
                 

                  </>
              </div> :

               <Button className='w-full' onPress={()=>{
                withdraw(StakingABIContractAdd90);
            }}>Claim</Button>

                }
                </>
                ) : ''}
                {StakeObject180.StakingAmount != 0 &&
        StakeObject180.StakingWithdrawl == false ? ( 
            <>
        <div className='flex flex-row w-full justify-between' >
                    <div>
                        <small className='text-right text-sm'> Days</small>
                        <p className='text-3xl font-bold'>{180}</p>
                    </div>
                    <div>
                        <small className='text-right text-sm'>Amount</small>
                        <p className=' text-3xl font-bold'>{parseFloat(
                                          StakeObject180.StakingAmount
                                        ).toFixed(2)}</p>
                    </div>

                </div>
                <Divider className=' mt-3'/>
                {parseInt((((new Date().getTime())/1000).toFixed(0)).toString()) <= parseInt((StakeObject180.StakingEndTime as number).toLocaleString()) ?
                  <div className='mt-2'>
                  <small>Time Left</small>
                  <>
                  {printCountdown(
                                    "timer180",
                                    new Date(
                                      Number(StakeObject180.StakingEndTime) *
                                        1000
                                    ).toString()
                                  )}
                  <p className='text-3xl font-bold' id={'timer180'}> </p>
                  
                 

                  </>
              </div> :

               <Button className='w-full' onPress={()=>{
                withdraw(StakingABIContractAdd180);
            }}>Claim</Button>

                }
                </>
                ) : ''}
            </CardBody>
        </Card>
        </>
  )
}

export default ProfileStakingInfoCard