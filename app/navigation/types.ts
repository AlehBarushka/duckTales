import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackScreens} from './constants';

export type RootStackParamList = {
  [RootStackScreens.main]: undefined;
  [RootStackScreens.settings]: {id: string};
};

export type RootNavigationType = NativeStackNavigationProp<RootStackParamList>;
export type RootNavigationTypeRouteProp = RouteProp<
  RootStackParamList,
  RootStackScreens.settings
>;
