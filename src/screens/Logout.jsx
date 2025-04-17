import {View, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import React from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Logout = ({onLogout}) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await axios.post('http://88.222.214.93:5050/auth/logout');
      Alert.alert('Logout Successful', 'You have been logged out.');
      navigation.navigate('LoginScreen');
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error.response.data?.message));
      console.log('Logout Error:', error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Icon name="logout" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f04a4a',
    padding: 10,
    borderRadius: 30,
  },
});

export default Logout;
