export interface IBarInitialState {
  bars: IBar[];
}

type IBar = {
  id: string;
  title: string;
  description: string;
  total: number | null;
  current: number | null;
};
