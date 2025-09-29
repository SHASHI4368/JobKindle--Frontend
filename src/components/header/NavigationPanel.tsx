import React, { useEffect, useState } from "react";
import { Home, Briefcase, User, Building2, ScanSearch } from "lucide-react";
import NavigationItem from "./NavigationItem";
import { usePathname, useRouter } from "next/navigation";
import { Router } from "next/router";

const NavigationPanel = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleNavClick = (item: string) => {
    if (item === activeItem || isTransitioning) return;
    setActiveItem(item);

    // Start transition
    setIsTransitioning(true);

    // Add a visible delay to show the transition
    setTimeout(() => {
      console.log(`${item} clicked`);

      // End transition after content change
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }, 150);
  };

  useEffect(() => {
    if (pathname === "/") setActiveItem("Home");
    else if (pathname === "/post-a-job") setActiveItem("Post a Job");
    else if (pathname === "/find-jobs") setActiveItem("Find Jobs");
    else if (pathname === "/organizations") setActiveItem("Organizations");
    else if (pathname === "/account") setActiveItem("");
  }, [pathname]);

  return (
    <>
      {/* Navigation Panel - positioned absolutely within header context */}
      <div
        className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:flex hidden flex-row items-center justify-center gap-1 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-100 transition-all duration-300 ${
          isTransitioning ? "scale-95 opacity-75" : "scale-100 opacity-100"
        }`}
      >
        <NavigationItem
          label="Home"
          icon={<Home size={18} />}
          isActive={activeItem === "Home"}
          onClick={() => {
            handleNavClick("Home");
            router.push("/");
          }}
        />

        <div className="h-[20px] w-[0.5px] bg-gray-300 mx-2"></div>

        <NavigationItem
          label="Post a Job"
          icon={<Briefcase size={18} />}
          isActive={activeItem === "Post a Job"}
          onClick={() => {
            handleNavClick("Post a Job");
            router.push("/post-a-job");
          }}
        />
        <div className="h-[20px] w-[0.5px] bg-gray-300 mx-2"></div>

        <NavigationItem
          label="Find Jobs"
          icon={<ScanSearch size={18} />}
          isActive={activeItem === "Find Jobs"}
          onClick={() => {
            handleNavClick("Find Jobs");
            router.push("/find-jobs");
          }}
        />

        <div className="h-[20px] w-[0.5px] bg-gray-300 mx-2"></div>

        {/* <NavigationItem
          label="My Account"
          icon={<User size={18} />}
          isActive={activeItem === "My Account"}
          onClick={() => {
            handleNavClick("My Account");
            router.push("/account");
          }}
        />
        <div className="h-[20px] w-[0.5px] bg-gray-300 mx-2"></div> */}

        <NavigationItem
          label="Organizations"
          icon={<Building2 size={18} />}
          isActive={activeItem === "Organizations"}
          onClick={() => {
            handleNavClick("Organizations");
            router.push("/organizations");
          }}
        />
      </div>
    </>
  );
};

export default NavigationPanel;
