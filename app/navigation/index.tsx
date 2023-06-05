import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootStackNavigator from './stack/rootStack';

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
