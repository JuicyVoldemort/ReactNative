import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

const MapScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://ionic-leaflet-map.firebaseapp.com/' }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default MapScreen;