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
