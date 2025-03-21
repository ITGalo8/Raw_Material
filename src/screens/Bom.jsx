// import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
// import React from 'react';

// const { width } = Dimensions.get('window');

// const Bom = () => {
//   const items = [
//     { name: 'Motor', color: '#FFA07A' },
//     { name: 'Pump', color: '#98FB98' },
//     { name: 'Controller', color: '#87CEEB' },
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>BOM (Bill of material)</Text>
//       {items.map((item, index) => (
//         <TouchableOpacity key={index} style={[styles.card, { backgroundColor: item.color }]}>
//           <Text style={styles.cardText}>{item.name}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f4f4',
//     marginLeft: 40,
//     paddingTop: 50
//   },
//   card: {
//     width: width * 0.8,
//     marginVertical: 20,
//     paddingVertical: 30,
//     borderRadius: 10,
//     elevation: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//     color: '#070604',
//   },
//   cardText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });

// export default Bom;



import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Bom = () => {
  const navigation = useNavigation();

  const items = [
    { name: 'Motor', color: '#FFA07A' },
    { name: 'Pump', color: '#98FB98' },
    { name: 'Controller', color: '#87CEEB' },
  ];

  const handleBack = () => {
    navigation.goBack(); // Navigates back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BOM (Bill of Material)</Text>
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={[styles.card, { backgroundColor: item.color }]}>
          <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    marginLeft: 40,
    paddingTop: 50,
  },
  card: {
    width: width * 0.8,
    marginVertical: 20,
    paddingVertical: 30,
    borderRadius: 10,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#070604',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: width * 0.6,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Bom;
