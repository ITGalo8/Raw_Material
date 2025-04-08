import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  Dimensions, 
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  TextInput
} from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { debounce } from 'lodash';

const Stock = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      setError(null);
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
      
      const response = await axios.get('http://88.222.214.93:5000/admin/showRawMaterials', {
        headers: {
          'Authorization': `Bearer ${await AsyncStorage.getItem('authToken')}`
        }
      });
      
      if (response.data && response.data.data) {
        const sortedData = response.data.data.sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        setData(sortedData);
        setFilteredData(sortedData);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
      setError(error.response?.data?.message || error.message || 'Failed to fetch data');
      
      if (error.response?.status === 401) {
        await AsyncStorage.multiRemove(['authToken', 'userId']);
        navigation.replace('LoginScreen');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleSearch = debounce((query) => {
    if (query) {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, 300);

  const handleItemPress = (item) => {
    if (!userId) {
      Alert.alert('Error', 'User ID not found. Please login again.');
      return;
    }
    
    navigation.navigate('UpdateStockMaterial', { 
      rawMaterialId: item.id,
      itemName: item.name,
      currentStock: item.stock,
      userId: userId,
      unit: item.unit,
      threshold: item.threshold
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={[
        styles.card,
        item.stock <= (item.threshold || 0) ? styles.lowStockCard : null
      ]}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.stockInfo}>
            <Text style={styles.stock}>{item.stock} {item.unit || ''}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#7f8c8d" />
          </View>
        </View>
        {item.threshold !== null && item.threshold !== undefined && (
          <View style={styles.thresholdContainer}>
            <Text style={styles.thresholdLabel}>Threshold:</Text>
            <Text style={[
              styles.thresholdValue,
              item.stock <= item.threshold ? styles.thresholdWarning : null
            ]}>
              {item.threshold}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2c3e50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Raw Material Inventory</Text>
        
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#7f8c8d" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search materials..."
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearch(text);
            }}
            placeholderTextColor="#95a5a6"
          />
          {searchQuery ? (
            <TouchableOpacity 
              style={styles.clearSearchButton}
              onPress={() => {
                setSearchQuery('');
                setFilteredData(data);
              }}
            >
              <MaterialIcons name="close" size={20} color="#e74c3c" />
            </TouchableOpacity>
          ) : null}
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <MaterialIcons name="error-outline" size={40} color="#e74c3c" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={fetchData}
            >
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#2c3e50']}
                tintColor="#2c3e50"
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialIcons name="inventory" size={50} color="#95a5a6" />
                <Text style={styles.emptyText}>No materials found</Text>
                {searchQuery ? (
                  <TouchableOpacity 
                    style={styles.clearSearchButton}
                    onPress={() => {
                      setSearchQuery('');
                      setFilteredData(data);
                    }}
                  >
                    <Text style={styles.clearSearchText}>Clear search</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            }
          />
        )}
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
    paddingHorizontal: windowWidth * 0.04,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: windowWidth * 0.065,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: windowHeight * 0.02,
    // marginTop: windowHeight * 0.03,
    marginLeft: windowWidth * 0.02,
    marginTop: 70,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: windowWidth * 0.04,
    color: '#2c3e50',
  },
  clearSearchButton: {
    padding: 5,
  },
  clearSearchText: {
    color: '#3498db',
    fontSize: windowWidth * 0.035,
  },
  listContent: {
    paddingBottom: windowHeight * 0.05,
  },
  card: {
    backgroundColor: '#fff',
    padding: windowWidth * 0.04,
    marginVertical: windowHeight * 0.008,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lowStockCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#e74c3c',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: windowWidth * 0.045,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stock: {
    fontSize: windowWidth * 0.038,
    color: '#3498db',
    marginRight: 5,
  },
  thresholdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  thresholdLabel: {
    fontSize: windowWidth * 0.035,
    color: '#7f8c8d',
    marginRight: 5,
  },
  thresholdValue: {
    fontSize: windowWidth * 0.035,
    color: '#27ae60',
    fontWeight: '500',
  },
  thresholdWarning: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.2,
    padding: 20,
  },
  emptyText: {
    fontSize: windowWidth * 0.045,
    color: '#95a5a6',
    marginTop: 15,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: windowWidth * 0.04,
    color: '#e74c3c',
    textAlign: 'center',
    marginVertical: 20,
  },
  retryButton: {
    backgroundColor: '#2c3e50',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  retryText: {
    color: '#fff',
    fontSize: windowWidth * 0.04,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default Stock;