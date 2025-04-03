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
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const Reject = () => {
  const [selectedItemType, setSelectedItemType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [faultType, setFaultType] = useState('');
  const [remark, setRemark] = useState('');
  const [faultAnalysis, setFaultAnalysis] = useState('');
  const [repairedBy, setRepairedBy] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const [itemList, setItemList] = useState([]);
  const [error, setError] = useState(null);

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
    if (selectedItemType) {
      fetchItemList(selectedItemType);
    } else {
      setItemList([]);
      setSelectedItem(null);
    }
  }, [selectedItemType]);

  const fetchItemList = async itemType => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://88.222.214.93:5050/admin/showDefectiveItemsList?itemName=${itemType}`,
      );
      if (response.data && response.data.data) {
        setItemList(response.data.data);
      } else {
        setItemList([]);
        setError(`No ${itemType} items found`);
      }
    } catch (err) {
      console.error('Error fetching item list:', err);
      setError(`Failed to fetch ${itemType} items`);
      setItemList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!selectedItemType || !selectedItem) {
      Alert.alert('Error', 'Please select an item type and specific item');
      return;
    }

    if (!quantity || isNaN(quantity) || parseInt(quantity, 10) <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity');
      return;
    }

    if (parseInt(quantity, 10) > selectedItem.defective) {
      Alert.alert('Error', `Quantity cannot exceed ${selectedItem.defective}`);
      return;
    }

    if (!faultType) {
      Alert.alert('Error', 'Please select a fault type');
      return;
    }

    if (faultType === 'Other' && !faultAnalysis) {
      Alert.alert('Error', 'Please provide fault analysis details');
      return;
    }

    if (!repairedBy) {
      Alert.alert('Error', 'Please enter the repair person name');
      return;
    }

    const repairData = {
      itemType: selectedItemType,
      itemId: selectedItem._id,
      itemName: selectedItem.itemName,
      quantity: parseInt(quantity, 10),
      serialNumber,
      faultType: faultType === 'Other' ? faultAnalysis : faultType,
      repairedBy,
      remark,
      date: new Date().toISOString(),
    };

    try {
      setSubmitting(true);
      const response = await axios.post(
        'http://88.222.214.93/warehouse-admin/reject-item',
        repairData,
      );

      if (response.data.success) {
        Alert.alert('Success', 'Repair data submitted successfully');
      } else {
        throw new Error(response.data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || error.message || 'Submission failed',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Repair Data Entry</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Item Type*</Text>
          <Picker
            selectedValue={selectedItemType}
            onValueChange={value => {
              setSelectedItemType(value);
              setSelectedItem(null);
            }}
            style={styles.picker}
            dropdownIconColor="#000">
            <Picker.Item label="Select item type" value={null} />
            {itemTypes.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Loading items...</Text>
          </View>
        )}

        {error && !loading && <Text style={styles.errorText}>{error}</Text>}

        {selectedItemType && itemList.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.label}>Select {selectedItemType}*</Text>
            <Picker
              selectedValue={selectedItem}
              onValueChange={setSelectedItem}
              style={styles.picker}
              dropdownIconColor="#000">
              <Picker.Item label={`Select ${selectedItemType}`} value={null} />
              {itemList.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={`${item.itemName} (Available: ${item.defective})`}
                  value={item}
                />
              ))}
            </Picker>
          </View>
        )}

        {selectedItem && (
          <View style={styles.section}>
            <Text style={styles.label}>
              Quantity* (Max: {selectedItem.defective})
            </Text>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={text => {
                const num = text === '' ? '' : parseInt(text, 10);
                if (text === '' || (!isNaN(num) && num > 0)) {
                  setQuantity(text);
                }
              }}
              placeholder={`Enter quantity (1-${selectedItem.defective})`}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
        )}

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
            onValueChange={setFaultType}
            style={styles.picker}
            dropdownIconColor="#000">
            <Picker.Item label="Select fault type" value="" />
            {faultTypes.map((fault, index) => (
              <Picker.Item key={index} label={fault} value={fault} />
            ))}
          </Picker>
        </View>

        {faultType === 'Other' && (
          <View style={styles.section}>
            <Text style={styles.label}>Fault Analysis Details*</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the fault..."
              value={faultAnalysis}
              onChangeText={setFaultAnalysis}
              multiline
              numberOfLines={4}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.label}>Repaired By*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter technician name"
            value={repairedBy}
            onChangeText={setRepairedBy}
          />
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
          <Text style={styles.buttonText}>
            {submitting ? 'Submitting...' : 'Submit Reject Data'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#2c3e50',
    paddingTop: 30,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#34495e',
  },
  picker: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#7f8c8d',
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
});

export default Reject;
