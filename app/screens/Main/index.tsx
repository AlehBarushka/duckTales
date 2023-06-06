import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {RootStackScreens} from '../../navigation/constants';
import {RootNavigationType} from '../../navigation/types';
import {colors} from '../../styles';
import Card from '../../components/Card';

const Main = () => {
  const navigation = useNavigation<RootNavigationType>();

  const {top} = useSafeAreaInsets();

  const handleNavigateToSettings = () => {
    navigation.navigate(RootStackScreens.settings);
  };

  return (
    <>
      <StatusBar
        backgroundColor={colors.backgroundPrimary}
        barStyle={'dark-content'}
      />
      <View style={[styles.safeAreaContainer, {paddingTop: top}]}>
        <View style={styles.container}>
          <Card
            barItem={{
              title: 'Бар 1',
              desc: 'Описание',
              total: 100,
              current: 50,
            }}
            isFirst
            navigateToSettings={handleNavigateToSettings}
          />
          <Card
            barItem={{
              title: 'Бар 2',
              desc: 'Описание',
              total: 100,
              current: 70,
            }}
            navigateToSettings={handleNavigateToSettings}
          />
        </View>
      </View>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
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
