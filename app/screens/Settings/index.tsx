import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import React, {useRef, useState} from 'react';

import {colors} from '../../styles/colors';
import Header from '../../components/Header';
import {RootNavigationTypeRouteProp} from '../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import Pencil from '../../assets/svg/Pencil';
import {locales} from '../../locales/SettingsScreen';
import Palette from '../../assets/svg/Palette';
import {
  editColors,
  editSettingsTitleAndDesc,
} from '../../store/slices/barSlice';
import ColorPickerModal from '../../components/ColorPickerModal';

const Settings = () => {
  const {params} = useRoute<RootNavigationTypeRouteProp>();

  const {storeTitle, storeDescription, barColor, btnColor} = useAppSelector(
    state => {
      const currentBar = state.bar.bars.find(bar => bar.id === params.id);

      return {
        storeTitle: currentBar?.title as string,
        storeDescription: currentBar?.description as string,
        btnColor: currentBar?.btnColor as string,
        barColor: currentBar?.barColor as string,
      };
    },
  );

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

  const handleEditTitle = () => {
    setEditableTitleInput(true);
    setTimeout(() => titleInputRef.current?.focus(), 250);
  };

  const handleEditDescription = () => {
    setEditableDescInput(true);
    setTimeout(() => descriptionInputRef.current?.focus(), 300);
  };

  const handleSubmitTitleChanges = () => {
    setEditableTitleInput(false);

    dispatch(
      editSettingsTitleAndDesc({
        id: params.id,
        title: settings.title,
        description: settings.description,
      }),
    );
  };

  const handleSubmitDescriptionChanges = () => {
    setEditableTitleInput(false);

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

  const handleOnChangeText = (type: string, text: string) => {
    setSettings({...settings, [type]: text});
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
          <View style={styles.rowSettingsItemContainer}>
            <View style={styles.settingsItemContainer}>
              <TextInput
                multiline
                ref={titleInputRef}
                value={settings.title}
                onChangeText={text => handleOnChangeText('title', text)}
                editable={editableTitleInput}
                onBlur={handleSubmitTitleChanges}
                style={styles.input}
              />
            </View>
            <View style={styles.settingsItemContainer}>
              <TouchableOpacity
                style={styles.settingsItemIcon}
                onPress={handleEditTitle}>
                <Pencil size={18} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rowSettingsItemContainer}>
            <View style={styles.settingsItemContainer}>
              <TextInput
                multiline
                ref={descriptionInputRef}
                value={settings.description}
                onChangeText={text => handleOnChangeText('description', text)}
                editable={editableDescInput}
                onBlur={handleSubmitDescriptionChanges}
                style={styles.input}
              />
            </View>
            <View style={styles.settingsItemContainer}>
              <TouchableOpacity
                onPress={handleEditDescription}
                style={styles.settingsItemIcon}>
                <Pencil size={18} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rowSettingsItemContainer}>
            <View style={styles.settingsItemContainer}>
              <Text style={styles.text}>{locales.btnColor}</Text>
            </View>
            <View style={styles.settingsItemContainer}>
              <TouchableOpacity
                onPress={handlePickBtnColor}
                style={styles.settingsItemIcon}>
                <Palette color={colors.black} size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rowSettingsItemContainer}>
            <View style={styles.settingsItemContainer}>
              <Text style={styles.text}>{locales.barColor}</Text>
            </View>
            <View style={styles.settingsItemContainer}>
              <TouchableOpacity
                onPress={handlePickBarColor}
                style={styles.settingsItemIcon}>
                <Palette color={colors.black} size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rowSettingsItemContainer}>
            <Text style={styles.text}>{locales.typeOfBar}</Text>
          </View>
        </ScrollView>
      </View>
      <ColorPickerModal
        currentColor={barColor}
        visible={barColorPickerVisible}
        closeModal={handleCloseAndSaveBarColor}
      />
      <ColorPickerModal
        visible={btnColorPickerVisible}
        currentColor={btnColor}
        closeModal={handleCloseAndSaveBtnColor}
      />
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
  input: {
    padding: 0,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.black,
  },
});
