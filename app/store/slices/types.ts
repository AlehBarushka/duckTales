export interface IBarInitialState {
  bars: IBar[];
}

export type IBar = {
  id: string;
  title: string;
  description: string;
  total: number;
  current: number;
  type: 'asc' | 'desc';
};
