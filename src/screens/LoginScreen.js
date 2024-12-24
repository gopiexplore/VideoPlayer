import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { checkAuthAPI, userLoginAPI } from '../api/userLoginAPI'
import { useNavigation } from '@react-navigation/native'
import Orientation from 'react-native-orientation-locker';
const LoginScreen = () => {
  const navigation=useNavigation();
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState("")
  useEffect(()=>{
   
    const checkauthuser=async()=>{
      const response=await checkAuthAPI();
      if(response.authenticated){
        navigation.navigate("BottomTabNavigator",{
          screen:"HomeScreen",
          params:{myList:response.user.myList,watchedMovies:response.user.watchedMovies}
        })
      }
    }
    checkauthuser()
  },[])

  const handleLogin=async()=>{
    const responseData=await userLoginAPI(username,password)
    if(responseData.success===false){
      console.warn("Wrong username or password")
    }else if(responseData.success===true){
      navigation.navigate("BottomTabNavigator",{
        screen:"HomeScreen",
        params:{myList:responseData.user.myLrist,watchedMovies:responseData.user.watchedMovies}
      })
    }
  }
  const handleRegister=()=>{
    navigation.navigate("RegisterScreen")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
      style={styles.input}
      placeholder='UserName'
      placeholderTextColor={"white"}
      onChangeText={(text)=>setUsername(text)}
      />
      <TextInput
      style={styles.input}
      placeholder='Password'
      placeholderTextColor={"white"}
      secureTextEntry
      onChangeText={(text)=>setPassword(text)}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={handleRegister}>
        <Text style={styles.buttonText}>Not a Memeber .Register!</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#000000'
  },
  title:{
    color:'white',
    fontSize:24,
    marginBottom:20,
    fontWeight:'bold'
  },
  input:{
    height:40,
    width:'80%',
    borderColor:'gray',
    borderWidth:1,
    backgroundColor:'#333333',
    marginBottom:10,
    paddingHorizontal:10,
    borderRadius:5,
    color:'white'
  },
  buttonText:{
    color:'white',
    fontSize:16,
    fontWeight:'bold',
    textAlign:'center'

  },
  loginButton:{
    backgroundColor:'#EB1825',
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:5,
    marginVertical:10,
    width:'80%',
  }
})