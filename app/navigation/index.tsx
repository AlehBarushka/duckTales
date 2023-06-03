import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

import RootStackNavigator from './stack/rootStack';
import {colors} from '../styles';

const Navigation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
