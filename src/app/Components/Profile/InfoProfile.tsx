import { Input, Button, Card, CardBody, CardHeader , Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import demoProfile from '../../assets/images/ProfileImg.png'
import axios from 'axios';
import { toast } from "react-toastify";
import { baseUrl } from '@/app/constants/baseUrl';
function InfoCard({walletAddress}:any) {
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    var f = new File([""], "filename.txt", {
        type: "text/plain",
        lastModified:Date.now(),
      });
    const [ProfileImage, setProfileImage] = useState(f);
    const [Imagee, setImage] = useState("");
    const [LoggedUser, setLoggedUser] = useState([]);
    const [Name, setName] = useState("");
  const [Tweeter, setTweeter] = useState("");
  const [Medium, setMedium] = useState("");
  const [Telegram, setTelegram] = useState("");

  const onFileChange = (event:any) => {
    if (event.target.files[0] == null) {
    } else if (event.target.files[0].size > 3000000) {
      toast("Image size is greater than 3MB !", {
        position: toast.POSITION.TOP_RIGHT,
        className: "fail",
        autoClose: 2000,
        toastId: 2,
      });
      setProfileImage(f);
    } else {
      setProfileImage(event.target.files[0]);
    }
  };
    const getVerifiedUser = () => {
        axios
          .post(`${baseUrl}/getVerifyUser`, { address: walletAddress })
          .then((response) => {
            // console.log("hello User", response);
            if (response.data.response) {
              setImage(
                btoa(
                  new Uint8Array(response.data.response.userDP.data.data).reduce(
                    function (data, byte) {
                      return data + String.fromCharCode(byte);
                    },
                    ""
                  )
                )
              );
            }
    
            // console.log(response.data.response);
            setLoggedUser(response.data.response);
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
          ProfileImage.size == 0 ||
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
          // console.log("Profile iMAW", ProfileImage.size);
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

    return (
     
        <>
        
      
         <Card className="py-4 w-full bg-transparent backdrop-blur rounded-3xl px-10">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
      <div className='flex flex-row justify-start items-center gap-24'>
      <Image
          alt="Card background"
          className="object-cover rounded-full"
          src={demoProfile.src}
          width={350}
        />
       <Button className="w-full bg-primary-PAROT text-slate-50 font-semibold text-[14px] border-[2px] border-primary-PAROT hover:bg-primary-btnHover"
        onPress={onOpen} > ADD PROFILE</Button>
      </div>
      
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        
      </CardBody>
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
    
    </>

      
     
    
  )
}

export default InfoCard