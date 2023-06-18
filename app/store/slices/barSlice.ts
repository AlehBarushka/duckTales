import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {IBar, IBarInitialState} from './types';
import {MILLISECONDS_IN_HOUR} from '../constants';

const initialState: IBarInitialState = {
  bars: [] as IBar[],
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
    editSettingsTitleAndDesc: (
      state,
      action: PayloadAction<{id: string; title: string; description: string}>,
    ) => {
      const editedBar = state.bars.find(
        el => el.id === action.payload.id,
      ) as IBar;

      editedBar.title = action.payload.title;
      editedBar.description = action.payload.description;
    },
    editColors: (
      state,
      action: PayloadAction<{id: string; barColor?: string; btnColor?: string}>,
    ) => {
      const editedBar = state.bars.find(
        el => el.id === action.payload.id,
      ) as IBar;

      if (action.payload.barColor) {
        editedBar.barColor = action.payload.barColor;
      }

      if (action.payload.btnColor) {
        editedBar.btnColor = action.payload.btnColor;
      }
    },
    changeBarType: (
      state,
      action: PayloadAction<{id: string; type: 'desc' | 'asc'}>,
    ) => {
      const editedBar = state.bars.find(
        el => el.id === action.payload.id,
      ) as IBar;

      editedBar.type = action.payload.type;
      editedBar.startTime = new Date().getTime();
      editedBar.endTime = new Date().getTime();
    },
    changeTotal: (
      state,
      action: PayloadAction<{id: string; value: number}>,
    ) => {
      const editedBar = state.bars.find(
        el => el.id === action.payload.id,
      ) as IBar;

      const startTime = new Date().getTime();

      const hoursToTheEnd = 1 / (action.payload.value / 100);

      const endTime = startTime + hoursToTheEnd * MILLISECONDS_IN_HOUR;

      editedBar.startTime = startTime;
      editedBar.endTime = endTime;
    },
  },
});

export const {
  addBar,
  deleteBar,
  editSettingsTitleAndDesc,
  editColors,
  changeTotal,
  changeBarType,
} = barSlice.actions;

export default barSlice.reducer;
