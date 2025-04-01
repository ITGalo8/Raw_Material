// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import axios from 'axios';

// const Repair = () => {
//   const items = [
//     {label: 'Motor', value: 'Motor'},
//     {label: 'Pump', value: 'Pump'},
//     {label: 'Controller', value: 'Controller'},
//   ];

//   const [selectedItem, setSelectedItem] = useState(null);
//   const [quantity, setQuantity] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [selectedValue, setSelectedValue] = useState('');
//   const [remark, setRemark] = useState('');
//   const [faultAnalysis, setFaultAnalysis] = useState('');
//   const [repairedBy, setRepairedBy] = useState('');
//   const [serialNumber, setSerialNumber] = useState('');

//   const handleSubmit = async () => {
//     if ((!selectedValue === 'other' && !faultAnalysis) || !selectedValue) {
//       Alert.alert('Error', 'Please fill all the fields.');
//       return;
//     }

//     const newItem = {
//       faultAnalysis: selectedValue === 'other' ? faultAnalysis : selectedValue,
//       createdAt: new Date(),
//     };

//     console.log('new Item', newItem);

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         'http://88.222.214.93/warehouse-admin/reject-item',
//         newItem,
//       );
//       console.log('Response:', response.data.data);
//       Alert.alert('Success', 'Item repaired data has been submitted.');
//     } catch (error) {
//       console.log('Error:', error?.response?.data || error?.message);
//       Alert.alert(
//         'Error',
//         error.response?.data?.message ||
//           'Something went wrong while submitting.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Repair Data</Text>
//       <Text style={styles.label}>Select Item Type:</Text>
//       <Picker
//         selectedValue={selectedItem}
//         onValueChange={setSelectedItem}
//         style={styles.picker}>
//         <Picker.Item label="-- Select Item --" value={null} />
//         {items.map((item, index) => (
//           <Picker.Item key={index} label={item.label} value={item.value} />
//         ))}
//       </Picker>

//       {selectedItem && (
//         <>
//           <Text style={styles.label}>Enter Quantity:</Text>
//           <TextInput
//             style={styles.input}
//             value={quantity}
//             onChangeText={setQuantity}
//             placeholder="Enter quantity"
//             keyboardType="numeric"
//           />
//         </>
//       )}

//       <Text style={styles.label}>Fault Analysis:</Text>
//       <Picker
//         selectedValue={selectedValue}
//         onValueChange={setSelectedValue}
//         style={styles.input}>
//         <Picker.Item
//           label="Controller IGBT Issue"
//           value="Controller IGBT Issue"
//         />
//         <Picker.Item
//           label="Controller Display Issue"
//           value="Controller Display Issue"
//         />
//         <Picker.Item label="Winding Problem" value="Winding Problem" />
//         <Picker.Item label="Bush Problem" value="Bush Problem" />
//         <Picker.Item label="Stamping Damaged" value="Stamping Damaged" />
//         <Picker.Item label="Thrust Plate Damage" value="Thrust Plate Damage" />
//         <Picker.Item
//           label="Shaft and Rotor Damaged"
//           value="Shaft and Rotor Damaged"
//         />
//         <Picker.Item
//           label="Bearing plate damaged"
//           value="Bearing plate damaged"
//         />
//         <Picker.Item label="Oil Seal Damaged" value="Oil Seal Damaged" />
//         <Picker.Item label="Other" value="other" />
//       </Picker>

//       {selectedValue === 'other' && (
//         <>
//           <Text style={styles.label}>fault Analysis:</Text>
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             placeholder="Enter remarks..."
//             value={faultAnalysis}
//             onChangeText={setFaultAnalysis}
//             multiline
//           />
//         </>
//       )}

//       <Text style={styles.label}>Serial Number:</Text>
//       <TextInput
//         style={styles.input}
//         value={serialNumber}
//         onChangeText={setSerialNumber}
//         placeholder="Enter Serial Number"
//       />

//       <Text style={styles.label}>Remarks:</Text>
//       <TextInput
//         style={[styles.input, styles.textArea]}
//         placeholder="Enter remarks..."
//         value={remark}
//         onChangeText={setRemark}
//         multiline
//       />

//       <Text style={styles.label}>Repaired By:</Text>
//       <TextInput
//         style={[styles.input, styles.textArea]}
//         placeholder="Enter Repaired By"
//         value={repairedBy}
//         onChangeText={setRepairedBy}
//         multiline
//       />

//       <TouchableOpacity
//         style={styles.button}
//         onPress={handleSubmit}
//         disabled={loading}>
//         <Text style={styles.buttonText}>
//           {loading ? 'Submitting...' : 'Submit'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#f4f4f8', padding: 50},
//   label: {fontSize: 18, marginBottom: 10, fontWeight: 'bold', color: '#333'},
//   picker: {
//     height: 50,
//     backgroundColor: '#fff',
//     marginBottom: 20,
//     borderRadius: 8,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//     color: '#070604',
//   },
//   input: {
//     backgroundColor: '#f9f9f9',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 14,
//   },
//   textArea: {
//     minHeight: 80,
//   },
//   button: {
//     backgroundColor: '#070604',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fbd33b',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default Repair;

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
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const Repair = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [remark, setRemark] = useState('');
  const [faultAnalysis, setFaultAnalysis] = useState('');
  const [repairedBy, setRepairedBy] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [itemData, setItemData] = useState([]);
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
    }
  }, [selectedItem]);

  const fetchData = async itemName => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://88.222.214.93:5050/admin/getItemsByName?searchQuery=${itemName}`,
      );
      setItemData(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (
      !selectedItem ||
      !selectedValue ||
      (selectedValue === 'other' && !faultAnalysis)
    ) {
      Alert.alert('Error', 'Please fill all the required fields.');
      return;
    }

    const newItem = {
      itemType: selectedItem,
      quantity,
      serialNumber,
      repairedBy,
      remark,
      faultAnalysis: selectedValue === 'other' ? faultAnalysis : selectedValue,
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      const response = await axios.post(
        'http://88.222.214.93/warehouse-admin/reject-item',
        newItem,
      );
      Alert.alert('Success', 'Item repair data has been submitted.');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.heading}>Repair Data</Text>

        <Text style={styles.label}>Select Item Type:</Text>
        <Picker
          selectedValue={selectedItem}
          onValueChange={setSelectedItem}
          style={styles.picker}>
          <Picker.Item label="-- Select Item --" value={null} />
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {selectedItem && (
          <>
            <Text style={styles.label}>Enter Quantity:</Text>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
              placeholder="Enter quantity"
              keyboardType="numeric"
            />
          </>
        )}

        <Text style={styles.label}>Fault Analysis:</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={setSelectedValue}
          style={styles.input}>
          <Picker.Item
            label="Controller IGBT Issue"
            value="Controller IGBT Issue"
          />
          <Picker.Item
            label="Controller Display Issue"
            value="Controller Display Issue"
          />
          <Picker.Item label="Winding Problem" value="Winding Problem" />
          <Picker.Item label="Bush Problem" value="Bush Problem" />
          <Picker.Item label="Stamping Damaged" value="Stamping Damaged" />
          <Picker.Item
            label="Thrust Plate Damage"
            value="Thrust Plate Damage"
          />
          <Picker.Item
            label="Shaft and Rotor Damaged"
            value="Shaft and Rotor Damaged"
          />
          <Picker.Item
            label="Bearing Plate Damaged"
            value="Bearing Plate Damaged"
          />
          <Picker.Item label="Oil Seal Damaged" value="Oil Seal Damaged" />
          <Picker.Item label="Other" value="other" />
        </Picker>

        {selectedValue === 'other' && (
          <>
            <Text style={styles.label}>Fault Analysis Details:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter fault details..."
              value={faultAnalysis}
              onChangeText={setFaultAnalysis}
              multiline
            />
          </>
        )}

        <Text style={styles.label}>Serial Number:</Text>
        <TextInput
          style={styles.input}
          value={serialNumber}
          onChangeText={setSerialNumber}
          placeholder="Enter Serial Number"
        />

        <Text style={styles.label}>Remarks:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter remarks..."
          value={remark}
          onChangeText={setRemark}
          multiline
        />

        <Text style={styles.label}>Repaired By:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name of the repair person"
          value={repairedBy}
          onChangeText={setRepairedBy}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Submitting...' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f4f4f8', padding: 20},
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    marginTop: 30,
  },
  label: {fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#333'},
  picker: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  textArea: {minHeight: 80},
  button: {
    backgroundColor: '#070604',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  clearButton: {backgroundColor: '#d9534f'},
  buttonText: {color: '#fbd33b', fontSize: 16, fontWeight: '600'},
  errorText: {color: 'red', fontSize: 14, marginBottom: 10},
});

export default Repair;
