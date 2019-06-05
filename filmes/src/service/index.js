import axios from 'axios';

const endPoint =  `http://localhost:3001/auth/`;

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

   static async postRegister(user){
    try{
     return await axios.post(endPoint+'/register', user)
    }catch(err){
      return err;
    }
  }

  static async postAuth(user){
    try{
      return await axios.post(endPoint+'/authenticate', user)
    }catch(err){
      return err;
    }
  }
}

export default AppLogic;