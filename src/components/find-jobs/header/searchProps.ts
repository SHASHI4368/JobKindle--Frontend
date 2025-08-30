export type searchProps = {
  searchTerm: string | null;
  location: string | null;
  datePosted: string;
  experienceLevel: string;
  workType: string;
  dateOptions: { label: string; value: string }[];
  experienceOptions: { label: string; value: string }[];
  workTypeOptions: { label: string; value: string }[];
  setLocation: (location: string) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDatePostedChange: (value: string) => void;
  handleExperienceLevelChange: (value: string) => void;
  handleWorkTypeChange: (value: string) => void;
  handleClearFilters: () => void;
  handleJobSearch: () => void;
};

