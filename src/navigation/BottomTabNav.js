import { StyleSheet, Text, View } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"
const Tab=createBottomTabNavigator();

const BottomTabNav = () => {
  return (
   <Tab.Navigator screenOptions={{
    tabBarActiveTintColor:'white',
    tabBarInactiveBackgroundColor:'#343541',
    tabBarActiveBackgroundColor:"#201A18",
    tabBarShowLabel:false,
    headerShown:false,
   }}>
    <Tab.Screen name='HomeScreen' component={HomeScreen}
    options={{tabBarIcon:({color,size})=>(
      <Icon name="home" color={color} size={size}/>
    )}}
    />
    
  <Tab.Screen name='SearchScreen' component={SearchScreen}
   options={{tabBarIcon:({color,size})=>(
    <Icon name="search" color={color} size={size}/>
  )}}
    />
    <Tab.Screen name='SettingsScreen' component={SettingsScreen}
     options={{tabBarIcon:({color,size})=>(
      <Ionicons name="settings" color={color} size={size}/>
    )}}
    />
   
   </Tab.Navigator>
  )
}

export default BottomTabNav

const styles = StyleSheet.create({})