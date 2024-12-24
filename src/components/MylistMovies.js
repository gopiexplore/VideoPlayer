import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { mylistAPI } from '../api/mylistAPI'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

const MylistMovies = ({mylist,label}) => {
    const [moivesList,setMoviesList]=useState([])

    useEffect(()=>{
        const fetchMyListMovies=async()=>{
            const movies=await mylistAPI()
            setMoviesList(movies.moviesInMyList)
        }
        fetchMyListMovies();
    },[])
    const renderMovieCards=({item})=>{
        return(
            <TouchableOpacity style={styles.movieCardContainer}>
            <Image source={{uri:item.posterPath}} style={styles.moviecardImage}/>
        </TouchableOpacity>
        )

    }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <FlatList
      data={moivesList}
      keyExtractor={(item)=>item._id}
      renderItem={renderMovieCards}
      horizontal
      showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default MylistMovies

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        height:250,
    },
    label:{
        paddingHorizontal:10,
        marginBottom:10,
        fontSize:responsiveFontSize(2.5),
        fontWeight:'bold',
        color:'black'
    },
    moviecardImage:{
        width:150,
        height:"100%",
        borderRadius:10,
    },
    movieCardContainer:{
        marginRight:10,
        borderRadius:20,

    },
})