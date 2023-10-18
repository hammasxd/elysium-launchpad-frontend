import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type idos = {
  IDO: string;
  exist: boolean;
};

export type initialStateType = idos[];

const initialState: initialStateType = [{
  IDO: '',
  exist: false
}];

const participatedIdos = createSlice({
  name: 'participatedIdos',
  initialState,
  reducers: {
    setParticipatedIdos: (state: initialStateType, action: PayloadAction<initialStateType>) => {
      // Initialize as an empty array of the correct type
      let filteredIdos: initialStateType = [];
      action.payload.forEach((item) => {
        if (item.exist === true) {
          filteredIdos.push(item);
        }
      });


      return filteredIdos; // Return the filtered array directly
    },
    unSetParticipatedIdos: () => {
      return initialState;
    },
  },
});

export const { setParticipatedIdos, unSetParticipatedIdos } = participatedIdos.actions;
export default participatedIdos.reducer;
