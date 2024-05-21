import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListItem from './components/ListItem';
import Loading from './components/Loading';
import Modal from './components/Modal';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genderFilter, setGenderFilter] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async (newPage = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`https://randomuser.me/api/?results=20&page=${newPage}`);
      const data = await response.json();
      setList((prevList) => [...prevList, ...data.results]);
      setFilteredList((prevList) => [...prevList, ...data.results]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    filterList();
  }, [searchText, list, genderFilter]);

  const filterList = () => {
    let newList = list;

    if (searchText !== '') {
      newList = newList.filter(
        (item) =>
          item.name.first.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (genderFilter) {
      newList = newList.filter((item) => item.gender === genderFilter);
    }

    setFilteredList(newList);
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleGenderFilterClick = () => {
    setGenderFilter((prevGenderFilter) => {
      if (prevGenderFilter === null) return 'male';
      if (prevGenderFilter === 'male') return 'female';
      return null;
    });
  };

  const handleListItemPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchArea}>
        <TextInput
          style={styles.input}
          placeholder="Pesquise uma pessoa"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
        />
        <TouchableOpacity onPress={handleGenderFilterClick} style={styles.filterButton}>
          <MaterialCommunityIcons
            name={genderFilter === 'male' ? "gender-male" : genderFilter === 'female' ? "gender-female" : "gender-male-female"}
            size={32}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredList}
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleListItemPress(item)}>
            <ListItem data={item} onPress={handleListItemPress} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => `${item.login.uuid}-${index}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<Loading loading={loading} />}
      />

      <StatusBar style="light" />

      <Modal modalVisible={modalVisible} selectedUser={selectedUser} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242425',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#363636',
    margin: 30,
    borderRadius: 5,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#FFFFFF',
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    width: 32,
    marginRight: 20,
  },
  list: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300, // Definindo largura fixa
    position: 'relative',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: -30,
    right: -30,
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

export default App;
