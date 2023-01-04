import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, Linking, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
  const [visible, setVisible] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const setVisibility = () => {
    setVisible(true)
  }

  const onChangeUserName = (args: any) => {
    setUserName(args)
  }
  const onChangePassword = (args: any) => {
    setPassword(args)
  }

  const onButtonClick = () => {
    console.log('userx: ', userName)

  }


  return (
    <>
         <View style={{ width: 200, height: 80, backgroundColor: 'white', justifyContent: 'center' }} >

         <Text style={{ fontSize: 35, top: 20, marginLeft: 10, color: 'black'}}>Sign In</Text>

       </View>


{/* <View style={{ flex: 1 , flexDirection:'row' , top : 80, maxHeight: 100, width: 400, height: 80, backgroundColor: '#FF1744', justifyContent: 'center' }} >
<View style={{ flex: 1 , flexDirection:'column' , maxHeight: 100, width: 200, height: 80, backgroundColor: '#FF1744', justifyContent: 'center' }} >
<Text style={{fontSize: 22, textAlign: 'center', color: '#fff'}}> View 2 </Text>

</View>
<View style={{ flex: 1 , flexDirection:'column' , maxHeight: 100, width: 200, height: 80, backgroundColor: '#FF1744', justifyContent: 'center' }} >
<Text style={{fontSize: 22, textAlign: 'center', color: '#fff'}}> View 3 </Text>

</View>

</View> */}


<View style={{  height: 100, top: 60, backgroundColor: 'white', justifyContent: 'center' }} >

<Text style={{fontSize: 22, textAlign: 'left', color: '#fff', marginLeft: 20}}> User Name: </Text>
<TextInput
        style={styles.input}
        onChangeText={onChangeUserName}
        value={userName}
      />

</View>
<View style={{  height: 100, top: 60, backgroundColor: 'white', justifyContent: 'center' }} >

<Text style={{fontSize: 22, textAlign: 'left', color: '#fff', marginLeft: 20}}> Password : </Text>
<TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
      />

</View>
<View style={{  height: 120, marginLeft: 20, marginRight: 20, top: 60, backgroundColor: 'white', justifyContent: 'center' }} >

<Button style={{ top: 100, marginLeft: 10, height: 120}} title='Sign In' color={'blue'} onPress={onButtonClick}></Button>

</View>
<View style={{  height: 50, width: 200, marginLeft: 20, top: 20, backgroundColor: 'white', justifyContent: 'center' }} >

<Text style={{color: 'blue'}}
      onPress={() => Linking.openURL('http://google.com')}>
  Forgot Password?
</Text>
</View>

</>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', height: 50, backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 30
  },
    input: {
      height: 40,
      margin: 20,
      borderWidth: 1,
      padding: 10,
    }
  
});
