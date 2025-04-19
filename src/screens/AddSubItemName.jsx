import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const {width, height} = Dimensions.get('window');
const scale = width / 375;

const AddSubItemName = () => {
  const [rawMaterialName, setRawMaterialName] = useState('');
  const [selectedUnitName, setSelectedUnitName] = useState(null); // Changed to store name
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://88.222.214.93:5000/admin/showUnit',
        );
        setUnit(response.data.data);
      } catch (error) {
        console.log('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch unit');
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!rawMaterialName.trim()) {
      Alert.alert('Error', 'Item name cannot be empty or just spaces.');
      return;
    }

    if (!selectedUnitName) {
      Alert.alert('Error', 'Please select a unit.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://88.222.214.93:5000/admin/addRawMaterial',
        {
          rawMaterialName: rawMaterialName.trim(),
          unit: selectedUnitName, // Now sending the unit name instead of ID
        },
      );

      Alert.alert('Success', 'Item added successfully!');
      setRawMaterialName('');
      setSelectedUnitName(null);
    } catch (error) {
      console.log('Error adding item:', error);
      const errorMessage =
        error.response?.data?.message ||
        'An unexpected error occurred. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [rawMaterialName, selectedUnitName]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Raw Material</Text>
      <Text style={styles.label}>New Item Name*:</Text>
      <TextInput
        style={styles.input}
        value={rawMaterialName}
        onChangeText={setRawMaterialName}
        placeholder="Enter new item name"
        placeholderTextColor="#999"
        autoCapitalize="characters"
      />

      <Text style={styles.label}>Select Unit*:</Text>
      <View style={styles.pickerContainer}>
        {fetching ? (
          <ActivityIndicator style={styles.picker} />
        ) : (
          <Picker
            selectedValue={selectedUnitName}
            onValueChange={itemValue => setSelectedUnitName(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Select a unit..." value={null} />
            {unit.map(unit => (
              <Picker.Item
                key={unit.id}
                label={unit.name}
                value={unit.name} // Now storing the name as the value
              />
            ))}
          </Picker>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          (loading || !rawMaterialName.trim() || !selectedUnitName) &&
            styles.disabledButton,
        ]}
        onPress={handleSubmit}
        disabled={loading || !rawMaterialName.trim() || !selectedUnitName}>
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  heading: {
    fontSize: scale * 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: scale * 20,
    paddingTop: 40
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 15,
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

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddSubItemName;