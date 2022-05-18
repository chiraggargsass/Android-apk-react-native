import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

export const useSignup = () => {

  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
 

  const savedData = async (token) => {
    await AsyncStorage.setItem("token",token);
      console.log("savedData", token);
  } 

  const getData = async () => {
    const save =  await AsyncStorage.getItem("token");
      console.log("getData", save);
  } 

  const handleSubmitButton = async () => {
          console.log(email);
         console.log(password);
    setErrortext('');
    if (!email) {
      alert('Please fill Email');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    var dataToSend = {
      email: email,
      password: password,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch('https://rails-api-article.herokuapp.com/signup', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        console.log(responseJson);
        
        if (!responseJson == false) {
          savedData(responseJson["token"]);
          getData();
          alert("Registration Successful"); 
          console.log('Registration Successful. Please Login to proceed');
        } else {
          setErrortext(responseJson);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return {
    email, setEmail   , password , setPassword, handleSubmitButton
  };
};


  