import React from "react";
import { Application } from "@/types/application";
import type { CVScore } from "./cvTypes";

type Props = {
  results: CVScore[] | null;
  applicants: Application[];
};

const ResultsList: React.FC<Props> = ({ results, applicants }) => {
  if (!results) return null;

  return (
    <div className="space-y-2 pt-2">
      <h4 className="text-sm font-semibold">CV Scores</h4>
      <div className="grid gap-2">
        {results.map((r) => {
          const applicant = applicants.find(
            (a) => a.userEmail === r.email
          );
          const name = applicant
            ? `${applicant.firstName ?? ""} ${
                applicant.lastName ?? ""
              }`.trim() || applicant.userEmail
            : r.email;

          return (
            <div
              key={r.email}
              className="p-3 border rounded flex items-center justify-between bg-white"
            >
              <div>
                <div className="text-sm font-medium">{name}</div>
                {r.email && (
                  <div className="text-xs text-gray-500">
                    {r.email}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">{r.score}</div>
                <div className="text-xs text-gray-500">out of 100</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsList;
