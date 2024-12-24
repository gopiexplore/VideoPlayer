import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import AudiSubsModal from '../components/AudiSubsModal';
import VerticalSlider from 'rn-vertical-slider-matyno';
import { getBrightnessLevel, setBrightnessLevel } from '@reeq/react-native-device-brightness';
import { VolumeManager } from 'react-native-volume-manager';
const MoviesVideoPlayer = ({route}) => {
  const {movieID,movieLink,movieTitle}=route.params;
    const navigation=useNavigation();
    const [isPaused,setIsPaused]=useState(false);
    const [videoPressed,setVideoPressed]=useState(false)
    const [isMute,setIsMute]=useState(true)
    const [progress,setProgress]=useState(0)
    const [isBuffering,setIsBuffering]=useState(true)
    const [resizeMode,setResizeMode]=useState("cover")
    const [selectedAudioTrack,setSelectedAudioTrack]=useState("0")
    const [totalAudioTracks,setTotalAudioTracks]=useState([])
    const [totalSubtitles,setTotalSubtitles]=useState([])
    const [selectedSubtitleTrack,setSelectedSubtitleTrack]=useState("0")
    const [audioSubsModalVisible,setAudioSubsModalVisible]=useState(false)
    const [volume,setVolume]=useState(1);
    const [brightness,setBrightness]=useState(0.5)
    const ref=useRef()
    useEffect(()=>{
      Orientation.lockToLandscape();
      SystemNavigationBar.fullScreen(true)
    },[])
    const handleVideoPressed=()=>{
      setVideoPressed(!videoPressed)
      setIsBuffering(!isBuffering)
    }
    const moveBackWard=()=>{
      console.log("video ref",ref)
      ref.current.seek(parseInt(progress.currentTime-10))
    }
    const moveForWard=()=>{
      ref.current.seek(parseInt(progress.currentTime-10))
    }
    const handlePlayVideo=()=>{
      setIsPaused(false)
    }
    const handlePauseVideo=()=>{
      setIsPaused(true)
    }
    const formatDuration=(durationInSeconds)=>{
      const hours=Math.floor(durationInSeconds/3600);
      const minutes=Math.floor((durationInSeconds%3600)/60)
      const seconds=Math.floor(durationInSeconds%60);
      const fromattedHours=hours>0?`${hours}:`:"";
      const formattedMinutes=`${minutes<10 && hours >0?'0':""}${minutes}`;
      const formattedSeconds=`${seconds<10?"0":""}${seconds}`;
      return `${fromattedHours}${formattedMinutes}${formattedSeconds}`
    }
    const handleMute=()=>{
setIsMute(true)
    }
    const handleVolumeUp=()=>{
      setIsMute(false)
    }
    const handleZoonIn=()=>{
setResizeMode("none")
    }
    const handleZoonOut=()=>{
      setResizeMode("cover")
    }
    const openAudioSubsModal=()=>{
      handlePauseVideo()
      setAudioSubsModalVisible(true)
    }
    const applyAudioSubsChanges=()=>{
      //Apply changes based on selectedAudioTrack and selectedSubtitleTrack
      handlePlayVideo()
      setAudioSubsModalVisible(false)
    }
    const cancelAudioSubsChanges=()=>{
      //Reset changes or perform any necessary actions
      handlePlayVideo();
      setAudioSubsModalVisible(false)
    }
    const goBack=()=>{

    }
    const handleBrightnessChange=async(value)=>{
      setBrightnessLevel(value,true)
      setBrightness(value)
      const brightness=await getBrightnessLevel()
      console.log("Brightness",brightness)

    }
    const handleVolumeChange=async(value)=>{
      VolumeManager.showNativeVolumeUI({enabled:false})
      await VolumeManager.setVolume(value);
      setVolume(value)
      const {volume}=await VolumeManager.getVolume();
      console.log(volume)

    }
  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <AudiSubsModal
      visible={audioSubsModalVisible}
      audioTracks={totalAudioTracks}
      selectedAudioTrack={selectedAudioTrack}
      onSelectAudio={(index)=>setSelectedAudioTrack(index)}
      subtitles={totalSubtitles}
      selectedSubtitle={selectedSubtitleTrack}
      onSelectSubtitle={(index)=>setSelectedSubtitleTrack(index)}
      onApply={applyAudioSubsChanges}
      onCancel={cancelAudioSubsChanges}
      />
      <View>
        <TouchableOpacity style={styles.backgroundVideo}>
          <Video
          // source={{uri:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}}
          source={{uri:"https://cdn.media.ccc.de/congress/2019/h264-sd/36c3-10496-deu-eng-spa-Das_Mauern_muss_weg_sd.mp4"}}
          // source={{uri:movieLink}}
          
          paused={isPaused}
          muted={isMute}
          style={{width:'100%',height:'100%'}}
          resizeMode={resizeMode}
          onLoad={(videoInfo)=>{
            console.log("Video Info",videoInfo)
            const allSubtitles=videoInfo.textTracks.map((track,index)=>({
              ...track,
              index:index,
            }))
            const offSubtitle={
              index:allSubtitles.length+1,
              language:"Off",
              selected:false,
              title:"Off",
              type:"application/x-subrip",
            }
            allSubtitles.push(offSubtitle)
            setTotalSubtitles(allSubtitles)
            setTotalAudioTracks(videoInfo.audioTracks)
          }}
          onBuffer={(bufferValue)=>{
            console.log(bufferValue)
            setIsBuffering(bufferValue.isBuffering)
          }}
          selectedAudioTrack={{
            type:'index',
            value:selectedAudioTrack
          }}
          selectedTextTrack={{
            type:"index",
            value:selectedSubtitleTrack,
          }}
          ref={ref}
          onProgress={prog=>{
            // console.log(prog)
            setProgress(prog)
          }}
          />
          <TouchableOpacity onPress={()=>handleVideoPressed()} style={[styles.videoscreenContainer,{backgroundColor:videoPressed?"rgba(0,0,0,0.5)":'rgba(0,0,0,0)'}]}>
            { !isBuffering && <View style={{opacity:videoPressed?1:0,flexDirection:'row',gap:100,}}>
              <TouchableOpacity onPress={()=>moveBackWard()}>
                <Image source={require("../assets/backward.png")}
                style={{width:50,height:50,tintColor:'white'}}
                />
              </TouchableOpacity>
              {
                isPaused?
                (
                  <TouchableOpacity onPress={()=>handlePlayVideo()}>
                <Image source={require("../assets/play.png")}
                style={{width:50,height:50,tintColor:'white'}}
                />
              </TouchableOpacity>
                )
                :
                (
                  <TouchableOpacity onPress={()=>handlePauseVideo()}>
                <Image source={require("../assets/videopausebutton.png")}
                style={{width:50,height:50,tintColor:'white'}}
                />
              </TouchableOpacity>
                )
              }



              <TouchableOpacity onPress={()=>moveForWard()}>
                <Image source={require("../assets/forward.png")}
                style={{width:50,height:50,tintColor:'white'}}
                />
              </TouchableOpacity>
              </View>}
              <View style={[styles.backButtonContainer,{opacity:videoPressed?1:0}]}>
                <TouchableOpacity onPress={()=>goBack()}>
                  <Image source={require("../assets/back.png")} style={styles.goBackIcon}/>
                </TouchableOpacity>

                
                <Text style={styles.movieTitleText}>{movieTitle}</Text>
                
                
              </View>

              <View style={{
                  width:'15%',
                  height:'40%',
                  flexDirection:'column',
                  gap:10,
                  position:'absolute',
                  bottom:120,
                  left:0,
                  paddingLeft:60,
                  paddingRight:0,
                  alignItems:'center',
                  opacity:videoPressed?1:0,
                }}>
                  <Icon name="brightness-7" size={30} color={"white"}/>
                  <VerticalSlider
                  value={brightness}
                  disabled={false}
                  width={20}
                  height={100}
                  min={0.1}
                  max={1}
                  step={0.1}
                  onChange={handleBrightnessChange}
                  borderRadius={2}
                  minimumTrackTintColor={"tomato"}
                  maximumTrackTintColor={"gray"}
                  />
                </View>

                <View style={{
                  width:'15%',
                  height:'40%',
                  flexDirection:'column',
                  gap:10,
                  position:'absolute',
                  bottom:120,
                  right:0,
                  paddingLeft:0,
                  paddingRight:60,
                  alignItems:'center',
                  opacity:videoPressed?1:0,
                }}>
                  <Icon name="volume-up" size={30} color={"white"}/>
                  <VerticalSlider
                  value={volume}
                  disabled={false}
                  width={20}
                  height={100}
                  min={0.1}
                  max={1}
                  step={0.1}
                  onChange={handleVolumeChange}
                  borderRadius={2}
                  minimumTrackTintColor={"tomato"}
                  maximumTrackTintColor={"gray"}
                  />
                </View>
              <View style={[styles.sliderContainer,{opacity:videoPressed?1:0}]}>
                <Text style={styles.sliderText}>{formatDuration(progress.currentTime)}</Text>
                <Slider
                style={styles.sliderProgressBar}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor='red'
                maximumTrackTintColor='white'
                thumbTintColor='red'
                value={progress.currentTime}
                onValueChange={(prog)=>{
                  ref.current.seek(prog)
                }}
                />
                <Text style={styles.sliderText}>{formatDuration(progress.seekableDuration)}</Text>
              </View>
              {
                !isBuffering &&(
                  <View style={[styles.audioSubsIconContainer,{opacity:videoPressed?1:0}]}>
                   {
                    isMute ?(
                      <TouchableOpacity onPress={()=>handleVolumeUp()}>
                        <Image source={require("../assets/mute.png")}
                        style={{width:30,height:30,tintColor:'white'}}
                        />
                      </TouchableOpacity>
                    )
                    :(
                      <TouchableOpacity onPress={()=>handleMute()}>
                        <Image source={require("../assets/volume.png")}
                        style={{width:30,height:30,tintColor:'white'}}
                        />
                      </TouchableOpacity>
                    )
                   }
                   <TouchableOpacity style={{marginRight:20,flexDirection:'row',alignItems:'center'}}  onPress={openAudioSubsModal}>
                    <Image source={require("../assets/subtitle.png")}
                    style={{width:30,height:30,tintColor:'white'}}
                    />
                    <Text style={styles.audioSubText}>Audio & Subtitle</Text>

                   </TouchableOpacity>




                   {
                    resizeMode==="cover"?(<TouchableOpacity onPress={()=>handleZoonIn()}>
                      <Icon name="zoom-in-map" size={30} color="white"/>
                    </TouchableOpacity>):(
                      <TouchableOpacity onPress={()=>handleZoonOut()}>
                      <Icon name="zoom-out-map" size={30} color="white"/>
                    </TouchableOpacity>
                    )
                   }
                  </View>
                )
              }
          </TouchableOpacity>

          
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MoviesVideoPlayer
//https://192.168.1.2:5000/movies/sample.mkv
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black'
  },
  backgroundVideo:{

    width:'100%',
    height:'100%'
  },
  videoscreenContainer:{
    width:'100%',
    height:'100%',
    position:'absolute',
    justifyContent:'center',
    alignItems:"center",
   
  },
  sliderContainer:{
    width:"90%",
    height:'25%',
    flexDirection:'row',
    position:'absolute',
    bottom:0,
    paddingHorizontal:20,
    alignItems:'center',
    justifyContent:'center'
  },
  sliderProgressBar:{
    flex:1,
    color:'red',
    bottom:40,
  },
  sliderText:{
    color:"white",
    bottom:40,
  },
  audioSubsIconContainer:{
    width:'80%',
    flexDirection:'row',
    justifyContent:"space-between",
    position:'absolute',
    bottom:10,
    paddingLeft:20,
    paddingRight:20,
  },
  audioSubText:{
    color:'white',
    fontSize:responsiveFontSize(2.2),
    fontWeight:'bold',
    marginLeft:8,
  },
  backButtonContainer:{
    width:'80%',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    position:'absolute',
    top:15,
    paddingHorizontal:20,
  },
  goBackIcon:{
    width:30,
    height:30,
    tintColor:'white'
  },
  movieTitleText:{
    color:'white',
    flex:1,
    textAlign:'center',
    fontSize:responsiveFontSize(2),
    fontWeight:'bold'
  },
})
//multiple audio
//https://cdn.media.ccc.de/congress/2019/h264-sd/36c3-10496-deu-eng-spa-Das_Mauern_muss_weg_sd.mp4