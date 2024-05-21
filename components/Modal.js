import React from 'react';
import { Modal as RNModal, View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Modal = ({ modalVisible, selectedUser, setModalVisible }) => {
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <RNModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.overlay} />
                <View style={styles.modalContent}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                    <MaterialCommunityIcons name="close" size={25} color="red" />
                </TouchableOpacity>
                <Image source={{ uri: selectedUser?.picture?.large }} style={styles.itemPhoto} />
                <Text style={styles.modalText}>
                    {selectedUser && `${selectedUser.name.first} ${selectedUser.name.last}`}
                </Text>
                <View style={styles.infoContainer}>
                    <MaterialCommunityIcons name="email" size={25} color="#888" />
                    <Text>{selectedUser && `${selectedUser.email}`}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <MaterialCommunityIcons name="gender-male-female" size={25} color="#888" />
                    <Text>{selectedUser && `${selectedUser.gender}`}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <MaterialCommunityIcons name="calendar" size={25} color="#888" />
                    <Text>{selectedUser && `${formatDate(selectedUser.dob.date)}`}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <MaterialCommunityIcons name="phone" size={25} color="#888" />
                    <Text>{selectedUser && `${selectedUser.phone}`}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <MaterialCommunityIcons name="earth" size={25} color="#888" />
                    <Text>{selectedUser && `${selectedUser.location.country}`}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <MaterialCommunityIcons name="map-marker" size={25} color="#888" />
                    <Text>
                    {selectedUser &&
                        `${selectedUser.location.street.number}, ${selectedUser.location.street.name}, ${selectedUser.location.city}, ${selectedUser.location.state}, ${selectedUser.location.postcode}`}
                    </Text>
                </View>
                    { selectedUser?.id.value && (
                        <View style={styles.infoContainer}>
                            <MaterialCommunityIcons name="id-card" size={25} color="#888" />
                            <Text>{selectedUser && `${selectedUser.id.value}`}</Text>
                        </View>
                    )}
                </View>
            </View>
        </RNModal>
    );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 350,
    position: 'relative',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'red',
  },
  itemPhoto: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Modal;
