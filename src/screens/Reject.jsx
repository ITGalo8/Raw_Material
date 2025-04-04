import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MultiSelect from 'react-native-multiple-select';

const {width, height} = Dimensions.get('window');
const scale = width / 375;

const Reject = () => {
  const [selectedItemType, setSelectedItemType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [faultType, setFaultType] = useState('');
  const [faultAnalysis, setFaultAnalysis] = useState('');
  const [repairedBy, setRepairedBy] = useState('');
  const [remark, setRemark] = useState('');

  const [itemList, setItemList] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [units, setUnits] = useState([]);
  const [materialUnits, setMaterialUnits] = useState({});

  const [loading, setLoading] = useState(false);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [backendErrors, setBackendErrors] = useState({});

  const itemTypes = [
    {label: 'Motor', value: 'Motor'},
    {label: 'Pump', value: 'Pump'},
    {label: 'Controller', value: 'Controller'},
  ];

  const faultTypes = [
    'Controller IGBT Issue',
    'Controller Display Issue',
    'Winding Problem',
    'Bush Problem',
    'Stamping Damaged',
    'Thrust Plate Damage',
    'Shaft and Rotor Damaged',
    'Bearing Plate Damaged',
    'Oil Seal Damaged',
    'Other',
  ];

  useEffect(() => {
    const fetchUnits = async () => {
      setLoadingUnits(true);
      try {
        const response = await axios.get(
          'http://88.222.214.93:5050/admin/showUnit',
        );
        if (response.data.success) {
          setUnits(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching units:', error);
      } finally {
        setLoadingUnits(false);
      }
    };

    fetchUnits();
  }, []);

  useEffect(() => {
    if (selectedItemType) {
      fetchItemList(selectedItemType);
    } else {
      setItemList([]);
      setSelectedItem(null);
    }
  }, [selectedItemType]);

  useEffect(() => {
    const fetchItems = async () => {
      if (!selectedItem) {
        setAllItems([]);
        setFilteredItems([]);
        return;
      }

      setLoadingMaterials(true);
      setBackendErrors(prev => ({...prev, materials: null}));
      try {
        const response = await axios.get(
          `http://88.222.214.93:5050/admin/getItemRawMaterials?subItem=${encodeURIComponent(
            selectedItem.itemName,
          )}`,
        );

        if (response.data.success) {
          const items = response.data.data.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
          }));
          setAllItems(items);
          setFilteredItems(items);
        } else {
          setBackendErrors(prev => ({
            ...prev,
            materials: response.data.message || 'Failed to load materials',
          }));
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Failed to fetch materials';
        setBackendErrors(prev => ({
          ...prev,
          materials: errorMessage,
        }));
        console.log('Error fetching materials:', error);
      } finally {
        setLoadingMaterials(false);
      }
    };

    fetchItems();
  }, [selectedItem]);

  const fetchItemList = async itemType => {
    const storedUserId = await AsyncStorage.getItem('userId');
    setLoading(true);
    setError(null);
    setBackendErrors(prev => ({...prev, items: null}));
    try {
      const response = await axios.get(
        `http://88.222.214.93:5050/admin/showDefectiveItemsList?itemName=${itemType}`,
      );
      if (response.data && response.data.data) {
        setItemList(response.data.data);
      } else {
        setItemList([]);
        setBackendErrors(prev => ({
          ...prev,
          items: response.data.message || `No ${itemType} items found`,
        }));
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        `Failed to fetch ${itemType} items`;
      setBackendErrors(prev => ({
        ...prev,
        items: errorMessage,
      }));
      console.error('Error fetching item list:', err);
      setItemList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleItemSelect = selectedItems => {
    setSelectedItems(selectedItems);
    const newQuantities = {...quantities};
    const newUnits = {...materialUnits};
    
    selectedItems.forEach(itemId => {
      if (!newQuantities[itemId]) {
        newQuantities[itemId] = '';
      }
      if (!newUnits[itemId] && units.length > 0) {
        newUnits[itemId] = units[0].id;
      }
    });
    
    setQuantities(newQuantities);
    setMaterialUnits(newUnits);
  };

  const handleUnitChange = (itemId, unitId) => {
    setMaterialUnits(prev => ({
      ...prev,
      [itemId]: unitId,
    }));
  };

  const handleSearch = text => {
    if (text) {
      const filtered = allItems.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(allItems);
    }
  };

  const handleQuantityChange = (itemId, value) => {
    const item = allItems.find(i => i.id === itemId);
    const maxQuantity = item?.quantity || 0;

    // Allow decimal values
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      const numericValue = value === '' ? '' : parseFloat(value);
      if (value === '' || (numericValue >= 0 && numericValue <= maxQuantity)) {
        setQuantities(prev => ({
          ...prev,
          [itemId]: value,
        }));
      }
    }
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setBackendErrors({});

    // Frontend validation
    const validationErrors = {};

    if (!selectedItemType) {
      validationErrors.itemType = 'Please select an item type';
    }

    if (!selectedItem) {
      validationErrors.item = 'Please select a specific item';
    }

    if (!quantity || isNaN(parseFloat(quantity))) {
      validationErrors.quantity = 'Please enter a valid quantity';
    } else if (parseFloat(quantity) <= 0) {
      validationErrors.quantity = 'Quantity must be greater than 0';
    } else if (parseFloat(quantity) > selectedItem?.defective) {
      validationErrors.quantity = `Quantity cannot exceed ${selectedItem.defective}`;
    }

    if (!faultType) {
      validationErrors.faultType = 'Please select a fault type';
    }

    if (faultType === 'Other' && !faultAnalysis) {
      validationErrors.faultAnalysis = 'Please provide fault analysis details';
    }

    if (!repairedBy) {
      validationErrors.repairedBy = 'Please enter the repair person name';
    }

    // Validate raw materials quantities
    for (const itemId of selectedItems) {
      const qty = quantities[itemId];
      if (!qty || isNaN(parseFloat(qty)) || parseFloat(qty) <= 0) {
        const item = allItems.find(i => i.id === itemId);
        validationErrors[
          `material_${itemId}`
        ] = `Please enter a valid quantity for ${item?.name}`;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setBackendErrors(validationErrors);
      return;
    }

    const userId = await AsyncStorage.getItem('userId');
    const repairData = {
      item: selectedItemType,
      subItem: selectedItem.itemName,
      quantity: parseFloat(quantity),
      serialNumber,
      faultAnalysis: faultType === 'Other' ? faultAnalysis : faultType,
      isRepaired: false,
      repairedRejectedBy: repairedBy,
      remarks: remark,
      userId,
      repairedParts: selectedItems.map(itemId => {
        const item = allItems.find(i => i.id === itemId);
        const unit = units.find(u => u.id === materialUnits[itemId]);
        return {
          rawMaterialId: itemId,
          quantity: parseFloat(quantities[itemId]) || 0,
          unit: unit?.name || '',
        };
      }),
    };

    try {
      setSubmitting(true);
      const response = await axios.post(
        'http://88.222.214.93:5050/admin/addServiceRecord',
        repairData,
      );

      if (response.data.success) {
        Alert.alert('Success', 'Repair data submitted successfully');
        // Reset form
        setSelectedItemType(null);
        setSelectedItem(null);
        setQuantity('');
        setSerialNumber('');
        setFaultType('');
        setFaultAnalysis('');
        setRepairedBy('');
        setRemark('');
        setSelectedItems([]);
        setQuantities({});
        setMaterialUnits({});
        setBackendErrors({});
      } else {
        throw new Error(response.data.message || 'Submission failed');
      }
    } catch (error) {
      console.log(
        'Error fetching data:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', JSON.stringify(error.response.data?.message));

      let errorMessage = 'Submission failed';
      if (error.response) {
        if (error.response.data.errors) {
          const serverErrors = {};
          Object.keys(error.response.data.errors).forEach(key => {
            serverErrors[key] = error.response.data.errors[key].msg;
          });
          setBackendErrors(serverErrors);
          return;
        }
        errorMessage = error.response.data.message || errorMessage;
      } else {
        errorMessage = error.message || errorMessage;
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Reject Data Entry</Text>
          
          <View style={styles.section}>
            <Text style={styles.label}>Item Type*</Text>
            <Picker
              selectedValue={selectedItemType}
              onValueChange={value => {
                setSelectedItemType(value);
                setSelectedItem(null);
                setBackendErrors(prev => ({...prev, itemType: null}));
              }}
              style={[
                styles.picker,
                backendErrors.itemType && styles.pickerError,
              ]}
              dropdownIconColor="#000">
              <Picker.Item label="Select item type" value={null} />
              {itemTypes.map((item, index) => (
                <Picker.Item key={index} label={item.label} value={item.value} />
              ))}
            </Picker>
            {backendErrors.itemType && (
              <Text style={styles.errorText}>{backendErrors.itemType}</Text>
            )}
          </View>

          {selectedItemType && itemList.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>Select {selectedItemType}*</Text>
              <Picker
                selectedValue={selectedItem}
                onValueChange={item => {
                  setSelectedItem(item);
                  setBackendErrors(prev => ({...prev, item: null}));
                }}
                style={[styles.picker, backendErrors.item && styles.pickerError]}
                dropdownIconColor="#000">
                <Picker.Item label={`Select ${selectedItemType}`} value={null} />
                {itemList.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={`${item.itemName} (Defective: ${item.defective})`}
                    value={item}
                  />
                ))}
              </Picker>
              {backendErrors.item && (
                <Text style={styles.errorText}>{backendErrors.item}</Text>
              )}
            </View>
          )}

          {selectedItem && (
            <View style={styles.section}>
              <Text style={styles.label}>
                Quantity* (Max: {selectedItem.defective})
              </Text>
              <TextInput
                style={[
                  styles.input,
                  backendErrors.quantity && styles.inputError,
                ]}
                value={quantity}
                onChangeText={text => {
                  // Allow decimal values
                  if (text === '' || /^\d*\.?\d*$/.test(text)) {
                    setQuantity(text);
                    setBackendErrors(prev => ({...prev, quantity: null}));
                  }
                }}
                placeholder={`Enter quantity (max ${selectedItem.defective})`}
                keyboardType="numeric"
              />
              {backendErrors.quantity && (
                <Text style={styles.errorText}>{backendErrors.quantity}</Text>
              )}
            </View>
          )}

          {selectedItem && !loadingMaterials && (
            <View style={styles.section}>
              <Text style={styles.label}>Select Raw Materials:</Text>
              {backendErrors.materials && (
                <Text style={styles.errorText}>{backendErrors.materials}</Text>
              )}
              <MultiSelect
                hideTags
                items={filteredItems}
                uniqueKey="id"
                onSelectedItemsChange={handleItemSelect}
                selectedItems={selectedItems}
                selectText="Pick Raw Materials"
                searchInputPlaceholderText="Search Raw Materials..."
                onSearch={handleSearch}
                displayKey="name"
                hideSubmitButton
                styleListContainer={styles.listContainer}
                textColor="#000"
              />
            </View>
          )}
        </View>

        {selectedItems.length > 0 && (
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            {selectedItems.map(itemId => {
              const item = allItems.find(i => i.id === itemId);
              const errorKey = `material_${itemId}`;

              return (
                <View key={itemId} style={styles.section}>
                  <Text style={styles.label}>{item?.name}</Text>
                  <View style={styles.quantityRow}>
                    <TextInput
                      value={quantities[itemId]?.toString() || ''}
                      onChangeText={value => {
                        handleQuantityChange(itemId, value);
                        setBackendErrors(prev => ({...prev, [errorKey]: null}));
                      }}
                      style={[
                        styles.quantityInput,
                        backendErrors[errorKey] && styles.inputError,
                      ]}
                      keyboardType="numeric"
                      placeholder="Qty"
                    />
                    {loadingUnits ? (
                      <ActivityIndicator style={styles.unitPicker} />
                    ) : (
                      <Picker
                        selectedValue={materialUnits[itemId]}
                        onValueChange={unitId => handleUnitChange(itemId, unitId)}
                        style={styles.unitPicker}
                        dropdownIconColor="#000">
                        {units.map(unit => (
                          <Picker.Item
                            key={unit.id}
                            label={unit.name}
                            value={unit.id}
                          />
                        ))}
                      </Picker>
                    )}
                  </View>
                  
                  {backendErrors[errorKey] && (
                    <Text style={styles.errorText}>{backendErrors[errorKey]}</Text>
                  )}
                </View>
              );
            })}

            <View style={styles.section}>
              <Text style={styles.label}>Serial Number</Text>
              <TextInput
                style={styles.input}
                value={serialNumber}
                onChangeText={setSerialNumber}
                placeholder="Enter serial number"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Fault Type*</Text>
              <Picker
                selectedValue={faultType}
                onValueChange={value => {
                  setFaultType(value);
                  setBackendErrors(prev => ({...prev, faultType: null}));
                }}
                style={[
                  styles.picker,
                  backendErrors.faultType && styles.pickerError,
                ]}
                dropdownIconColor="#000">
                <Picker.Item label="Select fault type" value="" />
                {faultTypes.map((fault, index) => (
                  <Picker.Item key={index} label={fault} value={fault} />
                ))}
              </Picker>
              {backendErrors.faultType && (
                <Text style={styles.errorText}>{backendErrors.faultType}</Text>
              )}
            </View>

            {faultType === 'Other' && (
              <View style={styles.section}>
                <Text style={styles.label}>Fault Analysis Details*</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    backendErrors.faultAnalysis && styles.inputError,
                  ]}
                  placeholder="Describe the fault..."
                  value={faultAnalysis}
                  onChangeText={text => {
                    setFaultAnalysis(text);
                    setBackendErrors(prev => ({...prev, faultAnalysis: null}));
                  }}
                  multiline
                  numberOfLines={4}
                />
                {backendErrors.faultAnalysis && (
                  <Text style={styles.errorText}>
                    {backendErrors.faultAnalysis}
                  </Text>
                )}
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.label}>Rejected By*</Text>
              <TextInput
                style={[
                  styles.input,
                  backendErrors.repairedBy && styles.inputError,
                ]}
                placeholder="Enter technician name"
                value={repairedBy}
                onChangeText={text => {
                  setRepairedBy(text);
                  setBackendErrors(prev => ({...prev, repairedBy: null}));
                }}
              />
              {backendErrors.repairedBy && (
                <Text style={styles.errorText}>{backendErrors.repairedBy}</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Remarks</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Any additional notes..."
                value={remark}
                onChangeText={setRemark}
                multiline
                numberOfLines={3}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, submitting && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={submitting}>
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Submit Repair Data</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: scale * 16,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale * 16,
    paddingBottom: scale * 20,
  },
  heading: {
    fontSize: scale * 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: scale * 20,
    paddingTop: 40,
  },
  // section: {
  //   marginBottom: scale * 16,
  // },
  label: {
    fontSize: scale * 14,
    fontWeight: '600',
    marginBottom: scale * 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: scale * 10,
    paddingVertical: scale * 8,
    fontSize: scale * 14,
  },
  textArea: {
    height: scale * 100,
    textAlignVertical: 'top',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: scale * 8,
  },
  pickerError: {
    borderColor: 'red',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: scale * 12,
    marginTop: scale * 4,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: scale * 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: scale * 16,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: scale * 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale * 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: scale * 14,
  },
  listContainer: {
    maxHeight: scale * 150,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale * 4,
  },
  quantityInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: scale * 10,
    paddingVertical: scale * 8,
    fontSize: scale * 14,
    marginRight: scale * 10,
  },
  unitPicker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: scale * 8,
  },
});

export default Reject;