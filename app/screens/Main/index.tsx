import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import 'react-native-get-random-values';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
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
import {SCROLLVIEW_ANIMATION_PADDING} from './constants';

const Main = () => {
  const navigation = useNavigation<RootNavigationType>();

  const dispatch = useAppDispatch();
  const bars = useAppSelector(state => state.bar.bars);

  const scrollViewPadding = useSharedValue(0);

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
    scrollViewPadding.value += SCROLLVIEW_ANIMATION_PADDING;
    dispatch(deleteBar(id));
  };

  const scrollHandler = useAnimatedScrollHandler(event => {
    const maxOffsetY =
      event.contentSize.height - event.layoutMeasurement.height;
    const scrolledUp = Math.max(0, maxOffsetY - event.contentOffset.y);
    scrollViewPadding.value = Math.max(0, scrollViewPadding.value - scrolledUp);
  });

  const scrollViewAnimated = useAnimatedStyle(() => {
    return {
      paddingBottom: scrollViewPadding.value,
      paddingHorizontal: 20,
    };
  });

  return (
    <>
      <StatusBar
        backgroundColor={colors.backgroundPrimary}
        barStyle={'dark-content'}
      />

      <View style={styles.listContainer}>
        {bars.length > 0 ? (
          <>
            <Animated.ScrollView onScroll={scrollHandler}>
              <Animated.View style={scrollViewAnimated}>
                {bars.map((bar, index) => (
                  <Card
                    key={bar.id}
                    locales={locales}
                    isFirst={index === 0}
                    barItem={{
                      type: bar.type,
                      title: bar.title,
                      description: bar.description,
                      total: bar.total,
                      current: bar.current,
                    }}
                    deleteBar={() => handleDeleteBar(bar.id)}
                    navigateToSettings={() => handleNavigateToSettings(bar.id)}
                  />
                ))}
              </Animated.View>
              <View style={styles.emptyBlockForPadding} />
            </Animated.ScrollView>
          </>
        ) : (
          <View style={styles.centeredContainerWithoutItems}>
            <Text style={styles.text}>{locales.noBar}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.plusBtn} onPress={handleAddBar}>
          <Plus color={colors.black} size={24} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  centeredContainerWithoutItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: colors.black,
  },
  emptyBlockForPadding: {
    paddingBottom: 120,
  },
  plusBtn: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    padding: 20,
    backgroundColor: colors.gray,
    borderRadius: 40,
  },
});
