import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';

const {width} = Dimensions.get('window');

const Bom = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const items = [
    {label: 'Motor', value: 'Motor'},
    {label: 'Pump', value: 'Pump'},
    {label: 'Controller', value: 'Controller'},
  ];

  useEffect(() => {
    if (selectedItem) {
      fetchData(selectedItem);
    } else {
      setItemData([]);
      setRawMaterials([]);
    }
  }, [selectedItem]);

  const fetchData = async itemName => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://88.222.214.93:5050/admin/getItemsByName?searchQuery=${itemName}`,
      );
      const data = await response.json();
      setItemData(data.data || []);
    } catch (err) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  const fetchRawMaterials = async itemId => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://88.222.214.93:5050/admin/getRawMaterialsByItemId?itemId=${itemId}`,
      );
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
          onValueChange={value => {
            setSelectedItem(value);
            setSelectedItemId(null);
          }}
          items={items}
          placeholder={{label: 'Select an item...', value: null}}
          style={pickerSelectStyles}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {itemData.length > 0 && (
        <View style={styles.dropdownContainer}>
          <RNPickerSelect
            onValueChange={value => {
              setSelectedItemId(value);
              fetchRawMaterials(value);
            }}
            items={itemData.map(item => ({
              label: item.name,
              value: item.id,
            }))}
            placeholder={{label: 'Select an item...', value: null}}
            style={pickerSelectStyles}
          />
        </View>
      )}

      {rawMaterials.length > 0 && (
        <View style={styles.materialContainer}>
          <Text style={styles.subHeading}>Raw Materials</Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.columnName]}>
              Material Name
            </Text>
            <Text style={[styles.tableHeaderText, styles.columnQuantity]}>
              Quantity
            </Text>
          </View>

          <FlatList
            data={rawMaterials}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.columnName]}>
                  {item.rawMaterial.name}
                </Text>
                <Text style={[styles.tableCell, styles.columnQuantity]}>
                  {item.quantity}
                </Text>
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 5,
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
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  columnName: {
    flex: 2,
  },
  columnQuantity: {
    flex: 1,
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
