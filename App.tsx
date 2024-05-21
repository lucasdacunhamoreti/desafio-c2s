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

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [_page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genderFilter, setGenderFilter] = useState(null);

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
    fetchData();
  }, []);

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
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchData(nextPage);
        return nextPage;
      });
    }
  };

  const handleGenderFilterClick = () => {
    setGenderFilter((prevGenderFilter) => {
      if (prevGenderFilter === null) return 'male';
      if (prevGenderFilter === 'male') return 'female';
      return null;
    });
  };

  const handleOrderClick = () => {
    let newList = [...filteredList];
    newList.sort((a, b) => (a.name.first > b.name.first ? 1 : b.name.first > a.name.first ? -1 : 0));
    setFilteredList(newList);
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
        renderItem={({ item }) => <ListItem data={item} />}
        keyExtractor={(item, index) => `${item.login.uuid}-${index}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<Loading loading={loading} />}
      />

      <StatusBar style="light" />
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
  orderButton: {
    width: 32,
    marginRight: 30,
  },
  list: {
    flex: 1,
  },
});

export default App;
