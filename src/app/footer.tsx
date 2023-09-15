import React, { ReactNode } from 'react'
import { Divider, Image } from '@nextui-org/react'
import logoWhite from './assets/images/logo-white.png'
import discord from "./assets/images/icon-Discord.svg";
import medium from "./assets/images/icon-medium.svg";
import telegram from "./assets/images/icon-Telegram.svg";
import twitter from "./assets/images/icon-twitter.svg";
function Footer() {
  
      
  return (
    
<footer>
      
        <div>
        <Divider className='my-20'  />
          <div className=" flex flex-row justify-center gap-72">
            <div className="logos flex flex-col gap-8">
              <div>
                <Image src={logoWhite.src} alt="Logo" className="" />
              </div>
              <div className=" flex flex-row gap-4">
                <a target="_blank" href="https://discord.com/invite/ZyjTvFM">
                  <Image src={discord.src} alt="Logo" className="" />
                </a>
                <a  target="_blank" href="https://twitter.com/VulcanForged">
                  <Image src={twitter.src} alt="Logo" className="" />
                </a>
                <a  target="_blank" href="https://t.me/VeriArti">
                  <Image src={telegram.src} alt="Logo" className="" />
                </a>
                <a target="_blank" href="https://vulcanforgedco.medium.com/">
                  <Image src={medium.src} alt="Logo" className="" />
                </a>
              </div>
            </div>
            <div className=" Elysium ">
              <h6 className=" text-lg mb-11 font-bold">ELYSIUM</h6>
              <ul className="">
                <li className="py-1 text-sm"><a href="/">About</a></li>
                <li className="py-1 text-sm"><a href="/">FAQ</a></li>
                <li className="py-1 text-sm"><a href="/">Support</a></li>
                <li className="py-1 text-sm"><a href="/">Build</a></li>
                <li className="py-1 text-sm"><a className="RobotoBold" href="/">Grants and Bounties</a></li>
                <li className="py-1 text-sm"><a href="/">Careers</a></li>
              </ul>
            </div>
            <div className=" Tech ">
              <h6 className=" font-bold text-lg mb-11">TECHNOLOGY</h6>
              <ul className="">
                <li className="py-1 text-sm"><a href="/">Technology</a></li>
                <li className="py-1 text-sm"><a href="/">Roadmap</a></li>
                <li className="py-1 text-sm"><a href="/">Token</a></li>
                <li className="py-1 text-sm"><a href="/">Telemetry</a></li>
                <li className="py-1 text-sm"><a className="RobotoBold" href="/">Substrate</a></li>
                <li className="py-1 text-sm"><a href="/">Lightpaper</a></li>
              </ul>
            </div>
            <div className=" Com ">
              <h6 className=" text-lg font-bold mb-11">COMMUNITY</h6>
              <ul className="">
                <li className="py-1 text-sm"><a href="/">Community</a></li>
                <li className="py-1 text-sm"><a href="/">Documentation</a></li>
                <li className="py-1 text-sm"><a href="/">Brand Assets</a></li>
                <li className="py-1 text-sm"><a href="/">Blog</a></li>
                <li className="py-1 text-sm"><a className="RobotoBold" href="/">Element Chat</a></li>
                <li className="py-1 text-sm"><a href="/">Medium</a></li>
              </ul>
            </div>
          </div>
        
          <Divider className='my-20'  />


        <div className="Bottom flex flex-row justify-between mx-52">
            <div>
            © {new Date().getFullYear()} Elysium
            </div>
          <div>
          <ul className=" text-sm flex flex-row justify-between gap-4">
            <li className="me-3"><a href="/">Disclaimer</a></li>
            <li className="me-3"><a href="/">Privacy</a></li>
            <li><a href="/">Cookie Settings</a></li>
          </ul>
          </div>
          
        </div>
        </div>
    </footer>

   
  )
}

export default Footer