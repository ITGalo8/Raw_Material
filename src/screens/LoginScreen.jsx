import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../components/Button';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://88.222.214.93:5000/auth/login`,
        {
          email,
          password,
          roleId: '8290551b-9d0c-4005-91a8-abe6c841ae4d',
        },
      );

      console.log('Login response:', response.data);

      const userData = response.data.data;

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('userId', userData.id);

      console.log('user login id', userData.id);

      Alert.alert('Success', 'Successfully Logged In');
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Error', error?.response?.data?.message);
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    console.log('Login button clicked');
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }
    fetchData();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Galo.png')}
        style={styles.image}
      />
      <Text style={styles.textheading}>Welcome Back!</Text>
      <Text style={styles.title}>
        We are happy to see you again. Please enter your Email and Password.
      </Text>

      <Text style={styles.header}>Email</Text>
      <View style={styles.inputWithIcon}>
        <Icon name="email" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading}
          placeholderTextColor={'#888'}
        />
      </View>

      <Text style={styles.header}>Password</Text>
      <View style={styles.inputWithIcon}>
        <Icon name="lock" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={showPassword}
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
          editable={!loading}
          placeholderTextColor={'#888'}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'visibility-off' : 'visibility'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <Button
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleSubmit}
        disabled={loading}
      />

      <View>
        <Text style={styles.belowbutton}>Signup</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  textheading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    color: '#555',
    marginBottom: 50,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    // marginBottom: 20
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },

  forget: {
    marginLeft: 270,
  },

  belowbutton: {
    justifyContent: 'center',
  },
});

export default LoginScreen;
