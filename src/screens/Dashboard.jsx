import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Card from '../components/card';
import Sidebar from '../components/Modal';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logout from './Logout';

const Dashboard = ({navigation}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://88.222.214.93:5050/admin/showDefectiveItemsOfWarehouse',
        );
        setData(response.data.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMoreInfo = itemType => {
    navigation.navigate('AllDefectiveData', {itemType});
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  const menuItems = [
    {
      icon: <MaterialIcons name="store" size={20} color="black" />,
      title: 'Bom Stock',
      onPress: () => navigation.navigate('Stock'),
    },
    {
      icon: <MaterialIcons name="add-box" size={20} color="black" />,
      title: 'AddItem',
      onPress: () => navigation.navigate('AddItem'),
    },
    {
      icon: <MaterialIcons name="subtitles" size={20} color="black" />,
      title: 'Add Raw Material',
      onPress: () => navigation.navigate('AddSubItemName'),
    },
    {
      icon: <MaterialIcons name="build" size={20} color="black" />,
      title: 'Repair',
      onPress: () => navigation.navigate('Repair'),
    },
    {
      icon: <MaterialIcons name="delete" size={20} color="black" />,
      title: 'Reject',
      onPress: () => navigation.navigate('Reject'),
    },
    {
      icon: <MaterialIcons name="list" size={20} color="black" />,
      title: 'BOM',
      onPress: () => navigation.navigate('Bom'),
    },
    {
      icon: <MaterialIcons name="history" size={20} color="black" />,
      title: 'Repair History',
      onPress: () => navigation.navigate('RepairHistory'),
    },
    {
      icon: <MaterialIcons name="history-toggle-off" size={20} color="black" />,
      title: 'Reject History',
      onPress: () => navigation.navigate('RejectHistory'),
    },

    // {
    //   icon: <MaterialIcons name="history-toggle-off" size={20} color="black" />,
    //   title: 'BarCode Scanner',
    //   onPress: () => navigation.navigate('BarCodeScanner'),
    // },

    {
      icon: <MaterialIcons name="account-box" size={20} color="black" />,
      title: 'product Count',
      onPress: () => navigation.navigate('productCount'),
    },

    {
      icon: <MaterialIcons name="production-quantity-limits" size={20} color="black" />,
      title: 'New Making Product',
      onPress: () => navigation.navigate('NewMakingItem'),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'#189ab4'} />
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/Galo.png')}
            style={styles.image}
          />
          <Text style={styles.headerText}>RMS ADMIN</Text>
        </View>
        <Sidebar menuItems={menuItems} navigation={navigation} />
        <Logout />
      </View>

      <View style={styles.cardContainer}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.cardWrapper}>
            <TouchableOpacity
              style={styles.moreInfoButton}
              onPress={() => handleMoreInfo('Pump')}>
              <Text style={styles.moreInfoText}>More Info</Text>
            </TouchableOpacity>
            <Card
              backgroundColor="#E1341E"
              title="Pump"
              content="Total Defective"
              quantity={
                data?.totalsByGroup?.find(item => item.item === 'Pump')
                  ?.defectiveCount
              }
            />
          </View>

          <View style={styles.cardWrapper}>
            <TouchableOpacity
              style={styles.moreInfoButton}
              onPress={() => handleMoreInfo('Controller')}>
              <Text style={styles.moreInfoText}>More Info</Text>
            </TouchableOpacity>
            <Card
              backgroundColor="#97bcc7"
              title="Controller"
              content="Total Defective"
              quantity={
                data?.totalsByGroup?.find(item => item.item === 'Controller')
                  ?.defectiveCount
              }
            />
          </View>

          <View style={styles.cardWrapper}>
            <TouchableOpacity
              style={styles.moreInfoButton}
              onPress={() => handleMoreInfo('Motor')}>
              <Text style={styles.moreInfoText}>More Info</Text>
            </TouchableOpacity>
            <Card
              backgroundColor="#FFAEBC"
              title="Motor"
              content="Total Defective"
              quantity={
                data?.totalsByGroup?.find(item => item.item === 'Motor')
                  ?.defectiveCount
              }
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#189ab4',
    padding: 40,
    paddingTop: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 80,
  },
  headerText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  moreInfoButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  moreInfoText: {
    color: '#189ab4',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Dashboard;
