import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../../styles/colors';

type Props = {
  title: string;
  color: string;
};

const OptionButton: React.FC<Props> = ({title, color}) => {
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: color}]}>
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
  },
  titleText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.black,
  },
});
