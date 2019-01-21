import React from "react";
import { Form, Button } from "native-base";
import { View } from "expo-graphics";
import { TextInput } from "react-native-gesture-handler";
import { database } from "../firebase/Fire";

function showDistance(lat1, long1, lat2, long2) {
  var distance = distanceInKmBetweenEarthCoordinates(lat1, long1, lat2, long2);
  var distance_mile = distance * 0.62137119224;
  var distance_nautical_miles = distance * 0.539957;
  var distance_meters = distance * 1000;
  document.getElementById("distance").innerHTML =
    "The distance is between the two gps coordinates is <br /><b>" +
    distance.toFixed(2) +
    "</b> KM or <br /><b>" +
    distance_mile.toFixed(2) +
    "</b> Miles or <br /><b>" +
    distance_nautical_miles.toFixed(2) +
    "</b> Nautical miles or <br /><b>" +
    distance_meters.toFixed(2) +
    "</b> meters";
}

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      author: "",
      title: "",
      location: { latitude: null, longitude: null },
      error: null
    };
  }
  static navigationOptions = {
    title: "app.json"
  };

  sendForm(formData) {
    const data = {
      location: this.state.location,
      title: this.state.title,
      author: this.state.author,
      message: this.state.message
    };
    const lat = Number.parseFloat(data.location.latitude).toFixed(4);
    const long = Number.parseFloat(data.location.longitude).toFixed(4);
    database.ref(`${lat}_${long}/texts/${this.state.title}`).set();
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

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <Text>
          Latitude: {this.state.latitude}
          {"\n"}
          Longitude: {this.state.longitude}
          {this.state.error ? this.state.error : ""}
        </Text>
        <View>
          <TextInput
            onChangeText={stuff => this.setState({ message: stuff })}
            value={this.state.message}
          />
          <TextInput
            onChangeText={name => this.setState({ author: name })}
            value={this.state.author}
          />
          <TextInput
            onChangeText={title => this.setState({ title: name })}
            value={this.state.title}
          />
        </View>

        <Button
          onPress={this.sendForm}
          title="Send"
          style={{ width: 100, paddingTop: 20 }}
        />
      </View>
    );
  }
}
