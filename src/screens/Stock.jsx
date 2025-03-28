import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  Dimensions, 
  SafeAreaView,
  TouchableOpacity 
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Stock = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://88.222.214.93:5050/admin/showRawMaterials');
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleItemPress = (item) => {
    navigation.navigate('UpdateStockMaterial', { 
      itemId: item.id,
      itemName: item.name,
      currentStock: item.stock
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2c3e50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Raw Material Stock Data</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.stock}>Stock: {item.stock} {item.unit || ''}</Text>
                {item.threshold && (
                  <Text style={styles.threshold}>Threshold: {item.threshold}</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No stock data available</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingHorizontal: windowWidth * 0.05,
    paddingTop: windowHeight * 0.02,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: windowHeight * 0.02,
    textTransform: 'uppercase',
  },
  listContent: {
    paddingBottom: windowHeight * 0.02,
  },
  card: {
    backgroundColor: '#fff',
    padding: windowWidth * 0.04,
    marginVertical: windowHeight * 0.01,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: windowWidth * 0.045,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  stock: {
    fontSize: windowWidth * 0.038,
    color: '#3498db',
  },
  threshold: {
    fontSize: windowWidth * 0.038,
    color: '#e74c3c',
    marginTop: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.3,
  },
  emptyText: {
    fontSize: windowWidth * 0.045,
    color: '#7f8c8d',
  },
});

export default Stock;