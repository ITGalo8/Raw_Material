import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AllDefectiveData = ({ navigation }) => {
  const route = useRoute();
  const { itemType } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://88.222.214.93:5050/admin/showDefectiveItemsList?itemName=${itemType}`
        );
        setData(response.data.data);
      } catch (err) {
        setError(err.message);
        console.log('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemType]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.itemName}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{item.defective}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#189ab4" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'#189ab4'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{itemType} Defective Items</Text>
      </View>

      <View style={styles.content}>
        {data.length === 0 ? (
          <Text style={styles.noDataText}>No defective items found for {itemType}</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#189ab4',
    padding: 16,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  quantityContainer: {
    backgroundColor: '#E1341E',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});

export default AllDefectiveData;