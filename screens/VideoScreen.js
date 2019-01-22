import React from "react";
import {
  Button,
  Image,
  View,
  Alert,
  TextInput,
  ScrollView
} from "react-native";
import { Label } from "native-base";
import { ImagePicker, Permissions, Camera } from "expo";
import { Platform } from "expo-core";
import firebase from "firebase";
import { storageRef } from "../firebase/Fire";

export default class VideoImagePicker extends React.Component {
  static navigationOptions = {
    title: "Video/Image"
  };
  constructor() {
    super();
    this.state = {
      image: null,
      location: {},
      title: "untitled",
      author: "anonymous"
    };
    this._shootImage = this._shootImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this._pickImage = this._pickImage.bind(this);
    this.tryUploadImage = this.tryUploadImage.bind(this);
  }

  async checkMultiPermissions() {
    const { status, expires, permissions } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.AUDIO_RECORDING,
      Permissions.CAMERA_ROLL
    );
    if (status !== "granted") {
      alert("Hey! You heve not enabled selected permissions");
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
    this.checkMultiPermissions();
  }

  render() {
    let { image } = this.state;
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
          justifyContent: "space-around"
        }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Label>Author: </Label>
          <TextInput
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
        </ScrollView>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <Button title="Take an image or video now" onPress={this._shootImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Button title="Upload" onPress={this.tryUploadImage} />
      </View>
    );
  }

  tryUploadImage() {
    console.log(this.state.image);
    if (this.state.image) {
      const uri = this.state.image;
      this.uploadImage(uri)
        .then(() => {
          Alert.alert("Success!");
        })
        .catch(err => {
          Alert.alert("Something went wrong.", err);
        });
    }
  }

  uploadImage = async uri => {
    const lat = Number.parseFloat(this.state.location.latitude).toFixed(3);
    const long = Number.parseFloat(this.state.location.longitude).toFixed(3);
    const loc = `madePlaces/${lat}/${long}`.replace(/\./g, "_");
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storageRef.child(
      `madePlaces/${loc}/${this.state.title.replace(/\W/g, "-")}.jpg`
    );
    return ref.put(blob, { contentType: "image/jpeg" });
  };

  _shootImage = async () => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}
