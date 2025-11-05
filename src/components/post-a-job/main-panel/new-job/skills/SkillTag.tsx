import React, { useMemo } from "react";
import { X } from "lucide-react";

const SkillTag = ({
  skill,
  onDelete,
}: {
  skill: string;
  onDelete?: () => void;
}) => {
  // Predefined color combinations for better design consistency
  const colorVariants = [
    {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-300",
    },
    {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-300",
    },
    {
      bg: "bg-purple-100",
      text: "text-purple-800",
      border: "border-purple-300",
    },
    {
      bg: "bg-pink-100",
      text: "text-pink-800",
      border: "border-pink-300",
    },
    {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-300",
    },
    {
      bg: "bg-indigo-100",
      text: "text-indigo-800",
      border: "border-indigo-300",
    },
    {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-300",
    },
    {
      bg: "bg-orange-100",
      text: "text-orange-800",
      border: "border-orange-300",
    },
    {
      bg: "bg-teal-100",
      text: "text-teal-800",
      border: "border-teal-300",
    },
    {
      bg: "bg-cyan-100",
      text: "text-cyan-800",
      border: "border-cyan-300",
    },
    {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      border: "border-emerald-300",
    },
    {
      bg: "bg-violet-100",
      text: "text-violet-800",
      border: "border-violet-300",
    },
  ];

  // Generate consistent color based on skill name (same skill = same color)
  const selectedColor = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < skill.length; i++) {
      const char = skill.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    const index = Math.abs(hash) % colorVariants.length;
    return colorVariants[index];
  }, [skill]);

  return (
    <div
      className={`${selectedColor.bg} border ${selectedColor.border} font-geist-sans ${selectedColor.text} text-sm font-medium mr-2 px-2.5 py-1 rounded-l-full rounded-r-full flex items-center gap-2 group hover:opacity-80 transition-opacity`}
    >
      <span>{skill}</span>
      {onDelete && (
        <button
          onClick={onDelete}
          className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-black/10 transition-colors opacity-60 hover:opacity-100"
          type="button"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
};

export default SkillTag;
