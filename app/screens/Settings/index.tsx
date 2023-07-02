import {StyleSheet, TextInput, View, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import React, {useRef, useState} from 'react';

import {colors} from '../../styles/colors';
import {RootNavigationTypeRouteProp} from '../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {locales} from '../../locales/SettingsScreen';
import {
  changeBarType,
  changeTotal,
  editColors,
  editSettingsTitleAndDesc,
} from '../../store/slices/barSlice';
import Header from './components/Header';
import TitleDescInput from './components/TitleDescInput';
import ColorPicker from './components/ColorPicker';
import RadioInputGroup from './components/RadioInputGroup';
import {MILLISECONDS_IN_HOUR} from '../../store/constants';
import {SafeAreaView} from 'react-native-safe-area-context';

const Settings = () => {
  const {params} = useRoute<RootNavigationTypeRouteProp>();

  const {storeTitle, storeDescription, barColor, btnColor, type, value} =
    useAppSelector(state => {
      const currentBar = state.bar.bars.find(bar => bar.id === params.id);
      const startTime = currentBar?.startTime as number;
      const endTime = currentBar?.endTime as number;
      const timeIsOver = endTime - startTime === 0;

      return {
        storeTitle: currentBar?.title as string,
        storeDescription: currentBar?.description as string,
        btnColor: currentBar?.btnColor as string,
        barColor: currentBar?.barColor as string,
        type: currentBar?.type,
        value: timeIsOver
          ? 0
          : (
              (1 / ((endTime - startTime) / MILLISECONDS_IN_HOUR)) *
              100
            ).toFixed(0),
      };
    });

  const dispatch = useAppDispatch();

  const titleInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const [settings, setSettings] = useState({
    title: storeTitle,
    description: storeDescription,
  });
  const [editableTitleInput, setEditableTitleInput] = useState(false);
  const [editableDescInput, setEditableDescInput] = useState(false);
  const [btnColorPickerVisible, setBtnColorPickerVisible] = useState(false);
  const [barColorPickerVisible, setBarColorPickerVisible] = useState(false);

  const changeType = (type: string) => {
    dispatch(changeBarType({id: params.id, type: type as 'desc' | 'asc'}));
  };

  const handleEditTitle = () => {
    setEditableTitleInput(true);
    setTimeout(() => titleInputRef.current?.focus(), 300);
  };

  const handleEditDescription = () => {
    setEditableDescInput(true);
    setTimeout(() => descriptionInputRef.current?.focus(), 300);
  };

  const handleSubmitChanges = () => {
    setEditableTitleInput(false);
    setEditableDescInput(false);

    dispatch(
      editSettingsTitleAndDesc({
        id: params.id,
        title: settings.title,
        description: settings.description,
      }),
    );
  };

  const handlePickBarColor = () => {
    setBarColorPickerVisible(true);
  };

  const handleCloseAndSaveBarColor = (color: string) => {
    setBarColorPickerVisible(false);

    dispatch(
      editColors({
        id: params.id,
        barColor: color,
      }),
    );
  };

  const handleCloseAndSaveBtnColor = (color: string) => {
    setBtnColorPickerVisible(false);

    dispatch(
      editColors({
        id: params.id,
        btnColor: color,
      }),
    );
  };

  const handlePickBtnColor = () => {
    setBtnColorPickerVisible(true);
  };

  const handleOnChangeText = (
    typeText: 'description' | 'title',
    text: string,
  ) => {
    setSettings({...settings, [typeText]: text});
  };

  const handleSavePercentage = (percentage: string) => {
    if (!percentage) {
      return;
    }
    dispatch(changeTotal({id: params.id, value: Number(percentage)}));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        borderWidth: 1,
        backgroundColor: colors.backgroundSecondary1,
      }}
      edges={['top']}>
      <View style={styles.container}>
        <Header title={`"${storeTitle}"`} />
        <ScrollView style={styles.settingsContainer}>
          <TitleDescInput
            editable={editableTitleInput}
            ref={titleInputRef}
            value={settings.title}
            typeText="title"
            handleEditTitle={handleEditTitle}
            onBlur={handleSubmitChanges}
            customOnChangeText={handleOnChangeText}
          />
          <TitleDescInput
            ref={descriptionInputRef}
            editable={editableDescInput}
            value={settings.description}
            typeText="description"
            handleEditTitle={handleEditDescription}
            onBlur={handleSubmitChanges}
            customOnChangeText={handleOnChangeText}
          />
          <ColorPicker
            currentColor={btnColor}
            visible={btnColorPickerVisible}
            closeModal={handleCloseAndSaveBtnColor}
            onPress={handlePickBtnColor}
            text={locales.btnColor}
          />
          <ColorPicker
            currentColor={barColor}
            visible={barColorPickerVisible}
            closeModal={handleCloseAndSaveBarColor}
            onPress={handlePickBarColor}
            text={locales.barColor}
          />
          <RadioInputGroup
            changeType={changeType}
            title={locales.typeOfBar}
            type={type as 'desc' | 'asc'}
            value={Number(value)}
            onBlur={handleSavePercentage}
            inputText={locales.percentageInHour}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 26,
  },
});
