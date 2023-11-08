import {StyleSheet,Text,View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../components/UsableButton';


export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.Root}>
        
        <Text style={styles.WelcomeText}>Welcome To Todo App!</Text>
        <Text style={styles.RegisterText}>Register takes only 1 minute</Text>

        <View style={styles.btns}>
          <Button buttonName="Register" bgColor="black" color="white" handlePress={
            ()=>{ navigation.navigate('Register');}
          }></Button>
          <Button buttonName="Login" bgColor="#c7c7c7" color="black" handlePress={
            ()=>{ navigation.navigate('Login');}
          }></Button>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    Root:{
      flex: 1,
      justifyContent:'center',
      backgroundColor:'white',
      alignItems:'center'
    },
    WelcomeText:{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'center',
        marginBottom: 10
    },
    RegisterText:{
        fontSize: 18,
        fontWeight: '300',
        color:'#939599',
        textAlign:'center',
        marginBottom: 10
    },
    btns:{
      width:'80%',
      maxWidth:500
    }
});


