'use client'
import { Button, Card, CardHeader , Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Link, Skeleton } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import demoProfile from '../../assets/images/ProfileImg.png'
import axios from 'axios';
import { toast } from "react-toastify";
import { baseUrl } from '@/app/constants/baseUrl';
import { useAddress } from '@thirdweb-dev/react';
import { delay } from 'framer-motion';
import {connectWalletRedux,disconnect} from '@/redux/features/userSlice'
import {useDispatch} from 'react-redux'
import { AppDispatch } from '@/redux/store';
import { setAddress } from '@/redux/features/addressSlice';
function InfoCard() {
    const dispatch = useDispatch<AppDispatch>();
  const [isOpenEdit,setIsOpenEdit]= useState(false)
    const walletAddress=useAddress();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [ProfileImage, setProfileImage] = useState<File>();
    const [Imagee, setImage] = useState("");
    const [LoggedUser , setLoggedUser] = useState<any>([]);
    const [Name, setName] = useState("");
  const [Tweeter, setTweeter] = useState("");
  const [Medium, setMedium] = useState("");
  const [Telegram, setTelegram] = useState("");
  const [skeltonLoaded,setSkeltonLoaded]=useState(false);
  const onFileChange = (event:any) => {
    if (event.target.files[0] == null) {
    } else if (event.target.files[0].size > 3000000) {
      toast("Image size is greater than 3MB !", {
        position: toast.POSITION.TOP_RIGHT,
        className: "fail",
        autoClose: 2000,
        toastId: 2,
      });
    } else {
      setProfileImage(event.target.files[0]);
    }
  };
  
  
    const getVerifiedUser = async() => {


      fetch(`${baseUrl}/getVerifyUser`, {
        cache:'force-cache',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: walletAddress }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.response) {
            setImage(
              btoa(
                new Uint8Array(data.response.userDP.data.data).reduce(function (
                  data,
                  byte
                ) {
                  return data + String.fromCharCode(byte);
                }, '')
              )
            );
            setLoggedUser(data.response);
            dispatch(setAddress(walletAddress));
            dispatch(connectWalletRedux(data));
          }
      
      
          setTimeout(() => {
            setSkeltonLoaded(true);
          }, 2000);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      
      };
      const AddUser = () => {
        if (walletAddress == null || walletAddress == "") {
          toast.info("Please Connect Your Wallet", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "WalletConnect",
          });
        } else if (Name == null || Name == "") {
          toast.info("Please Add User Name", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "Name",
          });
        } else if (Tweeter == null || Tweeter == "") {
          toast.info("Please Add Twitter Account", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "Twitter",
          });
        } else if (Medium == null || Medium == "") {
          toast.info("Please Add Medium Account", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "Medium",
          });
        } else if (Telegram == null || Telegram == "") {
          toast.info("Please Add Telegram Account", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "Telegram",
          });
        } else if (
          ProfileImage?.size == 0 ||
          ProfileImage == null
        ) {
          toast.info("Please Add Profile Image", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "ProfileImage",
          });
        } else {
          const formdata = new FormData();
          formdata.append("myFile", ProfileImage);
          formdata.append("address", walletAddress);
          formdata.append("userName", Name);
          formdata.append("tweeter", Tweeter);
          formdata.append("medium", Medium);
          formdata.append("telegram", Telegram);
    
          axios.post(`${baseUrl}/addUser`, formdata).then(function (response) {
            if (response.data.success) {

              toast.success("Profile added successfuly", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId: "ProfileAdded",
              });
    
              getVerifiedUser();
            }
          });
        }
      };
      const EditUser = () => {
        if (walletAddress == null || walletAddress == "") {
          toast.info("Please Connect Your Wallet", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "WalletConnect",
          });
        } else if (Name == null || Name == "") {
          toast.info("Please Add User Name", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "Name",
          });
        } else if (Tweeter == null || Tweeter == "") {
          toast.info("Please Add Twitter Account", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "Twitter",
          });
        } else if (Medium == null || Medium == "") {
          toast.info("Please Add Medium Account", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "Medium",
          });
        } else if (Telegram == null || Telegram == "") {
          toast.info("Please Add Telegram Account", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "Telegram",
          });
        } else {
         
    
          axios
          .post(`${baseUrl}/editUser`, {
            address: walletAddress,
            userName: Name,
            tweeter: Tweeter,
            medium: Medium,
            telegram: Telegram,
          })
          .then(function (response) {
            if (response.data.success) {
              toast.success("Your Profile Updated successfuly", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId: "ProfileUpdated",
              });
  
              getVerifiedUser();
            }
          });
        }
      };
      useEffect(() => {
        if(walletAddress){
          getVerifiedUser();
          dispatch(connectWalletRedux(LoggedUser));
}

       
      }, [walletAddress]);

    return (
     
        <>
        
        <Skeleton isLoaded={skeltonLoaded} className='py-4 w-full min-h-[190px] bg-primary-500 after:bg-primary-500 before:bg-primary-500 rounded-3xl'>
      <Card className="py-4 w-full min-h-[190px] bg-transparent backdrop-blur rounded-3xl backdrop-brightness-150">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
      <div className='w-full'>
      
        {
        LoggedUser?.userName ? 
        <div className='flex flex-row justify-between items-top'>
        <div className='flex flex-row justify-start items-center gap-24'>
        <Image
          alt="Card background"
          className="object-cove max-h-[150px] max-w-[150px] rounded-full"
          src={`data:image/png;base64,${Imagee}`}
          width={350}
        />
        <div className='flex flex-col gap-5'>
        <h1 className='text-2xl'>{LoggedUser?.userName}</h1>
        <Button className="w-full bg-primary-PAROT text-slate-50 font-semibold text-[14px] border-[2px] border-primary-PAROT hover:bg-primary-btnHover"
        onPress={()=>setIsOpenEdit(true)} > EDIT PROFILE</Button>   
        </div> 
        </div>
        {
          LoggedUser.kycStatus==true && 
          <div className='flex flex-col items-center justify-between'> 
        <div className='flex flex-row gap-4'>
        
                    <a
                      href={LoggedUser.tweeter}
                      target="_blank"
                      className="me-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="icon-twitter"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                      >
                        <rect
                          id="Rectangle_8885"
                          data-name="Rectangle 8885"
                          width="36"
                          height="36"
                          fill="none"
                        />
                        <g
                          id="Group_20396"
                          data-name="Group 20396"
                          transform="translate(6.776 9.887)"
                        >
                          <g id="Group_20395" data-name="Group 20395">
                            <path
                              id="Path_44097"
                              data-name="Path 44097"
                              d="M16.3,112.8a12.948,12.948,0,0,1-7.025-2.049.516.516,0,0,1,.323-.947c.322.027.655.04,1,.04a8.479,8.479,0,0,0,4.1-1.061A4.623,4.623,0,0,1,13.168,108a4.83,4.83,0,0,1-1.682-2.383.517.517,0,0,1,.34-.652,4.852,4.852,0,0,1-.79-.77,4.981,4.981,0,0,1-1.121-3.115v-.1a.516.516,0,0,1,.771-.448l.019.011a5.363,5.363,0,0,1-.79-2.632,5.2,5.2,0,0,1,.7-2.5.515.515,0,0,1,.845-.065,11.974,11.974,0,0,0,3.811,3.089,11.71,11.71,0,0,0,4.24,1.272c-.01-.147-.015-.292-.015-.438a4.962,4.962,0,0,1,1.4-3.454,4.915,4.915,0,0,1,6.856-.12,8.435,8.435,0,0,0,2.375-.929.515.515,0,0,1,.745.617,5.319,5.319,0,0,1-.664,1.3c.186-.068.37-.143.552-.224a.515.515,0,0,1,.635.763,10.211,10.211,0,0,1-2.1,2.24c.009.108.013.212.013.311a13.15,13.15,0,0,1-1.521,6.05A12.657,12.657,0,0,1,16.3,112.8Zm-4.71-1.982a12.292,12.292,0,0,0,4.705.95,11.624,11.624,0,0,0,10.575-6.408,12.118,12.118,0,0,0,1.41-5.583,3.53,3.53,0,0,0-.037-.473.514.514,0,0,1,.2-.484,9.2,9.2,0,0,0,.96-.82q-.437.1-.88.157a.509.509,0,0,1-.551-.336.516.516,0,0,1,.208-.611,4.238,4.238,0,0,0,.981-.851,9.606,9.606,0,0,1-1.484.412.516.516,0,0,1-.474-.153,3.881,3.881,0,0,0-5.575-.072,3.9,3.9,0,0,0-1.1,2.743,5.565,5.565,0,0,0,.076.908.515.515,0,0,1-.125.43.508.508,0,0,1-.415.169,12.871,12.871,0,0,1-5.27-1.439,13.018,13.018,0,0,1-3.6-2.739,4.251,4.251,0,0,0-.242,1.3,4.006,4.006,0,0,0,1.747,3.242.515.515,0,0,1-.337.935,5.411,5.411,0,0,1-1.333-.269,3.848,3.848,0,0,0,3.029,3.057.516.516,0,0,1,.007,1.007,5.726,5.726,0,0,1-1.283.139,3.81,3.81,0,0,0,3.313,1.939.516.516,0,0,1,.3.921A9.219,9.219,0,0,1,11.586,110.814Z"
                              transform="translate(-9.036 -94.364)"
                              fill="#fff"
                            />
                          </g>
                        </g>
                      </svg>
                    </a>
                    <a
                      href={LoggedUser.medium}
                      target="_blank"
                      className="me-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Component_18_4"
                        data-name="Component 18 – 4"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                      >
                        <rect
                          id="Rectangle_9957"
                          data-name="Rectangle 9957"
                          width="36"
                          height="36"
                          fill="none"
                        />
                        <path
                          id="Subtraction_2"
                          data-name="Subtraction 2"
                          d="M-4641.867-5917.173a.48.48,0,0,1-.435-.27l-4.573-9.218a.1.1,0,0,0-.088-.055.1.1,0,0,0-.022,0,.1.1,0,0,0-.079.1v5.208a.1.1,0,0,0,.021.063l2.641,3.387a.49.49,0,0,1,.054.512.491.491,0,0,1-.436.272h-5.53a.493.493,0,0,1-.438-.272.492.492,0,0,1,.054-.512l2.642-3.387a.107.107,0,0,0,.021-.062v-7.5a.1.1,0,0,0-.022-.063l-2.479-3.036a.486.486,0,0,1-.062-.515.485.485,0,0,1,.438-.279h5.485a.489.489,0,0,1,.442.283l4.021,8.748a.1.1,0,0,0,.09.058.1.1,0,0,0,.095-.064l2.192-5.684a.1.1,0,0,0,.007-.037v-2.817a.487.487,0,0,1,.486-.487h5.857a.486.486,0,0,1,.45.3.482.482,0,0,1-.112.53l-1.764,1.72a.108.108,0,0,0-.03.071v10.134a.1.1,0,0,0,.021.061l1.577,2.022a.492.492,0,0,1,.054.512.491.491,0,0,1-.437.272h-7.317a.486.486,0,0,1-.436-.272.491.491,0,0,1,.053-.512l1.576-2.022a.1.1,0,0,0,.022-.061v-6.2a.1.1,0,0,0-.082-.1h-.019a.1.1,0,0,0-.093.064l-3.391,8.791a.49.49,0,0,1-.432.311Zm5.109-14.655a.1.1,0,0,0-.1.1v11.888a.482.482,0,0,1-.1.3l-.962,1.234a.1.1,0,0,0-.01.1.1.1,0,0,0,.089.057h4.917a.1.1,0,0,0,.089-.057.1.1,0,0,0-.01-.1l-.963-1.234a.492.492,0,0,1-.1-.3v-10.583a.49.49,0,0,1,.146-.348l.91-.886a.1.1,0,0,0,.022-.108.1.1,0,0,0-.092-.062Zm-10.792,11.474a.1.1,0,0,0-.078.039l-1.566,2.009a.1.1,0,0,0-.01.1.1.1,0,0,0,.089.057h3.131a.1.1,0,0,0,.089-.057.1.1,0,0,0-.011-.1l-1.565-2.009A.1.1,0,0,0-4647.55-5920.354Zm-1.376-11.474a.1.1,0,0,0-.091.058.1.1,0,0,0,.013.105l1.829,2.238,0,.006a.368.368,0,0,1,.027.038l.009.013c.006.011.012.021.018.033l0,0,5.091,10.263a.1.1,0,0,0,.089.055.1.1,0,0,0,.094-.064l1.223-3.171a.1.1,0,0,0,0-.078l-4.342-9.443a.1.1,0,0,0-.091-.058Z"
                          transform="translate(4658.9 5942.9)"
                          fill="#fff"
                        />
                      </svg>
                    </a>
                    <a
                      href={LoggedUser.telegram}
                      target="_blank"
                      className="me-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Component_17_4"
                        data-name="Component 17 – 4"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                      >
                        <rect
                          id="Rectangle_9958"
                          data-name="Rectangle 9958"
                          width="36"
                          height="36"
                          fill="none"
                        />
                        <path
                          id="Subtraction_1"
                          data-name="Subtraction 1"
                          d="M-4635.624-5915.643a1.1,1.1,0,0,1-.7-.251l-3.773-3.087a.107.107,0,0,0-.064-.024.1.1,0,0,0-.06.021l-.391.292-2.837,2.124-.01.008a.816.816,0,0,1-.468.223.44.44,0,0,1-.112-.015.537.537,0,0,1-.381-.471c-.046-.207-1.305-6.053-1.312-6.085a.1.1,0,0,0-.058-.07l-4.349-1.9a1.1,1.1,0,0,1-.663-1.067,1.1,1.1,0,0,1,.759-1l17.586-5.8a1.092,1.092,0,0,1,.345-.055,1.109,1.109,0,0,1,.749.291,1.108,1.108,0,0,1,.331,1.069l-3.515,14.942a1.1,1.1,0,0,1-.722.795A1.091,1.091,0,0,1-4635.624-5915.643Zm-.34-13.346a.481.481,0,0,1,.386.189.483.483,0,0,1-.033.634l-6.146,6.427a.1.1,0,0,0-.027.074.1.1,0,0,0,.036.071l1.912,1.565,4.13,3.379a.123.123,0,0,0,.082.031.129.129,0,0,0,.044-.008.127.127,0,0,0,.086-.1l3.514-14.942a.126.126,0,0,0-.039-.127.124.124,0,0,0-.087-.036.139.139,0,0,0-.037.006h-.006l-17.586,5.8a.123.123,0,0,0-.091.119.126.126,0,0,0,.079.128l4.358,1.906a.1.1,0,0,0,.042.009.094.094,0,0,0,.048-.013l9.1-5.055A.483.483,0,0,1-4635.963-5928.989Zm-6.264,8.292a.1.1,0,0,0-.03,0,.1.1,0,0,0-.067.067l-.646,2.259a.1.1,0,0,0,.039.11.1.1,0,0,0,.057.018.1.1,0,0,0,.061-.021l1.778-1.331a.1.1,0,0,0,.04-.078.1.1,0,0,0-.036-.08l-1.133-.926A.093.093,0,0,0-4642.228-5920.7Zm3.16-5.508a.1.1,0,0,0-.049.012l-5.583,3.1a.1.1,0,0,0-.05.11l.813,3.764a.1.1,0,0,0,.094.079.1.1,0,0,0,.1-.073l.728-2.541v-.007a.01.01,0,0,0,0-.008.475.475,0,0,1,.112-.187l3.9-4.082a.1.1,0,0,0,.007-.131A.1.1,0,0,0-4639.068-5926.2Z"
                          transform="translate(4658.9 5942.9)"
                          fill="#fff"
                        />
                      </svg>
                    </a>
        </div>
        <div>
          <h1 className=' text-2xl font-bold text-primary-PAROT'>KYC APPROVED</h1>
        </div>
        </div>
        }
       
          { 
          
            LoggedUser.kycStatus==false ?
            <div className='flex flex-col justify-center items-center gap-2'>
                        <small className=' text-sm text-warning-500'>Important !!</small>

                        <Link className=' text-danger-500 px-6 py-3 rounded-xl bg-transparent border border-danger-500 hover:bg-danger-500 hover:bg-opacity-50' href={'https://verify-with.blockpass.org/?clientId=elysium_9d0a1&serviceName=Elysium&env=prod'}>Register KYC</Link>

           </div>
            :
            ''
          }
        
        
        </div>
        :
        <div className='flex flex-row justify-start items-center gap-4'>
        <Image
        alt="Card background"
        className="object-cover max-h-[150px] max-w-[150px] rounded-full"
        src={demoProfile.src}
        width={350}
      />
        <Button className=" bg-primary-PAROT text-slate-50 font-semibold text-[14px] border-[2px] border-primary-PAROT hover:bg-primary-btnHover"
        onPress={onOpen} > ADD PROFILE</Button>
        </div>
}
       
      </div>
      
      </CardHeader>
     
    </Card>
    

    <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">Add Profile</ModalHeader>
              <ModalBody>
              <form>
                    <div className="">
                      <label className=" ">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control my-4 "
                        aria-label=""
                        placeholder="User Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label className=" ">
                        Twitter
                      </label>
                      <input
                        type="text"
                        className="form-control my-4"
                        aria-label=""
                        placeholder="Twitter"
                        onChange={(e) => setTweeter(e.target.value)}
                      />
                      <label className=" ">
                        Medium
                      </label>
                      <input
                        type="text"
                        className="form-control my-4"
                        aria-label=""
                        placeholder="Medium"
                        onChange={(e) => setMedium(e.target.value)}
                      />
                      <label className=" ">
                        Telegram
                      </label>
                      <input
                        type="text"
                        className="form-control my-4"
                        aria-label=""
                        placeholder="Telegram"
                        onChange={(e) => setTelegram(e.target.value)}
                      />
                      <label className=" ">
                        Profile Image
                      </label>
                      <input
                        className='mt-4 '
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={onFileChange}
                      />
                    </div>
                  </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary"  onPress={()=>{
                    onClose;
                    AddUser();
                }}>
                  ADD PROFIL
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                 CANCEL
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    
      <Modal 
        backdrop="opaque" 
        isOpen={isOpenEdit} 
        onOpenChange={()=>setIsOpenEdit(false)}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">Edit Profile</ModalHeader>
              <ModalBody>
              <form>
                    <div className="">
                      <label className=" ">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control my-4 "
                        aria-label=""
                        placeholder="User Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label className=" ">
                        Twitter
                      </label>
                      <input
                        type="text"
                        className="form-control my-4"
                        aria-label=""
                        placeholder="Twitter"
                        onChange={(e) => setTweeter(e.target.value)}
                      />
                      <label className=" ">
                        Medium
                      </label>
                      <input
                        type="text"
                        className="form-control my-4"
                        aria-label=""
                        placeholder="Medium"
                        onChange={(e) => setMedium(e.target.value)}
                      />
                      <label className=" ">
                        Telegram
                      </label>
                      <input
                        type="text"
                        className="form-control my-4"
                        aria-label=""
                        placeholder="Telegram"
                        onChange={(e) => setTelegram(e.target.value)}
                      />
                      
                      
                    </div>
                  </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary"  onPress={()=>{
                    setIsOpenEdit(false);
                    EditUser();
                }}>
                  EDIT PROFILE
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                 CANCEL
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </Skeleton>
    </>

    
     
    
  )
}

export default InfoCard