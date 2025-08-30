"use client";

import NormalInput from "@/components/common/input-fields/normal-input";
import { Button } from "@/components/ui/button";
import { Plus, Tag } from "lucide-react";
import React, { useState } from "react";
import SkillTag from "./SkillTag";
import CalendarInput from "@/components/common/input-fields/date-input";

const Skills = () => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(e.target.value);
  };

  const handleAddSkill = () => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
      setSkill("");
    }
  };

  // Add this function to handle skill deletion
  const handleDeleteSkill = (skillToDelete: string) => {
    setSkills(skills.filter((s) => s !== skillToDelete));
  };

  const handleDeadlineChange = (date: Date | undefined) => {
    setDeadline(date);
  };

  return (
    <div className="w-full px-[20px] flex flex-col gap-4 justify-between mt-[20px] border border-gray-200 bg-white  rounded-[10px] p-4 ">
      <div className="flex flex-row items-center w-fit justify-start gap-2">
        <Tag size={25} className="text-blue-600" />
        <h1 className="font-raleway font-[600] text-[20px] ">
          Skills & Application Details
        </h1>
      </div>
      <div className="flex gap-4 flex-row items-end w-full">
        <NormalInput
          value={skill}
          onChange={handleSkillChange}
          label="Required Skills"
          placeholder="Add a skill"
        />
        <Button
          className="md:h-[45px] h-[40px] text-primary cursor-pointer "
          variant={"outline"}
          onClick={handleAddSkill}
        >
          <Plus className="" />
          <span className="font-[500] font-raleway"> Add</span>
        </Button>
      </div>
      <div className="w-full flex-wrap gap-2 justify-center flex flex-row">
        {skills.map((skill, index) => (
          <SkillTag
            key={index}
            skill={skill}
            onDelete={() => handleDeleteSkill(skill)}
          />
        ))}
      </div>
      <CalendarInput
        label="Application Deadline"
        placeholder="Select a deadline"
        date={deadline}
        onDateChange={handleDeadlineChange}
      />
    </div>
  );
};

export default Skills;
