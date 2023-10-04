'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type address=any ;

const initialState = {
    value:''
} 

const address =createSlice( {
    name:'address',
    initialState,
    reducers:{
        setAddress : (state : address,action:PayloadAction<any>) =>{
           return {
            value:action.payload
        }
        },
        unSetAddress : ()=>{
           return initialState
        }
    }
})
export const{setAddress,unSetAddress} = address.actions;
export default  address.reducer
