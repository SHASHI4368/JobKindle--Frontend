"use server";

import axios from "axios";
const Base_URL_users = process.env.Base_URL_users;

export const fetchProfileData = async (jwt: string) => {
  "use server";
  const url = `${Base_URL_users}/users/me`;
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
  {
    firstName,
    lastName,
    email,
    phone,
    location,
    jobTitle,
    bio,
    experience,
    education,
    linkedin,
    website,
    resumeUrl,
    profilePic
  }: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    location?: string;
    jobTitle?: string;
    bio?: string;
    experience?: string;
    education?: string;
    linkedin?: string;
    website?: string;
    resumeUrl?: string;
    profilePic?: string;
  }
) => {
  "use server";
  const url = `${Base_URL_users}/users/me`;
  try {
    const body: any = {};
    if (firstName) body.firstname = firstName;
    if (lastName) body.lastname = lastName;
    if (email) body.email = email;
    if (phone) body.phone = phone;
    if (location) body.location = location;
    if (jobTitle) body.jobTitle = jobTitle;
    if (bio) body.bio = bio;
    if (experience) body.experience = experience;
    if (education) body.education = education;
    if (linkedin) body.linkedin = linkedin;
    if (website) body.website = website;
    if (resumeUrl) body.resume = resumeUrl;
    if (profilePic) body.profilePic = profilePic;

    const response = await axios.patch(url, body, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.message;
  } catch (error) {
    console.error("Error updating personal info:", error);
  }
};

export const deleteResume = async (jwt: string) => {
  "use server";
  const url = `${Base_URL_users}/users/me`;
  const body = {
    resume: null,
  };
  try {
    const response = await axios.patch(url, body, {
      headers: {
        Authorization: `Bearer ${jwt}`, 
        "Content-Type": "application/json",
      },
    });
    return response.data.message;
  } catch (error) {
    console.error("Error deleting resume:", error);
  } 
};
