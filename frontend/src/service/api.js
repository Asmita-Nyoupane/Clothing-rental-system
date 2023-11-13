import axios from 'axios'; 
import { API_NOTIFICATION_MESSAGES,SERVICE_URL } from '../constants/config';
import { getAccessToken } from '../utils/common_utils';
const API_URL =  "http://localhost:5001"
 const axiosInstance = axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        "content-type":"application/json"
    }
 })
 axiosInstance.interceptors.request.use(
    function (config)
    {
        return config;
    },
    function (error){
        return Promise.reject(error);
    }
 )
 axiosInstance.interceptors.response.use(
    function (response)
    {
        //  global loader stop here
        return processResponse(response);
    },
    function (error){
          //  gloabal loader stop here
        return Promise.reject(processError(error));
    }
 )

//  if success =>return {isSuccess:true, data :object}
// if fail->return{ isFailure:true, status:string, msg:string, statusCode:int}
 const processResponse=(response)=>{
if(response?.status === 200 ){
    return{
         isSuccess:true,
          data :response.data
        }
}
else{
    return{
        isFailure:true,
        status: response?.status,
        msg:response?.msg,
        code:response?.code

    }
}
 }

// //  if success =>return {isSuccess:true, data :object}
// if fail->return{ isFailure:true, status:string, msg:string, statusCode:int} 
const processError=(error)=>{
    if(error.response){
        
        // request  made  and server responded with a status other that falls out of range 2.x.x
        console.log('Error in response:', error.toJSON());
        return{
            isError:true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code:error.response.status
        }
    }else if(error.request){
        // request made but no response received
        console.log('Error in request:', error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.requestFailure,
            code:""
        }
    }else{
        // something happend in setting up  request that trigger an error
        console.log('Error in network:', error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:""
        }
    }
}

const API = {};
for (const [key, value] of Object.entries(SERVICE_URL)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) => 
      axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      headers:{
        authorization:getAccessToken()
      },
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
  };


export {API};
