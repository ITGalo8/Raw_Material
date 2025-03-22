// import { View, StyleSheet, ActivityIndicator, Image, Text, ScrollView, StatusBar } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import Card from '../components/card';
// import Sidebar from '../components/Modal';
// import axios from 'axios';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// const Dashboard = ({ navigation }) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://api.example.com/getDefectiveItems');
//         setData(response.data);
//       } catch (error) {
//         console.log('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
//   }

// const menuItems = [

//   { 
//     icon: <MaterialIcons name="home-repair-service" size={20} color="black" />, 
//     title: 'AddItem', 
//     onPress: () => navigation.navigate('AddItem'),
//   },

//   { 
//     icon: <MaterialIcons name="home-repair-service" size={20} color="black" />, 
//     title: 'AddSubItemName', 
//     onPress: () => navigation.navigate('AddSubItemName'),
//   },

//   { 
//     icon: <MaterialIcons name="home-repair-service" size={20} color="black" />, 
//     title: 'Repair', 
//     onPress: () => navigation.navigate('Repair'),
//   },

//   { 
//     icon: <MaterialIcons name="home-repair-service" size={20} color="black" />, 
//     title: 'Reject', 
//     onPress: () => navigation.navigate('Reject'),
//   },

//   { 
//     icon: <MaterialIcons name="home-repair-service" size={20} color="black" />, 
//     title: 'BOM', 
//     onPress: () => navigation.navigate('BOM'),
//   },

//   { 
//     icon: <MaterialIcons name="home-repair-service" size={20} color="black" />, 
//     title: 'Repair History', 
//     onPress: () => navigation.navigate('RepairHistory'),
//   },

//   { 
//     icon: <MaterialIcons name="home-repair-service" size={20} color="black" />, 
//     title: 'Reject History', 
//     onPress: () => navigation.navigate('RejectHistory'),
//   },


// ];


//   return (
//     <View style={styles.container}>
//       <StatusBar translucent
//           backgroundColor={'#189ab4'}
//        />
//       <View style={styles.header}>
//         <View style={styles.logoContainer}>
//           <Image source={require('../assets/images/Galo.png')} style={styles.image} />
//           <Text style={styles.headerText}>RMS ADMIN</Text>
//         </View>
//         <Sidebar menuItems={menuItems} navigation={navigation}/>
//       </View>
      
//       <View style={styles.cardContainer}>
//         <ScrollView showsVerticalScrollIndicator={true}>
//           <Card backgroundColor="#fbd33b" title="Total Defective" content="Bhiwani" quantity={data?.totalDefective} />
//           <Card backgroundColor="#E1341E" title="Pump" content="Total Defective" quantity={data?.pumpDefective} />
//           <Card backgroundColor="#97bcc7" title="Controller" content="Total Defective" quantity={data?.controllerDefective} />
//           <Card backgroundColor="#97bcc7" title="Motor" content="Total Defective" quantity={data?.motorDefective} />
//           <Card backgroundColor="#97bcc7" title="Bom" content="Total Defective" quantity={data?.bomDefective} />
//           <Card backgroundColor="#97bcc7" title="Stock" content="Total Defective" quantity={data?.stockDefective} />
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: '#189ab4',
//     padding: 40,
//     // borderRadius: 15,
//     paddingTop: 64,
//     // flexDirection: 'row',
//     // alignItems: 'center',
//     // justifyContent: 'space-between',
//   },
//   logoContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 80
//   },

//   headerText: {
//     color: '#FFFF',
//     marginLeft: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   cardContainer: {
//     flex: 1,
//     padding: 16,
//     paddingTop: 20,
//   },
//   image: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Dashboard;



import { View, StyleSheet, ActivityIndicator, Image, Text, ScrollView, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import Card from '../components/card';
import Sidebar from '../components/Modal';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logout from './Logout';

const Dashboard = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/getDefectiveItems');
        setData(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  const menuItems = [
    { 
      icon: <MaterialIcons name="add-box" size={20} color="black" />, 
      title: 'AddItem', 
      onPress: () => navigation.navigate('AddItem'),
    },
    { 
      icon: <MaterialIcons name="subtitles" size={20} color="black" />, 
      title: 'AddSubItemName', 
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
  ];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'#189ab4'} />
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/Galo.png')} style={styles.image} />
          <Text style={styles.headerText}>RMS ADMIN</Text>
        </View>
        <Sidebar menuItems={menuItems} navigation={navigation} />
        <Logout/>
      </View>

      <View style={styles.cardContainer}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <Card backgroundColor="#fbd33b" title="Total Defective" content="Bhiwani" quantity={data?.totalDefective} />
          <Card backgroundColor="#E1341E" title="Pump" content="Total Defective" quantity={data?.pumpDefective} />
          <Card backgroundColor="#97bcc7" title="Controller" content="Total Defective" quantity={data?.controllerDefective} />
          <Card backgroundColor="#FFAEBC" title="Motor" content="Total Defective" quantity={data?.motorDefective} />
          <Card backgroundColor="#eeede7" title="BOM" content="Total Defective" quantity={data?.bomDefective} />
          <Card backgroundColor="#868b8e" title="Stock" content="Total Defective" quantity={data?.stockDefective} />
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
});

export default Dashboard;
