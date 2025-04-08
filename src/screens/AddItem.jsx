import React, { useState, useCallback } from 'react';
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
import { Picker } from '@react-native-picker/picker';

const AddItem = () => {
  const [name, setName] = useState('');
  const [selectedItemType, setSelectedItemType] = useState(null);
  const [loading, setLoading] = useState(false);

  const itemTypes = [
    {label: 'Motor', value: 'Motor'},
    {label: 'Pump', value: 'Pump'},
    {label: 'Controller', value: 'Controller'},
  ];

  const handleSubmit = useCallback(async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Item Name cannot be empty or just spaces.');
      return;
    }

    if (!selectedItemType) {
      Alert.alert('Error', 'Please select an item type.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://88.222.214.93:5000/admin/addItem', {
        name: name.trim(),
        type: selectedItemType
      });

      Alert.alert('Success', 'Item added successfully!');
      setName('');
      setSelectedItemType(null);
    } catch (error) {
      console.log('Error adding item:', error);
      const errorMessage =
        error.response?.data?.message || 'An unexpected error occurred. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [name, selectedItemType]);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Item Type*</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedItemType}
            onValueChange={setSelectedItemType}
            style={styles.picker}
            dropdownIconColor="#000"
            mode="dropdown"
          >
            <Picker.Item label="Select item type" value={null} />
            {itemTypes.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
      </View>
      
      <Text style={styles.label}>Item Name*:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter item name"
        placeholderTextColor="#999"
        autoCapitalize="characters"
      />
      <TouchableOpacity
        style={[styles.button, (loading || !name.trim() || !selectedItemType) && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading || !name.trim() || !selectedItemType}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Add Item</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'black',
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#070604',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddItem;