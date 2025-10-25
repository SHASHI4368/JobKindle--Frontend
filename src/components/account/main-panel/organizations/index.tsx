import { Button } from "@/components/ui/button";
import { BellRing, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Organizations = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Icon */}
          <div
            className={`
          flex-shrink-0 p-2 rounded-lg transition-all duration-300
          bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary
        `}
          >
            <Building2 />
          </div>

          {/* Text content */}
          <div className="flex flex-col">
            <span
              className={`
            font-semibold text-[18px] transition-colors duration-300 text-gray-800 group-hover:text-primary
            
          `}
            >
              Organization Management
            </span>
            <span
              className={`
              text-xs mt-1 transition-colors duration-300 text-gray-500 group-hover:text-gray-600
              
            `}
            >
              Manage your organizations to post jobs
            </span>
          </div>
        </div>
        <Button onClick={() => router.push("/organizations")} variant="outline" className="ml-4">
          Manage Organizations
        </Button>
      </div>
      <div className="flex w-full rounded-[10px] p-4 bg-primary/10 border border-primary flex-row gap-4 items-center ">
        <BellRing size={20} className="text-primary ml-2" />
        <div className="flex flex-col w-full justify-items-center-safe">
          <h1 className="text-primary text-[14px] font-raleway font-[500] ">
            Organization Required for Job Posting
          </h1>
          <p className="text-primary/80 text-[12px] font-raleway font-[400]">
            To post jobs, you need to have a verified organization with complete
            details. Create your organization profile to start hiring.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Organizations;
