import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import ColorPicker, {OpacitySlider, Panel3} from 'reanimated-color-picker';

import {colors} from '../../styles/colors';

type Props = {
  visible: boolean;
  currentColor: string;
  closeModal: (color: string) => void;
};

const ColorPickerModal: React.FC<Props> = ({
  visible,
  currentColor,
  closeModal,
}) => {
  const [selectedColor, setSelectedColor] = useState(currentColor);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.container}>
        <Pressable
          style={styles.background}
          onPress={() => closeModal(selectedColor)}
        />
        <View style={styles.box}>
          <ColorPicker
            value={selectedColor}
            onComplete={e => setSelectedColor(e.hex)}>
            <View>
              <Panel3 />
              <OpacitySlider style={{marginTop: 8}} />
            </View>
          </ColorPicker>
        </View>
      </View>
    </Modal>
  );
};

export default ColorPickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: colors.modalOverlay,
    opacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  box: {
    width: '80%',
    zIndex: 100,
  },
});
