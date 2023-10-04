'use client'
import { User } from '@/app/constants/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const userIn : User={
    success: false, // You can set this to false as a default value
    response: {
      kycStatus: false, // You can set this to false as a default value
      NFTParticipated: [],
      NFTLiked: [],
      _id: '',
      address: '',
      userName: '',
      tweeter: '',
      telegram: '',
      medium: '',
      stakingDays: 0,
      stakeTime: 0,
      stakeAmount: 0,
      lastSnapShot: 0,
      date: '',
      __v: 0,
      tier: 0,
    },
}
export type initialState = {
    value:User,
}
const initialState : initialState={
    value:userIn,
}
    

export const user =createSlice({
    name : "user",
    initialState,
    reducers:{
        disconnect:()=>{
            return initialState;
        },
        connectWalletRedux:(state,action : PayloadAction<any>)=>{
                return{
                    value:action.payload,
                }
        },

    },
});
export const{disconnect,connectWalletRedux} = user.actions;
export default user.reducer;