import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const API_URL = 'https://api.alquran.cloud/v1/quran/en.asad';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]); // Here, products will be Surahs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          
          setProducts(data.data.surahs); // Set the Surahs array to products
          await AsyncStorage.setItem('SurahData', JSON.stringify(data.data.surahs)); // Storing in AsyncStorage
        } catch (err) {
          setError('Failed to fetch data from API.');
        }
      } else {
        try {
          const cachedData = await AsyncStorage.getItem('SurahData');
          if (cachedData) {
            setProducts(JSON.parse(cachedData)); // Load data from AsyncStorage if available
          } else {
            setError('No internet connection and no cached data available.');
          }
        } catch (err) {
          setError('Error retrieving data from storage.');
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return { products, loading, error };
};
