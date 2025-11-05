import ViewApplication from "@/components/post-a-job/main-panel/applications";
import React from "react";

const ViewApplicationPage = () => {
  return (
    <div className="flex w-full min-h-screen overflow-auto beautiful-scrollbar">
      <ViewApplication />
    </div>
  );
};

export default ViewApplicationPage;
