import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Mail } from "lucide-react";

type Application = {
  id: number;
  email: string;
  fullName: string;
  status: string;
  resumeScore: number;
  interviewScore: number | null;
};

type ApplicationsTableProps = {
  applications: Application[];
  selectedCandidates: number[];
  onToggleCandidate: (id: number) => void;
  onToggleAll: () => void;
};

const ApplicationsTable = ({
  applications,
  selectedCandidates,
  onToggleCandidate,
  onToggleAll,
}: ApplicationsTableProps) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800 border border-yellow-200", label: "Pending" },
      interview_sent: {
        color: "bg-blue-100 text-blue-800 border border-blue-200",
        label: "Interview Sent",
      },
      selected: { color: "bg-green-100 text-green-800 border border-green-200", label: "Selected" },
    };
    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.color} hover:${config.color}`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden flex-1 overflow-y-auto beautiful-scrollbar">
      <Table className="font-geist-sans">
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedCandidates.length === applications.length}
                onCheckedChange={onToggleAll}
              />
            </TableHead>
            <TableHead className="w-[60px]">#</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Resume Score</TableHead>
            <TableHead className="text-center">Interview Score</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application, index) => (
            <TableRow key={application.id} className="hover:bg-gray-50">
              <TableCell>
                <Checkbox
                  checked={selectedCandidates.includes(application.id)}
                  onCheckedChange={() => onToggleCandidate(application.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                {application.fullName}
              </TableCell>
              <TableCell className="text-gray-600">
                {application.email}
              </TableCell>
              <TableCell className="">{getStatusBadge(application.status)}</TableCell>
              <TableCell className="text-center">
                <span className="inline-flex items-center justify-center w-12 h-8 bg-blue-100 border border-blue-200 text-blue-800 rounded-md font-semibold text-sm">
                  {application.resumeScore}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {application.interviewScore ? (
                  <span className="inline-flex items-center justify-center w-12 h-8 bg-purple-100 border border-purple-200 text-purple-800 rounded-md font-semibold text-sm">
                    {application.interviewScore}
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm">N/A</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2"
                    title="View Resume"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2"
                    title="Send Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationsTable;
