import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { runOnJS } from 'react-native-reanimated';

const BarcodeScanner = ({ onBarcodeScanned, style }) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [scanned, setScanned] = useState(false);
  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128', 'code-39', 'code-93', 'upc-a', 'upc-e'],
    onCodeScanned: (codes) => {
      if (!scanned && codes.length > 0) {
        runOnJS(setScanned)(true);
        runOnJS(onBarcodeScanned)(codes[0]);
        // Reset after 2 seconds to allow scanning again
        setTimeout(() => runOnJS(setScanned)(false), 2000);
      }
    }
  });

  if (!hasPermission) {
    return <View style={styles.container}><Text>No camera permission</Text></View>;
  }

  if (device == null) {
    return <View style={styles.container}><Text>No camera device found</Text></View>;
  }

  return (
    <View style={[styles.container, style]}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
      <View style={styles.overlay}>
        <View style={styles.border} />
        <Text style={styles.scanText}>Align the barcode within the frame</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  scanText: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
  },
});

export default BarcodeScanner;