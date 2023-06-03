import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {RootStackScreens} from '../../navigation/constants';
import {RootNavigationType} from '../../navigation/types';
import {colors} from '../../styles';
import Trash from '../../assets/svg/Trash';
import Plus from '../../assets/svg/Plus';
import Pencil from '../../assets/svg/Pencil';
import Palette from '../../assets/svg/Palette';

const Main = () => {
  const navigation = useNavigation<RootNavigationType>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Main</Text>
      <Trash size={40} color={'red'} />
      <Plus size={40} color={'black'} />
      <Pencil size={40} color={'black'} />
      <Palette size={40} color={'black'} />
      <Button
        title="go to another"
        onPress={() => navigation.navigate(RootStackScreens.settings)}
      />
    </View>
  );
};

export default Main;

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
