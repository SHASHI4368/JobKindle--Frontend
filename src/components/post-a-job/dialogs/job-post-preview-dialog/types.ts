export interface Salary {
  min: number;
  max: number;
}

export interface BasicInformation {
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  workType: string;
  experienceLevel: string;
  employmentType: string;
  currency: string;
  salary: Salary;
}

export interface JobDetails {
  jobDescription: string;
  requirements: string[];
  benefits: string[];
}

export interface JobData {
  basicInformation: BasicInformation;
  jobDetails: JobDetails;
  skills: string[];
  deadline: string;
}

export interface JobPostPreviewMainProps {
  jobData: JobData;
}

export interface JobPostPreviewDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  jobData: JobData & { id: number };
}