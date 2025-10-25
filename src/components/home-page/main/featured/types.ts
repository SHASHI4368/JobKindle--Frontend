type advertisement = {
  job: string;
  company: string;
  location: string | null;
  salary: string;
  fullTime: boolean;
  onSite: boolean;
  requirements: string[];
  calledDate: string;
  rating: number;
  applications: number;
};
export type { advertisement };