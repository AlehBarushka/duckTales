import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {colors} from '../../styles';
import Header from '../../components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Settings = () => {
  const {top} = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        backgroundColor={colors.backgroundSecondary1}
        barStyle={'dark-content'}
      />
      <View style={[styles.safeAreaContainer, {paddingTop: top}]}>
        <Header title="Бар 1" />
        <View style={styles.container}>
          <Text style={styles.text}>Settings</Text>
        </View>
      </View>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    color: colors.black,
  },
});
