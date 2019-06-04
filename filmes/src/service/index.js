
import axios from 'axios';

class AppLogic {
   static getFilm(name){
    return axios.get(`https://www.omdbapi.com/?t=${name}&apikey=649e0bc9`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export default AppLogic;