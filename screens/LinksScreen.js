import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { database } from "../firebase/Fire";
import { Card, Button } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});

export default class PositionScreen extends React.Component {
  static navigationOptions = {
    title: "View Local Art"
  };

  constructor() {
    super();
    this.state = {
      location: { latitude: null, longitude: null },
      error: null,
      renderCount: 0,
      localArt: []
    };
    this.getArt = this.getArt.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      posit =>
        this.setState(prevState => ({
          location: {
            longitude: posit.coords.longitude,
            latitude: posit.coords.latitude
          }
        })),
      err => this.setState({ error: err.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getArt = async () => {
    const art = [];
    this.setState({ localArt: art });
    const lat = Number.parseFloat(this.state.location.latitude).toFixed(3);
    const long = Number.parseFloat(this.state.location.longitude).toFixed(3);
    const loc = `madePlaces/${lat}/${long}/texts`.replace(/\./g, "_");
    const ref = database.ref(loc);
    ref.orderByValue().on("value", snapshot => {
      snapshot.forEach(data => {
        if (data.val().message) {
          this.setState(prevState => ({
            localArt: [...prevState.localArt, data.val()]
          }));
        }
      });
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Button onPress={this.getArt} title="Get Local Art!" />
        </View>
        <View>
          {this.state.localArt.map((art, index) => (
            <Card key={index}>
              <Text
                style={{ fontWeight: "bold", textDecorationLine: "underline" }}
              >
                {art.title}
              </Text>
              <Text>{art.message}</Text>
              <Text>By {art.author}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    );
  }
}
