"use client";

import InputWithIcon from "@/components/common/input-fields/input-with-icon";
import PasswordWithIcon from "@/components/common/input-fields/password-with-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setLogin } from "@/redux/features/authSlice";
import { Lock, Mail } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { login } from "@/actions/authAction";
import { setProfileEmail } from "@/redux/features/profileSlice";
import { encrypt } from "@/actions/crypto";
import toast from "react-hot-toast";
import { getAllOrganizations } from "@/actions/organizationActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const changeView = () => {
    dispatch(setLogin(false));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await login(email, password);
      console.log(response);
      if (response.success) {
        dispatch(setProfileEmail(response.data.email));
        const secret = process.env.SECRET_KEY || "";
        Cookies.set("profileEmail", encrypt(response.data.email, secret));
        Cookies.set("jwt", response.data.token, {
          expires: 1,
          path: "/",
        });
        const orgRes = await getAllOrganizations(response.data.token);
        if(orgRes.success){
          const orgCount = orgRes.data.length;
          if(orgCount > 0){
            Cookies.set("hasOrganization", "true", { expires: 1, path: "/" });
          } else {
            Cookies.set("hasOrganization", "false", { expires: 1, path: "/" });
          }
        }
        window.location.reload();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Login failed");
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full font-geist-sans h-full flex flex-col">
      <div className="flex cursor-pointer text-[22px] font-geist-sans flex-row items-center justify-center space-x-3 w-full">
        <div className="font-[700]  text-[18px] py-1 px-[8px] text-white rounded-[10px] bg-gradient-to-br from-primary to-secondary    ">
          Jo
        </div>
        <div className="font-[700] bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
          JobKindle
        </div>
      </div>
      <h1 className="md:text-[21px] text-[17px] font-[700] text-center mt-[20px] ">
        Welcome Back
      </h1>
      <p className="text-center md:text-[16px] text-[14px] text-gray-600 mb-[40px] ">
        Sign in to your account to continue
      </p>
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
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <Input
              type="checkbox"
              id="remember-me"
              className="h-3 w-3 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="remember-me" className="text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <p className="text-[14px] font-[500] text-primary hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            Forgot password?
          </p>
        </div>
        <Button
          className="text-white h-[45px]"
          size={"home"}
          variant={"default"}
          disabled={!email || !password || loading}
          onClick={handleLogin}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Signing In...
            </div>
          ) : (
            "Sign In"
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
          <img src="/images/google.png" className="w-5 h-5 mr-2 inline-block" />
          <span className="text-gray-800">Sign In with Google</span>
        </Button>
        <div className="">
          <p className="text-[14px] text-gray-600 text-center">
            Don't have an account?{" "}
            <span
              onClick={changeView}
              className="text-primary hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
