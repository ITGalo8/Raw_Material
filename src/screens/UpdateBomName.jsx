import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';

const UpdateBomName = ({route, navigation}) => {
  const {itemId, rawMaterialId, rawMaterialName, currentQuantity} = route.params;

  const [name, setName] = useState(rawMaterialName);
  const [quantity, setQuantity] = useState(String(currentQuantity));

  const handleUpdate = async () => {
    if (!name || !quantity) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    try {
      const response = await axios.put(
        'http://88.222.214.93:5000/admin/updateItemRawMaterial',
        {
          itemId,
          rawMaterialId,
          name,
          quantity,
        },
      );

      console.log('Update Stock', response.data);

      Alert.alert('Success', 'Raw material updated successfully');
      navigation.goBack();
    } catch (error) {
      console.log(
        'Error fetching data:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', JSON.stringify(error.response.data?.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Raw Material</Text>
      <Text style={styles.label}>Raw Material Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter raw material name"
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Enter quantity"
        keyboardType="numeric"
      />

      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 70,
    flex: 1,
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#070604',
    textAlign: 'center',
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
  },
});

export default UpdateBomName;
