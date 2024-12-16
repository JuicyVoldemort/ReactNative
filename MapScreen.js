import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

const MapScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://peta-calvinros-projects.vercel.app/' }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default MapScreen;