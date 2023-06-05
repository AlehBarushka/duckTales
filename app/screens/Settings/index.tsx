import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../styles';
import Header from '../../components/Header';

const Settings = () => {
  return (
    <>
      <Header title="Бар 1" />
      <View style={styles.container}>
        <Text style={styles.text}>Settings</Text>
      </View>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
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
