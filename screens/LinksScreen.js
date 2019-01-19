import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ExpoLinksView } from "@expo/samples";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});

export default class PositionScreen extends React.Component {
  static navigationOptions = {
    title: "GPS Position"
  };

  constructor() {
    super();
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      renderCount: 0
    };
  }

  componentDidUpdate() {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        posit =>
          this.setState(prevState => ({
            longitude: posit.coords.longitude,
            latitude: posit.coords.latitude,
            renderCount: prevState.renderCount + 1
          })),
        err => this.setState({ error: err.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }, 5000);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      posit =>
        this.setState(prevState => ({
          longitude: posit.coords.longitude,
          latitude: posit.coords.latitude,
          renderCount: prevState.renderCount + 1
        })),
      err => this.setState({ error: err.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Text>
            Latitude: {this.state.latitude}
            {"\n"}
            Longitude: {this.state.longitude}
            {this.state.error ? this.state.error : ""}
          </Text>
          <Text>Renders: {this.state.renderCount}</Text>
        </View>
      </ScrollView>
    );
  }
}
