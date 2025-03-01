import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Definição das propriedades esperadas pelo componente
interface MapViewComponentProps {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}

export function MapViewComponent({
  latitude,
  longitude,
  latitudeDelta = 0.0010,  // Valor padrão
  longitudeDelta = 0.0010, // Valor padrão
}: MapViewComponentProps) {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
      >
        {/* Marker para a posição passada via props */}
        <Marker coordinate={{ latitude, longitude }} title="Localização" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
