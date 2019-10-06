import React from "react";
import { StyleSheet, Text, View, ImageBackground, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-navigation";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import axios from "axios";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Marker } from "react-native-maps";

class OtherScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Room",
      headerStyle: {
        backgroundColor: "#FF595E"
      },
      headerTitleStyle: {
        color: "white"
      },
      headerTintColor: "white" 
    };
  };

  state = {
    // Détails de l'appartement
    dataFlatDetails: {},
    // Photos de l'appartement
    picture: [],
    // Description du user
    user: {},
    // Photo du user
    userPicture: [],
    // Geolocalisation
    location: null,
    // Localisation de l'appartement
    latitude: 0,
    longitude: 0
  };


  // Obtenir les détails de chaque annonce
  getFlatDetails = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.now.sh/api/room/" +
          this.props.navigation.state.params.id
      );
      this.setState({
        dataFlatDetails: response.data,
        picture: response.data.photos,
        user: response.data.user.account,
        userPicture: response.data.user.account.photos[0],
        latitude: response.data.loc[1],
        longitude: response.data.loc[0]
      });
    } catch (e) {
      alert("An error occurred");
    }
  };

  // Récupérer la liste des appartements
  componentDidMount = () => {
    this.getFlatDetails();
  };

  // Obtenir les reviews de chaque annonce
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

  // Géolocalisation
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
    }
    this.setState({
      location: location
    });
  };

  render() {
    const price = this.state.dataFlatDetails.price;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "F4F2EF" }}>
       <StatusBar backgroundColor="#FF595E"/>
        <ScrollView>
          <View>
            <View>
              <Swiper
                style={styles.wrapper}
                showsButtons={false}
                showsPagination={false}
              >
                {this.state.picture.map((item, index) => {
                  return (
                    <View key={index}>
                      <ImageBackground
                        source={{ uri: item }}
                        style={{ height: 300, width: 380 }}
                      >
                        <Text style={styles.price}>{price} €</Text>
                      </ImageBackground>
                    </View>
                  );
                })}
              </Swiper>
              <View style={{ marginLeft: 15, marginRight: 15 }}>
                <View>
                  <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
                    <View style={{ flexDirection: "column", width: 260 }}>
                      <Text style={styles.title} numberOfLines={1}>
                        {this.state.dataFlatDetails.title}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        {this.renderStars(
                          this.state.dataFlatDetails.ratingValue
                        )}
                        <Text style={styles.reviews}>
                          {this.state.dataFlatDetails.reviews} reviews
                        </Text>
                      </View>
                    </View>
                    <Image
                      source={{ url: this.state.userPicture }}
                      style={styles.userPicture}
                    />
                  </View>
                </View>
                <Text numberOfLines={3} style={styles.description}>
                  {this.state.user.description}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 25, marginLeft: 15, marginRight: 15 }}>
              <MapView
                style={styles.MapView}
                initialRegion={{
                  latitude: 48.8534,
                  longitude: 2.3488,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.04
                }}
                showsUserLocation={true}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                  }}
                  title="Flat location"
                />
              </MapView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 330
  },
  title: {
    fontSize: 20,
    marginLeft: 5
  },
  userPicture: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 20,
    alignItems: "flex-start"
  },
  reviews: {
    color: "grey",
    marginTop: 10,

    fontSize: 18
  },
  description: {
    fontSize: 20,
    textAlign: "justify",
    marginLeft: 5
  },
  price: {
    color: "white",
    fontSize: 25,
    height: 65,
    width: 90,
    backgroundColor: "black",
    paddingTop: 17,
    paddingLeft: 15,
    marginTop: 220
  },
  MapView: {
    flex: 1,
    height: 200,
    width: "100%"
  }
});

export default OtherScreen;
