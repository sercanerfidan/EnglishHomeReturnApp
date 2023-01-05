import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Main(props: any) {
  const [visible, setVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [returnBarcodeNo, setReturnBarcodeNo] = useState("");
  const [isCameraActive, setCameraStatus] = useState(false);

  const setVisibility = () => {
    setVisible(true);
    props.signOutUser();
  };

  useEffect(() => {
    console.log("userInfo:", props.userInfo.userName);
  }, []);

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    console.log("buraya düştü");
    setHasPermission(status === "granted");
  };

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setCameraStatus(false);
    setReturnBarcodeNo(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  const onChangeReturnBarcodeNo = (args: any) => {
    setReturnBarcodeNo(args);
  };

  const onPressCameraButton = async () => {
    console.log("photo");
    setReturnBarcodeNo("");
    setScanned(false);
    setCameraStatus(true);
    await getBarCodeScannerPermissions();

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  };

  return (
    <>
      {isCameraActive && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {!isCameraActive && (
        <>
          <View
            style={{
              height: 100,
              top: 50,
              maxHeight: 80,
              backgroundColor: "white",
              justifyContent: "center",
              flex: 1,
              flexDirection: "row",
            }}
          >
            <TextInput
              style={styles.input}
              placeholder={"iade barkod no"}
              onChangeText={onChangeReturnBarcodeNo}
              value={returnBarcodeNo}
            />
            <View
              style={{
                height: 100,
                maxWidth: 60,
                top: 20,
                backgroundColor: "white",
                alignContent: "center",
                marginRight: 20,
              }}
            >
              <Icon.Button
                name="camera"
                backgroundColor="#3b5998"
                style={{ paddingLeft: 15 }}
                onPress={onPressCameraButton}
              />
            </View>
          </View>

          <View
            style={{
              height: 50,
              top: 90,
              backgroundColor: "steelblue",
              marginLeft: 5,
              justifyContent: "center",
            }}
          >
            {<Text>{props.userInfo.userName} hoşgeldin!</Text>}
            {/* {visible &&
          Alert.alert(
            "Hey There!",
            "Two button alert dialog",
            [
              { text: "Yes", onPress: () => console.log("Yes button clicked") },
              {
                text: "No",
                onPress: () => console.log("No button clicked"),
                style: "cancel",
              },
            ],
            {
              cancelable: true,
            }
          )} */}
          </View>

          <View
            style={{
              height: 50,
              top: 60,
              backgroundColor: "powderblue",
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            <Button
              title="Sign Out"
              color={"blue"}
              onPress={setVisibility}
            ></Button>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 30,
  },
  input: {
    width: 300,
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
  },
});
