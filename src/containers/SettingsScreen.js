import React from "react";
import { Text, StyleSheet, AsyncStorage, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Paramètres",
    };
  };

  render() {
    return (
      <SafeAreaView style={styles.backgroundSetting}>
         <View style={{ alignItems: "center", marginTop: 150 }}>
         <Ionicons name="md-exit" size={100} color="white" />
            <Text style={{ color: "white", fontSize: 25 }}>Goodbye</Text>
          </View>
        <TouchableOpacity style={styles.logoutButton} onPress={this.signOutAsync}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
      </SafeAreaView>
    );
  }

  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

const styles = StyleSheet.create({
  backgroundSetting : {
    flex: 1,
    backgroundColor: "#EA555C"
  },
  logoutButton : {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    borderRadius: 30,
    marginHorizontal: 70
  },
  logout: {
    color: "#EA555C",
    fontSize: 20
  }
});

export default SettingsScreen;
