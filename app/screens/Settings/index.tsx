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
// import ColorPicker, {HueSlider, Panel1} from 'reanimated-color-picker';

import {colors} from '../../styles';
import Header from '../../components/Header';
import {RootNavigationTypeRouteProp} from '../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import Pencil from '../../assets/svg/Pencil';
import {locales} from '../../locales/SettingsScreen';
import Palette from '../../assets/svg/Palette';
import {editSettingsTitleAndDesc} from '../../store/slices/barSlice';

const Settings = () => {
  const {params} = useRoute<RootNavigationTypeRouteProp>();

  const {storeTitle, storeDescription} = useAppSelector(state => ({
    storeTitle: state.bar.bars.find(bar => bar.id === params.id)
      ?.title as string,
    storeDescription: state.bar.bars.find(bar => bar.id === params.id)
      ?.description as string,
  }));

  const dispatch = useAppDispatch();

  const titleInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const [settings, setSettings] = useState({
    title: storeTitle,
    description: storeDescription,
  });

  const [editableTitleInput, setEditableTitleInput] = useState(false);
  const [editableDescInput, setEditableDescInput] = useState(false);

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
            <Text style={styles.text}>{locales.btnColor}</Text>
            <TouchableOpacity>
              <Palette color={colors.black} size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowSettingsItemContainer}>
            <Text style={styles.text}>{locales.barColor}</Text>
            <TouchableOpacity>
              <Palette color={colors.black} size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowSettingsItemContainer}>
            <Text style={styles.text}>{locales.typeOfBar}</Text>
          </View>
          {/* <ColorPicker
            style={{width: '80%'}}
            onComplete={e => {
              console.log(e);
            }}>
            <View>
              <Panel1 />
              <HueSlider />
            </View>
          </ColorPicker> */}
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
  input: {
    padding: 0,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.black,
  },
});
