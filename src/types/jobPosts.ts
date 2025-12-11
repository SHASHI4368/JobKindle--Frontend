export type CreateJobPosts = {
  jobPosts: ViewPostData[];
};

export type FindJobs = {
  jobSearchDialogOpen: boolean;
  jobPosts: ViewPostData[];
};

export type ApplicationDocument = {
  id: string;
  name: string;
  size: string;
  type: "CV" | "COVER_LETTER" | "other";
  url: string;
};


export type ViewPostData = {
  jobData: {
    basicInformation: {
      id: number;
      jobTitle: string;
      companyName: string;
      companyLogo?: string;
      location: string;
      workType: string;
      experienceLevel: string;
      employmentType: string;
      currency: string;
      salary: {
        min: number;
        max: number;
      };
    };
    jobDetails: {
      jobDescription: string;
      requirements: string[];
      benefits: string;
    };
    skills: string[];
    deadline: string;
    applicationsCount: number;
  };
};

export interface Salary {
  min: number;
  max: number;
}

export interface BasicInformation {
  id: number;
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

export type ViewPostsProps = {
  postId: number;
  companyName: string;
  companyLogo: null;
  location: string;
  workType: string;
  experienceLevel: string;
  employmentType: string;
  minSalary: number;
  maxSalary: number;
  title: string;
  description: string;
  requirements: string;
  createdAt: string;
  deadline: string;
  applicationsCount: number;
  benefits: string;
  skills: [
    {
      id: number;
      name: string;
    }[]
  ];
  orgId: number;
  createdBy: string;
  currency: string;
  active: boolean;
  draft: false;
};
