import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import {colors} from '../../styles';

type Props = {
  title: string;
};

const OptionButton: React.FC<Props> = ({title}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OptionButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    width: 65,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary2,
  },
  titleText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.black,
  },
});
