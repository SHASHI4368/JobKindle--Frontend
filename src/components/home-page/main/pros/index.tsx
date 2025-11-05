import { Award, Clock4, Heart, TrendingUp, Users, Zap } from "lucide-react";
import React from "react";
import { ProItem } from "./type";
import ProCard from "./ProCard";
import { Button } from "@/components/ui/button";

const items: ProItem[] = [
  {
    icon: <Zap size={30} className="text-white m-0 p-0" />,
    title: "10x Faster Hiring",
    description:
      "Reduce your time-to-hire from weeks to days with our AI-powered screening and matching process.",
    summary: "90% faster",
  },
  {
    icon: <TrendingUp size={30} className="text-white m-0 p-0" />,
    title: "Higher Quality Matches",
    description:
      "Our AI analyzes 200+ data points to ensure perfect candidate-job alignment and cultural fit.",
    summary: "95% accuracy",
  },
  {
    icon: <Users size={30} className="text-white m-0 p-0" />,
    title: "Diverse Talent Pool",
    description:
      "Access a global network of pre-screened candidates from diverse backgrounds and skill sets.",
    summary: "100K+ candidates",
  },
  {
    icon: <Award size={30} className="text-white m-0 p-0" />,
    title: "Proven Track Record",
    description:
      "Join 5,000+ companies that have successfully hired top talent through our platform.",
    summary: "98% satisfaction",
  },
  {
    icon: <Clock4 size={30} className="text-white m-0 p-0" />,
    title: "24/7 AI Support",
    description:
      "Our AI assistant works around the clock to screen candidates and schedule interviews automatically.",
    summary: "24/7 available",
  },
  {
    icon: <Heart size={30} className="text-white m-0 p-0" />,
    title: "Bias-Free Hiring",
    description:
      "Ensure fair and objective candidate evaluation with our bias-eliminating AI algorithms.",
    summary: "0% bias",
  },
];

const Pros = () => {
  return (
    <div className="w-full flex py-[20px] pt-[100px] bg-gradient-to-r from-[#F1F7FF] to-white items-center justify-start flex-col">
      <h1 className="font-geist-sans font-[700] sm:leading-[60px] leading-[45px] text-center md:text-[60px] sm:text-[50px] text-[40px] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Why Choose HireMe?
      </h1>
      <p className="text-gray-600 font-geist-sans md:text-[20px] sm:text-[20px] text-[16px] text-center mt-[40px] sm:max-w-[50vw] max-w-[85vw]">
        {`We're not just another recruitment platform. We're your AI-powered
        hiring partner, committed to transforming how companies find and hire
        exceptional talent.`}
      </p>
      <div className="md:px-[10vw] w-full  mt-[30px] flex flex-row items-center justify-center flex-wrap gap-[30px]">
        {items.map((item, index) => (
          <ProCard key={index} item={item} />
        ))}
      </div>
      <div className="w-full sm:px-[10vw] px-[5vw] pt-[100px]">
        <div className="w-full bg-gradient-to-r rounded-[15px] shadow-xl p-5 from-primary to-secondary flex flex-col items-center justify-center ">
          <h1 className="font-geist-sans font-[700] md:text-[45px] sm:text-[43px] text-[35px] sm:leading-[60px] leading-[40px] text-center text-white ">
            Our Impact in Numbers
          </h1>
          <div className="flex font-geist-sans sm:mt-[20px] mt-[30px] text-white w-full sm:flex-row flex-col items-center justify-evenly sm:gap-0 gap-[20px] ">
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-[700] sm:text-[32px] text-[26px]">5,000+</h1>
              <p className="font-[400] sm:text-[16px] text-[14px] ">
                Companies Trust Us
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-[700] sm:text-[32px] text-[26px]">100K+</h1>
              <p className="font-[400] sm:text-[16px] text-[14px] ">
                Successful Hires
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-[700] sm:text-[32px] text-[26px]">95%</h1>
              <p className="font-[400] sm:text-[16px] text-[14px] ">
                CMatch Accuracy
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-[700] sm:text-[32px] text-[26px]">10x</h1>
              <p className="font-[400] sm:text-[16px] text-[14px] ">
                Faster Hirings
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex font-geist-sans flex-col w-full sm:px-[10vw] px-[5vw] gap-[30px] py-[100px] items-center ">
        <h1 className="font-[700] text-center md:text-[45px] sm:text-[43px] text-[35px] sm:leading-[60px] leading-[40px]">
          Ready to Experience the Future of Hiring?
        </h1>
        <p className="font-[400] sm:max-w-[50vw] max-w-[85vw] text-gray-600 md:text-[20px] sm:text-[20px] text-[16px] text-center">
          Join thousands of companies that have transformed their recruitment
          process with HireMe
        </p>
        <div className="flex sm:w-fit w-full px-[5vw] sm:flex-row flex-col mt-[30px] items-center justify-center gap-[20px]">
          <Button
            size={"card"}
            className=" text-white sm:w-fit w-full hover:scale-[1.03] transition-all duration-300 font-geist-sans  shadow-2xs "
          >
            Start Free Trial
          </Button>
          <Button
            size={"card"}
            variant={"outlineStrong"}
            className="bg-transparent sm:w-fit w-full text-primary border-[2px] border-primary hover:bg-transparent  hover:scale-[1.03] transition-all duration-300 "
          >
            Schedule Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pros;
