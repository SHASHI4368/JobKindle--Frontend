import { Brain, ChartColumn, MessageCircle, Shield, Sparkles, Target } from 'lucide-react';
import React from 'react'
import OfferCard from './OfferCard';
import { item } from './type';
import { Button } from '@/components/ui/button';

const items: item[] = [
  {
    icon: <Brain size={30} className="text-white" />,
    colorStart: "#338AF1",
    colorEnd: "#0CAFD8",
    title: "Smart CV Analysis",
    description:
      "Our AI analyzes resumes using natural language processing to extract key skills, experience, and qualifications with 95% accuracy.",
    points: ["Skill Extraction", "Experience Mapping", "Quality Scoring"],
  },
  {
    icon: <Target size={30} className="text-white" />,
    colorStart: "#B053EB",
    colorEnd: "#E24AA7",
    title: "Intelligent Matching",
    description:
      "Advanced algorithms match candidates to job requirements based on skills, experience, culture fit, and career aspirations.",
    points: ["Skill Matching", "Culture Fit", "Career Goals"],
  },
  {
    icon: <MessageCircle size={30} className="text-white" />,
    colorStart: "#20C369",
    colorEnd: "#15B99E",
    title: "AI Interview Bot",
    description:
      "Conduct preliminary interviews with our conversational AI that adapts questions based on job requirements and candidate responses.",
    points: ["Dynamic Questions", "Real-time Analysis", "Bias Reduction"],
  },
  {
    icon: <ChartColumn size={30} className="text-white" />,
    colorStart: "#F76B1D",
    colorEnd: "#F0493F",
    title: "Predictive Analytics",
    description:
      "Predict candidate success probability and job performance using machine learning models trained on thousands of hiring outcomes.",
    points: ["Success Prediction", "Performance Metrics", "Risk Assessment"],
  },
  {
    icon: <Shield size={30} className="text-white" />,
    colorStart: "#6C64F2",
    colorEnd: "#9F57F6",
    title: "Bias-Free Screening",
    description:
      "Eliminate unconscious bias with objective AI screening that focuses purely on skills and qualifications.",
    points: ["Objective Scoring", "Fair Assessment", "Diversity Focus"],
  },
  {
    icon: <Sparkles size={30} className="text-white" />,
    colorStart: "#ED4791",
    colorEnd: "#F34068",
    title: "Automated Insights",
    description:
      "Generate detailed candidate reports and hiring insights to help recruiters make data-driven decisions faster.",
    points: ["Candidate Reports", "Hiring Insights", "Decision Support"],
  },
];

const Offer = () => {
  return (
    <div className="w-full flex py-[20px] pt-[50px] bg-gradient-to-r from-[#F1F7FF] to-white items-center justify-start flex-col">
      <h1 className="font-raleway font-[700] md:text-[60px] sm:text-[50px] text-[40px] text-center sm:leading-[60px] leading-[45px] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        What We Offer for Recruitment
      </h1>
      <p className="text-gray-600 font-raleway md:text-[23px] sm:text-[20px] text-[18px] mt-[40px] md:max-w-[50vw] max-w-[90vw] text-center">
        Experience the future of hiring with our cutting-edge AI technologies
        that streamline recruitment, reduce bias, and find the perfect
        candidate-job matches.
      </p>
      <div className="md:px-[10vw] w-full  mt-[30px] flex flex-row items-center justify-center flex-wrap gap-[30px]">
        {items.map((item, index) => (
          <OfferCard key={index} item={item} />
        ))}
      </div>
      <div className="w-full sm:px-[10vw] px-[5vw] pt-[50px]">
        <div className="w-full bg-gradient-to-r rounded-[10px] shadow-lg p-5 from-primary to-secondary flex flex-col items-center justify-center ">
          <h1 className="font-raleway font-[700] text-center md:text-[45px] sm:text-[43px] text-[35px] sm:leading-[60px] leading-[40px] text-white ">
            Ready to Transform Your Hiring Process?
          </h1>
          <p className="md:text-[20px] sm:text-[20px] text-[16px] text-center font-raleway font-[400] text-white mt-[20px]">
            Join thousands of companies already using AI to find the perfect
            candidates
          </p>
          <div className="flex w-full sm:flex-row flex-col mt-[30px] items-center justify-center gap-[20px]">
            <Button
              size={"card"}
              className="bg-white sm:w-fit w-full text-primary hover:bg-white hover:opacity-90 hover:scale-[1.03] transition-all duration-300 font-raleway shadow-2xs  "
            >
              Start Free Trial
            </Button>
            <Button
              size={"card"}
              variant={"outlineStrong"}
              className="bg-transparent text-white sm:w-fit w-full border-[1px] border-white hover:bg-transparent hover:text-white hover:scale-[1.03]  transition-all duration-300 "
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offer