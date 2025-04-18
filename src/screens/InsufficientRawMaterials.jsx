import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const InsufficientRawMaterials = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [insufficientMaterials, setInsufficientMaterials] = useState([]);
  const [error, setError] = useState(null);
  const { itemId } = route.params;


  useEffect(() => {
    const fetchInsufficientMaterials = async () => {
      try {
        const response = await axios.get(
          `http://88.222.214.93:5050/admin/getInsufficientRawMaterials?itemId=${itemId}`,
        );
        setItem(response.data.item);
        setInsufficientMaterials(response.data.insufficientMaterials);
      } catch (err) {
        console.log(err);
        Alert.alert('Error', err.response?.data?.message || err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInsufficientMaterials();
  }, []);

  const renderMaterial = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.rawMaterialName}</Text>
      <Text style={styles.text}>Available Stock: {item.availableStock}</Text>
      <Text style={styles.text}>
        Required Quantity: {item.requiredQuantity}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Insufficient Raw Materials</Text>
      {item && <Text style={styles.subHeader}>For Item: {item.itemName}</Text>}
      <FlatList
        data={insufficientMaterials}
        keyExtractor={item => item.rawMaterialId}
        renderItem={renderMaterial}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
  },
  text: {
    fontSize: 14,
    color: '#444',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default InsufficientRawMaterials;
