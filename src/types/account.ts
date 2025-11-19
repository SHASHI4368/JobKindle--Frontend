export type Account = {
  imageUploadDialogOpen: boolean;
  isProfileEditing: boolean;
  profile: {
    email: string | null;
    firstname: string | null;
    lastname: string | null;
    location: string | null;
    phone: string | null;
    profilePic: string | null;
    jobTitle: string | null;
    bio: string | null;
    linkedin: string | null;
    experience: string | null;
    education: string | null;
    githubUrl: string | null;
    resume: string | null;
  };
};
