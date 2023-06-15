import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import React, {useMemo, useRef, useState} from 'react';
import RadioButtonsGroup, {
  RadioButtonProps,
} from 'react-native-radio-buttons-group';

import {colors} from '../../styles/colors';
import {RootNavigationTypeRouteProp} from '../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {locales} from '../../locales/SettingsScreen';
import {
  changeBarType,
  editColors,
  editSettingsTitleAndDesc,
} from '../../store/slices/barSlice';
import Header from './components/Header';
import TitleDescInput from './components/TitleDescInput';
import ColorPicker from './components/ColorPicker';

const Settings = () => {
  const {params} = useRoute<RootNavigationTypeRouteProp>();

  const {storeTitle, storeDescription, barColor, btnColor, type} =
    useAppSelector(state => {
      const currentBar = state.bar.bars.find(bar => bar.id === params.id);

      return {
        storeTitle: currentBar?.title as string,
        storeDescription: currentBar?.description as string,
        btnColor: currentBar?.btnColor as string,
        barColor: currentBar?.barColor as string,
        type: currentBar?.type,
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

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: 'desc',
        label: 'Убывающий',
        color: colors.black,
        labelStyle: {
          fontFamily: 'Inter-Regular',
          fontSize: 16,
          color: colors.black,
        },
        containerStyle: {marginBottom: 50},
        value: 'desc',
      },
      {
        id: 'asc',
        label: 'Возрастающий',
        color: colors.black,
        labelStyle: {
          fontFamily: 'Inter-Regular',
          fontSize: 16,
          color: colors.black,
        },
        value: 'asc',
      },
    ],
    [],
  );

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

  return (
    <>
      <StatusBar
        backgroundColor={colors.backgroundSecondary1}
        barStyle={'dark-content'}
      />
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
          <View style={styles.rowSettingsItemContainer}>
            <Text style={styles.text}>{locales.typeOfBar}</Text>
          </View>
          <View>
            <RadioButtonsGroup
              containerStyle={{alignItems: 'flex-start'}}
              layout="column"
              radioButtons={radioButtons}
              onPress={changeType}
              selectedId={type}
            />
            <View
              style={{
                flex: 1,
                position: 'absolute',
                top: 34,
                paddingLeft: 44,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
              }}>
              <TextInput
                editable={type === 'desc'}
                maxLength={5}
                keyboardType="numeric"
                style={{
                  flex: 1,
                  backgroundColor: colors.settingsInput,
                  height: 30,
                  paddingVertical: 0,
                  paddingHorizontal: 10,
                  fontFamily: 'Inter-Regular',
                  fontSize: 14,
                  color: colors.black,
                }}
              />
              <Text
                style={{
                  flex: 1,
                  marginLeft: 20,
                  fontFamily: 'Inter-Regular',
                  fontSize: 14,
                  color: colors.black,
                }}>
                {locales.percentageInHour}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                borderWidth: 1,
              }}>
              <TextInput
                maxLength={5}
                editable={type === 'asc'}
                keyboardType="numeric"
                style={{
                  flex: 1,
                  backgroundColor: colors.settingsInput,
                  marginLeft: 44,
                  height: 30,
                  paddingVertical: 0,
                  paddingHorizontal: 10,
                  fontFamily: 'Inter-Regular',
                  fontSize: 14,
                  color: colors.black,
                }}
              />
              <Text
                style={{
                  flex: 1,
                  marginLeft: 20,
                  fontFamily: 'Inter-Regular',
                  fontSize: 14,
                  color: colors.black,
                }}>
                {locales.percentageInHour}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
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
  rowSettingsItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingsItemContainer: {
    flex: 1,
  },
  settingsItemIcon: {
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.black,
  },
});
