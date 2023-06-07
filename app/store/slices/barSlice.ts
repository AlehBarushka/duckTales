import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {IBarInitialState} from './types';

const initialState: IBarInitialState = {
  bars: [],
};

export const barSlice = createSlice({
  name: 'bar',
  initialState,
  reducers: {
    addBar: state => {
      const length = state.bars.length;

      state.bars.push({
        id: String(length),
        title: `Бар ${length}`,
        description: 'Описание',
        current: null,
        total: null,
      });
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
