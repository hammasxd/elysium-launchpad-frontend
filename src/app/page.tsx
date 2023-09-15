
import IdoIntro from './Components/IdosIntro'
import Intro from './Components/Intro'
import Stats from './Components/Stats'
import completed from './assets/images/no-completed-IDO.png'
import upcomming from './assets/images/No-Upcoming-NFT.png'
import activee from './assets/images/no-active-IDO.png'
import baseUrl from './constants/baseUrl'
import LaunchProject from './Components/LaunchProject'
import ChooseUs from './Components/ChooseUs'
import WelcomeTo from './Components/WelcomeTo'
import OurTeam from './Components/Team'
import Footer from './footer'
import { it } from 'node:test'
export default function Home() {
console.log(baseUrl);
const IdosData:{apiUrl:any,apiUrlPaginated:any, IntroTitle:any, bgImageSrc:any,key:number}[]=[
    {apiUrl:`${baseUrl.baseUrl}/getfirstUpcomingIDOs`,apiUrlPaginated:`${baseUrl.baseUrl}/getUpComingIDOsPaginated`,IntroTitle:'Upcomming Projects',bgImageSrc:upcomming.src,key:1},
    {apiUrl:`${baseUrl.baseUrl}/getfirstActiveIDOs`,apiUrlPaginated:`${baseUrl.baseUrl}/getActiveIDOsPaginated`,IntroTitle:'Active Projects',bgImageSrc:activee.src,key:2},
    {apiUrl:`${baseUrl.baseUrl}/getfirstCompletedIDOs`,apiUrlPaginated:`${baseUrl.baseUrl}/getCompletedIDOsPaginated`,IntroTitle:'Complete Projects',bgImageSrc:completed.src,key:3}
  ]
  return (
    <>
    <Intro/>
    <Stats/>
    {IdosData.map((item, index) => (
<IdoIntro key={item.key} apiUrl={item.apiUrl} apiUrlPaginated={item.apiUrlPaginated} IntroTitle={item.IntroTitle} bgImageSrc={item.bgImageSrc}/>
    ))}
    <LaunchProject/>
    <ChooseUs/>
    <WelcomeTo/>
    <OurTeam/>
    <Footer/>
    </>
  )
}
