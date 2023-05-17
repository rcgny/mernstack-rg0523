function getErrorMsgForDisplay(error, displayError){
    let errorMsg;
    if(error.response){
        // The request  was made and our api server responded with a 
        //  status code that is not in range of 2XX
        errorMsg = error.response.data;
        console.error("Error response: ", errorMsg);
        // For Cloudinary image uploads
        if(error.response.data.error){
            errorMsg = error.response.data.error.message;
        }
    } else if(error.request) {
        // Ther request was made but no response came
        errorMsg = error.request;
        console.error("Error Request: ", errorMsg)
    } else {
       // Something else happened in making the request that triggered an error
       errorMsg = error.message;
       console.error("Error Message: ", errorMsg)
    }
    displayError(errorMsg);  // callback ( setError from Create client)
}

export default getErrorMsgForDisplay;