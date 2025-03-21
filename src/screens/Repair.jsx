// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   TextInput,
// } from 'react-native';
// import axios from 'axios';
// import {Picker} from '@react-native-picker/picker';

// const Repair = () => {
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [subItems, setSubItems] = useState([]);
//   const [selectedSubItem, setSelectedSubItem] = useState(null);
//   const [quantity, setQuantity] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [selectedValue, setSelectedValue] = useState('');
//   const [remark, setRemark] = useState('');

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         'https://jsonplaceholder.typicode.com/users',
//       );
//       setItems(response.data);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch items.');
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleItemSelect = async itemId => {
//     setSelectedItem(itemId);
//     setSelectedSubItem(null);
//     setQuantity('');
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/users/${itemId}/posts`,
//       );
//       setSubItems(response.data);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch sub-items.');
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Reject</Text>
//       <Text style={styles.label}>Select Item Type:</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <Picker
//           selectedValue={selectedItem}
//           onValueChange={itemValue => handleItemSelect(itemValue)}
//           style={styles.picker}>
//           <Picker.Item label="-- Select Item --" value={null} />
//           {items.map(item => (
//             <Picker.Item key={item.id} label={item.name} value={item.id} />
//           ))}
//         </Picker>
//       )}

//       {selectedItem && (
//         <>
//           <Text style={styles.label}>Select Sub-Item:</Text>
//           {loading ? (
//             <ActivityIndicator size="large" color="#0000ff" />
//           ) : (
//             <Picker
//               selectedValue={selectedSubItem}
//               onValueChange={itemValue => setSelectedSubItem(itemValue)}
//               style={styles.picker}>
//               <Picker.Item label="-- Select Sub-Item --" value={null} />
//               {subItems.map(subItem => (
//                 <Picker.Item
//                   key={subItem.id}
//                   label={subItem.title}
//                   value={subItem.id}
//                 />
//               ))}
//             </Picker>
//           )}
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
//           <Text style={styles.label}>Remarks:</Text>
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             placeholder="Enter remarks..."
//             value={remark}
//             onChangeText={setRemark}
//             multiline
//           />
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f4f8',
//     padding: 50,
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   picker: {
//     height: 50,
//     backgroundColor: '#fff',
//     marginBottom: 20,
//     borderRadius: 8,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     color: '#333',
//   },

//   textArea: {
//     minHeight: 80,
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
//     color: '#070604',
//   },
// });

// export default Repair;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import axios from 'axios';
// import {Picker} from '@react-native-picker/picker';

// const Repair = () => {
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [subItems, setSubItems] = useState([]);
//   const [selectedSubItem, setSelectedSubItem] = useState(null);
//   const [relatedData, setRelatedData] = useState([]);
//   const [selectedRelated, setSelectedRelated] = useState(null);
//   const [quantity, setQuantity] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [selectedValue, setSelectedValue] = useState('');
//   const [remark, setRemark] = useState('');

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         'https://jsonplaceholder.typicode.com/users',
//       );
//       setItems(response.data);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch items.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleItemSelect = async itemId => {
//     setSelectedItem(itemId);
//     setSelectedSubItem(null);
//     setRelatedData([]);
//     setSelectedRelated(null);
//     setQuantity('');
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/users/${itemId}/posts`,
//       );
//       setSubItems(response.data);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch sub-items.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubItemSelect = async subItemId => {
//     setSelectedSubItem(subItemId);
//     setRelatedData([]);
//     setSelectedRelated(null);
//     setQuantity('');
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/posts/${subItemId}/comments`,
//       );
//       setRelatedData(response.data);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch related data.');
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleSubmit = async () => {
//     if ((!selectedValue === "other" && !remark) || !selectedValue) {
//       Alert.alert('Error', 'Please fill all the fields.');
//       return;
//     }

//     const newItem = {
     
//       remark: selectedValue === 'other' ? remark : selectedValue,
//       createdAt: new Date(),
//     };

//     console.log("new Item", newItem);

//     try {
//       setLoading(true);
//       const response = await axios.post(`http//88.222.214.93/warehouse-admin/reject-item`, newItem);
//       console.log("my response data for reject element",response.data.data);

//       Alert.alert('Success', 'Item repaired data has been submitted.');
      
//     } catch (error) {
//       console.log('Error submitting data:', error?.response?.data || error?.message);
//        Alert.alert('Error',error.response?.data?.message || 'Something went wrong while submitting.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Reject</Text>
//       <Text style={styles.label}>Select Item Type:</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <Picker
//           selectedValue={selectedItem}
//           onValueChange={handleItemSelect}
//           style={styles.picker}>
//           <Picker.Item label="-- Select Item --" value={null} />
//           {items.map(item => (
//             <Picker.Item key={item.id} label={item.name} value={item.id} />
//           ))}
//         </Picker>
//       )}

//       {selectedItem && (
//         <>
//           <Text style={styles.label}>Select Sub-Item:</Text>
//           <Picker
//             selectedValue={selectedSubItem}
//             onValueChange={handleSubItemSelect}
//             style={styles.picker}>
//             <Picker.Item label="-- Select Sub-Item --" value={null} />
//             {subItems.map(subItem => (
//               <Picker.Item
//                 key={subItem.id}
//                 label={subItem.title}
//                 value={subItem.id}
//               />
//             ))}
//           </Picker>
//         </>
//       )}

//       {selectedSubItem && relatedData.length > 0 && (
//         <>
//           <Text style={styles.label}>Select Related Data:</Text>
//           <Picker
//             selectedValue={selectedRelated}
//             onValueChange={setSelectedRelated}
//             style={styles.picker}>
//             <Picker.Item label="-- Select Related Data --" value={null} />
//             {relatedData.map(data => (
//               <Picker.Item
//                 key={data.id}
//                 label={data.name || data.email}
//                 value={data.id}
//               />
//             ))}
//           </Picker>
//         </>
//       )}

//       {selectedRelated && (
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
//           <Text style={styles.label}>Remarks:</Text>
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             placeholder="Enter remarks..."
//             value={remark}
//             onChangeText={setRemark}
//             multiline
//           />
//         </>
//       )}

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

//     textArea: {
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



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Repair = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedRelated, setSelectedRelated] = useState(null);
  const [remark, setRemark] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setLoading] = useState(false);

  const itemOptions = ['Motor', 'Controller', 'Pump', 'Monoblock'];

  const subItemOptions = {
    Motor: ['Motor 7.5HP AC', 'Motor 3HP AC', 'Motor 5HP AC', 'Motor 10HP AC'],
    Pump: ['Pump 7.5HP AC', 'Pump 3HP AC', 'Pump 5HP AC', 'Pump 10HP AC'],
    Controller: [],
    Monoblock: [],
  };

  const relatedOptions = {
    'Motor 7.5HP AC': ['Bottom Casing', 'Diaphragm', 'Upper Housing', 'Oil Seal', 'TB Housing', 'Motor Body', 'Stamping', 'Thrust Bearing', 'Carbon Metal Bush'],
    'Pump 7.5HP AC': ['Impeller', 'Shaft', 'Casing', 'Mechanical Seal'],
  };

  const handleItemSelect = item => {
    setSelectedItem(item);
    setSelectedSubItem(null);
    setSelectedRelated(null);
  };

  const handleSubItemSelect = subItem => {
    setSelectedSubItem(subItem);
    setSelectedRelated(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reject</Text>

      <Text style={styles.label}>Select Item Type:</Text>
      <Picker selectedValue={selectedItem} onValueChange={handleItemSelect} style={styles.picker}>
        <Picker.Item label="-- Select Item --" value={null} />
        {itemOptions.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>

      {selectedItem && subItemOptions[selectedItem].length > 0 && (
        <>
          <Text style={styles.label}>Select Sub-Item:</Text>
          <Picker selectedValue={selectedSubItem} onValueChange={handleSubItemSelect} style={styles.picker}>
            <Picker.Item label="-- Select Sub-Item --" value={null} />
            {subItemOptions[selectedItem].map((subItem, index) => (
              <Picker.Item key={index} label={subItem} value={subItem} />
            ))}
          </Picker>
        </>
      )}

      {selectedSubItem && relatedOptions[selectedSubItem]?.length > 0 && (
        <>
          <Text style={styles.label}>Select Related Data:</Text>
          <Picker selectedValue={selectedRelated} onValueChange={setSelectedRelated} style={styles.picker}>
            <Picker.Item label="-- Select Related Data --" value={null} />
            {relatedOptions[selectedSubItem].map((related, index) => (
              <Picker.Item key={index} label={related} value={related} />
            ))}
          </Picker>
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
        <Picker.Item label="Thrust Plate Damage" value="Thrust Plate Damage" />
        <Picker.Item
          label="Shaft and Rotor Damaged"
          value="Shaft and Rotor Damaged"
        />
        <Picker.Item
          label="Bearing plate damaged"
          value="Bearing plate damaged"
        />
        <Picker.Item label="Oil Seal Damaged" value="Oil Seal Damaged" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      {selectedValue === 'other' && (
        <>
          <Text style={styles.label}>Remarks:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter remarks..."
            value={remark}
            onChangeText={setRemark}
            multiline
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Submitted')} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f4f4f8', padding: 20 },
//   heading: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
//   label: { fontSize: 16, marginBottom: 10, fontWeight: 'bold' },
//   picker: { height: 50, backgroundColor: '#fff', marginBottom: 20, borderRadius: 8, borderWidth: 1, paddingHorizontal: 10 },
//   button: { backgroundColor: '#070604', padding: 12, borderRadius: 8, alignItems: 'center' },
//   buttonText: { color: '#fbd33b', fontSize: 16, fontWeight: '600' },

//       textArea: {
//     minHeight: 80,
//   },
// });

  container: {flex: 1, backgroundColor: '#f4f4f8', padding: 50},
  label: {fontSize: 18, marginBottom: 10, fontWeight: 'bold', color: '#333'},
  picker: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#070604',
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

    textArea: {
    minHeight: 80,
  },

  button: {
    backgroundColor: '#070604',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fbd33b',
    fontSize: 16,
    fontWeight: '600',
  },
});


export default Repair;
     