import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const Repair = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const items = [
    { id: '1', itemName: 'Pump' },
    { id: '2', itemName: 'Motor' },
    { id: '3', itemName: 'Controller' },
    { id: '4', itemName: 'Battery' },
  ];

  const handleItemSelect = (selected) => {
    setSelectedItems(selected);
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <Text style={styles.label}>Select Items:</Text>
        <MultiSelect
          items={items}
          uniqueKey="id"
          onSelectedItemsChange={handleItemSelect}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          displayKey="itemName"
          hideSubmitButton
          styleListContainer={styles.listContainer}
          textColor="#000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  selectContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#fbd33b',
    paddingTop: 30,
    borderRadius: 10,
  },
  label: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    maxHeight: 200,
  },
});

export default Repair;
