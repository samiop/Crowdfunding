/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const register = (username, email, password , firstName , lastName , address , birthdate,phone) => {
  return axios.post(API_URL + "/auth/signup", {
    firstName,
    lastName,
    username,
    email,
    password,
    address , 
    birthdate,phone
  });
};
 
const login = (username, password) => {
  return axios
    .post(API_URL + "/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.user.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("infos", JSON.stringify(response.data.infos));
      }
      return response.data;
    });
};

const reset_password = (username) => {
  return axios
      .post(API_URL + "reset-password", {
        username
      })
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message)
        }
        return response.data;
      });
};


const logout = () => {
  localStorage.removeItem("user");
 localStorage.removeItem("infos");
};

const deleteUser = id => {
  console.log("service react , id user : " + id);
  return  axios.delete("http://localhost:5000/api/user/delete/", { data: { id : id}});
};


export default  {
  register,
  login,
  logout,
  deleteUser,
  reset_password
};
