// src/components/new-interview/utils/exportUtils.ts
import { HeadPose, CheatingProbability } from "../types";

const uploadCSVToImageKit = async (
  csv: string,
  filename: string
): Promise<string> => {
  try {
    // Get authentication parameters from your backend
    const authResponse = await fetch("http://localhost:3001/api/auth");
    const authData = await authResponse.json();

    // Create a Blob from CSV string
    const blob = new Blob([csv], { type: "text/csv" });
    const file = new File([blob], filename, { type: "text/csv" });

    // Create FormData for upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("publicKey", authData.publicKey);
    formData.append("signature", authData.signature);
    formData.append("expire", authData.expire);
    formData.append("token", authData.token);
    formData.append("fileName", filename);

    // Upload to ImageKit
    const uploadResponse = await fetch(
      "https://upload.imagekit.io/api/v1/files/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      throw new Error("Upload failed");
    }

    const result = await uploadResponse.json();
    return result.url;
  } catch (error) {
    console.error("Error uploading CSV to ImageKit:", error);
    throw error;
  }
};

export async function exportPoseToCSV(poseHistory: HeadPose[]) {
  if (poseHistory.length === 0) {
    alert("No orientation data to export!");
    return;
  }

  const csvHeader = "Timestamp,Date,Roll,Pitch,Yaw\n";
  const csvRows = poseHistory
    .map((pose) => {
      const date = new Date(pose.timestamp).toISOString();
      return `${pose.timestamp},${date},${pose.roll.toFixed(
        2
      )},${pose.pitch.toFixed(2)},${pose.yaw.toFixed(2)}`;
    })
    .join("\n");

  const csv = csvHeader + csvRows;
  const filename = `head-pose-${Date.now()}.csv`;

  try {
    const fileUrl = await uploadCSVToImageKit(csv, filename);
    console.log("Head pose CSV uploaded successfully:");
    console.log("File URL:", fileUrl);
    alert(`Head pose data exported successfully!\nFile URL: ${fileUrl}`);
    return fileUrl;
  } catch (error) {
    alert("Failed to export head pose data. Please try again.");
    console.error("Export error:", error);
  }
}

export async function exportCheatingProbabilitiesToCSV(
  cheatingProbabilityList: CheatingProbability[]
) {
  if (cheatingProbabilityList.length === 0) {
    alert("No cheating probability data to export!");
    return;
  }

  const csvHeader = "Timestamp,Date,Cheating Probability\n";
  const csvRows = cheatingProbabilityList
    .map((entry) => {
      const date = new Date(entry.timestamp).toISOString();
      return `${entry.timestamp},${date},${entry.probability.toFixed(4)}`;
    })
    .join("\n");

  const csv = csvHeader + csvRows;
  const filename = `cheating-probabilities-${Date.now()}.csv`;

  try {
    const fileUrl = await uploadCSVToImageKit(csv, filename);
    console.log("Cheating probabilities CSV uploaded successfully:");
    console.log("File URL:", fileUrl);
    return fileUrl;
  } catch (error) {
    alert("Failed to export cheating probabilities. Please try again.");
    console.error("Export error:", error);
  }
}
