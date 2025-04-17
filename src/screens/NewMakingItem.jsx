import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const NewMakingItem = () => {
  const navigation = useNavigation();
  const [selectedItemType, setSelectedItemType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState('');
  const [selectedDefectiveItemName, setSelectedDefectiveItemName] =
    useState('');
  const [items, setItems] = useState([]);
  const [defectiveItems, setDefectiveItems] = useState([]);
  const [selectedDefectiveItem, setSelectedDefectiveItem] = useState(null);
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
      resetSelections();
    }
  }, [selectedItemType]);

  const resetSelections = () => {
    setItems([]);
    setSelectedItem(null);
    setSelectedItemName('');
    setDefectiveItems([]);
    setSelectedDefectiveItem(null);
    setSelectedDefectiveItemName('');
  };

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

  const fetchDefectiveItems = async (itemType, itemName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://88.222.214.93:5000/admin/showDefectiveItemsList?itemName=${itemName}`,
      );
      if (response.data.success) {
        setDefectiveItems(response.data.data || []);
      } else {
        setError(response.data.message || 'No defective items found');
      }
    } catch (err) {
      setError('Failed to fetch defective items');
      console.log('Error fetching defective items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    if (!selectedDefectiveItem) {
      Alert.alert('Error', 'Please select a defective item to proceed');
      return;
    }

    navigation.navigate('RepairProcess', {
      itemId: selectedDefectiveItem,
      itemName: selectedItemName,
      defectiveItemName: selectedDefectiveItemName,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Making Product</Text>

      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={value => {
            resetSelections();
            setSelectedItemType(value);
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
            onValueChange={value => {
              const selected = items.find(item => item.id === value);
              setSelectedItem(value);
              setSelectedItemName(selected?.name || '');
              fetchDefectiveItems(selectedItemType, selected?.name || '');
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

      {defectiveItems.length > 0 && (
        <>
          <View style={styles.dropdownContainer}>
            <RNPickerSelect
              onValueChange={value => {
                const selected = defectiveItems.find(
                  item => item._id === value,
                );
                setSelectedDefectiveItem(value);
                setSelectedDefectiveItemName(selected?.itemName || '');
              }}
              items={defectiveItems.map(item => ({
                label: `${item.itemName} (Defective: ${item.defective})`,
                value: item._id,
              }))}
              placeholder={{label: 'Select a defective item...', value: null}}
              style={pickerSelectStyles}
              value={selectedDefectiveItem}
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Selected: {selectedItemName}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.proceedButton,
              !selectedDefectiveItem && styles.disabledButton,
            ]}
            onPress={handleProceed}
            disabled={!selectedDefectiveItem}>
            <Text style={styles.proceedButtonText}>Proceed to Repair</Text>
          </TouchableOpacity>
        </>
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
  dropdownContainer: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    marginBottom: 10,
  },
  proceedButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: width * 0.8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  infoContainer: {
    width: width * 0.8,
    backgroundColor: '#e9f7ef',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  infoText: {
    color: '#28a745',
    fontSize: 14,
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

export default NewMakingItem;


