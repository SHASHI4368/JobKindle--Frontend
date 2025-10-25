"use client";

import React, { useEffect } from "react";
import Intro from "./main/intro";
import Featured from "./main/featured";
import Offer from "./main/offer";
import Pros from "./main/pros";
import Footer from "./main/footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData } from "@/actions/profileActions";
import Cookies from "js-cookie";
import { setProfileDetails } from "@/redux/features/accountSlice";

const Home = () => {
  const [loading, setLoading] = React.useState(false);
  const account = useSelector((state: any) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const jwt = Cookies.get("jwt");
      if (jwt) {
        try {
          setLoading(true);
          const data = await fetchProfileData(jwt);
          if (data.success) {
            dispatch(
              setProfileDetails({
                email: data.data.email || "",
                firstname: data.data.firstname || "",
                lastname: data.data.lastname || "",
                location: data.data.location || "",
                phone: data.data.phone || "",
                profilePic: data.data.profilePic || null,
                jobTitle: data.data.jobTitle || "",
                bio: data.data.bio || "",
                linkedin: data.data.linkedin || "",
                experience: data.data.experience || [],
                education: data.data.education || [],
                website: data.data.website || "",
                resume: data.data.resume || null,
              })
            );
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            {/* Loading spinner */}
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

            {/* Transition text */}
            <div className="text-primary font-semibold text-lg animate-pulse">
              Loading ...
            </div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-full min-h-screen flex flex-col">
        <Intro />
        <Featured />
        <Offer />
        <Pros />
        <Footer />
      </div>
    </>
  );
};

export default Home;
