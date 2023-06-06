import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import Trash from '../../assets/svg/Trash';
import {colors} from '../../styles';
import OptionButton from '../OptionButton';
import GearWheel from '../../assets/svg/GearWheel';

type Props = {
  barItem: {
    title: string;
    desc: string;
    total: number;
    current: number;
  };
  isFirst?: boolean;
  navigateToSettings: () => void;
};

const Card: React.FC<Props> = ({barItem, isFirst, navigateToSettings}) => {
  return (
    <View style={[styles.container, isFirst && styles.firstContainer]}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{barItem.title}</Text>
        <TouchableOpacity
          onPress={() => {
            console.log('Заглушка');
          }}>
          <Trash size={20} color={colors.trash} />
        </TouchableOpacity>
      </View>
      <Text style={styles.descText}>{barItem.desc}</Text>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.completionContainer,
            {
              width: `${
                ((barItem.total - barItem.current) / barItem.total) * 100
              }%`,
            },
            (barItem.total - barItem.current) / barItem.total === 1 &&
              styles.fullCompletionContainer,
          ]}
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
        <Text style={[styles.progressStatusText, {marginRight: 20}]}>{`${
          ((barItem.total - barItem.current) / barItem.total) * 100
        }%`}</Text>
        <Text style={styles.progressStatusText}>Истечёт через</Text>
      </View>
    </View>
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
    marginTop: 0,
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
    width: '100%',
    height: 40,
    borderRadius: 30,
    backgroundColor: colors.backgroundSecondary2,
  },
  completionContainer: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    width: '50%',
    backgroundColor: 'green',
  },
  fullCompletionContainer: {
    borderRadius: 30,
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
