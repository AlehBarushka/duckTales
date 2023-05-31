import {Button, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackScreens} from '../../navigation/constants';
import {RootNavigationType} from '../../navigation/types';

const Main = () => {
  const navigation = useNavigation<RootNavigationType>();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Main</Text>
      <Button
        title="go to another"
        onPress={() => navigation.navigate(RootStackScreens.settings)}
      />
    </View>
  );
};

export default Main;

// const styles = StyleSheet.create({});
