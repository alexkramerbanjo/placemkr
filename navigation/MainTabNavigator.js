import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import PositionScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ARScreen from "../screens/ARScreen";
import VideoImagePicker from "../screens/VideoScreen";

const VideoImageScreenStack = createStackNavigator({
  VideoImage: VideoImagePicker
});

VideoImageScreenStack.navigationOptions = {
  tabBarLabel: "Video/Image",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const PositionScreenStack = createStackNavigator({
  Position: PositionScreen
});

PositionScreenStack.navigationOptions = {
  tabBarLabel: "View Local Art",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Create Text",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

const ARScreenStack = createStackNavigator({
  AudioScreen: ARScreen
});

ARScreenStack.navigationOptions = {
  tabBarLabel: "Audio",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  VideoImageScreenStack,
  PositionScreenStack,
  SettingsStack,
  ARScreenStack
});
