export type NewJobType = {
  title: string;
  company: {
    name: string;
    orgId: number;
  }
  location: string;
  workType: string;
  experienceLevel: string;
  employmentType: string;
  currency: {
    name: string;
    symbol: string;
  }

  salary: number;
  minSalary?: number;
  maxSalary?: number;
  jobDescription: string; 
  requirements: string;
  benefits: string;
  skills: string[];
  deadline: Date | undefined;
};
