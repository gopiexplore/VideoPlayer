import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (
   <View style={styles.container}>
     <AppNavigation/>
   </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,

  }
})