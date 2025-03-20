// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
//   Animated,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Sidebar = ({menuItems}) => {
//   const [visible, setVisible] = useState(false);
//   const [expandedSections, setExpandedSections] = useState({});
//   const slideAnim = useRef(new Animated.Value(-300)).current;

//   const openModal = () => {
//     setVisible(true);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeModal = () => {
//     Animated.timing(slideAnim, {
//       toValue: -300,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       setVisible(false);
//     });
//   };

//   const toggleSection = section => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   useEffect(() => {
//     if (!visible) {
//       slideAnim.setValue(-300);
//     }
//   }, [visible]);

//   return (
//     <View>
//       <TouchableOpacity onPress={openModal} style={styles.menuIcon}>
//         <Icon name="bars" size={28} color="#000" />
//       </TouchableOpacity>

//       <Modal
//         transparent
//         visible={visible}
//         animationType="none"
//         onRequestClose={closeModal}>
//         <TouchableOpacity
//           style={styles.overlay}
//           onPress={closeModal}
//           activeOpacity={1}
//         />

//         <Animated.View
//           style={[styles.sidebar, {transform: [{translateX: slideAnim}]}]}>
//           <View style={{height: '13%', backgroundColor: '#189ab4', flexDirection: 'row', alignItems: 'center'}}>
//           <Image source={require('../assets/images/Galo.png')} style={styles.image} />
//             <Text style={styles.sidebarText}>
//                Inventory RMS</Text>
//           </View>
//         </Animated.View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   menuIcon: {
//     position: 'absolute',
//     top: 5,
//     left: 15,
//     zIndex: 10,
//     marginLeft: -40,
//   },

//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },

//   image: {
//     width: 40,
//     height: 40,
//     resizeMode: 'contain',
//   },

//   sidebar: {
//     width: 300,
//     backgroundColor: '#FFFFFF',
//     // padding: 20,
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   sidebarText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'black',
//     textAlign: 'center',
    
//   },
//   optionButton: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   subOptionButton: {
//     paddingVertical: 8,
//     paddingLeft: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   optionText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
// });

// export default Sidebar;


// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
//   Animated,
//   Image,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Sidebar = ({menuItems, navigation }) => {
//   const [visible, setVisible] = useState(false);
//   const [expandedSections, setExpandedSections] = useState({});
//   const slideAnim = useRef(new Animated.Value(-300)).current;

//   const openModal = () => {
//     setVisible(true);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();``
//   };

//   const closeModal = () => {
//     Animated.timing(slideAnim, {
//       toValue: -300,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       setVisible(false);
//     });
//   };

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   useEffect(() => {
//     if (!visible) {
//       slideAnim.setValue(-300);
//     }
//   }, [visible]);

//   return (
//     <View>
//       <TouchableOpacity onPress={openModal} style={styles.menuIcon}>
//         <Icon name="bars" size={28} color="#000" />
//       </TouchableOpacity>

//       <Modal transparent visible={visible} animationType="none" onRequestClose={closeModal}>
//         <TouchableOpacity style={styles.overlay} onPress={closeModal} activeOpacity={1} />

//         <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
//           <TouchableWithoutFeedback>
//             <View>
             
//               <View style={styles.header}>
//                 <Image source={require('../assets/images/Galo.png')} style={styles.image} />
//                 <Text style={styles.sidebarText}>Inventory RMS</Text>
//               </View>

//               <View style={styles.menuContainer}>
//                 {menuItems.map((item, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={styles.optionButton}
//                     onPress={() => toggleSection(item.title)}
//                   >
//                     <View style={styles.row}>
//                       <Text style={styles.optionText}>{item.title}</Text>
//                       {item.subOptions && (
//                         <Icon name={expandedSections[item.title] ? 'chevron-up' : 'chevron-down'} size={14} color="#000" />
//                       )}
//                     </View>
//                     {expandedSections[item.title] &&
//                       item.subOptions?.map((subItem, subIndex) => (
//                         <TouchableOpacity key={subIndex} style={styles.subOptionButton}>
//                           <Text style={styles.optionText}>{subItem}</Text>
//                         </TouchableOpacity>
//                       ))}
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>
//           </TouchableWithoutFeedback>
//         </Animated.View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   menuIcon: {
//     position: 'absolute',
//     top: 5,
//     left: 15,
//     zIndex: 10,
//     marginLeft: -40,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   image: {
//     width: 40,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   sidebar: {
//     width: 300,
//     backgroundColor: '#FFFFFF',
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//     // paddingTop: 20,
//   },
//   header: {
//     height: 80,
//     backgroundColor: '#189ab4',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingLeft: 20,
//   },
//   sidebarText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'black',
//     textAlign: 'center',
//   },

//   menuContainer: {
//     marginTop: 10,
//   },
//   optionButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   subOptionButton: {
//     paddingVertical: 8,
//     paddingLeft: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   optionText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
// });

// export default Sidebar;


// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
//   Animated,
//   Image,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Sidebar = ({ menuItems, navigation }) => {
//   const [visible, setVisible] = useState(false);
//   const [expandedSections, setExpandedSections] = useState({});
//   const slideAnim = useRef(new Animated.Value(-300)).current;

//   const openModal = () => {
//     setVisible(true);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeModal = () => {
//     Animated.timing(slideAnim, {
//       toValue: -300,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       setVisible(false);
//     });
//   };

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   useEffect(() => {
//     if (!visible) {
//       slideAnim.setValue(-300);
//     }
//   }, [visible]);

//   return (
//     <View>
//       <TouchableOpacity onPress={openModal} style={styles.menuIcon}>
//         <Icon name="bars" size={28} color="#000" />
//       </TouchableOpacity>

//       <Modal transparent visible={visible} animationType="none" onRequestClose={closeModal}>
//         <TouchableWithoutFeedback onPress={closeModal}>
//           <View style={styles.overlay}>
//             <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
//               <TouchableWithoutFeedback>
//                 <View>
//                   <View style={styles.header}>
//                     <Image source={require('../assets/images/Galo.png')} style={styles.image} />
//                     <Text style={styles.sidebarText}>Inventory RMS</Text>
//                   </View>

//                   <View style={styles.menuContainer}>
//                     {menuItems.map((item, index) => (
//                       <TouchableOpacity
//                         key={index}
//                         style={styles.optionButton}
//                         onPress={() => {
//                           if (item.onPress) {
//                             item.onPress();
//                             closeModal(); // Close sidebar after selecting an option
//                           } else {
//                             toggleSection(item.title);
//                           }
//                         }}
//                       >
//                         <View style={styles.row}>
//                           <Text style={styles.optionText}>{item.title}</Text>
//                           {item.subOptions && (
//                             <Icon name={expandedSections[item.title] ? 'chevron-up' : 'chevron-down'} size={14} color="#000" />
//                           )}
//                         </View>
//                         {expandedSections[item.title] &&
//                           item.subOptions?.map((subItem, subIndex) => (
//                             <TouchableOpacity key={subIndex} style={styles.subOptionButton}>
//                               <Text style={styles.optionText}>{subItem}</Text>
//                             </TouchableOpacity>
//                           ))}
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </View>
//               </TouchableWithoutFeedback>
//             </Animated.View>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//    menuIcon: {
//     position: 'absolute',
//     top: 5,
//     left: 15,
//     zIndex: 10,
//     marginLeft: -40,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   image: {
//     width: 40,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   sidebar: {
//     width: 300,
//     backgroundColor: '#FFFFFF',
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//     // paddingTop: 20,
//   },
//   header: {
//     height: 80,
//     backgroundColor: '#189ab4',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingLeft: 20,
//   },
//   sidebarText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'black',
//     textAlign: 'center',
//   },

//   menuContainer: {
//     marginTop: 10,
//   },
//   optionButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   subOptionButton: {
//     paddingVertical: 8,
//     paddingLeft: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   optionText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
// });

// export default Sidebar;


import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Image, TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Sidebar = ({ menuItems, navigation }) => {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const openModal = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal} style={styles.menuIcon}>
        <MaterialIcons name="menu" size={28} color="#000" />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="none" onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay}>
            <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
              <View style={styles.header}>
                <Image source={require('../assets/images/Galo.png')} style={styles.image} />
                <Text style={styles.sidebarText}>Inventory RMS</Text>
              </View>

              <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => {
                      item.onPress();
                      closeModal();
                    }}
                  >
                    <View style={styles.row}>
                      {item.icon}
                      <Text style={styles.optionText}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    position: 'absolute',
    top: 5,
    left: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    width: 300,
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    elevation: 5,
  },
  header: {
    height: 80,
    backgroundColor: '#189ab4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  sidebarText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  menuContainer: {
    marginTop: 10,
  },
  optionButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default Sidebar;
