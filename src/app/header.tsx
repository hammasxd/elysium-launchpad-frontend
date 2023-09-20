'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Link, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react'
// import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logoNew from "../app/assets/images/logoNew.svg";
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { ConnectWallet, useAddress, useWallet, walletConnect } from '@thirdweb-dev/react';
function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false);
  const connectedWallet=useWallet();
  const Address=useAddress();

  const [connected,setConnected]=useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const handleConnect=()=>{
    alert('Connected')
  }
  
  useEffect(() => {
    
//listenrs
    connectedWallet?.on('connect',handleConnect);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      connectedWallet?.removeListener('connect',()=>{handleConnect})

    };
  }, [connectedWallet]);
  console.log('acountttttt',connectedWallet)
  
  
 
 

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
    {name:"GETTING STARTED",hrf:'#'}
    ,
    {name:"TIERS",hrf:'#'}
    ,
    {name:"STAKING" ,hrf:'#'}


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
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description="@tonyreichert"
            name="Tony Reichert"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="Profile">
            <Link href='/profile'>Profile</Link>
          </DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={()=>connectedWallet?.disconnect()}>
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