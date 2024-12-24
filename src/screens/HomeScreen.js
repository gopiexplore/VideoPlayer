import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { movieListAPI } from '../api/moviesList'
import MovieBanner from '../components/MovieBanner'
import MylistMovies from '../components/MylistMovies'
import { mylistAPI } from '../api/mylistAPI'
import MovieCards from '../components/MovieCards'
import { useNavigation } from '@react-navigation/native'
import Orientation from 'react-native-orientation-locker'

const HomeScreen = ({route}) => {
  const navigation=useNavigation()
  const [moviesList,setMoviesList]=useState([])
  const [mylist,setMylist]=useState(route.params.myList)
  const [watchedMovies,setWatchedMovies]=useState(route.params.watchedMovies)
  useEffect(()=>{
    const movieListAPICall=async()=>{
      const movies=await movieListAPI()
      setMoviesList(movies)
      
    }
    movieListAPICall();
  },[])
  useEffect(()=>{
    const updateMylist=async()=>{
      const updateMylist=await mylistAPI()
      setMylist(updateMylist.moviesInMyList)
      
    }
    updateMylist();
  },[mylist])
  
  const handleBanner=(movie)=>{
    console.log(movie)
  }
  const posterPlayButton=(movieID,movieLink,movieTitle)=>{
    // console.log("poster play details",movieID,movieLink,movieTitle)
    navigation.navigate("MoviesVideoPlayer",{movieID,movieLink,movieTitle})
  }
  const posterInfoButton=(movie)=>{
    console.log("Poster Info Button",movie)
  }

  return (
    <View style={styles.container}>
      <StatusBar
  translucent={true} 
  backgroundColor="transparent"
/>
       <ScrollView style={styles.scrollView}>
        <MovieBanner
        moviesList={moviesList}
        mylist={mylist}
        handleBanner={handleBanner}
        posterPlayButton={posterPlayButton}
        posterInfoButton={posterInfoButton}
        />
        <View style={styles.subContainer}>
         {mylist.length!=0 &&  <MylistMovies label={"My List"} mylist={mylist}/>}
         <MovieCards genreId={"Netflix"} label={"Only on Netflix Movies"}/>
         <MovieCards genreId={35} label={"Comedy Movies"}/>
         <MovieCards genreId={18} label={"Drama Movies"}/>
         <MovieCards genreId={14} label={"Fantasy Movies"}/>
         <MovieCards genreId={878} label={"Sci-Fi Movies"}/>
         <MovieCards genreId={28} label={"Action Movies"}/>
        </View>
       </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  scrollView:{
    flex:1,
  },
  subContainer:{
    paddingHorizontal:15,
    gap:10,
    marginTop:20,
  }
})