import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fbd33b',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});

export default Button;
