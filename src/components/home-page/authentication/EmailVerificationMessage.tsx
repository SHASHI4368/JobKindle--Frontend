import React from "react";
import { Mail, CheckCircle, Clock } from "lucide-react";

const EmailVerificationMessage = ({ userEmail = "your email" }) => {
  return (
    <div className="w-full h-[500px] flex flex-col items-center justify-center max-w-md mx-auto  p-6 ">
      {/* Animated Icon Container */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          {/* Outer pulse ring */}
          <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-30"></div>

          {/* Inner icon container */}
          <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-4 shadow-lg">
            <Mail className="w-8 h-8 text-white animate-bounce" />

            {/* Small check icon overlay */}
            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Message */}
      <div className="text-center space-y-3">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Check Your Email
        </h3>

        <p className="text-gray-600 leading-relaxed">
          An email has been sent to{" "}
          <span className="font-semibold text-blue-600">{userEmail}</span> for
          verification. Please check your inbox and click the verification link.
        </p>

        {/* Status indicator */}
        <div className="flex items-center justify-center space-x-2 mt-4 p-3 bg-white bg-opacity-70 rounded-lg">
          <Clock className="w-4 h-4 text-amber-500" />
          <span className="text-sm text-gray-600">Verification pending</span>
        </div>

        {/* Additional info */}
        <div className="mt-4 p-3 bg-blue-100 bg-opacity-60 rounded-lg">
          <p className="text-xs text-gray-500">
            Don't see the email? Check your spam folder or{" "}
            <button className="text-blue-600 hover:text-blue-800 font-medium underline transition-colors">
              resend verification email
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationMessage;
