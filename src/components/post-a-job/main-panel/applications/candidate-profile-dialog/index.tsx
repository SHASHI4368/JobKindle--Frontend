import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Github,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  Eye,
} from "lucide-react";
import { Application } from "@/types/application";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DialogTrigger } from "@radix-ui/react-dialog";

type CandidateProfileDialogProps = {
  application: Application | null;
};

const CandidateProfileDialog = ({
  application,
}: CandidateProfileDialogProps) => {
  if (!application) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDocumentIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-blue-600" />;
  };

  const getDocumentTypeName = (type: string) => {
    const typeMap: { [key: string]: string } = {
      resume: "Resume/CV",
      coverLetter: "Cover Letter",
      portfolio: "Portfolio",
      certificate: "Certificate",
    };
    return typeMap[type.toLowerCase()] || type;
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2"
          title="View Resume"
        >
          <Eye className="w-3.5 h-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{ maxWidth: "60vw" }}
        className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col beautiful-scrollbar"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            Candidate Details
          </DialogTitle>
          <DialogDescription>
            Complete application information for {application.firstName}{" "}
            {application.lastName}
          </DialogDescription>
        </DialogHeader>

        <div
          id="main-content"
          className="flex-1 overflow-y-auto beautiful-scrollbar space-y-6 py-4"
        >
          {/* Personal Information Card */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-500">Full Name</p>
                  <p className="text-sm text-gray-900 mt-1">
                    {application.firstName} {application.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-500">
                    Email Address
                  </p>
                  <p className="text-sm text-gray-900 mt-1 truncate">
                    {application.userEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-500">
                    Phone Number
                  </p>
                  <p className="text-sm text-gray-900 mt-1">
                    {application.telephone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-500">Address</p>
                  <p className="text-sm text-gray-900 mt-1">
                    {application.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Application Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-500">
                    Applied On
                  </p>
                  <p className="text-sm text-gray-900 mt-1">
                    {formatDate(application.appliedAt)}
                  </p>
                </div>
              </div>

              {application.githubUrl && (
                <div className="flex items-start gap-3">
                  <Github className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-500">
                      GitHub Profile
                    </p>
                    <a
                      href={application.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 truncate mt-1"
                    >
                      View Profile
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scores Section */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Evaluation Scores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-semibold text-white">
                    {application.resumeScore ?? "—"}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Resume Score
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {application.resumeScore
                      ? "AI-evaluated score"
                      : "Not evaluated yet"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-semibold text-white">
                    {application.interviewScore ?? "—"}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Interview Score
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {application.interviewScore
                      ? "Interview evaluation"
                      : "Not evaluated yet"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          {application.documentList && application.documentList.length > 0 && (
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Uploaded Documents
              </h3>
              <div className="space-y-2">
                {application.documentList.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {getDocumentTypeName(doc.type)}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-2 text-gray-600 hover:text-gray-900"
                      onClick={() =>
                        handleDownload(
                          doc.url,
                          `${getDocumentTypeName(doc.type)}_${
                            application.firstName
                          }_${application.lastName}`
                        )
                      }
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Documents Message */}
          {(!application.documentList ||
            application.documentList.length === 0) && (
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium">
                  No documents uploaded
                </p>
                <p className="text-sm text-gray-500">
                  This candidate hasn't uploaded any documents yet
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateProfileDialog;
