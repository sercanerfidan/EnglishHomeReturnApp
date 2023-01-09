import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import RenderHtml from "react-native-render-html";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Main(props: any) {
  const [visible, setVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [returnBarcodeNo, setReturnBarcodeNo] = useState("");
  const [isCameraActive, setCameraStatus] = useState(false);

  const [scannedProduct, setScannedProduct] = useState(false);
  const [returnProductBarcodeNo, setReturnProductBarcodeNo] = useState("");
  const [isCameraActiveForProduct, setCameraStatusForProduct] = useState(false);

  const [isShowProductBarcodeList, setProductBarcodeListVisibility] =
    useState(false);

  const [barcodeList, setBarcodeList] = useState([] as any);
  const [manuelProductBarcode, setManuelProductBarcode] = useState("");

  const source = {
    html: `
  <p style='text-align:center;'>
   Html item!
  </p>`,
  };

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

  const handleBarcodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setCameraStatus(false);
    setReturnBarcodeNo(data);
    alert(
      `Return Barcode with type ${type} and data ${data} has been scanned!`
    );
  };

  const handleProdcutBarcodeScanned = ({ type, data }: any) => {
    setScannedProduct(true);
    setCameraStatusForProduct(false);
    setReturnProductBarcodeNo(data);
    alert(
      `Product Barcode with type ${type} and data ${data} has been scanned!`
    );

    const item = { key: data };
    let newList = [] as any;
    newList.push(item);
    setBarcodeList([...newList, ...barcodeList]);
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

  const onChangeReturnProdcutBarcodeNo = (args: any) => {
    setReturnProductBarcodeNo(args);
  };

  const onChangeManuelBarcodeNo = (args: any) => {
    setManuelProductBarcode(args);
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

  const onPressCameraButtonProduct = async () => {
    console.log("photo");
    setReturnProductBarcodeNo("");
    setScannedProduct(false);
    setCameraStatusForProduct(true);
    await getBarCodeScannerPermissions();

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  };

  const onPressPlayButton = async () => {
    if (isShowProductBarcodeList) {
      setProductBarcodeListVisibility(false);
    } else {
      setProductBarcodeListVisibility(true);
    }
  };

  const onPressPlusButtonProduct = async () => {
    if (manuelProductBarcode) {
      const item = { key: manuelProductBarcode };
      let newList = [] as any;
      newList.push(item);
      setBarcodeList([...newList, ...barcodeList]);
      console.log("barcodeList: ", barcodeList);
    }
  };

  return (
    <>
      {isCameraActive && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {isCameraActiveForProduct && (
        <BarCodeScanner
          onBarCodeScanned={
            scannedProduct ? undefined : handleProdcutBarcodeScanned
          }
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {!isCameraActive && !isCameraActiveForProduct && (
        <>
          <View
            style={{
              top: hp("8%"),
              maxHeight: hp("10%"),
              backgroundColor: "white",
              justifyContent: "center",
              flex: 1,
              flexDirection: "row",
            }}
          >
            <TextInput
              style={styles.input}
              placeholder={"İade barkod no"}
              onChangeText={onChangeReturnBarcodeNo}
              value={returnBarcodeNo}
            />
            <View
              style={{
                top: hp("3%"),
                backgroundColor: "white",
                alignContent: "center",
                flex: 0.2,
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
              top: hp("8%"),
              maxHeight: hp("10%"),
              backgroundColor: "white",
              justifyContent: "center",
              flex: 1,
              flexDirection: "row",
            }}
          >
            <TextInput
              style={styles.input}
              placeholder={"Ürün barkod no"}
              onChangeText={onChangeReturnProdcutBarcodeNo}
              value={returnProductBarcodeNo}
            />
            <View
              style={{
                top: hp("3%"),
                flex: 0.2,
                backgroundColor: "white",
                alignContent: "center",
                marginRight: 20,
              }}
            >
              <Icon.Button
                name="camera"
                backgroundColor="#3b5998"
                style={{ paddingLeft: 15 }}
                onPress={onPressCameraButtonProduct}
              />
            </View>
          </View>
          {/* <View
            style={{
              height: hp("7%"),
              top: hp("10%"),
              backgroundColor: "steelblue",
              marginLeft: 5,
              justifyContent: "center",
            }}
          >
            {<Text>{props.userInfo.userName} hoşgeldin!</Text>} */}
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
          {/* </View> */}

          <View
            style={{
              top: hp("8%"),
              maxHeight: hp("10%"),
              backgroundColor: "white",
              justifyContent: "center",
              flex: 1,
              flexDirection: "row",
            }}
          >
            <TextInput
              style={styles.manuelBarcodeInput}
              placeholder={"Barkodsuz ürün elle gir"}
              onChangeText={onChangeManuelBarcodeNo}
              value={manuelProductBarcode}
            />
            <View
              style={{
                top: hp("3%"),
                flex: 0.2,
                backgroundColor: "white",
                alignContent: "center",
                marginRight: 20,
              }}
            >
              <Icon.Button
                name="plus"
                allowFontScaling={true}
                backgroundColor="#3b5998"
                style={{ paddingLeft: hp("2%") }}
                onPress={onPressPlusButtonProduct}
              />
            </View>
            <View
              style={{
                top: hp("3%"),
                flex: 0.2,
                backgroundColor: "white",
                marginRight: 20,
              }}
            >
              <Icon.Button
                name="play"
                allowFontScaling={true}
                backgroundColor="#3b5998"
                style={{ paddingLeft: hp("2%") }}
                onPress={onPressPlayButton}
              />
            </View>
          </View>

          {isShowProductBarcodeList && (
            <View
              style={{
                top: hp("8%"),
                marginLeft: wp("5%"),
                maxHeight: hp("50%"),
                backgroundColor: "white",
                justifyContent: "center",
                flex: 1,
                flexDirection: "row",
              }}
            >
              <FlatList
                data={barcodeList}
                renderItem={({ item }: any) => (
                  <>
                    <RenderHtml
                      source={{
                        html: `
                      <p style='text-align:left; margin-top:0'>
                      ${item.key}
                      </p>`,
                      }}
                    />
                    {/* <Text style={styles.item}>{item.key}</Text> */}
                  </>
                )}
              />
            </View>
          )}

          <View
            style={{
              maxHeight: hp("30%"),
              top: hp("12%"),
              marginLeft: wp("10%"),
              marginRight: wp("10%"),
            }}
          >
            <Button
              title="Onayla"
              color={"#16A935"}
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
    flex: 0.9,
    height: hp("5.5%"),
    margin: 20,
    borderWidth: 1,
    padding: 10,
  },
  manuelBarcodeInput: {
    flex: 0.7,
    height: hp("5.5%"),
    margin: 20,
    borderWidth: 1,
    padding: 10,
  },
});
