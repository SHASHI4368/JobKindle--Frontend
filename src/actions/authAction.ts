"use server";

import axios from "axios";
const Base_URL = process.env.Base_URL;

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
    const url = `${Base_URL}:9090/auth/register`;
    const response = await axios.post(url, body);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Sign up failed");
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
    const url = `${Base_URL}:9090/auth/login`;
    const response = await axios.post(url, body);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};
