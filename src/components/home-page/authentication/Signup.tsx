"use client";

import InputWithIcon from "@/components/common/input-fields/input-with-icon";
import PasswordWithIcon from "@/components/common/input-fields/password-with-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setLogin } from "@/redux/features/authSlice";
import { Lock, Mail, Check, X } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import EmailVerificationMessage from "./EmailVerificationMessage";
import { signup } from "@/actions/authAction";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, level: "", color: "", checks: [] };

    const checks = [
      {
        test: password.length >= 8,
        label: "At least 8 characters",
        passed: password.length >= 8,
      },
      {
        test: /[a-z]/.test(password),
        label: "Contains lowercase letter",
        passed: /[a-z]/.test(password),
      },
      {
        test: /[A-Z]/.test(password),
        label: "Contains uppercase letter",
        passed: /[A-Z]/.test(password),
      },
      {
        test: /\d/.test(password),
        label: "Contains number",
        passed: /\d/.test(password),
      },
      {
        test: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        label: "Contains special character",
        passed: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      },
    ];

    const score = checks.filter((check) => check.passed).length;

    let level = "";
    let color = "";

    if (score <= 1) {
      level = "Very Weak";
      color = "bg-red-500";
    } else if (score === 2) {
      level = "Weak";
      color = "bg-orange-500";
    } else if (score === 3) {
      level = "Fair";
      color = "bg-yellow-500";
    } else if (score === 4) {
      level = "Good";
      color = "bg-blue-500";
    } else {
      level = "Strong";
      color = "bg-green-500";
    }

    return { score, level, color, checks };
  }, [password]);

  // Password match validation
  const passwordsMatch = useMemo(() => {
    if (!confirmPassword) return null;
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const changeView = () => {
    dispatch(setLogin(true));
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await signup(email, password);
      setVerificationSent(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      console.log(response);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full font-geist-sans h-full flex flex-col ">
      <div className="flex cursor-pointer text-[22px] font-geist-sans flex-row items-center justify-center space-x-3 w-full">
        <div className="font-[700]  text-[18px] py-1 px-[8px] text-white rounded-[10px] bg-gradient-to-br from-primary to-secondary    ">
          Jo
        </div>
        <div className="font-[700] bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
          JobKindle
        </div>
      </div>

      {verificationSent ? (
        <EmailVerificationMessage userEmail={email} />
      ) : (
        <>
          <h1 className="md:text-[21px] text-[17px] font-[700] text-center my-[15px] ">
            Register Now !
          </h1>
          <div className="flex flex-col w-full gap-5">
            <InputWithIcon
              label="Email Address"
              type="email"
              icon={<Mail size={18} className="text-gray-500" />}
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            <PasswordWithIcon
              label="Password"
              icon={<Lock size={18} className="text-gray-500" />}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-3">
                {/* Strength Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="sm:text-[13px] text-[12px] text-gray-600">
                      Password Strength:
                    </span>
                    <span
                      className={`sm:text-[13px] text-[12px] font-[400] ${
                        passwordStrength.level === "Very Weak"
                          ? "text-red-500"
                          : passwordStrength.level === "Weak"
                          ? "text-orange-500"
                          : passwordStrength.level === "Fair"
                          ? "text-yellow-500"
                          : passwordStrength.level === "Good"
                          ? "text-blue-500"
                          : "text-green-500"
                      }`}
                    >
                      {passwordStrength.level}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{
                        width: `${(passwordStrength.score / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Password Requirements Checklist */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="sm:text-[13px] text-[12px] font-medium text-gray-700 mb-2">
                    Password Requirements:
                  </p>
                  <div className="space-y-1">
                    {passwordStrength.checks.map((check, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {check.passed ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <X size={14} className="text-gray-400" />
                        )}
                        <span
                          className={`text-xs ${
                            check.passed ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <PasswordWithIcon
              label="Re-Enter Password"
              icon={<Lock size={18} className="text-gray-500" />}
              placeholder="Re enter your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            {/* Password Match Indicator */}
            {confirmPassword && (
              <div className="flex items-center space-x-2">
                {passwordsMatch ? (
                  <>
                    <Check size={16} className="text-green-500" />
                    <span className="sm:text-[13px] text-[12px] text-green-600">
                      Passwords match
                    </span>
                  </>
                ) : (
                  <>
                    <X size={16} className="text-red-500" />
                    <span className="sm:text-[13px] text-[12px] text-red-600">
                      Passwords don't match
                    </span>
                  </>
                )}
              </div>
            )}

            <Button
              className="text-white h-[45px]"
              size={"home"}
              variant={"default"}
              disabled={
                passwordStrength.score < 3 || !passwordsMatch || loading
              }
              onClick={handleSignup}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing Up...
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>

            <div className="w-full flex flex-row items-center gap-3">
              <div className="w-full h-[0.5px] bg-gray-300"></div>
              <p className="text-[14px] w-full text-center font-[400] text-gray-600">
                or continue with
              </p>
              <div className="w-full h-[0.5px] bg-gray-300"></div>
            </div>

            <Button
              className="text-white font-[500] h-[45px] bg-white "
              size={"home"}
              variant={"outline"}
            >
              <img
                src="/images/google.png"
                className="w-5 h-5 mr-2 inline-block"
              />
              <span className="text-gray-800">Sign In with Google</span>
            </Button>

            <div className="">
              <p className="text-[14px] text-gray-600 text-center">
                Already have an account?{" "}
                <span
                  onClick={changeView}
                  className="text-primary hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  Sign In
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
