export const movieListAPI=async(genreID)=>{
    const options={
        method:"GET",
        headers:{
            accept:"application/json",
        }
    }
    let url=""
    if(genreID){
        url=`http://192.168.1.2:5000/getMovies/${genreID}`
    }
    else{
        url=`http://192.168.1.2:5000/getMovies`
    }
    try {
        const response=await fetch(url,options)
        const data=await response.json()
        return data;
        
    } catch (error) {
        console.error("Error fetching the movie list api",error)
    }
}