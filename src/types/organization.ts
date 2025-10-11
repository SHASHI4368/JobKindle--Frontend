export type Organization = {
  imageUploadDialogOpen: boolean;
  myOrganizations: OrgProps[];
  selectedOrganization: OrganizationDetails | null;
};

export type OrgProps = {
  orgId: number;
  organizationName: string;
  organizationLogo: string;
  industry: string;
};

export type OrganizationDetails = {
  orgId: number;
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
  userEmail: string;
};

