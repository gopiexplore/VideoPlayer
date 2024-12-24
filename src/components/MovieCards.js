import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { movieListAPI } from '../api/moviesList'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

const MovieCards = ({genreID,label}) => {
    const [moviesList,setMoviesList]=useState([])
    useEffect(()=>{
        const fetchMovies=async()=>{
            const moives=await movieListAPI(genreID)
            setMoviesList(moives)
        }
        fetchMovies()
    },[genreID])
    const renderMovieCards=({item})=>{
       return(
        <TouchableOpacity style={styles.movieCardContainer}>
        <Image source={{uri:item.posterPath}}
        style={styles.movieCardImage}
        />
    </TouchableOpacity>
       )
    }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <FlatList
      data={moviesList.slice(0,10)}
      keyExtractor={(item)=>item._id}
      renderItem={renderMovieCards}
      windowSize={2}
      horizontal
      showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default MovieCards

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        height:280,
    },
    label:{
        paddingHorizontal:10,
        marginBottom:10,
        fontSize:responsiveFontSize(2.5),
        color:'black'
    },
    movieCardContainer:{
        marginRight:10,
        borderRadius:20,
        marginBottom:20,
    },
    movieCardImage:{
        width:150,
        height:'100%',
        borderRadius:10,
    },
})