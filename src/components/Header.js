import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ReUse</Text>
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
});

