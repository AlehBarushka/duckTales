import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import Palette from '../../../../assets/svg/Palette';
import {colors} from '../../../../styles/colors';
import ColorPickerModal from '../ColorPickerModal';

type Props = {
  text: string;
  visible: boolean;
  currentColor: string;
  onPress: () => void;
  closeModal: (color: string) => void;
};

const ColorPicker: React.FC<Props> = ({
  text,
  currentColor,
  visible,
  onPress,
  closeModal,
}) => {
  return (
    <>
      <View style={styles.rowItemContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={onPress} style={styles.itemIcon}>
            <Palette color={colors.black} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <ColorPickerModal
        currentColor={currentColor}
        visible={visible}
        closeModal={closeModal}
      />
    </>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  rowItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemContainer: {
    flex: 1,
  },
  itemIcon: {
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.black,
  },
});
