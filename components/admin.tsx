import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { User } from "../model/user";

export default function Admin(props: any) {
  const [visible, setVisible] = useState(false);
  const setVisibility = () => {
    setVisible(true);
    props.signOutUser();
  };

  useEffect(() => {
    console.log("AdminPage UserInfo:", props.userInfo.userName);
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          height: 50,
          backgroundColor: "steelblue",
          marginLeft: 5,
        }}
      >
        {<Text>Admin sayfasına hoşgeldin {props.userInfo.userName} </Text>}
        {/* {visible &&
          Alert.alert(
            "Hey There!",
            "Two button alert dialog",
            [
              { text: "Yes", onPress: () => console.log("Yes button clicked") },
              {
                text: "No",



                1w1w4 
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
          flex: 1,
          flexDirection: "column",
          height: 50,
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

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    backgroundColor: "powderblue",
    alignItems: "center",
    justifyContent: "center",
  },
});
