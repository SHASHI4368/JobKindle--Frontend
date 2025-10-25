export type CreateJobPosts = {
  jobPosts: ViewPostData[];
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
      // benefits: post.benefits || [];
    };
    skills: string[];
    deadline: string;
  };
};
