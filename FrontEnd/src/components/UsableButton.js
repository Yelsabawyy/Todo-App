import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Button(props) {

  const backgroundColor = {
    backgroundColor: props.bgColor || 'black',
  };
  const textColor = {
    color: props.color || 'white',
  };

  const buttonDisable = props.buttonDisable || false;
  return (
    <View style={styles.root}>
      <TouchableOpacity disabled={buttonDisable} style={[styles.button, backgroundColor]} onPress={props.handlePress}>
        <Text style={[styles.buttonText, textColor]}>{props.buttonName}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginBottom:10
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
