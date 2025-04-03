// import React, {useState} from 'react';
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
// import {API_URL} from '@env';

// const UpdateStockMaterial = ({ route }) => {
//   const { itemName,rawMaterialId,userId } = route.params;
//   const [stock, setStock] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!stock) {
//       Alert.alert('Error', 'Please fill all fields.');
//       return;
//     }

//     const stockValue = parseInt(stock);
//     if (isNaN(stockValue) || stockValue < 0) {
//       Alert.alert('Error', 'Stock must be a positive integer.');
//       return;
//     }

//     const itemData = {
//       itemName,
//       quantity: stock,
//       rawMaterialId,
//       userId

//     };

//     setLoading(true);
//     console.log({
//       items: [itemData],
//     });
//     try {
//       const response = await axios.post(`http://88.222.214.93:5050/admin/updateRawMaterials`, {
//         items: [itemData],

//       });
//       console.log('Response:', response.data);
//       Alert.alert('Success', 'Item added successfully!');

//       setStock('');
//     } catch (error) {
//       console.log('Error adding item:', error);
//       if (error.response && error.response.data) {
//         Alert.alert(
//           'Error',
//           error.response.data.message || 'An error occurred.',
//         );
//       } else {
//         Alert.alert('Error', 'An unexpected error occurred. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Stock:</Text>
//       <TextInput
//         style={styles.input}
//         value={stock}
//         onChangeText={setStock}
//         keyboardType="numeric"
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         {loading ? (
//           <ActivityIndicator color="#ffffff" />
//         ) : (
//           <Text style={styles.buttonText}>Update Quantity</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   label: {
//     marginVertical: 10,
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'black',
//     paddingTop: 40,
//   },
//   input: {
//     color: 'black',
//     borderWidth: 1,
//     borderColor: '#070604',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#070604',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 16,
//   },
// });

// export default UpdateStockMaterial;


import React, {useState} from 'react';
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

const UpdateStockMaterial = ({ route }) => {
  const { itemName, rawMaterialId, userId, currentStock } = route.params;
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async () => {
  //   if (!quantity) {
  //     Alert.alert('Error', 'Please enter a quantity');
  //     return;
  //   }

  //   const quantityValue = parseInt(quantity);
  //   if (isNaN(quantityValue)) {
  //     Alert.alert('Error', 'Quantity must be a number');
  //     return;
  //   }

  //   if (quantityValue <= 0) {
  //     Alert.alert('Error', 'Quantity must be greater than 0');
  //     return;
  //   }

  //   const itemData = {
  //     rawMaterialId,
  //     userId,
  //     quantity: quantityValue,
  //     type: "IN" 
  //   };

  //   console.log("before response", itemData)

  //   setLoading(true);

  //   try {
  //     const response = await axios.post('http://88.222.214.93:5050/admin/updateRawMaterialStock', {
  //       items: [itemData]
  //     });

  //     console.log('Response:', response.data);
  //     Alert.alert('Success', 'Stock added successfully!');
  //     setQuantity('');
  //   } catch (error) {
  //     console.log('Error updating stock:', error);
  //     if (error.response) {
  //       Alert.alert(
  //         'Error',
  //         error.response.data.message || 'Failed to update stock'
  //       );
  //     } else {
  //       Alert.alert('Error', 'Network error. Please try again.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    if (!quantity) {
      Alert.alert('Error', 'Please enter a quantity');
      return;
    }
  
    const quantityValue = parseInt(quantity);
    if (isNaN(quantityValue)) {
      Alert.alert('Error', 'Quantity must be a number');
      return;
    }
  
    if (quantityValue <= 0) {
      Alert.alert('Error', 'Quantity must be greater than 0');
      return;
    }
  
    const itemData = {
      rawMaterialId,
      userId,
      quantity: quantityValue,
      type: "IN"
    };
  
    setLoading(true);
  
    try {
      const response = await axios.post(
        'http://88.222.214.93:5050/admin/updateRawMaterialStock',
        itemData, // Send the object directly, not wrapped in an array
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Response:', response.data);
      Alert.alert('Success', 'Stock added successfully!');
      setQuantity('');
    } catch (error) {
      console.log('Error updating stock:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
        Alert.alert(
          'Error',
          error.response.data.message || 'Failed to update stock'
        );
      } else {
        Alert.alert('Error', 'Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Stock: {itemName}</Text>
      
      <Text style={styles.label}>Current Stock: {currentStock}</Text>

      <Text style={styles.label}>Quantity to Add:</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        placeholder="Enter quantity to add"
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Add to Stock</Text>
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
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    paddingTop: 50
  },
  label: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2c3e50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateStockMaterial;