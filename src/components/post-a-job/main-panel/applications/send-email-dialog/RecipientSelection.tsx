import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Users, Hash } from "lucide-react";

type RecipientSelectionProps = {
  sendMode: "selected" | "count";
  setSendMode: (mode: "selected" | "count") => void;
  selectedCount: number;
  recipientCount: string;
  setRecipientCount: (count: string) => void;
  maxCount: number;
};

const RecipientSelection = ({
  sendMode,
  setSendMode,
  selectedCount,
  recipientCount,
  setRecipientCount,
  maxCount,
}: RecipientSelectionProps) => {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200">
      <h3 className="text-base font-semibold text-gray-900 mb-4">
        Choose Recipients
      </h3>
      <RadioGroup
        value={sendMode}
        onValueChange={(value: any) => setSendMode(value)}
        className="space-y-3"
      >
        {/* Selected Candidates Option */}
        <div
          className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
            sendMode === "selected"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setSendMode("selected")}
        >
          <RadioGroupItem value="selected" id="selected" className="mt-0.5" />
          <Label htmlFor="selected" className="flex-1 cursor-pointer space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-900">
                  Selected Candidates
                </span>
              </div>
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                {selectedCount}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Send emails to candidates you've selected from the table
            </p>
          </Label>
        </div>

        {/* Specific Count Option */}
        <div
          className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
            sendMode === "count"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setSendMode("count")}
        >
          <RadioGroupItem value="count" id="count" className="mt-0.5" />
          <Label htmlFor="count" className="flex-1 cursor-pointer space-y-2">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-900">
                Specific Number of Candidates
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Send emails to the first N candidates from your list
            </p>
            {sendMode === "count" && (
              <div className="pt-2">
                <Input
                  type="number"
                  min="1"
                  max={maxCount}
                  value={recipientCount}
                  onChange={(e) => setRecipientCount(e.target.value)}
                  placeholder="Enter number"
                  className="w-full max-w-xs"
                  onClick={(e) => e.stopPropagation()}
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  Maximum: {maxCount} candidates
                </p>
              </div>
            )}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RecipientSelection;
