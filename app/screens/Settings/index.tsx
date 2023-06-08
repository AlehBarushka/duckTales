import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import ColorPicker, {HueSlider, Panel1} from 'reanimated-color-picker';

import {colors} from '../../styles';
import Header from '../../components/Header';
import {RootNavigationTypeRouteProp} from '../../navigation/types';
import {useAppSelector} from '../../store/hooks';

const Settings = () => {
  const {params} = useRoute<RootNavigationTypeRouteProp>();

  const title = useAppSelector(state =>
    state.bar.bars.find(bar => bar.id === params.id),
  )?.title as string;

  return (
    <>
      <StatusBar
        backgroundColor={colors.backgroundSecondary1}
        barStyle={'dark-content'}
      />
      <View style={styles.safeAreaContainer}>
        <Header title={title} />
        <View style={styles.container}>
          <Text style={styles.text}>Settings</Text>
          <ColorPicker
            style={{width: '80%'}}
            onComplete={e => {
              console.log(e);
            }}>
            <View>
              <Panel1 />
              <HueSlider />
            </View>
          </ColorPicker>
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
