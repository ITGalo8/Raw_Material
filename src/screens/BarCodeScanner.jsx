import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  Vibration
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useCodeScanner } from 'react-native-vision-camera';

const BarcodeScanner = ({ navigation }) => {
  const [scannedData, setScannedData] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  // Handle permission flow
  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        let cameraPermission = hasPermission;
        
        if (!cameraPermission) {
          cameraPermission = await requestPermission();
        }

        if (cameraPermission) {
          setShowScanner(true);
        } else {
          showPermissionDeniedAlert();
        }
      } catch (error) {
        console.error('Permission error:', error);
        Alert.alert('Error', 'Failed to check camera permissions');
      }
    };

    checkCameraPermission();
  }, [hasPermission]);

  const showPermissionDeniedAlert = useCallback(() => {
    Alert.alert(
      'Permission Required',
      'Camera access is required to scan barcodes. Please enable it in settings.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => navigation.goBack()
        },
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings()
        },
      ]
    );
  }, [navigation]);

  const handleRequestPermission = useCallback(async () => {
    try {
      const status = await requestPermission();
      
      if (status) {
        setShowScanner(true);
      } else {
        showPermissionDeniedAlert();
      }
    } catch (error) {
      console.error('Permission request error:', error);
      Alert.alert('Error', 'Failed to request camera permission');
    }
  }, [requestPermission, showPermissionDeniedAlert]);

  const handleCodeScanned = useCallback((codes) => {
    if (codes.length > 0 && showScanner && isCameraInitialized) {
      const scannedValue = codes[0].value;
      Vibration.vibrate(200); // Vibrate on successful scan
      setScannedData(scannedValue);
      setShowScanner(false);
    }
  }, [showScanner, isCameraInitialized]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128', 'code-39', 'upc-a', 'pdf-417'],
    onCodeScanned: handleCodeScanned
  });

  const handleRescan = useCallback(() => {
    setScannedData(null);
    setShowScanner(true);
  }, []);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (!device) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Initializing camera...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>Camera Access Needed</Text>
        <Text style={styles.permissionText}>
          To scan barcodes, please grant camera permissions
        </Text>
        
        <TouchableOpacity 
          style={styles.permissionButton} 
          onPress={handleRequestPermission}
          activeOpacity={0.7}
        >
          <Text style={styles.permissionButtonText}>
            Allow Camera Access
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showScanner ? (
        <View style={StyleSheet.absoluteFill}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showScanner}
            codeScanner={codeScanner}
            torch={torchOn ? 'on' : 'off'}
            enableZoomGesture={true}
            onInitialized={() => setIsCameraInitialized(true)}
            orientation="portrait"
          />
          
          <View style={styles.overlay}>
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={handleBack}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.torchButton}
                onPress={() => setTorchOn(!torchOn)}
              >
                <Text style={styles.torchButtonText}>
                  {torchOn ? '🔦 On' : '⚡ Off'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.scanFrame}>
              <View style={styles.frame} />
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
              <Text style={styles.scanText}>Align barcode within the frame</Text>
            </View>
            
            <View style={styles.footer}>
              <Text style={styles.footerText}>Point your camera at a barcode</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Scanned Successfully</Text>
          <View style={styles.barcodeContainer}>
            <Text style={styles.barcodeData}>{scannedData}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.rescanButton}
            onPress={handleRescan}
          >
            <Text style={styles.rescanButtonText}>Scan Again</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.doneButton}
            onPress={handleBack}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');
const frameSize = width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  permissionText: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  torchButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  torchButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  scanFrame: {
    alignItems: 'center',
  },
  frame: {
    width: frameSize,
    height: frameSize * 0.5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'transparent',
    borderRadius: 10,
    position: 'relative',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: -1,
    left: -1,
    width: 25,
    height: 25,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderColor: '#FFD700',
    borderTopLeftRadius: 10,
  },
  cornerTopRight: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 25,
    height: 25,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderColor: '#FFD700',
    borderTopRightRadius: 10,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: -1,
    left: -1,
    width: 25,
    height: 25,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#FFD700',
    borderBottomLeftRadius: 10,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 25,
    height: 25,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#FFD700',
    borderBottomRightRadius: 10,
  },
  scanText: {
    color: '#fff',
    marginTop: 25,
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 8,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  barcodeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  barcodeData: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
  },
  rescanButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  rescanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  doneButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  doneButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BarcodeScanner;