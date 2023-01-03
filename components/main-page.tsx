import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function Main() {
  const [visible, setVisible] = useState(false)
  const setVisibility = () => {
    setVisible(true)
  }
  return (
    <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'column', height: 50, backgroundColor: 'steelblue', marginLeft: 5}} > 
        { visible && 
        <Text>My first reactNative app!</Text>
      }
           { visible && 
            Alert.alert(
              'Hey There!',
              'Two button alert dialog',
              [
                {text: 'Yes', onPress: () => console.log('Yes button clicked')},
                {text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel'},
              ],
              { 
                cancelable: true 
              }
            )
        
      }
      </View>
        <View style={{flex: 1, flexDirection: 'column', height: 50, backgroundColor: 'powderblue', marginLeft: 5, marginRight: 5}} > 
        <Button title='Click' color={'blue'} onPress={setVisibility}></Button>
        </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', height: 50, backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
