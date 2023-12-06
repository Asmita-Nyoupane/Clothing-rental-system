import axios from 'axios'; 
import { API_NOTIFICATION_MESSAGES,SERVICE_URL } from '../constants/config';
import { getAccessToken, getRefreshToken, setAccessToken,getType } from  '../utils/common_utils'

const API_URL =  "http://localhost:5001";

 const axiosInstance = axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        "content-type":"application/json"
    }
 })
 axiosInstance.interceptors.request.use(
    function (config){
      if(config.TYPE.params){
        config.params = config.TYPE.params;
    }
    else if(config.TYPE.query){
      config.url= config.url + '/' + config.TYPE.query;
    }
    
   
  
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
        return Promise.reject(ProcessError(error));
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
const ProcessError = async (error) => {
  if (error.response) {
      // Request made and server responded with a status code 
      // that falls out of the range of 2xx
      if (error.response?.status === 403) {
          try {
              let response = await API.refreshToken();
              if (response.isSuccess) {
                  // If refresh token is successful, update the access token and retry the original request
                  setAccessToken(response.data.accesstoken);

                  // Retry the original request
                  return axios(error.config);
              }
          } catch (error) {
              return Promise.reject(error);
          }
      } else {
          console.log("ERROR IN RESPONSE: ", error.toJSON());
          return {
              isError: true,
              msg: API_NOTIFICATION_MESSAGES.responseFailure,
              code: error.response.status
          };
      }
  } else if (error.request) {
      // The request was made but no response was received
      console.log("ERROR IN RESPONSE: ", error.toJSON());
      return {
          isError: true,
          msg: API_NOTIFICATION_MESSAGES.requestFailure,
          code: ""
      };
  } else {
      // Something happened in setting up the request that triggered an Error
      console.log("ERROR IN RESPONSE: ", error.toJSON());
      return {
          isError: true,
          msg: API_NOTIFICATION_MESSAGES.networkError,
          code: ""
      };
  }
}

const API = {};

// Add a new method to refresh the token
API.refreshToken = async () => {
  const refreshToken = getRefreshToken();

  try {
      const response = await axiosInstance({
          method: 'POST',
          url: '/path/to/refresh-token-endpoint',
          data: { token: refreshToken }
      });

      return processResponse(response);
  } catch (error) {
      return ProcessError(error);
  }
};

for (const [key, value] of Object.entries(SERVICE_URL)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) => 
      axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === 'DELETE' ? {} : body,
      responseType: value.responseType,
      headers:{
        authorization:getAccessToken()
      },
       TYPE: getType(value,body),
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
