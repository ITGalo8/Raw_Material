import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ProductCount = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://88.222.214.93:5050/admin/getItemsProducibleCount',
        );
        setData(response.data.results);
      } catch (err) {
        Alert.alert('Error', JSON.stringify(err.response.data?.message));
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.itemUnits}>
          Max producible: {item.maxProducibleUnits}
        </Text>
      </View>
      {
        (item?.maxProducibleUnits)? 
        <View style={styles.available} />
        : <View style={styles.unavailable} />
        
      }
      {/* <Text
        style={[
          styles.itemStatus,
          item.maxProducibleUnits > 0 ? styles.available : styles.unavailable,
        ]}>
        {item.maxProducibleUnits > 0 ? 'Available' : 'Out of Stock'}
      </Text> */}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
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
      <Text style={styles.header}>Product Availability</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.itemId}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    paddingTop: 50,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemUnits: {
    fontSize: 14,
    color: '#666',
  },
  itemStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 10,
  },
  available: {
    backgroundColor: 'green',
    // color: '#155724',
    height: '25',
    width: '25',
    borderRadius: '100%'
  },
  unavailable: {
    backgroundColor: 'red',
    // color: '#155724',
    height: '25',
    width: '25',
    borderRadius: '100%'
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

export default ProductCount;
