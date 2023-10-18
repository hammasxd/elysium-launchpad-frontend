'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem,Link, NavbarMenu, NavbarMenuItem, NavbarMenuToggle,  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User, Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import logoNew from "../app/assets/images/logoNew.svg";
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { ConnectWallet, WalletInstance, useAddress, useWallet} from '@thirdweb-dev/react';
import axios from 'axios';
import {connectWalletRedux,disconnect} from '@/redux/features/userSlice'
import demoImage from '@/app/assets/images/ProfileImg.png'
import {useDispatch} from 'react-redux';
import { AppDispatch } from '@/redux/store';

import { baseUrl } from './constants/baseUrl';
import fs from 'fs'
function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false);
  const connectedWallet=useWallet();
    const [Imagee, setImage] = useState("");
  const [LoggedUser,setLoggedUser]=useState<any>();
  const connectedAddress = useAddress();
  const dispatch = useDispatch<AppDispatch>();

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  

  const handleWalletConnect=async ()=>{
    alert('success wallet connect');
  }
  useEffect(() => {
    
       
 if(connectedAddress){
  getAvatarData()
}
    
    window.addEventListener('scroll', handleScroll);
    getAvatarData();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
     

    };
  }, [connectedAddress]);
  connectedWallet?.on('connect',handleWalletConnect);
  const getAvatarData=()=>{
    if(connectedAddress) {
      fetch(`${baseUrl}/getVerifyUser`, {
        cache:'force-cache',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: connectedAddress }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("hello User", data);
          if (data.response) {
            setImage(
              btoa(
                new Uint8Array(data.response.userDP.data.data).reduce(function (
                  data,
                  byte
                ) {
                  return data + String.fromCharCode(byte);
                },
                '')
              )
            );
           dispatch(connectWalletRedux(data));
            setLoggedUser(data.response);
          } else{setLoggedUser({
            address:'Not Set',
            userName:'Not Set'});
            setImage(demoImage.src)
          }
          
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      

}
  }


 

  const menuItems = [
    "Profile",
    "Help & Feedback",
    "Log Out",
  ];
  const bigMenuItems= [

    {name:"IDO LAUNCHPAD",hrf:'/'}
    ,
    {name : "NFT LAUNCHPAD",hrf:'/nftLaunchpad'}
    ,
    {name:"GETTING STARTED",hrf:'/#gettingStarted'}
    ,
    {name:"TIERS",hrf:'/tiers'}
    ,
    {name:"STAKING" ,hrf:'/staking'}


  ]

  return (
    <Navbar isBlurred={false} height={'8em'} maxWidth='xl' className={` z-50 mb-20 bg-transparent capitalize  ${
      isScrolled ? 'backdrop-blur-md' : ''
    }`}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent className="sm:hidden pr-3 " justify="start">
        <NavbarBrand>
          <Image
            src={logoNew}
            className="py-0 mx-0"
            width={200}
            height={100}
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push('/');
            }}
            alt={'ElysiumLogo'} />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <Image
            src={logoNew}
            className="py-0 mx-0"
            width={200}
            height={100}
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push('/');
            }}
            alt={'ElysiumLogo'} />
        </NavbarBrand>
      </NavbarContent >
      <NavbarContent className="hidden sm:flex gap-7 capitalize" justify="start">
      {bigMenuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link color={"foreground"} href={item.hrf} size="sm">
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      <NavbarItem>

  
          <ConnectWallet switchToActiveChain={true} btnTitle='CONNECT WALLET' detailsBtn={()=>{
            return (
<Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src:`data:image/png;base64,${Imagee}`,
            }}
            className="transition-transform"
            description={`${LoggedUser?.address ?   LoggedUser?.address?.slice(0,5)+'...'+LoggedUser?.address?.slice(37,42):'Not Set ' }  `}
            name={`${LoggedUser?.userName ? LoggedUser?.userName : "Not Set "}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem  key="Profile">
            <Link href={`/profile`} >Profile</Link>
          </DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={()=>{
            connectedWallet?.disconnect()
            router.push('/')
          }
            }>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
            )
          }}/> 
          



        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href=""
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>


  )
}

export default Header