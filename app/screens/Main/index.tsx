import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import {RootStackScreens} from '../../navigation/constants';
import {RootNavigationType} from '../../navigation/types';
import {colors} from '../../styles';
import Card from '../../components/Card';
import Plus from '../../assets/svg/Plus';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {addBar, deleteBar} from '../../store/slices/barSlice';
import {locales} from '../../locales/MainScreen';
import {IBar} from '../../store/slices/types';

const Main = () => {
  const navigation = useNavigation<RootNavigationType>();

  const ref = useRef<ScrollView>(null);

  const dispatch = useAppDispatch();
  const bars = useAppSelector(state => state.bar.bars);

  const handleNavigateToSettings = (id: string) => {
    navigation.navigate(RootStackScreens.settings, {id});
  };

  const handleAddBar = () => {
    const defaultBarItem: IBar = {
      id: uuidv4(),
      title: locales.defaultBarTitle,
      description: locales.defaultBarDescription,
      current: 0,
      total: 0,
      type: 'asc',
    };

    dispatch(addBar(defaultBarItem));
  };

  const handleDeleteBar = (id: string) => {
    dispatch(deleteBar(id));
  };

  return (
    <>
      <StatusBar
        backgroundColor={colors.backgroundPrimary}
        barStyle={'dark-content'}
      />

      <View style={styles.safeAreaContainer}>
        {bars.length > 0 ? (
          <ScrollView
            style={styles.scrollContainer}
            ref={ref}
            onContentSizeChange={() => {
              ref.current?.scrollToEnd({animated: true});
            }}>
            <View style={styles.container}>
              {bars.map((bar, index) => (
                <Card
                  key={bar.id}
                  locales={locales}
                  barItem={{
                    type: bar.type,
                    title: bar.title,
                    description: bar.description,
                    total: bar.total,
                    current: bar.current,
                  }}
                  deleteBar={() => handleDeleteBar(bar.id)}
                  isFirst={index === 0}
                  navigateToSettings={() => handleNavigateToSettings(bar.id)}
                />
              ))}
              <TouchableOpacity style={styles.plusBtn} onPress={handleAddBar}>
                <Plus color={colors.black} size={24} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.centeredContainer}>
            <TouchableOpacity onPress={handleAddBar}>
              <Plus color={colors.black} size={24} />
            </TouchableOpacity>
            <Text style={[styles.text, {marginTop: 14}]}>{locales.noBar}</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.backgroundPrimary,
  },
  scrollContainer: {
    flex: 1,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.black,
  },
  plusBtn: {
    alignSelf: 'center',
    marginTop: 12,
    paddingBottom: 40,
  },
});
