import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Link } from '@nextui-org/react'
// import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logoNew from "../app/assets/images/logoNew.svg";
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { ConnectWallet } from '@thirdweb-dev/react';
function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const bigMenuItems= [

    "IDO LAUNCHPAD"
    ,
    "NFT LAUNCHPAD"
    ,
    "GETTING STARTED"
    ,
    "TIERS"
    ,
    "STAKING"


  ]

  return (
    <Navbar isBlurred={false} height={'8em'} maxWidth='xl' className={` mb-20 bg-transparent capitalize ${
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
            <Link color={"foreground"} href="#" size="sm">
              {item}
            </Link>
          </NavbarItem>
        ))}
      <NavbarItem>
          <ConnectWallet switchToActiveChain={true} btnTitle='CONNECT WALLET'/>
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