import React ,{useState} from 'react';
import { View, TextInput } from 'react-native';

export default function Input(props) {
  const [text,setText]=useState('');
  return (
    <View>
      <TextInput
        style={styles.input}
        secureTextEntry={props.secureTextEntry || false}
        placeholder={props.placeholder || ''}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </View>
  );
}

const styles = {
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
};
