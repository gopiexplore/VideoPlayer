export const addMovieToList=async(movieID)=>{
    const options={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":'application/json',
        },
        
    }
    url=`http://192.168.1.2:5000/add-to-mylist/${movieID}`
    try {
      const response= await fetch(url,options)
      const data=await response.json()
      return data;
    } catch (error) {
        console.error("Error fetching the api",error)
    }
}
export const removeMovieFromList=async(movieID)=>{
    const options={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":'application/json',
        },
        
    }
    url=`http://192.168.1.2:5000/remove-from-mylist/${movieID}`
    try {
      const response= await fetch(url,options)
      const data=await response.json()
      return data;
    } catch (error) {
        console.error("Error fetching the api",error)
    }
}
export const mylistAPI=async(movieID)=>{
    const options={
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Accept":'application/json',
        },
        
    }
    url=`http://192.168.1.2:5000/mylist`
    try {
      const response= await fetch(url,options)
      const data=await response.json()
      return data;
    } catch (error) {
        console.error("Error fetching the api",error)
    }
}