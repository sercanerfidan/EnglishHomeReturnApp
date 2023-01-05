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
import { Picker } from "@react-native-picker/picker";
import { isUserPermittedLogin } from "../services/login-service";
import Main from "./main-page";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { User } from "../model/user";
import Admin from "./admin";

export default function Login() {
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPermittedLogin, setLoginPermissionStatus] = useState(false);
  const [isShowErrorMessage, setErrorMessageStatus] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("admin");
  const [isStoragePersonal, setStoragePersonal] = useState(false);
  const [userInfo, setUserInfo] = useState({} as User);

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
              width: 200,
              height: 80,
              backgroundColor: "white",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 35, top: 20, marginLeft: 10, color: "black" }}
            >
              Sign In
            </Text>
          </View>

          <View
            style={{
              height: 100,
              top: 60,
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
              height: 100,
              top: 60,
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
              height: 60,
              marginLeft: 20,
              marginRight: 20,
              top: 60,
              backgroundColor: "white",
              justifyContent: "center",
            }}
          >
            <Picker
              selectedValue={selectedUserType}
              style={{ backgroundColor: "#CDF4F6" }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedUserType(itemValue)
              }
            >
              <Picker.Item label="Admin" value="admin" />
              <Picker.Item label="Personel" value="personel" />
            </Picker>
          </View>
          <View
            style={{
              height: 60,
              marginLeft: 20,
              marginRight: 20,
              top: 70,
              backgroundColor: "white",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <BouncyCheckbox
              onPress={(isChecked: boolean) => {
                setStoragePersonal(isChecked);
              }}
              style={{ top: -16 }}
            />

            <Text style={styles.label}>Depo Personeli</Text>
          </View>
          <View
            style={{
              height: 80,
              marginLeft: 20,
              marginRight: 20,
              top: 60,
              backgroundColor: "white",
              justifyContent: "center",
            }}
          >
            <Button
              style={{ top: 100, marginLeft: 10, height: 120 }}
              title="Sign In"
              color={"blue"}
              onPress={onButtonClick}
            ></Button>
          </View>
          <View
            style={{
              height: 50,
              width: 200,
              marginLeft: 20,
              top: 40,
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
