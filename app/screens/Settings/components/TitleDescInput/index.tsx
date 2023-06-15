import React, {forwardRef} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors} from '../../../../styles/colors';
import Pencil from '../../../../assets/svg/Pencil';

type Props = {
  typeText: 'title' | 'description';
  customOnChangeText: (type: 'title' | 'description', text: string) => void;
  handleEditTitle: () => void;
} & TextInputProps;

const TitleDescInput = forwardRef<TextInput, Props>(
  (
    {
      customOnChangeText,
      handleEditTitle,
      onBlur,
      value,
      editable,
      typeText,
      ...rest
    },
    ref,
  ) => {
    return (
      <View style={styles.rowItemContainer}>
        <View style={styles.itemContainer}>
          <TextInput
            {...rest}
            multiline
            ref={ref}
            value={value}
            editable={editable}
            onBlur={onBlur}
            onChangeText={text => customOnChangeText(typeText, text)}
            style={styles.input}
          />
        </View>
        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.settingsItemIcon}
            onPress={handleEditTitle}>
            <Pencil size={18} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

export default TitleDescInput;

const styles = StyleSheet.create({
  rowItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemContainer: {
    flex: 1,
  },
  settingsItemIcon: {
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  input: {
    padding: 0,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.black,
  },
});
