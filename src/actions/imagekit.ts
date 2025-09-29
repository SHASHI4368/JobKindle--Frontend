"use server";

import axios from "axios";

export const getImageData = async (fileId: string) => {
  "use server";
  try {
    const response = await axios.get(
      `http://localhost:3000/api/file-details/${fileId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching image details:", error);
  }
};

export const deleteImage = async (fileId: string) => {
  "use server";
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/file-details/${fileId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};
