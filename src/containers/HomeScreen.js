import React from "react";
import {
  Button,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-navigation";
import axios from "axios";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

class HomeScreen extends React.Component {
  state = {
    // Obtenir la liste des appartements
    dataList: {},
    // Obtenir la liste des photos
    dataPicture: {},
    // Obtenir les reviews
    starCount: ""
  };

  // Obtenir la liste des annonces
  getListFlats = async () => {
    const response = await axios.get(
      "https://airbnb-api.now.sh/api/room?city=paris"
    );
    this.setState({
      dataList: response.data.rooms,
      dataPiture: response.data.rooms.photos
    });
  };

  componentDidMount = () => {
    this.getListFlats();
  };

  // Obtenir les reviews
  renderStars = ratingValue => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        stars.push(<Ionicons key={i} name="ios-star" size={32} color="gold" />);
      } else {
        stars.push(<Ionicons key={i} name="ios-star" size={32} color="grey" />);
      }
    }
    return stars;
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F2EF" }}>
       <StatusBar barStyle="light-content" />
        <ScrollView>
          <View>
            <View
              style={{
                marginHorizontal: 15
              }}
            >
              <FlatList
                keyExtractor={room => {
                  return room._id;
                }}
                data={this.state.dataList}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        this.showMoreApp(item._id);
                      }}
                    >
                      <View style={styles.containerList}>
                        <ImageBackground
                          source={{ uri: item.photos[0] }}
                          style={styles.image}
                        >
                          <Text style={styles.price}>{item.price} €</Text>
                        </ImageBackground>
                        <View
                          style={{ flexDirection: "row", marginHorizontal: 5 }}
                        >
                          <View style={{ width: 250 }}>
                            <Text style={styles.titleFlat} numberOfLines={1}>
                              {item.title}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                marginTop: 15
                              }}
                            >
                              {this.renderStars(item.ratingValue)}
                              <Text style={styles.reviews}>
                                {item.reviews} reviews
                              </Text>
                            </View>
                          </View>

                          <Image
                            source={{ uri: item.user.account.photos[0] }}
                            style={styles.userPicture}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  showMoreApp = idRoom => {
    this.props.navigation.navigate("Other", { id: idRoom });
  };
}

const styles = StyleSheet.create({
  image: {
    height: 230,
    width: 380,
    resizeMode: "cover"
  },
  containerList: {
    borderWidth: 0.5,
    marginBottom: 15,
    marginTop: 30,
    borderColor: "#F4F2EF",
    backgroundColor: "white"
  },
  titleFlat: {
    fontSize: 20,
    marginTop: 15,
    marginLeft: 5
  },
  reviews: {
    color: "grey",
    marginTop: 10,
    marginLeft: 5,
    fontSize: 18
  },
  userPicture: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 20,
    marginTop: 15,
    marginRight: 10
  },
  price: {
    color: "white",
    fontSize: 25,
    height: 65,
    width: 90,
    backgroundColor: "black",
    paddingTop: 17,
    paddingLeft: 15,
    marginTop: 160
  }
});

export default HomeScreen;
