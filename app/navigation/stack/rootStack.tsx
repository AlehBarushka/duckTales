import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {INITIAL_SCREEN, RootStackScreens} from '../constants';
import Main from '../../screens/Main';
import Settings from '../../screens/Settings';
import {RootStackParamList} from '../types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={INITIAL_SCREEN}
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name={RootStackScreens.main} component={Main} />
      <RootStack.Screen name={RootStackScreens.settings} component={Settings} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
