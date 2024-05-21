import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

const ListItem = ({ data, onPress }) => {
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(data)}>
      <Image source={{ uri: data.picture.large }} style={styles.itemPhoto} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemP1}>{data.name.first} {data.name.last}</Text>
        <Text style={styles.itemP2}>{data.gender}</Text>
        <Text style={styles.itemP2}>{formatDate(data.dob.date)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingTop: 15,
    paddingBottom: 15,
  },
  itemPhoto: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  itemInfo: {
    marginLeft: 20,
  },
  itemP1: {
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  itemP2: {
    fontSize: 18,
    color: '#999999',
  },
});

export default ListItem;
