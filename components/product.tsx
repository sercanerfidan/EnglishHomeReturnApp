import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";

export default function Product() {
  const [disagreementStatus, setDisagreementStatus] = useState(false);
  const [address, setAddress] = useState("");
  const [disagreementText, setDisagreementText] = useState("");
  const [selectedReturnCode, setSelectedReturnCode] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Admin", value: "admin" },
    { label: "Personel", value: "personel" },
  ]);

  const onAddressChange = (args: any) => {
    setAddress(args);
  };

  const onButtonClick = () => {
    console.log("userx");
  };

  const onChangeDisagreementText = (args: string) => {
    setDisagreementText(args);
  };

  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          maxHeight: hp("60%"),
          bottom: hp("3%"),
          top: hp("10%"),
          flex: 1,
        }}
      >
        <Grid>
          <Row size={30}>
            <Col>
              <BouncyCheckbox
                onPress={(isChecked: boolean) => {
                  // setStoragePersonal(isChecked);
                }}
                style={{ top: hp("8%"), left: hp("3%") }}
              />
            </Col>
            <Col>
              <Image
                source={{
                  uri: "https://reactjs.org/logo-og.png",
                }}
                style={{
                  width: wp("40%"),
                  height: hp("20%"),
                  marginLeft: wp("-15%"),
                }}
              />
            </Col>
            <Col style={{ left: wp("-5%") }}>
              <Row size={25}>
                <Text
                  style={{
                    fontSize: hp("2.5%"),
                    top: hp("1%"),
                    marginLeft: 10,
                    color: "black",
                  }}
                >
                  Ürün Kodu
                </Text>
              </Row>
              <Row size={25}>
                <Text
                  style={{
                    fontSize: hp("2.5%"),
                    top: hp("-0.5%"),
                    marginLeft: 10,
                    color: "black",
                  }}
                >
                  Ürün Barkodu
                </Text>
              </Row>
              <Row size={25}>
                <Text
                  style={{
                    fontSize: hp("2.5%"),
                    marginTop: hp("-1.3%"),
                    marginLeft: 10,
                    color: "black",
                  }}
                >
                  Ürün Adı
                </Text>
              </Row>
              <Row size={25}>
                <Text
                  style={{
                    fontSize: hp("2.5%"),
                    marginTop: hp("-2.5%"),
                    marginLeft: 10,
                    color: "black",
                  }}
                >
                  Ürün Renk
                </Text>
              </Row>
            </Col>
          </Row>
          <Row size={10}>
            <Col>
              <View
                style={{
                  height: hp("5%"),
                  marginLeft: hp("2%"),
                  marginRight: hp("2%"),
                  top: hp("1%"),
                  backgroundColor: "white",
                  justifyContent: "center",
                }}
              >
                <DropDownPicker
                  open={open}
                  onSelectItem={(args: any) =>
                    setSelectedReturnCode(args.value)
                  }
                  placeholder="İade Kodu"
                  value={selectedReturnCode}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              </View>
            </Col>
          </Row>
          <Row size={10}>
            <Col>
              <View
                style={{
                  height: hp("5%"),
                  marginLeft: hp("2%"),
                  marginRight: hp("2%"),
                  top: hp("1%"),
                  backgroundColor: "white",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  placeholder="Adres Kodu"
                  style={styles.input}
                  onChangeText={onAddressChange}
                  value={address}
                />
              </View>
            </Col>
          </Row>
          <Row size={10}>
            <Col>
              <Row>
                <Col style={{ marginLeft: wp("5%") }}>
                  <BouncyCheckbox
                    onPress={(isChecked: boolean) => {
                      setDisagreementStatus(isChecked);
                    }}
                    style={{ top: hp("-0.2%") }}
                  />
                </Col>
                <Col style={{ marginLeft: wp("-5%") }}>
                  <Text style={styles.label}>Uyuşmazlık</Text>
                </Col>
              </Row>
            </Col>
            <Col></Col>
          </Row>
          <Row size={10}>
            <Col>
              <Text
                style={{
                  fontSize: 35,
                  maxHeight: 40,
                  top: 20,
                  marginLeft: 10,
                  color: "black",
                }}
              >
                Test
              </Text>
            </Col>
            <Col>
              <Text
                style={{
                  fontSize: 35,
                  maxHeight: 40,
                  top: 20,
                  marginLeft: 10,
                  color: "black",
                }}
              >
                Test 2
              </Text>
            </Col>
          </Row>
        </Grid>
      </View>
      {/* <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          maxHeight: hp("60%"),
          bottom: hp("3%"),
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            height: hp("20%"),
            top: hp("3%"),
            marginLeft: wp("-2%"),
            marginRight: 20,
            backgroundColor: "white",
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 0.1 }}>
            <BouncyCheckbox
              onPress={(isChecked: boolean) => {
                // setStoragePersonal(isChecked);
              }}
              style={{ top: hp("-0.2%") }}
            />
          </View>
          <View style={{ flex: 0.3 }}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: "https://reactnative.dev/img/tiny_logo.png",
              }}
            />
          </View>
          <View style={{ flex: 0.6 }}>
            <View
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                maxHeight: hp("20%"),
                bottom: hp("3%"),
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 35,
                  maxHeight: 40,
                  top: 20,
                  marginLeft: 10,
                  color: "black",
                }}
              >
                Ürün Kodu
              </Text>
              <Text
                style={{
                  fontSize: 35,
                  maxHeight: 40,
                  top: 20,
                  marginLeft: 10,
                  color: "black",
                }}
              >
                Ürün Barkodu
              </Text>
              <Text
                style={{
                  fontSize: 35,
                  maxHeight: 40,
                  top: 20,
                  marginLeft: 10,
                  color: "black",
                }}
              >
                Ürün Adı
              </Text>
              <Text
                style={{
                  fontSize: 35,
                  maxHeight: 40,
                  top: 20,
                  marginLeft: 10,
                  color: "black",
                }}
              >
                Ürün Renk
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: hp("30%"),
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: "white",
            justifyContent: "center",
          }}
        >
          <DropDownPicker
            open={open}
            onSelectItem={(args: any) => setSelectedReturnCode(args.value)}
            value={selectedReturnCode}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />

          <Text
            style={{
              fontSize: 35,
              maxHeight: 40,
              top: 20,
              marginLeft: 10,
              color: "black",
            }}
          >
            Resim Yükleme Kısmı
          </Text>

          <TextInput
            placeholder="Adres Kodu"
            style={styles.input}
            onChangeText={onAddressChange}
            value={address}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            height: hp("20%"),
            top: hp("3%"),
            marginLeft: wp("-2%"),
            marginRight: 20,
            backgroundColor: "white",
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 0.1 }}>
            <BouncyCheckbox
              onPress={(isChecked: boolean) => {
                setDisagreementStatus(isChecked);
              }}
              style={{ top: hp("-0.2%") }}
            />
          </View>
          <View style={{ flex: 0.8 }}>
            <Text style={styles.label}>Uyuşmazlık</Text>
          </View>
        </View>

        <TextInput
          multiline={true}
          numberOfLines={4}
          onChangeText={onChangeDisagreementText}
          value={disagreementText}
        />
      </View> */}
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
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});
