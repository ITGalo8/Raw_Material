import { View, Text, StyleSheet, Dimensions, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';

const { width } = Dimensions.get('window');

const Bom = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const items = [
    { label: 'Motor', value: 'Motor' },
    { label: 'Pump', value: 'Pump' },
    { label: 'Controller', value: 'Controller' },
  ];

  useEffect(() => {
    if (selectedItem) {
      fetchData(selectedItem);
    } else {
      setItemData([]);
      setRawMaterials([]);
    }
  }, [selectedItem]);

  const fetchData = async (itemName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://88.222.214.93:5050/admin/getItemsByName?searchQuery=${itemName}`);
      const data = await response.json();
      setItemData(data.data || []);
    } catch (err) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  const fetchRawMaterials = async (itemId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://88.222.214.93:5050/admin/getRawMaterialsByItemId?itemId=${itemId}`);
      const data = await response.json();
      setRawMaterials(data.data || []);
    } catch (err) {
      setError('Failed to fetch raw materials');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BOM (Bill of Material)</Text>
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedItem(value)}
          items={items}
          placeholder={{ label: 'Select an item...', value: null }}
          style={pickerSelectStyles}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={itemData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => fetchRawMaterials(item.id)}>
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      
      {rawMaterials.length > 0 && (
        <View style={styles.materialContainer}>
          <Text style={styles.subHeading}>Raw Materials</Text>
          
          <FlatList
            data={rawMaterials}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.materialCard}>
                <Text style={styles.cardText}>{item.rawMaterial.name} - {item.quantity}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 50,
    alignItems: 'center',
   
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#070604',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  dropdownContainer: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  card: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 10,
    width: width * 0.8,
    alignItems: 'center',
  },
  materialContainer: {
    marginTop: 20,
    width: width * 0.8,
    marginBottom: 200,
  },
  materialCard: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
  },
};

export default Bom;