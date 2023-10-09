'use client'
import { Card, CardBody, CardFooter, CardHeader,Divider,Input,Listbox, ListboxItem,Image, Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import PYRlogo from '../../assets/images/PYRicon.png'
import {
    Staking_ABI, token_ABI, stakeToken_ABI,
    StakingABIContract_Add7,
    StakingABIContract_Add14,
    StakingABIContract_Add30,
    StakingABIContract_Add60,
    StakingABIContract_Add90,
    StakingABIContract_Add180,
    StakeToken_Add
  } from '../../constants/info'
import { useAddress, useSDK, useWallet } from '@thirdweb-dev/react'
import { formatUnits, parseEther } from 'ethers/lib/utils'
import { ethers } from 'ethers'
import Web3 from 'web3';
import { baseUrl } from '@/app/constants/baseUrl'
import { ok } from 'assert'
import { toast } from 'react-toastify'
import { delay } from '@reduxjs/toolkit/dist/utils'
function StakingCard() {
    const stakeTokenAddress=StakeToken_Add();
    const web3 = new Web3();

    const [stakingAmount,setStakingAmount] = useState<number>(0)
    const [symbol,setSymbol] = useState<string | undefined>(undefined)
    const [selectedKeys, setSelectedKeys]=useState(new Set(["text"]))
    const [balance, setBalance]=useState<string | undefined>(undefined)
    const [alreadyStaking, setAlreadyStaking]=useState();
    const [curretnDays,setCurretDays] = useState<number>();
    const wallet=useWallet();
    const walletAddress=useAddress()
    const sdk=useSDK();
    const [stakeDurationContract,setStakeDurationContract] = useState<string | undefined>(StakingABIContract_Add7());
    //get token balance from contract
    const getBalance=async ()=>{
        await sdk?.getContractFromAbi(stakeTokenAddress,stakeToken_ABI()).then(
            async (a)=>{
                await a.call('balanceOf',[walletAddress]).then((a:any)=>{
                    const hexValue = a._hex; // Replace with your hexadecimal value as a string
                    const hexValueWithoutPrefix = hexValue.replace("0x", ""); // Remove "0x" prefix
                    const decimalValue = BigInt("0x" + hexValueWithoutPrefix); // Convert to decimal number
                    const stringValue = decimalValue.toString();
                    let eth = web3.utils.fromWei(stringValue, 'ether');
                    eth = parseFloat(eth).toFixed(4)
                    setBalance( eth);
                    console.log('ethhhhhh',eth)
                });
                await a.call('symbol',[]).then((a:any)=>{
                    setSymbol(a)
                    console.log('symbol :  ', a)
                })
            }


        )
    }
    //set selected key value
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys]

      );
      const selectLockedDurationContract = ()=>{
       
switch (selectedValue) {
    case '7':
      setStakeDurationContract (StakingABIContract_Add7());
      break;
    case '14':
        setStakeDurationContract (StakingABIContract_Add14());
      break;
    case '30':
        setStakeDurationContract (StakingABIContract_Add30());
      break;
    case '60':
        setStakeDurationContract (StakingABIContract_Add60());
      break;
    case '90':
        setStakeDurationContract (StakingABIContract_Add90());
      break;
    case '180':
        setStakeDurationContract (StakingABIContract_Add180());
      break;
    default:
      // Handle the case where selectedValue doesn't match any of the cases
      break;
  }
        
      }

      //get user current staking
      const getUserStakingInfo=async ()=>{
        const response= await fetch(`${baseUrl}/getVerifyUser`,{
            method:'POST',
            cache:'force-cache',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify({
                address:walletAddress
            },
            )
        })
        if(response.ok){

            return await response.json();

            }
        return 'error';
      }

      const getUserCurrentStakingInfo=async ()=>{
        const data = await getUserStakingInfo();
        const current=data.response.stakingDays;
        const alreadyStakedAmount = data.response.stakeAmount;
        setAlreadyStaking(alreadyStakedAmount);
        setCurretDays(current);
        console.log('currentttttttttt : ',curretnDays)
    }

      //pyr logo
      const PYRLogo=()=>{
        return <Image src={PYRlogo.src} width={20} height={20} />
      }
      //max button to set max amount
      const MaxButton = ({ stakingAmount, setStakingAmount }:any) => {
        const handleMaxClick = () => {
          setStakingAmount(balance);
          console.log(stakingAmount) // Update the stakingAmount state in the parent component
        };
      
        return (
          <Button className='bg-primary rounded-lg hover:bg-opacity-50' onPress={handleMaxClick}>MAX</Button>
        );
      };

      const approveAmount=async ()=>{

        if(curretnDays!=0 || curretnDays){
            toast.error(`already Staked for ${curretnDays} days`);
        }
        else{
           
            toast.loading('Transaction in Progress', {
                position: "top-right",
                autoClose: false,
                progress: undefined,
                toastId: "buyProgress",
              });
                await sdk?.getContractFromAbi(stakeTokenAddress,stakeToken_ABI()).then(
                    async (a)=>{
                        let _amountWei = web3.utils.toWei(stakingAmount.toString(18), 'ether');
                        await a.call('approve',[stakeDurationContract,_amountWei]).then((a)=>{
                            toast.dismiss('buyProgress');
                            
                        })
                    }
                ).catch((err)=>{
                    console.log(err)
                    toast.dismiss('buyProgress');
                    toast.error('transaction failed');
                });

            
            
        }
      }

       useEffect(() => {
        if(walletAddress!=undefined){

           



            getUserCurrentStakingInfo();
            getBalance()
        }
         
       
        
       }, [walletAddress])
       


       console.log('stakinggggggggg durationnnnnnnn : ',stakeDurationContract);
  return (
    <div className='stakingCardContainer text-center '>
        <Card className='flex flex-col gap-5 justify-center bg-primary-50 bg-opacity-50  backdrop-blur backdrop-brightness-150 px-16 py-16'>
            <CardHeader className='justify-center'>
                <h1 className=' text-2xl font-bold'>Locking Duration</h1>
            </CardHeader>
            <CardBody className='flex flex-col gap-5'>
  
        <Listbox className=' text-center flex flex-wrap flex-row justify-center' 
          aria-label="Single selection example"
          variant='shadow'
          disallowEmptySelection
          selectionMode='single'
          selectedKeys={selectedKeys}
          aria-selected="true"
          defaultSelectedKeys={'7'}
          onSelectionChange={(keys)=>setSelectedKeys(keys as any)}
        >
          <ListboxItem onPress={selectLockedDurationContract} className='w-[100px]' color='primary' selectedIcon='' key={'7'}>7 Days</ListboxItem>
          <ListboxItem onPress={selectLockedDurationContract} className='w-[100px]' color='primary' selectedIcon='' key={'14'}>14 Days</ListboxItem>
          <ListboxItem onPress={selectLockedDurationContract} className='w-[100px]' color='primary' selectedIcon='' key={'30'}>30 Days</ListboxItem>
          <ListboxItem onPress={selectLockedDurationContract} className='w-[100px]' color='primary' selectedIcon='' key={'60'}>60 Days</ListboxItem>
          <ListboxItem onPress={selectLockedDurationContract} className='w-[100px]' color='primary' selectedIcon='' key={'90'}>90 Days</ListboxItem>
          <ListboxItem onPress={selectLockedDurationContract} className='w-[100px]' color='primary' selectedIcon='' key={'180'}>180 Days</ListboxItem>
        </Listbox>
   
    <div className='flex flex-col gap-2'>
        <h1>Your Staked Amount</h1>
        <h1 className='text-xl font-bold'>{alreadyStaking ? alreadyStaking:'0' } {symbol}</h1>

    </div>
    <Divider/>
            </CardBody>
            <CardFooter>
                <div className='flex flex-col gap-3 w-full'>
                    <div className='flex flex-row justify-between'>
                        <h1>Amount in {symbol}</h1>
                        <h1>Balance : {balance} {symbol} </h1>
                    </div>
                    <div className='inputStakingAmount'>
                    <Input
                                                            size='lg'
                                                            autoFocus
                                                            type="number"
                                                            startContent={
                                                                <PYRLogo/>
                                                            }
                                                            endContent={
                                                                <MaxButton stakingAmount={stakingAmount} setStakingAmount={setStakingAmount} />
                                                            }
                                                            onChange={(e) => {
                                                                setStakingAmount(e.target.value as unknown as number);
                                                              }}
                                                              inputMode='decimal'
                                                            value={stakingAmount as unknown as string}
                                                            variant='underlined'
                                                            className=' w-full rounded-3xl before:bg-transparent bg-transparent'

                                                          />
                    </div>
                    <Button onPress={approveAmount}>Approve</Button>
                </div>
            </CardFooter>
        </Card>
    </div>
  )
}

export default StakingCard