import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from 'react-native';
import axios from 'axios';

const RepairHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://88.222.214.93:5050/admin/getRepairedServiceRecords`,
      );
      console.log('API Response:', response.data.data);
      setOrders(response.data.data || []);
      setFilteredOrders(response.data.data || []);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Unable to fetch orders');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        order =>
          order.item?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.serialNumber
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.repairedRejectedBy
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
      setFilteredOrders(filtered);
    }
  }, [searchQuery, orders]);

  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return isNaN(date)
        ? 'Invalid Date'
        : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    } catch (e) {
      return 'N/A';
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const renderOrderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.infoText}>
        <Text style={styles.titleText}>Item Name: </Text>
        <Text style={styles.dataText}>{item.item || 'N/A'}</Text>
      </Text>

      {item.subItem && (
        <Text style={styles.infoText}>
          <Text style={styles.titleText}>Sub Item: </Text>
          <Text style={styles.dataText}>{item.subItem}</Text>
        </Text>
      )}

      <Text style={styles.infoText}>
        <Text style={styles.titleText}>Quantity: </Text>
        <Text style={styles.dataText}>{item.quantity || 'N/A'}</Text>
      </Text>

      <Text style={styles.infoText}>
        <Text style={styles.titleText}>Serial Number: </Text>
        <Text style={styles.dataText}>{item.serialNumber || 'N/A'}</Text>
      </Text>

      {item.faultAnalysis && (
        <Text style={styles.infoText}>
          <Text style={styles.titleText}>Fault Analysis: </Text>
          <Text style={styles.dataText}>{item.faultAnalysis}</Text>
        </Text>
      )}

      {item.repairedRejectedBy && (
        <Text style={styles.infoText}>
          <Text style={styles.titleText}>Repaired By: </Text>
          <Text style={styles.dataText}>{item.repairedRejectedBy}</Text>
        </Text>
      )}

      {item.remarks && (
        <Text style={styles.infoText}>
          <Text style={styles.titleText}>Remarks: </Text>
          <Text style={styles.dataText}>{item.remarks}</Text>
        </Text>
      )}

      {item.repairedParts?.length > 0 && (
        <View style={styles.repairedPartsContainer}>
          <Text style={[styles.titleText, {marginBottom: 5}]}>
            Repaired Parts:
          </Text>
          {item.repairedParts.map((part, index) => (
            <View key={`${item._id}-part-${index}`} style={styles.partItem}>
              <Text style={styles.infoText}>
                <Text style={styles.titleText}>Material: </Text>
                <Text style={styles.dataText}>
                  {part.rawMaterialName || 'N/A'}
                </Text>
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.titleText}>Quantity: </Text>
                <Text style={styles.dataText}>{part.quantity  || 'N/A'}</Text>
                {" "}<Text style={styles.dataText}>{part.unit}</Text>

              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.titleText}>Serviced At: </Text>
                <Text style={styles.dataText}>
                  {formatDate(item.servicedAt) || 'Not specified'}
                </Text>
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Repaired History</Text>

      {/* Add Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by item, serial, or technician"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={filteredOrders}
            renderItem={renderOrderItem}
            keyExtractor={item => item._id || Math.random().toString()}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No repaired items found.</Text>
            }
          />
        </View>
      )}
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#fbd33b',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  searchInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'black',
    marginTop: 40,
  },
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    marginBottom: 5,
    color: '#000',
    fontSize: 16,
  },
  dataText: {
    fontWeight: 'normal',
    color: '#000',
  },
  titleText: {
    fontWeight: 'bold',
    color: '#000',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
  repairedPartsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  partItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default RepairHistory;
