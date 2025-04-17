// AuthWrapper.js
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import StackNavigator from './StackNavigator';
import LoginScreen from '../screens/LoginScreen';

const AuthWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const tokens = await AsyncStorage.getItem('tokens');
        
        if (tokens) {
          const { refreshToken } = JSON.parse(tokens);
          const isValid = await verifyRefreshToken(refreshToken);
          
          if (isValid) {
            setIsAuthenticated(true);
          } else {
            await AsyncStorage.multiRemove(['userData', 'tokens']);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();

    // Set up axios interceptor to handle token refresh
    const interceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const tokens = await AsyncStorage.getItem('tokens');
            if (tokens) {
              const { refreshToken } = JSON.parse(tokens);
              const newTokens = await refreshAccessToken(refreshToken);
              
              if (newTokens) {
                await AsyncStorage.setItem('tokens', JSON.stringify(newTokens));
                axios.defaults.headers.common['Authorization'] = `Bearer ${newTokens.accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
                return axios(originalRequest);
              }
            }
          } catch (refreshError) {
            // If refresh fails, logout the user
            await AsyncStorage.multiRemove(['userData', 'tokens']);
            setIsAuthenticated(false);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const verifyRefreshToken = async (token) => {
    try {
      const response = await axios.post(
        `http://88.222.214.93:5000/auth/verify-refresh-token`,
        { token }
      );
      return response.data.isValid;
    } catch (error) {
      return false;
    }
  };

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post(
        `http://88.222.214.93:5000/auth/refresh-token`,
        { refreshToken }
      );
      return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      };
    } catch (error) {
      return null;
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isAuthenticated ? <StackNavigator /> : <LoginScreen />;
};

export default AuthWrapper;