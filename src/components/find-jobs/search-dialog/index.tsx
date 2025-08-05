import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle, MapPin, Search, X } from "lucide-react";
import InputWithIcon from "@/components/common/input-fields/input-with-icon";
import { parseAsString, useQueryState } from "nuqs";
import LocationInput from "@/components/common/input-fields/location-input";
import NormalSelector from "@/components/common/selectors/normal-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { set } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setJobSearchDialogOpen } from "@/redux/features/findJobsSlice";

const SearchDialog = () => {
  const findJobs = useSelector((state: any) => state.findJobs);
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(setJobSearchDialogOpen(false));
  };
  const [searchTerm, setSearchTerm] = useQueryState("searchTerm");
  const [location, setLocation] = useQueryState("location");
  const [datePosted, setDatePosted] = useQueryState(
    "datePosted",
    parseAsString.withDefault("")
  );
  const [experienceLevel, setExperienceLevel] = useQueryState(
    "experienceLevel",
    parseAsString.withDefault("")
  );
  const [workType, setWorkType] = useQueryState(
    "workType",
    parseAsString.withDefault("")
  );
  const [loading, setLoading] = useState(false);
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);

  const dateOptions = [
    { label: "Anytime", value: "anytime" },
    { label: "Past 24 hours", value: "24h" },
    { label: "Past 3 days", value: "3d" },
    { label: "Past week", value: "7d" },
    { label: "Past month", value: "30d" },
  ];

  const experienceOptions = [
    { label: "Any", value: "any" },
    { label: "Entry Level", value: "entry" },
    { label: "Mid Level", value: "mid" },
    { label: "Senior Level", value: "senior" },
    { label: "Executive", value: "executive" },
  ];

  const workTypeOptions = [
    { label: "Any", value: "any" },
    { label: "Remote", value: "remote" },
    { label: "Onsite", value: "onsite" },
    { label: "Hybrid", value: "hybrid" },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleDatePostedChange = (value: string) => {
    setDatePosted(value);
  };

  const handleExperienceLevelChange = (value: string) => {
    setExperienceLevel(value);
  };

  const handleWorkTypeChange = (value: string) => {
    setWorkType(value);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setLocation("");
    setDatePosted("");
    setExperienceLevel("");
    setWorkType("");
    setLoading(false);
    setLoadingCompleted(false);
    setResultsCount(0);
  };

  const handleJobSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoadingCompleted(true);
      setResultsCount(10); // Simulate 10 results found
    }, 2000);
  };

  

  return (
    <Dialog open={findJobs.jobSearchDialogOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="min-w-[40%] ">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase size={24} className="text-primary" />
            <span>Find Perfect Jobs For You</span>
          </DialogTitle>
          <div className="flex flex-col mt-[20px] gap-4">
            <InputWithIcon
              label="What are you looking for?"
              icon={<Search size={18} className="text-gray-500" />}
              placeholder="Search for jobs, companies, or skills"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <LocationInput
              icon={<MapPin size={18} className="text-gray-500" />}
              label="Location"
              placeholder="Enter location"
              value={location}
              onChange={handleLocationChange}
              isLocationSearch={true}
              onLocationSelect={(location) => {
                setLocation(location.display_name.split(",")[0]);
              }}
            />
            <div className="flex mt-[20px] flex-col gap-2">
              <p className="font-raleway   text-[14px] text-gray-500 font-[600] ">
                Refine Your Search
              </p>
              <div className="flex flex-row gap-4 items-center">
                <NormalSelector
                  label=""
                  items={dateOptions}
                  value={datePosted}
                  onChange={handleDatePostedChange}
                  placeholder="Date Posted"
                />
                <NormalSelector
                  label=""
                  items={experienceOptions}
                  value={experienceLevel}
                  onChange={handleExperienceLevelChange}
                  placeholder="Experience Level"
                />
                <NormalSelector
                  label=""
                  items={workTypeOptions}
                  value={workType}
                  onChange={handleWorkTypeChange}
                  placeholder="Work Type"
                />
              </div>
            </div>
            {loading && (
              <div className="flex items-center justify-center mt-4">
                <div className="flex items-center space-x-2">
                  {/* Spinning circle */}
                  {/* <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div> */}

                  {/* Animated dots */}
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>

                  {/* Text with fade animation */}
                  <span className="text-primary font-medium animate-pulse">
                    Searching
                  </span>
                </div>
              </div>
            )}
            {loadingCompleted && (
              <div className="mt-4 transform transition-all duration-500 ease-out animate-in slide-in-from-bottom-2 fade-in">
                <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                  {/* Success icon with animation */}
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600 animate-in zoom-in duration-300" />
                  </div>

                  {/* Results text */}
                  <div className="flex-1">
                    <p className="text-gray-700 font-medium">
                      Search completed! Found{" "}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 animate-in zoom-in duration-500 delay-200">
                        {resultsCount}
                      </span>{" "}
                      {resultsCount === 1 ? "match" : "matches"}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className="text-primary hover:text-primary/90"
                    onClick={handleDialogClose}
                  >
                    Goto Results
                  </Button>
                </div>
              </div>
            )}
            <div className="flex w-full mt-[20px] flex-row items-center justify-between">
              <Button
                onClick={handleClearFilters}
                className="h-[45px] "
                variant="outline"
              >
                <X size={16} className="text-red-500" />
                <span className="text-red-500">Clear All Filters</span>
              </Button>
              <Button
                onClick={handleJobSearch}
                className="h-[45px]"
                variant="default"
              >
                <Search size={16} className="text-white" />
                <span className="text-white">Search Jobs</span>
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
