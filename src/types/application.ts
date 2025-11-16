export type ApplicationDucument = {
  id: string;
  type: string;
  url: string;
};

export interface Application {
  applicationId: number;
  postId: number;
  userEmail: string;
  firstName: string;
  lastName: string;
  githubUrl: string | null;
  telephone: string;
  address: string;
  appliedAt: string;
  documentList: ApplicationDucument[] | null;
  resumeScore: number | null;
  interviewScore: number | null;
  status: string;
}

export interface ApplicationResponse {
  candidate_name: string;
  cv_summary: string;
  github_summary: string;
  email: string;
  match_analysis: string;
  score: number;
}
			
