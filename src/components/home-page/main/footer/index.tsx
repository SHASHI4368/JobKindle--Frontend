import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full text-gray-300 py-[80px] flex font-geist-sans flex-col bg-footer-blue">
      <div className="flex w-full sm:flex-row flex-col  px-[10vw]">
        <div className="sm:w-[38%] w-full sm:pr-[10px] flex flex-col gap-6 ">
          <div className="flex text-[30px] font-geist-sans flex-row items-center justify-start space-x-3 w-full">
            <div className="font-[700]  text-[20px] py-2 px-[15px] text-white rounded-[10px] bg-gradient-to-br from-primary to-secondary    ">
              Jo
            </div>
            <div className="font-[700] bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
              JobKindle
            </div>
          </div>
          <p className="text-[16px] font-[400]  ">
            Transform your hiring process with AI-powered recruitment. Connect
            top talent with leading companies through intelligent matching,
            automated screening, and bias-free evaluation.
          </p>
          <div className="flex flex-row items-center gap-2">
            <MapPin size={20} className="font-bold text-primary " />
            <p className="sm:text-[16px] text-[14px] font-[400]  ">
              123 Innovation Drive, Tech Valley, CA 94043
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Phone size={20} className="font-bold text-primary " />
            <p className="sm:text-[16px] text-[14px] font-[400]  ">
              (123) 456-7890
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Mail size={20} className="font-bold text-primary " />
            <p className="sm:text-[16px] text-[14px] font-[400]  ">
              contact@hireme.com
            </p>
          </div>
          <div className="flex flex-row gap-5 mt-[10px] items-center">
            <a
              href="#"
              className="flex bg-gray-800 hover:scale-[1.1] hover:bg-gray-700 transition-all duration-500  rounded-[10px] p-[15px] flex-row items-center justify-center"
            >
              <Facebook size={20} className="text-white" />
            </a>
            <a
              href="#"
              className="flex bg-gray-800 hover:scale-[1.1] hover:bg-gray-700 transition-all duration-500  rounded-[10px] p-[15px] flex-row items-center justify-center"
            >
              <Twitter size={20} className="text-white" />
            </a>

            <a
              href="#"
              className="flex bg-gray-800 hover:scale-[1.1] hover:bg-gray-700 transition-all duration-500  rounded-[10px] p-[15px] flex-row items-center justify-center"
            >
              <Linkedin size={20} className="text-white" />
            </a>
          </div>
          <h1 className="text-[18px] text-white font-[600] mt-[40px]">
            Support
          </h1>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Help Center
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            FAQ
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Community
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            API Documentation
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Status Page
          </a>
        </div>
        <div className="sm:w-[20%] w-full sm:pr-[10px] flex flex-col gap-3">
          <h1 className="text-[18px] text-white font-[600] sm:mt-0  mt-[40px]">
            For Job Seekers
          </h1>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Browse Jobs
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Career Advice
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Resume Builder
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Salary Guide
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Interview Tips
          </a>
        </div>
        <div className="sm:w-[20%] w-full sm:pr-[10px] flex flex-col gap-3">
          <h1 className="text-[18px] text-white font-[600] sm:mt-0  mt-[40px]">
            For Employers
          </h1>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Post a Job
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Search Candidates
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Pricing Plans
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Employer Branding
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Recruitment Solutions
          </a>
        </div>
        <div className="sm:w-[20%] w-full sm:pr-[10px] flex flex-col gap-3">
          <h1 className="text-[18px] text-white font-[600] sm:mt-0  mt-[40px]">
            Company
          </h1>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            About Us
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Our Team
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Careers
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Press & Media
          </a>
          <a href="#" className="text-gray-300 text-[16px] hover:underline">
            Contact Us
          </a>
        </div>
      </div>
      <div className="mt-[50px] text-[16px] w-full bottom-0 flex flex-col">
        <div className="h-[2px] bg-gray-600" />
        <div className="flex px-[10vw] mt-[50px] font-geist-sans sm:flex-row flex-col items-center justify-between">
          <p className="">© 2025 HireMe. All rights reserved.</p>
          <div className="flex sm:flex-row flex-col sm:mt-0 mt-[20px]  items-center text-gray-400 sm:gap-5 gap-1">
            <p className="cursor-pointer hover:text-gray-200 transition-all duration-300 ">
              Privacy Policy
            </p>
            <p className="cursor-pointer hover:text-gray-200 transition-all duration-300 ">
              Terms & Conditions
            </p>
            <p className="cursor-pointer hover:text-gray-200 transition-all duration-300 ">
              Cookie Policy
            </p>
            <p className="cursor-pointer hover:text-gray-200 transition-all duration-300 ">
              GDPR Compliance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
