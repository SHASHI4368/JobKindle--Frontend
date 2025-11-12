import NormalSelector from "@/components/common/selectors/normal-selector";
import { fi } from "date-fns/locale";
import { Bot } from "lucide-react";
import React from "react";
import dummyInterviews from "./dummyInterviews.json";
import InterviewListingCard from "./InterviewListingCard";

const Interviews = () => {
  const [interviewList, setInterviewList] = React.useState(dummyInterviews);
  const [filterBy, setFilterBy] = React.useState("all");
  const filterList = [
    { label: "All", value: "all" },
    { label: "Not Completed", value: "not_completed" },
    { label: "Completed", value: "completed" },
  ];
  const handleFilterInterviews = (value: string) => {
    setFilterBy(value);
  };
  return (
    <div>
      <div className="flex w-full md:flex-row flex-col md:items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Icon */}
          <div
            className={`
          flex-shrink-0 p-2 rounded-lg transition-all duration-300
          bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary
        `}
          >
            <Bot />
          </div>

          {/* Text content */}
          <div className="flex flex-col">
            <span
              className={`
            font-[700] text-[20px] transition-colors duration-300 text-gray-800 group-hover:text-primary
            
          `}
            >
              My Interviews
            </span>
            <span
              className={`
              text-xs mt-1 transition-colors duration-300 text-gray-500 group-hover:text-gray-600
              
            `}
            >
              View and manage job interviews
            </span>
          </div>
        </div>
        <div className="md:w-[16%] w-full">
          <NormalSelector
            label=""
            placeholder="Filter by"
            value={filterBy}
            onChange={handleFilterInterviews}
            items={filterList}
          />
        </div>
      </div>

      <div className="flex flex-col mt-4">
        {interviewList.map((interview, index) => {
          return <InterviewListingCard key={index} interviewData={interview} />;
        })}
      </div>
    </div>
  );
};

export default Interviews;
