import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackScreens} from './constants';

export type RootStackParamList = {
  [RootStackScreens.main]: undefined;
  [RootStackScreens.settings]: undefined;
};

export type RootNavigationType = NativeStackNavigationProp<RootStackParamList>;
