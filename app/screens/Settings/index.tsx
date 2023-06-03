import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../styles';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    color: colors.black,
  },
});
