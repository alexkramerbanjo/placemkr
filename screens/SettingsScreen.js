import React from "react";
import { Form, Label } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { database } from "../firebase/Fire";
import { View, Alert } from "react-native";
import { Button, Text } from "react-native-elements";

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
    this.sendForm = this.sendForm.bind(this);
  }
  static navigationOptions = {
    title: "app.json"
  };

  sendForm(formData) {
    if (this.state.message) {
      const data = {
        message: this.state.message,
        location: this.state.location,
        title: this.state.title ? this.state.title : "untitled",
        author: this.state.author ? this.state.author : "anonymous"
      };
      console.log(data);
      const lat = Number.parseFloat(data.location.latitude).toFixed(3);
      const long = Number.parseFloat(data.location.longitude).toFixed(3);
      const loc = `madePlaces/${lat}/${long}`.replace(/\./g, "_");
      database
        .ref(`${loc}/texts/${this.state.title.replace(/\W/g, "-")}`)
        .set(data);
      this.setState({ message: "", author: "", title: "" });
    } else {
      Alert.alert("Message must not be empty!");
    }
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
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 10,
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <Text>
          Latitude: {this.state.location.latitude}
          {"\n"}
          Longitude: {this.state.location.longitude}
          {this.state.error ? this.state.error : ""}
        </Text>
        <View>
          <Label>Message: </Label>
          <TextInput
            autoCorrect={false}
            multiline={true}
            style={{
              height: 100,
              borderColor: "gray",
              borderWidth: 2
            }}
            title="message"
            onChangeText={stuff => this.setState({ message: stuff })}
            value={this.state.message}
          />
          <Label>Author: </Label>
          <TextInput
            autoCorrect={false}
            multiline={true}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1
            }}
            title="author"
            onChangeText={name => this.setState({ author: name })}
            value={this.state.author}
          />
          <Label>Title: </Label>
          <TextInput
            autoCorrect={false}
            multiline={true}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1
            }}
            title="title"
            onChangeText={title => this.setState({ title: title })}
            value={this.state.title}
          />
        </View>

        <Button
          onPress={this.sendForm}
          title="Send"
          style={{ width: 100, paddingTop: 20 }}
        >
          <Text>SEND!</Text>
        </Button>
      </View>
    );
  }
}
