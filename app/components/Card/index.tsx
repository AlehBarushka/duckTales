import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import Animated, {
  Layout,
  LightSpeedInLeft,
  LightSpeedOutLeft,
} from 'react-native-reanimated';

import Trash from '../../assets/svg/Trash';
import {colors} from '../../styles';
import OptionButton from '../OptionButton';
import GearWheel from '../../assets/svg/GearWheel';
import {IBar} from '../../store/slices/types';
import {locales as ILocales} from '../../locales/MainScreen';

type Props = {
  barItem: Omit<IBar, 'id'>;
  locales: typeof ILocales;
  isFirst?: boolean;
  navigateToSettings: () => void;
  deleteBar: () => void;
};

const Card: React.FC<Props> = ({
  barItem,
  isFirst,
  locales,
  deleteBar,
  navigateToSettings,
}) => {
  let width;
  let total = barItem.total;
  let current = barItem.current;
  let percentage = barItem.current;

  if (barItem.total === 0) {
    total = 1;
  }

  if (barItem.type === 'asc') {
    percentage = (1 - (total - current) / total) * 100;
  } else {
    percentage = ((total - current) / total) * 100;
  }

  if (barItem.type === 'asc') {
    width = 1 - (total - current) / total;
  } else {
    width = (total - current) / total;
  }

  return (
    <Animated.View
      entering={LightSpeedInLeft}
      layout={Layout.duration(400)}
      exiting={LightSpeedOutLeft}
      style={[styles.container, isFirst && styles.firstContainer]}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{barItem.title}</Text>
        <TouchableOpacity onPress={deleteBar}>
          <Trash size={20} color={colors.trash} />
        </TouchableOpacity>
      </View>
      <Text style={styles.descText}>{barItem.description}</Text>
      <View style={styles.progressBarContainer}>
        <Progress.Bar
          animated={false}
          borderWidth={0}
          borderRadius={30}
          progress={width}
          height={40}
          width={null}
          color={colors.trash}
          unfilledColor={colors.backgroundSecondary2}
        />
      </View>

      <View style={styles.optionsContainer}>
        <OptionButton title="-10 %" />
        <OptionButton title="-1 %" />
        <TouchableOpacity onPress={navigateToSettings}>
          <GearWheel size={26} color={colors.black} />
        </TouchableOpacity>
        <OptionButton title="+1 %" />
        <OptionButton title="+10 %" />
      </View>
      <View style={styles.progressStatusContainer}>
        <Text
          style={[
            styles.progressStatusText,
            {marginRight: 20},
          ]}>{`${percentage}%`}</Text>
        {percentage === 100 && (
          <Text style={styles.progressStatusText}>
            {locales.remainingTimeFulL}
          </Text>
        )}
        {percentage === 0 && (
          <Text style={styles.progressStatusText}>
            {locales.remainingTimeEmpty}
          </Text>
        )}
        {percentage > 0 && percentage < 100 && (
          <Text style={styles.progressStatusText}>
            {locales.remainingTime}Время
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary1,
    marginTop: 12,
    width: '100%',
  },
  firstContainer: {
    marginTop: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.black,
  },
  descText: {
    marginTop: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.black,
  },
  progressBarContainer: {
    marginTop: 10,
    flex: 1,
  },
  optionsContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressStatusContainer: {
    marginTop: 15,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressStatusText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.black,
  },
});
