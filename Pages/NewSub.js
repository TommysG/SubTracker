import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "../axios";
import firebase from "../firebase";
import * as ImagePicker from "expo-image-picker";

const selections = ["Weekly", "Monthly", "Yearly"];

export default function NewSub() {
  const [period, setPeriod] = useState(selections[0]);
  const [dateOne, setDateOne] = useState(new Date());
  const [dateTwo, setDateTwo] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [subName, setSubName] = useState("");
  const [fee, setFee] = useState(0);
  const [description, setDescription] = useState("");

  const onChangeFirst = (event, selectedDate) => {
    const currentDate = selectedDate || dateOne;
    setShowFirst(Platform.OS === "ios");
    setDateOne(currentDate);
  };

  const onChangeSecond = (event, selectedDate) => {
    const currentDate = selectedDate || dateTwo;
    setShowSecond(Platform.OS === "ios");
    setDateTwo(currentDate);
  };

  const showModeOne = (currentMode) => {
    setShowFirst(true);
    setMode(currentMode);
  };

  const showModeTwo = (currentMode) => {
    setShowSecond(true);
    setMode(currentMode);
  };

  const showDatepickerOne = () => {
    showModeOne("date");
  };

  const showDatepickerTwo = () => {
    showModeTwo("date");
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const addSub = () => {
    setUploading(true);
    let localUri = image.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("image", { uri: localUri, name: filename, type });
    formData.append("name", subName);
    formData.append("user_id", firebase.default.auth().currentUser.uid);
    formData.append("description", description);
    formData.append("fee", fee);
    formData.append("period", period);

    axios
      .post("/subscriptions/new", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.status === 200) setUploading(false);
      })
      .catch((err) => alert(err));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <TouchableOpacity onPress={pickImage}>
            {image && (
              <Image source={{ width: 100, height: 100, uri: image.uri }} />
            )}
          </TouchableOpacity>
        </View>
        <Button color="#8963c6" title="Select an Image" onPress={pickImage} />

        <View style={{ paddingTop: 20, paddingBottom: 20 }}>
          <MyTextInput
            placeholder="e.g Netflix"
            title="Sub name"
            setText={setSubName}
          />
        </View>

        <View style={{ paddingBottom: 20 }}>
          <MyTextInput
            placeholder="e.g Family Netflix subscription"
            title="Description"
            setText={setDescription}
          />
        </View>

        <View style={{ flexDirection: "row", paddingBottom: 20 }}>
          <InputWithButton
            title="Start date"
            value={dateOne}
            showDatepicker={showDatepickerOne}
            left
          />
          <InputWithButton
            title="End date"
            value={dateTwo}
            showDatepicker={showDatepickerTwo}
            right
          />
          {showFirst && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateOne}
              mode={mode}
              display="default"
              onChange={onChangeFirst}
            />
          )}
          {showSecond && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateTwo}
              mode={mode}
              display="default"
              onChange={onChangeSecond}
            />
          )}
        </View>

        {/* Fee input */}
        <View>
          <Text>Fee</Text>
          <View
            style={{
              borderColor: "#8963c6",
              borderWidth: 1,
              flexDirection: "row",
              overflow: "hidden",
              borderRadius: 10,
            }}
          >
            <Text style={styles.feeText}>€</Text>
            <TextInput
              style={{ flex: 1, paddingLeft: 15, fontSize: 18 }}
              placeholder="e.g 5"
              keyboardType="number-pad"
              onChangeText={(text) => setFee(text)}
            />
            <Picker
              selectedValue={period}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setPeriod(itemValue)}
            >
              <Picker.Item label="Weekly" value="Weekly" />
              <Picker.Item label="Monthly" value="Monthly" />
              <Picker.Item label="Yearly" value="Yearly" />
            </Picker>
            <View style={styles.arrowWrapper}>
              <Text style={styles.arrow}></Text>
            </View>
          </View>
        </View>

        <View
          style={{ paddingTop: 25, paddingHorizontal: 50, marginBottom: 25 }}
        >
          <Button
            color="#8963c6"
            title="Add subscription"
            onPress={() => addSub()}
          />
          {uploading && <Text>Uploading sub...</Text>}
        </View>
      </ScrollView>
    </View>
  );
}

const MyTextInput = ({ title, setText, placeholder, wide, left }) => {
  return (
    <View
      style={[
        wide && { flex: 1 },
        left && wide && { marginRight: 10 },
        !left && wide && { marginLeft: 10 },
      ]}
    >
      <Text>{title}</Text>
      <View style={styles.textInputBox}>
        <TextInput
          placeholder={placeholder}
          style={{ fontSize: 18 }}
          onChangeText={(text) => setText(text)}
        />
      </View>
    </View>
  );
};

const InputWithButton = ({ title, value, left, right, showDatepicker }) => {
  return (
    <View
      style={[
        { flex: 1 },
        left && { marginRight: 10 },
        right && { marginLeft: 15 },
      ]}
    >
      <Text>{title}</Text>
      <View style={[styles.textInputBox, { flexDirection: "row" }]}>
        <TextInput
          editable={false}
          value={`${value.getDate()}/${value.getMonth()}/${value.getFullYear()}`}
          style={{ flex: 1, fontSize: 18, color: "#424242" }}
        />
        <TouchableOpacity onPress={showDatepicker}>
          <Fontisto name="date" size={24} color="#8963c6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  headerContainer: {
    paddingBottom: 25,
  },

  textInputBox: {
    borderColor: "#8963c6",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },

  textBig: {
    fontSize: 20,
  },

  feeText: {
    backgroundColor: "#8963c6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: "white",
    fontSize: 24,
  },

  picker: {
    width: 150,
    height: "100%",
    borderBottomWidth: 2,
    flex: 1,
    color: "white",
    backgroundColor: "#8963c6",
  },

  arrowWrapper: {
    height: 40,
    marginLeft: -130,
    justifyContent: "center",
  },
});
