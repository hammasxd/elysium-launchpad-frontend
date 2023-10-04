'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type deposits=any ;

const initialState = {
    value:''
} 

const deposits =createSlice( {
    name:'deposits',
    initialState,
    reducers:{
        setDeposits : (state : deposits,action:PayloadAction<any>) =>{
            console.log('user depositsssss : ', action.payload);
           return {
            value:action.payload
        }
        },
        unSetDeposits : ()=>{
           return initialState
        }
    }
})
export const{setDeposits,unSetDeposits} = deposits.actions;
export default  deposits.reducer
