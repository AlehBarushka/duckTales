export interface IBarInitialState {
  bars: IBar[];
}

export type IBar = {
  id: string;
  title: string;
  description: string;
  barColor: string;
  btnColor: string;
  startTime: number;
  endTime: number;
  type: 'asc' | 'desc';
};
