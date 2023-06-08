import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {IBar, IBarInitialState} from './types';

const initialState: IBarInitialState = {
  bars: [],
};

export const barSlice = createSlice({
  name: 'bar',
  initialState,
  reducers: {
    addBar: (state, action: PayloadAction<IBar>) => {
      state.bars.push(action.payload);
    },
    deleteBar: (state, action: PayloadAction<string>) => {
      const deletedBar = state.bars.find(el => el.id === action.payload);

      if (deletedBar) {
        const deletedIndex = state.bars.indexOf(deletedBar);

        state.bars.splice(deletedIndex, 1);
      }
    },
  },
});

export const {addBar, deleteBar} = barSlice.actions;

export default barSlice.reducer;
