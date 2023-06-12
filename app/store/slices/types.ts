export interface IBarInitialState {
  bars: IBar[];
}

export type IBar = {
  id: string;
  title: string;
  description: string;
  barColor: string;
  btnColor: string;
  total: number;
  current: number;
  type: 'asc' | 'desc';
};
