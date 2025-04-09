import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateItemRawMaterial = ({ route, navigation }) => {
  const { item } = route.params;
  const [name, setName] = useState(item.name || '');
  const [quantity, setQuantity] = useState(item.quantity ? item.quantity.toString() : '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Material name is required');
      return;
    }
    
    if (!quantity.trim()) {
      Alert.alert('Error', 'Quantity is required');
      return;
    }

    try {
      setLoading(true);
      
      const updatedData = {
        itemId: item.itemId,
        rawMaterialId: item.rawMaterialId,
        name: name.trim(),
        quantity: parseFloat(quantity),
      };

      console.log("update data", updatedData)
      const response = await axios.put(
        `http://88.222.214.93:5000/admin/updateRawMaterial/${item.rawMaterialId}`,
        updatedData,
        {
          headers: {
            'Authorization': `Bearer ${await AsyncStorage.getItem('authToken')}`
          }
        }
      );

      if (response.data.success) {
        Alert.alert('Success', 'Material updated successfully');
        navigation.goBack();
      } else {
        throw new Error(response.data.message || 'Failed to update material');
      }
    } catch (error) {
      console.log('Update error:', error);
      Alert.alert(
        'Error', 
        error.response?.data?.message || error.message || 'Failed to update material'
      );
      
      if (error.response?.status === 401) {
        await AsyncStorage.multiRemove(['authToken', 'userId']);
        navigation.replace('LoginScreen');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#2c3e50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Material</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>


            <View style={styles.inputGroup}>
              <Text style={styles.label}>Material Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter material name"
                placeholderTextColor="#95a5a6"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                placeholder="Enter quantity"
                keyboardType="numeric"
                placeholderTextColor="#95a5a6"
              />
            </View>

            <TouchableOpacity 
              style={styles.updateButton} 
              onPress={handleUpdate}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.updateButtonText}>Update Material</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  formContainer: {
    marginTop: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 8,
    fontWeight: '500',
  },
  idText: {
    fontSize: 16,
    color: '#7f8c8d',
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#2c3e50',
  },
  updateButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateItemRawMaterial;