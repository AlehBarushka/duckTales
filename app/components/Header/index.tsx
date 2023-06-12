import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {locales} from '../../locales/SettingsScreen';
import {colors} from '../../styles';

type Props = {
  title: string;
};

const Header: React.FC<Props> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {locales.settings} {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary1,
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 40,
  },
  titleText: {
    color: colors.black,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});
