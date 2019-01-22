/* eslint-disable */ /**
 * @flow
 */
import { firebase, database, storageRef } from "../firebase/Fire";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

import { Form, Label } from "native-base";

import {
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { Button } from "react-native-elements";
import Expo, { Asset, Audio, FileSystem, Font, Permissions } from "expo";
import {
  Recorder,
  Player
} from "react-native-audio-player-recorder-no-linking";

export default class AudioRecordingScreen extends React.Component {
  constructor() {
    super();
    this.uploadHandle = this.uploadHandle.bind(this);
    this.comp = this.comp.bind(this);
    this.state = {
      location: {},
      audio: {},
      title: "untitled",
      author: "anonymous"
    };
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

  uploadHandle = async () => {
    if (this.state.recording && this.state.isDoneRecording) {
      const info = await FileSystem.getInfoAsync(this.recording.getURI());
      const uri = info.uri;
      console.log("URI IS HERE JAHH  \n\n", uri);
    }
  };

  async comp(rec) {
    this.setState({
      audio: {
        uri: rec.uri,
        type: "audio/caf",
        name: this.state.title
      }
    });
    const lat = Number.parseFloat(this.state.location.latitude).toFixed(3);
    const long = Number.parseFloat(this.state.location.longitude).toFixed(3);
    const loc = `madePlaces/${lat}/${long}`.replace(/\./g, "_");
    const title = this.state.title.replace(/\W/g, "-");

    console.log("ON COMPLETE RAN AND THE URI IS HERE: ", rec.uri);
    try {
      const file = await FileSystem.readAsStringAsync(rec.uri);
      const fileRef = storageRef.child(`${loc}/sounds/${this.state.title}.caf`);
      await fileRef.putString(file);
    } catch (er) {
      console.log(er);
    }
  }

  render() {
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
        <Recorder
          props={this.comp}
          style={{ flex: 1 }}
          onComplete={this.comp}
          maxDurationMillis={150000}
          showDebug={false}
          showBackButton={true}
          audioMode={{
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            playsInSilentLockedModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
          }}
          resetButton={renderProps => {
            return (
              <Button
                title="reset"
                onPress={renderProps.onPress}
                danger
                block
                style={{ marginVertical: 5 }}
              >
                <Text>Reset</Text>
              </Button>
            );
          }}
          recordingCompleteButton={renderProps => {
            return (
              <Button
                title="Save Recording"
                onPress={renderProps.onPress}
                block
                success
                style={{ marginVertical: 5 }}
              >
                <Text>Finish</Text>
              </Button>
            );
          }}
          playbackSlider={renderProps => {
            console.log({ "maximumValue: ": renderProps.maximumValue });
            return (
              <Slider
                minimimValue={0}
                maximumValue={renderProps.maximumValue}
                onValueChange={renderProps.onSliderValueChange}
                value={renderProps.value}
                style={{
                  width: "100%"
                }}
              />
            );
          }}
        />
        <Text>
          Latitude: {this.state.location.latitude}
          {"\n"}
          Longitude: {this.state.location.longitude}
          {this.state.error ? this.state.error : ""}
        </Text>
        <View>
          <Label>Creator: </Label>
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
