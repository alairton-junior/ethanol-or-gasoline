import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  displayCurrentAddress: string;
  locationServicesEnabled: boolean;
  locationPermissionStatus: string | null;
  error: string | null;
}

export function useCurrentLocation(): LocationData {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState<string>('Location Loading.....');
  const [locationServicesEnabled, setLocationServicesEnabled] = useState<boolean>(false);
  const [locationPermissionStatus, setLocationPermissionStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

 
  const checkIfLocationEnabled = async (): Promise<void> => {
    let enabled = await Location.hasServicesEnabledAsync();  
    if (!enabled) { 
      Alert.alert(
        'Localização Desativada', 
        'Por favor, ative os serviços de localização para continuar', [
          {
            text: 'Cancelar',
            onPress: () => console.log('Processo Cancelado'),
            style: 'cancel',
          },
          { 
            text: 'OK', 
            onPress: () => console.log('OK Pressed')
          }
        ]);
    } else {
      setLocationServicesEnabled(enabled); 
    }
  };

  // Pegando a localização atual do dispositivo
  const getCurrentLocation = async (): Promise<void> => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setLocationPermissionStatus(status);  
    
    if (status !== 'granted') {
      Alert.alert(
        'Permissão Negada',
        'Por favor, permita o uso da localização para continuar.',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancelar Pressionado'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressionado') },
        ]
      );
      setError('Permission denied');
      return;
    }

    try {
      const { coords } = await Location.getCurrentPositionAsync();
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);

      const response = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (response.length > 0) {
        const { name, city, postalCode } = response[0];
        setDisplayCurrentAddress(`${name || ''}, ${city || ''}, ${postalCode || ''}`);
      }
    } catch (e) {
      setError('Failed to fetch location');
      console.error(e);
    }
  };

  

  return {
    latitude,
    longitude,
    displayCurrentAddress,
    locationServicesEnabled,
    locationPermissionStatus,
    error,
  };
}