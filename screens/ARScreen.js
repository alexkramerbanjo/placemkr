/* eslint-disable */ /**
 * @flow
 */
import { firebase, database, storageRef } from "../firebase/Fire";
import React from "react";
import {
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button
} from "react-native";
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
  }

  uploadHandle = async () => {
    if (this.state.recording && this.state.isDoneRecording) {
      const info = await FileSystem.getInfoAsync(this.recording.getURI());
      const uri = info.uri;
      console.log("URI IS HERE JAHH  \n\n", uri);
    }
  };

  async comp(rec) {
    console.log("ON COMPLETE RAN AND THE URI IS HERE: ", rec.uri);
    try {
      const file = await FileSystem.writeAsStringAsync(rec.uri);
      const fileRef = await storageRef.child(`/sounds/one.caf`);
      await storageRef.put(file);
    } catch (er) {
      console.log(er);
    }
  }

  render() {
    return (
      <Recorder
        style={{ flex: 1 }}
        onComplete={this.comp}
        maxDurationMillis={150000}
        showDebug={true}
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
    );
  }
}
