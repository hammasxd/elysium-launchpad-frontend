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
            if(action.payload==null){
                return {
                    value:0,
                }
            }
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
