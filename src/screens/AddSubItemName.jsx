import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const AddSubItemName = () => {
  const [rawMaterialName, setRawMaterialName] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://88.222.214.93:5050/admin/showRawMaterials');
        setRawMaterials(response.data.data);
      } catch (error) {
        console.log('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch raw materials');
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

    if (!selectedItem) {
      Alert.alert('Error', 'Please select a raw material.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://88.222.214.93:5050/admin/addRawMaterial',
        {
          rawMaterialName: rawMaterialName.trim(),
          type: selectedItem, // or selectedItem.name if you need the name
        },
      );

      Alert.alert('Success', 'Item added successfully!');
      setRawMaterialName('');
      setSelectedItem(null);
      
      // Refresh the data after adding new item
      const refreshResponse = await axios.get('http://88.222.214.93:5050/admin/showRawMaterials');
      setRawMaterials(refreshResponse.data.data);
    } catch (error) {
      console.log('Error adding item:', error);
      const errorMessage =
        error.response?.data?.message ||
        'An unexpected error occurred. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [rawMaterialName, selectedItem]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Item Name*:</Text>
      <TextInput
        style={styles.input}
        value={rawMaterialName}
        onChangeText={setRawMaterialName}
        placeholder="Enter new item name"
        placeholderTextColor="#999"
        autoCapitalize="characters"
      />
      
      <Text style={styles.label}>Select Raw Material*:</Text>
      <View style={styles.pickerContainer}>
        {fetching ? (
          <ActivityIndicator style={styles.picker} />
        ) : (
          <Picker
            selectedValue={selectedItem}
            onValueChange={(itemValue) => setSelectedItem(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Select a raw material..." value={null} />
            {rawMaterials.map((material) => (
              <Picker.Item 
                key={material.id} 
                label={`${material.name} (Stock: ${material.stock})`} 
                value={material.id} 
              />
            ))}
          </Picker>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          (loading || !rawMaterialName.trim() || !selectedItem) &&
            styles.disabledButton,
        ]}
        onPress={handleSubmit}
        disabled={loading || !rawMaterialName.trim() || !selectedItem}>
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
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddSubItemName;












// import React, {useState, useCallback, useEffect} from 'react';
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   Text,
//   Alert,
//   ActivityIndicator,
//   TouchableOpacity,
// } from 'react-native';
// import axios from 'axios';
// import {Picker} from '@react-native-picker/picker';

// const AddSubItemName = () => {
//   const [rawMaterialName, setRawMaterialName] = useState('');
//   const [selectedItemType, setSelectedItemType] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [fetching, setFetching] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://88.222.214.93:5050/admin/showRawMaterials');
//         setData(response.data.data);
//       } catch (error) {
//         console.log('Error fetching data:', error);
//         Alert.alert('Error', 'Failed to fetch raw materials');
//       } finally {
//         setFetching(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSubmit = useCallback(async () => {
//     if (!rawMaterialName.trim()) {
//       Alert.alert('Error', 'rawMaterialName cannot be empty or just spaces.');
//       return;
//     }

//     if (!selectedItemType) {
//       Alert.alert('Error', 'Please select an item type.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://88.222.214.93:5050/admin/addRawMaterial',
//         {
//           rawMaterialName: rawMaterialName.trim(),
//           type: selectedItemType,
//         },
//       );

//       Alert.alert('Success', 'Item added successfully!');
//       setRawMaterialName('');
//       setSelectedItemType(null);
      
//       // Refresh the data after adding new item
//       const refreshResponse = await axios.get('http://88.222.214.93:5050/admin/showRawMaterials');
//       setData(refreshResponse.data.data);
//     } catch (error) {
//       console.log('Error adding item:', error);
//       const errorMessage =
//         error.response?.data?.message ||
//         'An unexpected error occurred. Please try again.';
//       Alert.alert('Error', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   }, [rawMaterialName, selectedItemType]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Select Raw Material*:</Text>
//       <View style={styles.pickerContainer}>
//         {fetching ? (
//           <ActivityIndicator style={styles.picker} />
//         ) : (
//           <Picker
//             selectedValue={selectedItemType}
//             onValueChange={(itemValue) => setSelectedItemType(itemValue)}
//             style={styles.picker}>
//             <Picker.Item label="Select an item..." value={null} />
//             {data.map((item) => (
//               <Picker.Item 
//                 key={item._id} 
//                 label={item.rawMaterialName} 
//                 value={item.rawMaterialName} 
//               />
//             ))}
//           </Picker>
//         )}
//       </View>
      
//       <Text style={styles.label}>Item Name*:</Text>
//       <TextInput
//         style={styles.input}
//         value={rawMaterialName}
//         onChangeText={setRawMaterialName}
//         placeholder="Enter item name"
//         placeholderTextColor="#999"
//         autoCapitalize="characters"
//       />
//       <TouchableOpacity
//         style={[
//           styles.button,
//           (loading || !rawMaterialName.trim() || !selectedItemType) &&
//             styles.disabledButton,
//         ]}
//         onPress={handleSubmit}
//         disabled={loading || !rawMaterialName.trim() || !selectedItemType}>
//         {loading ? (
//           <ActivityIndicator color="#ffffff" />
//         ) : (
//           <Text style={styles.buttonText}>Add Item</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//     justifyContent: 'center',
//   },
//   section: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//     overflow: 'hidden',
//     marginBottom: 15,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     color: 'black',
//   },
//   input: {
//     color: 'black',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     backgroundColor: '#fff',
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: '#070604',
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   disabledButton: {
//     backgroundColor: '#cccccc',
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default AddSubItemName;