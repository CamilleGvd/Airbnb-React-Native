import React from "react";
import {
  Button,
  AsyncStorage,
  View,
  SafeAreaView,
  TextInput,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

class SignInScreen extends React.Component {
  state = {
    // Correct username : arno@airbnb-api.com
    username: "",
    // Correct password : password01
    password: ""
  };

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  render() {
    return (
      <SafeAreaView style={styles.backgroundSignIn}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center", marginTop: 100 }}>
            <Ionicons name="md-home" size={100} color="white" />
            <Text style={{ color: "white", fontSize: 25 }}>Welcome</Text>
          </View>
          <TextInput
            placeholder=" Email"
            placeholderTextColor="white"
            style={styles.emailInput}
            onChangeText={text => {
              this.setState({ email: text });
            }}
            value={this.state.email}
          />
          <TextInput
            placeholder=" Password"
            placeholderTextColor="white"
            secureTextEntry={true}
            style={styles.passwordInput}
            onChangeText={text => {
              this.setState({ password: text });
            }}
            value={this.state.password}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.signInAsync}
          >
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Récupération de l'ID et du PW
  signInAsync = async () => {
    try {
      const response = await axios.post(
        "https://airbnb-api.now.sh/api/user/log_in",
        {
          email: this.state.email,
          password: this.state.password
        }
      );

      if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
        this.props.navigation.navigate("App");
      }
    } catch (e) {
      alert("Incorrect username or password");
    }
  };
}

export default SignInScreen;

const styles = StyleSheet.create({
  backgroundSignIn: {
    flex: 1,
    backgroundColor: "#EA555C"
  },
  emailInput: {
    height: 35,
    borderColor: "white",
    borderBottomWidth: 0.5,
    marginTop: 30,
    marginHorizontal: 90,
    width: 200,
    borderRadius: 5,
    color: "white"
  },
  passwordInput: {
    height: 35,
    borderColor: "white",
    borderBottomWidth: 0.5,
    marginTop: 15,
    marginHorizontal: 90,
    width: 200,
    borderRadius: 5,
    color: "white"
  },
  loginButton: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    borderRadius: 30,
    marginHorizontal: 70
  },
  login: {
    color: "#EA555C",
    fontSize: 20
  }
});
