import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';

const UpdateStockMaterial = ({ route }) => {
  const { itemName } = route.params;
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stock) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    const stockValue = parseInt(stock);
    if (isNaN(stockValue) || stockValue < 0) {
      Alert.alert('Error', 'Stock must be a positive integer.');
      return;
    }

    const itemData = {
      itemName,
      quantity: stock
    };

    setLoading(true);
    console.log({
      items: [itemData],
    });
    try {
      const response = await axios.post(`${API_URL}/warehouse-admin/add-item-stock`, {
        items: [itemData],

      });
      console.log('Response:', response.data);
      Alert.alert('Success', 'Item added successfully!');

      setStock('');
    } catch (error) {
      console.log('Error adding item:', error);
      if (error.response && error.response.data) {
        Alert.alert(
          'Error',
          error.response.data.message || 'An error occurred.',
        );
      } else {
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Stock:</Text>
      <TextInput
        style={styles.input}
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Update Quantity</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    paddingTop: 40,
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#070604',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#070604',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default UpdateStockMaterial;
