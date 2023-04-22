import Axios from "axios"

export const fetchFonts = ()=>{
  const data =  Axios.request(
        "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBY4SH0h2DuTxguVL9rAeqLXjSrtCo_mzQ"
      ).then()
    return data
}