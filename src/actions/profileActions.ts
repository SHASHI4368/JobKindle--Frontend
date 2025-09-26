"use server";

import axios from "axios";
const Base_URL = process.env.Base_URL;

export const fetchProfileData = async (jwt:string) => {
  const url = `${Base_URL}:8085/users/me`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};

export const updatePersonalInfo = async (
  jwt: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: string,
  location?: string
) => {
  const url = `${Base_URL}:8085/users/me`;
  try {
    const body: any = {};
    if (firstName) body.firstname = firstName;
    if (lastName) body.lastname = lastName;
    if (email) body.email = email;
    if (phone) body.phone = phone;
    if (location) body.location = location;
    const response = await axios.patch(url, body, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.message;
  }
  catch (error) {
    console.error("Error updating personal info:", error);
  }
};
