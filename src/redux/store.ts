'use client'
import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import addressReducer from './features/addressSlice'
import stakedReducer from './features/stakedSlice'
import depositsReduder from './features/depositsSlice'
import participatedIdosReducer from './features/participatedIDOsSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'


export const store = configureStore({
    reducer:{
            userReducer,
            addressReducer,
            stakedReducer,
            depositsReduder,
            participatedIdosReducer,
            
            
    },
})
export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;
