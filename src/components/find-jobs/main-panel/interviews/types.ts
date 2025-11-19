export interface InterviewScheduleDetails {
  applicationId: number;
  jobData: {
    id: number;
    jobTitle: string;
    companyName: string;
    companyLogo: string;
    location: string;
    workType: string;
    experienceLevel: string;
    employmentType: string;
  };
  interviewDate: string;
}
