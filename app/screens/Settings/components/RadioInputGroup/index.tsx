import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import RadioButtonsGroup, {
  RadioButtonProps,
} from 'react-native-radio-buttons-group';

import {colors} from '../../../../styles/colors';
import {isValidPercentage} from './helpers/isValidPercentage';

type Props = {
  title: string;
  type: 'desc' | 'asc';
  value: number;
  inputText: string;
  changeType: (type: string) => void;
  onBlur: (value: string) => void;
};

const RadioInputGroup: React.FC<Props> = ({
  title,
  type,
  value,
  inputText,
  changeType,
  onBlur,
}) => {
  let val: number | string = value;

  if (val === 0) {
    val = '';
  }

  const [ascInputValue, setAscInputValue] = useState(
    type === 'asc' ? String(val) : '',
  );
  const [descInputValue, setDescInputValue] = useState(
    type === 'desc' ? String(val) : '',
  );

  const handleChangeAscPercentage = (percentage: string) => {
    if (isValidPercentage(percentage)) {
      return setAscInputValue(percentage);
    }
  };

  const handleChangeDescPercentage = (percentage: string) => {
    if (isValidPercentage(percentage)) {
      return setDescInputValue(percentage);
    }
  };

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
        containerStyle: {
          marginBottom: 50,
        },
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

  useEffect(() => {
    if (type === 'asc') {
      setDescInputValue('');
    }

    if (type === 'desc') {
      setAscInputValue('');
    }
  }, [type]);

  return (
    <>
      <View style={styles.rowItemContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View>
        <RadioButtonsGroup
          containerStyle={styles.radioBtnContentContainerStyle}
          layout="column"
          radioButtons={radioButtons}
          onPress={changeType}
          selectedId={type}
        />
        <View style={styles.firstInputContainer}>
          <TextInput
            value={descInputValue}
            maxLength={5}
            onBlur={() => onBlur(descInputValue)}
            onChangeText={handleChangeDescPercentage}
            editable={type === 'desc'}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.inputText}>{inputText}</Text>
        </View>

        <View style={styles.secondInputContainer}>
          <TextInput
            value={ascInputValue}
            maxLength={5}
            onBlur={() => onBlur(ascInputValue)}
            onChangeText={handleChangeAscPercentage}
            editable={type === 'asc'}
            keyboardType="numeric"
            style={[styles.input, {marginLeft: 44}]}
          />
          <Text style={styles.inputText}>{inputText}</Text>
        </View>
      </View>
    </>
  );
};

export default RadioInputGroup;

const styles = StyleSheet.create({
  radioBtnContentContainerStyle: {
    alignItems: 'flex-start',
  },
  rowItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  firstInputContainer: {
    flex: 1,
    position: 'absolute',
    top: 34,
    paddingLeft: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: colors.settingsInput,
    height: 30,
    paddingVertical: 0,
    paddingHorizontal: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.black,
  },
  inputText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.black,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.black,
  },
});
