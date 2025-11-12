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
  isTechnical: boolean;
  timestamp: Date;
};

export type Violation = {
  id: string;
  name: string;
  timestamp: Date;
};

export type Evaluation = {
  overall_feedback: string;
  question_wise: {
    answer: string;
    feedback: string;
    masked: boolean;
    question: string;
    score: number;
  }[];
  total_score: number;
}

export interface Interview {
  id?: string;
  applicationID?: string;
  startedAt?: Date;
  endedAt?: Date;
  status?: "ongoing" | "completed";
  conversation?: Conversation[];
  violations?: Violation[];
  evaluation?: Evaluation | null;
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

export interface InterviewDetails {
  jobPost: {
    postId: number;
    title: string;
    companyName: string;
    companyLogo?: string;
    location: string;
    workType: string;
    experienceLevel: string;
    employmentType: string;
    description: string;
  };
}
