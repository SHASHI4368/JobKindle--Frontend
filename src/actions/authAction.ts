"use server";

import axios from "axios";
const Base_URL_auth = process.env.Base_URL_auth;

export const signup = async (
  email: string,
  password: string,
) => {
  "use server";
  try {
    const body = {
      email: email,
      password: password,
    };

    const url = `${Base_URL_auth}/auth/register`;
    const response = await axios.post(url, body);
    return response.data;
  } catch (err: any) {
    console.log(err);
  }
};

export const login = async (
  email: string,
  password: string,
) => {
  "use server";
  try {
    const body = {
      email: email,
      password: password,
    };
    const url = `${Base_URL_auth}/auth/login`;
    const response = await axios.post(url, body);
    console.log("response", response);
    return response.data;
  } catch (err: any) {
    if(err.response && err.response.data){
      console.log("error", err.response.data);
      return err.response.data;
    }else{
      console.log("error", err);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};
