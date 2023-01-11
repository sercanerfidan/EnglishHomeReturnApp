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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { isUserPermittedLogin } from "../services/login-service";
import Main from "./main-page";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { User } from "../model/user";
import Admin from "./admin";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Login() {
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPermittedLogin, setLoginPermissionStatus] = useState(true);
  const [isShowErrorMessage, setErrorMessageStatus] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("asd");
  const [isStoragePersonal, setStoragePersonal] = useState(false);
  const [userInfo, setUserInfo] = useState({} as User);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Admin", value: "admin" },
    { label: "Personel", value: "personel" },
  ]);

  const setVisibility = () => {
    setVisible(true);
  };

  const onChangeUserName = (args: any) => {
    setUserName(args);
  };
  const onChangePassword = (args: any) => {
    setPassword(args);
  };

  const onButtonClick = () => {
    console.log("userx: ", userName);
    console.log("isStorage: ", isStoragePersonal);
    console.log("selectedUserType: ", selectedUserType);

    let result: boolean = isUserPermittedLogin(userName, password);
    let userInfo = {} as User;
    setErrorMessageStatus(!result);
    setLoginPermissionStatus(result);
    if (result) {
      userInfo.userName = userName;
      userInfo.password = password;
      userInfo.userType = selectedUserType;
      userInfo.isStoragePersonal = isStoragePersonal;
      setUserInfo(userInfo);
    }
  };

  const signOutUser = () => {
    setLoginPermissionStatus(false);
  };

  return (
    <>
      {isShowErrorMessage &&
        Alert.alert(
          "Uyarı",
          "Geçersiz kullanıcı adı veya şifre",
          [
            {
              text: "Ok",
              onPress: () => {
                console.log("Ok button clicked");
                setErrorMessageStatus(false);
              },
            },
          ],
          {
            cancelable: true,
          }
        )}
      {!isPermittedLogin && (
        <>
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              maxHeight: hp("20%"),
              bottom: hp("3%"),
              flex: 1,
            }}
          >
            {/* <View style={{ flex: 0.3 }}> */}
            <Text
              style={{
                fontSize: 35,
                top: 20,
                marginLeft: 10,
                color: "black",
              }}
            >
              Sign In
            </Text>
            {/* </View> */}
            {/* 
            <View style={{ backgroundColor: "blue", flex: 0.7 }}>
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
            </View> */}
          </View>

          <View
            style={{
              height: hp("15%"),
              backgroundColor: "white",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                textAlign: "left",
                color: "#080808",
                marginLeft: 20,
              }}
            >
              User Name:
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeUserName}
              value={userName}
            />
          </View>
          <View
            style={{
              height: hp("15%"),
              backgroundColor: "white",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                textAlign: "left",
                color: "#080808",
                marginLeft: 20,
              }}
            >
              Password :
            </Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              onChangeText={onChangePassword}
              value={password}
            />
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
              onSelectItem={(args: any) => setSelectedUserType(args.value)}
              value={selectedUserType}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />

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
                    setStoragePersonal(isChecked);
                  }}
                  style={{ top: hp("-0.2%") }}
                />
              </View>
              <View style={{ flex: 0.8 }}>
                <Text style={styles.label}>Depo Personeli</Text>
              </View>
            </View>

            <View
              style={{
                height: hp("10%"),
                marginLeft: 5,
                marginRight: 5,
                backgroundColor: "white",
                justifyContent: "center",
              }}
            >
              <Button
                style={{ marginLeft: 10, height: 120, top: hp("10%") }}
                title="Sign In"
                color={"blue"}
                onPress={onButtonClick}
              ></Button>
            </View>
            <View
              style={{
                height: hp("5%"),
                width: 200,
                marginLeft: 20,
                backgroundColor: "white",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "blue" }}
                onPress={() => Linking.openURL("http://google.com")}
              >
                Forgot Password?
              </Text>
            </View>
            {/* <Picker
              selectedValue={selectedUserType}
              style={{ backgroundColor: "#CDF4F6", maxHeight: hp("10%") }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedUserType(itemValue)
              }
            >
              <Picker.Item label="Admin" value="admin" />
              <Picker.Item label="Personel" value="personel" />
            </Picker> */}
          </View>
          {/* <View
            style={{
              height: hp("10%"),
              marginLeft: 20,
              marginRight: 20,
              backgroundColor: "white",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
          </View> */}
        </>
      )}
      {isPermittedLogin && selectedUserType !== "admin" && (
        <>
          <Main userInfo={userInfo} signOutUser={signOutUser} />
        </>
      )}
      {isPermittedLogin && selectedUserType === "admin" && (
        <>
          <Admin userInfo={userInfo} signOutUser={signOutUser} />
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
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
  },
});
