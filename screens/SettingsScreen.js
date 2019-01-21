import React from "react";
import { ExpoConfigReact } from "@expo/samples";
import { Form, Button, Text, Label } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { firestore } from "../firebase/firebaseInfo";

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
    title: "Text Input Screen"
  };

  sendForm() {
    // const data = {
    //   location: this.state.location,
    //   title: this.state.title,
    //   author: this.state.author,
    //   message: this.state.message
    // };
    // const lat = Number.parseFloat(data.location.latitude).toFixed(4);
    // const long = Number.parseFloat(data.location.longitude).toFixed(4);
    // firestore
    //   .collection(`/madePlaces/${lat}_${long}/texts/${this.state.title}`)
    //   .set();
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      posit =>
        this.setState({
          location: {
            longitude: posit.coords.longitude,
            latitude: posit.coords.latitude
          }
        }),
      err => this.setState({ error: err.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    /* Go ahead and delete ExpoConfigReact.Fragment and replace it with your
     * content, we just wanted to give you a quick React.Fragment of your config */
    return (
      <React.Fragment>
        <Text>
          Latitude: {this.state.location.latitude}
          {"\n"}
          Longitude: {this.state.location.longitude}
          {this.state.error ? this.state.error : ""}
        </Text>
        <React.Fragment>
          <Label>message: </Label>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={stuff => this.setState({ message: stuff })}
            value={this.state.message}
          />
          <Label>author: </Label>

          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={name => this.setState({ author: name })}
            value={this.state.author}
          />
          <Label>title: </Label>

          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={title => this.setState({ title: title })}
            value={this.state.title}
          />
        </React.Fragment>
        <Button
          onPress={this.sendForm}
          title="Send"
          style={{ width: 100, paddingTop: 20 }}
        >
          <Text>Send!</Text>
        </Button>
      </React.Fragment>
    );
  }
}
