"use server";

import axios from "axios";
const Base_URL_organization = process.env.Base_URL_organization;

type OrganizationData = {
  companyEmail: string;
  organizationName: string;
  organizationLogo: string;
  industry: string;
  description: string;
  companySize: string;
  foundedYear: string;
  companyPhone: string;
  companyLocation: string;
  companyWebsite: string;
};

export const getAllOrganizations = async (jwt: string) => {
  "use server";
  const url = `${Base_URL_organization}/organizations/my-orgs`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.log("error", error.response.data);
      return error.response.data;
    } else {
      console.log("error", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};

export const getOrganizationDetails = async (jwt: string, orgId: number) => {
  "use server";
  const url = `${Base_URL_organization}/organizations/me/${orgId}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.log("error", error.response.data);
      return error.response.data;
    } else {
      console.log("error", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};

export const createOrganization = async (
  jwt: string,
  {
    companyEmail,
    organizationName,
    organizationLogo,
    industry,
    description,
    companySize,
    foundedYear,
    companyPhone,
    companyLocation,
    companyWebsite
  }: OrganizationData
) => {
  "use server";
  const url = `${Base_URL_organization}/organizations/me`;
  console.log(url);
  try {
    const body: any = {};
    if (companyEmail) body.companyEmail = companyEmail;
    if (organizationName) body.organizationName = organizationName;
    if (organizationLogo) body.organizationLogo = organizationLogo;
    if (industry) body.industry = industry;
    if (description) body.description = description;
    if (companySize) body.companySize = companySize;
    if (foundedYear) body.foundedYear = foundedYear;
    if (companyPhone) body.companyPhone = companyPhone;
    if (companyLocation) body.companyLocation = companyLocation;
    if (companyWebsite) body.companyWebsite = companyWebsite;

    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.log("error", error.response.data);
      return error.response.data;
    } else {
      console.log("error", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};

export const updateOrganization = async (
  jwt: string,
  orgId: number,
  {
    companyEmail,
    organizationName,
    organizationLogo,
    industry,
    description,
    companySize,
    foundedYear,
    companyPhone,
    companyLocation,
    companyWebsite
  }: OrganizationData
) => {
  "use server";
  const url = `${Base_URL_organization}/organizations/me/${orgId}`;
  try {
    const body: any = {};
    if (companyEmail) body.companyEmail = companyEmail;
    if (organizationName) body.organizationName = organizationName;
    if (organizationLogo) body.organizationLogo = organizationLogo;
    if (industry) body.industry = industry;
    if (description) body.description = description;
    if (companySize) body.companySize = companySize;
    if (foundedYear) body.foundedYear = foundedYear;
    if (companyPhone) body.companyPhone = companyPhone;
    if (companyLocation) body.companyLocation = companyLocation;
    if (companyWebsite) body.companyWebsite = companyWebsite;

    const response = await axios.patch(url, body, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.log("error", error.response.data);
      return error.response.data;
    } else {
      console.log("error", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};

export const deleteOrganization = async (jwt: string, orgId: number) => {
  "use server";
  const url = `${Base_URL_organization}/organizations/me/${orgId}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.log("error", error.response.data);
      return error.response.data;
    } else {
      console.log("error", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};
