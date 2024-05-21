import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const Loading = ({ loading }) => {
  if (!loading) return null;
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#888" />
      <Text style={styles.loadingText}>CARREGANDO MAIS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
});

export default Loading;
