import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../constant/Colors';

export const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const cardData = [
    { title: 'Storage', image: require('../assets/images/luggage.png') },
    { title: 'Porter', image: require('../assets/images/porter.png') },
    { title: 'Bike', image: require('../assets/images/bike.png') },
    { title: 'Cab', image: require('../assets/images/cab.png') },
    { title: 'Auto', image: require('../assets/images/auto.png') },
    { title: 'Hotel', image: require('../assets/images/hotel.png') },
    { title: 'Shared Auto', image: require('../assets/images/cab.png') },
    { title: 'Cab Premium', image: require('../assets/images/cab.png') },
  ];

  return (
    <View style={style.container}>
      <View style={style.topBar}>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/menu.png')}
            style={style.menuImage}
          />
        </TouchableOpacity>
        <View style={style.searchWrapper}>
          <TextInput
            style={style.searchInput}
            placeholder="Search"
            placeholderTextColor="#aaa"
          />
        </View>
      </View>

      <View style={style.bottomBar}>
        <View style={style.bottomTopBar}>
          <Text style={style.exploreText}>Explore</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={style.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={style.bottomMidBar}>
          {cardData.slice(0, 4).map((item, index) => (
            <TouchableOpacity key={index} style={style.card}>
              <Image source={item.image} style={style.cardImage} />
              <Text style={style.cardText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={style.modal}
      >
        <View style={style.modalContainer}>
          <View style={style.handleBar} />
          <Text style={style.modalTitle}>All Services</Text>
          <ScrollView contentContainerStyle={style.modalGrid}>
            {cardData.map((item, index) => (
              <TouchableOpacity key={index} style={style.modalCard}>
                <Image source={item.image} style={style.cardImage} />
                <Text style={style.cardText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: '100%',
  },
  topBar: {
    width: '100%',
    height: '16%',
    backgroundColor: Colors.primary,
    borderBottomWidth: 0.2,
    elevation: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  menuImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  searchWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  searchInput: {
    backgroundColor: Colors.secondaryWhite,
    borderRadius: 20,
    borderWidth: 0.5,
    paddingHorizontal: 16,
    height: 40,
    fontSize: 16,
    color: '#000',
    borderColor: Colors.text,
  },
  bottomBar: {
    backgroundColor: Colors.primary,
    height: '84%',
    width: '100%',
  },
  bottomTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  exploreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.text,
  },
  bottomMidBar: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    gap: 12,
  },
  card: {
    backgroundColor: Colors.secondaryWhite,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    width: 70,
  },
  cardImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },

  // Modal styles
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    maxHeight: '85%',
  },
  handleBar: {
    alignSelf: 'center',
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  modalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modalCard: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 20,
  },
});
