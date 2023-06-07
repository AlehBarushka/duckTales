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
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {RootStackScreens} from '../../navigation/constants';
import {RootNavigationType} from '../../navigation/types';
import {colors} from '../../styles';
import Card from '../../components/Card';
import Plus from '../../assets/svg/Plus';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {addBar, deleteBar} from '../../store/slices/barSlice';
import {locales} from '../../locales/MainScreen';

const Main = () => {
  const navigation = useNavigation<RootNavigationType>();

  const ref = useRef<ScrollView>(null);

  const dispatch = useAppDispatch();
  const bars = useAppSelector(state => state.bar.bars);

  const {top} = useSafeAreaInsets();

  const handleNavigateToSettings = () => {
    navigation.navigate(RootStackScreens.settings);
  };

  const handleAddBar = () => {
    dispatch(addBar());
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

      <View style={[styles.safeAreaContainer, {paddingTop: top}]}>
        {bars.length > 0 ? (
          <ScrollView
            style={styles.scrollContainer}
            ref={ref}
            onContentSizeChange={() =>
              ref.current?.scrollToEnd({animated: true})
            }>
            <View style={styles.container}>
              {bars.map((bar, index) => (
                <Card
                  key={index}
                  barItem={{
                    title: bar.title,
                    desc: bar.description,
                    total: 100,
                    current: 50,
                  }}
                  deleteBar={() => handleDeleteBar(String(index))}
                  isFirst={index === 0}
                  navigateToSettings={handleNavigateToSettings}
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
            <Text style={[styles.text, {marginTop: 14}]}>
              {locales.addBarText}
            </Text>
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
    paddingHorizontal: 10,
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
