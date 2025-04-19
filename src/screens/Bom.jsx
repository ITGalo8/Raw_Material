import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Bom = () => {
  const navigation = useNavigation();
  const [selectedItemType, setSelectedItemType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState('');
  const [items, setItems] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemTypes = [
    {label: 'Motor', value: 'Motor'},
    {label: 'Pump', value: 'Pump'},
    {label: 'Controller', value: 'Controller'},
  ];

  useEffect(() => {
    if (selectedItemType) {
      fetchItems(selectedItemType);
    } else {
      setItems([]);
      setRawMaterials([]);
      setSelectedItem(null);
      setSelectedItemName('');
    }
  }, [selectedItemType]);

  const fetchItems = async itemName => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://88.222.214.93:5000/admin/getItemsByName?searchQuery=${itemName}`,
      );
      setItems(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch items');
      console.log('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRawMaterials = async itemId => {
    if (!itemId) {
      setRawMaterials([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://88.222.214.93:5000/admin/getRawMaterialsByItemId?itemId=${itemId}`,
      );

      const processedMaterials = (response.data.data || []).map(item => ({
        id: item.rawMaterial?.id || 'no-id',
        name: item.rawMaterial?.name || 'Unknown Material',
        quantity: item.quantity || 0,
        unit: item.rawMaterial?.unit || 'Pcs/Nos', // Added unit field
      }));

      setRawMaterials(processedMaterials);
    } catch (err) {
      setError('Failed to fetch raw materials');
      console.log('Error fetching raw materials:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMaterialPress = material => {
    if (!selectedItem) {
      Alert.alert('Error', 'No parent item selected');
      return;
    }

    Alert.alert(
      'Update Stock',
      `Update quantity for ${material.name} in ${selectedItemName}`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Update',
          onPress: () =>
            navigation.navigate('UpdateBomName', {
              itemId: selectedItem,
              itemName: selectedItemName,
              rawMaterialId: material.id,
              rawMaterialName: material.name,
              currentQuantity: material.quantity,
              unit: material.unit, // Added unit to navigation params
            }),
        },
      ],
    );
  };

  const renderMaterialItem = ({item}) => (
    <TouchableOpacity
      style={styles.tableRow}
      onPress={() => handleMaterialPress(item)}>
      <Text style={[styles.tableCell, styles.columnName]} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
      <Text style={[styles.tableCell, styles.columnQuantity]}>
        {item.quantity}
      </Text>
      <Text style={[styles.tableCell, styles.columnUnit]}>
        {item.unit}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BOM (Bill of Materials)</Text>

      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={value => {
            setSelectedItemType(value);
            setSelectedItem(null);
            setSelectedItemName('');
            setRawMaterials([]);
          }}
          items={itemTypes}
          placeholder={{label: 'Select an item type...', value: null}}
          style={pickerSelectStyles}
          value={selectedItemType}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {items.length > 0 && (
        <View style={styles.dropdownContainer}>
          <RNPickerSelect
            onValueChange={(value, index) => {
              const selected = items[index];
              setSelectedItem(value);
              setSelectedItemName(selected?.name || '');
              fetchRawMaterials(value);
            }}
            items={items.map(item => ({
              label: item.name,
              value: item.id, 
            }))}
            placeholder={{label: 'Select a specific item...', value: null}}
            style={pickerSelectStyles}
            value={selectedItem}
          />
        </View>
      )}

      {rawMaterials.length > 0 && (
        <View style={styles.materialContainer}>
          <Text style={styles.subHeading}>
            Raw Materials for {selectedItemName}
          </Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.columnName]}>
              Material Name
            </Text>
            <Text style={[styles.tableHeaderText, styles.columnQuantity]}>
              Quantity
            </Text>
            <Text style={[styles.tableHeaderText, styles.columnUnit]}>
              Unit
            </Text>
          </View>

          <FlatList
            data={rawMaterials}
            keyExtractor={item => item.id}
            renderItem={renderMaterialItem}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No raw materials found</Text>
            }
            contentContainerStyle={styles.listContent}
            style={styles.tableContainer}
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
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  dropdownContainer: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    marginBottom: 10,
  },
  materialContainer: {
    marginTop: 20,
    width: width * 0.9,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  tableContainer: {
    maxHeight: height * 0.5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tableCell: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingVertical: 8,
  },
  columnName: {
    flex: 2,
    paddingLeft: 10,
    textAlign: 'left',
  },
  columnQuantity: {
    flex: 1,
  },
  columnUnit: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    flexGrow: 1,
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