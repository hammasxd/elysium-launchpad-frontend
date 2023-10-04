'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type stakedAmount=any ;

const initialState = {
    value:''
} 

const staked =createSlice( {
    name:'staked',
    initialState,
    reducers:{
        setStakedAmount : (state : stakedAmount,action:PayloadAction<any>) =>{
            console.log('stakedd amountttt', action.payload);
           return {
            value:action.payload
        }
        },
        unSetStakedAmount : ()=>{
           return initialState
        }
    }
})
export const{setStakedAmount,unSetStakedAmount} = staked.actions;
export default  staked.reducer
