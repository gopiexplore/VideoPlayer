import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import LinearGradient from 'react-native-linear-gradient'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { addMovieToList, removeMovieFromList } from '../api/mylistAPI'
import { useNavigation } from '@react-navigation/native'
const MovieBanner = ({moviesList,mylist,handleBanner,posterPlayButton,posterInfoButton}) => {
    const [userMylist,setUserMyList]=useState(mylist)
    const navigation=useNavigation();
    const addToList=async(item)=>{
        try {
            let response;
            if(userMylist.includes(item._id)){
                response=await removeMovieFromList(item._id)
            }else{
                response=await addMovieToList(item._id)
            }
            setUserMyList(response.user.myList)
            navigation.navigate("HomeScreen",{myList:response.user.myList})
        } catch (error) {
            console.error("Error adding/removing movie from list",error)
        }
    }
    const renderMovieBanner=({item})=>(
        <TouchableOpacity onPress={()=>handleBanner(item)}>
            <ImageBackground
            source={{uri:item.posterPath}}
            style={styles.posterImage}
            resizeMode='cover'
            >
                <LinearGradient
                colors={['rgba(0,0,0,0.1)','rgba(0,0,0,1)']}
                style={styles.linearGradient}
                >
                    <TouchableOpacity key={item} 
                    style={styles.myListButton}
                    onPress={()=>addToList(item)}
                    >
                        {userMylist.includes(item._id)?(<AntDesignIcon
                        name="checkcircle"
                        size={30}
                        color="lightgreen"
                        />):(<AntDesignIcon
                        name="plus"
                        size={30}
                        color="white"
                        />)}
                        <Text style={styles.myListText}>My List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.posterPlayButton}
                    onPress={()=>posterPlayButton(item._id,item.downloadLink,item.title)}
                    >
                    <EntypoIcon name="controller-play" size={30} color="black"/>
                    <Text style={styles.playText}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.posterInfoButton} onPress={()=>posterInfoButton(item)}>
                    <AntDesignIcon name="infocirlceo" size={30} color="white"/>
                    <Text style={styles.infoButtonTxt}>Info</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    )
    return (
    <View style={styles.container}>
        <FlatList
        pagingEnabled
        data={moviesList}
        keyExtractor={(item)=>item._id}
        renderItem={renderMovieBanner}
        horizontal
        showsHorizontalScrollIndicator={false}
        
        />
    </View>
  )
}

export default MovieBanner

const styles = StyleSheet.create({
    container:{
        height:responsiveHeight(70),
        width:'100%',
    },
    posterImage:{
        width:responsiveWidth(100),
        height:'100%',
        justifyContent:'flex-end'
    },
    linearGradient:{
        flex:0.2,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    myListText:{
        color:'white',
        fontSize:responsiveFontSize(2),
        fontWeight:'bold',
        marginTop:responsiveHeight(0.5)
    },
    playText:{
        color:'black',
        fontSize:responsiveFontSize(2),
        fontWeight:'bold',
        marginLeft:responsiveWidth(1.5)
    },
    infoButtonTxt:{
        color:'white',
        fontSize:responsiveFontSize(2),
        fontWeight:'bold',
        marginLeft:responsiveWidth(0.5)
    },
    myListButton:{
        alignItems:'center'
    },
    posterPlayButton:{
        flexDirection:'row',
        alignItems:'center',
        padding:8,
        backgroundColor:'white',
        borderRadius:responsiveWidth(2),
        width:responsiveWidth(25),
    },
    posterInfoButton:{
        alignItems:'center'
    }
})