import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import OtherScreen from "./OtherScreen";
import { Ionicons } from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        switch (routeName) {
          case "Home":
            iconName = "ios-home";

            break;
          case "Settings":
            iconName = "ios-settings";

            break;
          default:
            iconName = null;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let headerTitle;

  switch (routeName) {
    case "Home":
      headerTitle = "Mon Airbnb";
      break;
    case "Settings":
      headerTitle = null;
      break;
    default:
      headerTitle = routeName;
  }

  return {
    headerTitle: headerTitle,
    headerStyle: {
      backgroundColor: "#FF595E",
      shadowOpacity: 0,
      borderBottomWidth: 0
    },
    headerTitleStyle: {
      color: "white"
    },
    headerBackTitle: null
  };
};

export default TabNavigator;
