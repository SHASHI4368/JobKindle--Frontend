export type InterviewCard = {
 applicationId: number;
  jobData: {
    id: number;
    jobTitle: string;
    companyName: string;
    companyLogo?: string;
    location: string;
    workType: string;
    experienceLevel: string;
    employmentType: string;
  };
  interviewDate: string;
  interviewTime: string;
};

export type Conversation = {
  id?: string;
  text: string;
  isAI: boolean;
  timestamp: Date;
};

export type Violation = {
  id: string;
  name: string;
  timestamp: Date;
};

export interface Interview {
  id?: string;
  applicationID?: string;
  startedAt?: Date;
  endedAt?: Date;
  status?: "ongoing" | "completed";
  conversation?: Conversation[];
  violations?: Violation[];
}

export interface InterviewApplicationDetails {
  applicationId: number;
  postId: number;
  userEmail: string;
  firstName: string;
  lastName: string;
  githubUrl: string | null;
  telephone: string;
  address: string;
  appliedAt: string;
  documentList: string[];
}
