"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  AlignJustify,
  X,
  Home,
  Briefcase,
  Building2,
  ScanSearch,
  User,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [currentSection, setCurrentSection] = useState(0); // 0 = Navigation, 1 = Account
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  // Touch handling
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (path: string, itemName: string) => {
    setActiveItem(itemName);
    router.push(path);
    setTimeout(() => setIsOpen(false), 200);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsOpen(false);
    console.log("User signed out");
  };

  const switchSection = (sectionIndex: number) => {
    if (sectionIndex === currentSection || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSection(sectionIndex);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSection === 0) {
      switchSection(1); // Navigate to Account
    } else if (isRightSwipe && currentSection === 1) {
      switchSection(0); // Navigate to Navigation
    }
  };

  // Reset section when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentSection(0);
    }
  }, [isOpen]);

  const sections = [
    {
      title: "Navigation",
      items: (
        <div className="grid gap-2">
          <SideBarItem
            icon={<Home size={20} />}
            label="Home"
            isActive={activeItem === "Home"}
            onClick={() => handleNavigation("/", "Home")}
            description="Dashboard & Overview"
          />
          <SideBarItem
            icon={<Briefcase size={20} />}
            label="Post a Job"
            isActive={activeItem === "Post a Job"}
            onClick={() => handleNavigation("/post-a-job", "Post a Job")}
            description="Create new job listings"
          />
          <SideBarItem
            icon={<ScanSearch size={20} />}
            label="Find Jobs"
            isActive={activeItem === "Find Jobs"}
            onClick={() => handleNavigation("/find-jobs", "Find Jobs")}
            description="Discover opportunities"
          />
          <SideBarItem
            icon={<Building2 size={20} />}
            label="Organizations"
            isActive={activeItem === "Organizations"}
            onClick={() => handleNavigation("/organizations", "Organizations")}
            description="Browse companies"
          />
        </div>
      ),
    },
    {
      title: "Account",
      items: (
        <div className="grid gap-2">
          <SideBarItem
            icon={<User size={20} />}
            label="View Profile"
            onClick={() => handleNavigation("/profile", "Profile")}
            description="Manage your profile"
          />
          <SideBarItem
            icon={<Settings size={20} />}
            label="Settings"
            onClick={() => handleNavigation("/settings", "Settings")}
            description="Preferences & privacy"
          />
          <SideBarItem
            icon={<Bell size={20} />}
            label="Notifications"
            onClick={() => handleNavigation("/notifications", "Notifications")}
            description="Updates & alerts"
            badge={3}
          />
          <div className="pt-2">
            <SideBarItem
              icon={<LogOut size={20} />}
              label="Sign Out"
              onClick={handleSignOut}
              variant="danger"
              description="End your session"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Drawer direction="top" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="md:hidden relative group">
        <div className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 active:scale-95">
          <AlignJustify
            size={20}
            className="text-gray-600 group-hover:text-primary transition-colors duration-200"
          />
        </div>
      </DrawerTrigger>

      <DrawerContent className="pt-0 min-h-[85vh] overflow-auto bg-white border-none shadow-2xl">
        {/* Custom Header with gradient */}
        <div className="relative bg-gradient-to-r from-primary via-primary/90 to-secondary p-6 text-white">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="relative">
            <DrawerClose className="absolute right-0 top-0 p-2 rounded-full hover:bg-white/20 transition-colors duration-200">
              <X size={20} />
            </DrawerClose>

            {isLoggedIn && (
              <div className="flex items-center pt-[10vh] gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Welcome back!</h3>
                  <p className="text-white/80 text-sm">John Doe</p>
                </div>
              </div>
            )}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-16 opacity-20">
            <Sparkles size={24} />
          </div>
          <div className="absolute bottom-2 left-4 opacity-10">
            <div className="w-20 h-20 border border-white/30 rounded-full"></div>
          </div>
        </div>

        <DrawerHeader className="px-0 pb-6">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>

          {isLoggedIn ? (
            <div className="relative overflow-hidden">
              {/* Section Navigation Tabs */}
              <div className="flex justify-center mb-6 px-6">
                <div className="bg-gray-100 p-1 rounded-full flex">
                  {sections.map((section, index) => (
                    <button
                      key={section.title}
                      onClick={() => switchSection(index)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                        currentSection === index
                          ? "bg-white text-primary shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {index === 0 ? <Home size={16} /> : <User size={16} />}
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Swipe Indicator */}
              <div className="flex justify-center mb-4">
                <div className="flex gap-2">
                  {sections.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentSection === index
                          ? "bg-primary w-6"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Swipeable Content Container */}
              <div
                ref={containerRef}
                className="relative min-h-[500px] overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className={`flex w-[200%] h-full transition-transform duration-300 ease-out ${
                    isTransitioning ? "pointer-events-none" : ""
                  }`}
                  style={{
                    transform: `translateX(-${currentSection * 100}%)`,
                  }}
                >
                  {/* Navigation Section */}
                  <div className="w-full px-6 space-y-6 flex-shrink-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                          Navigation
                        </h3>
                        <div className="flex-1"></div>
                        <ChevronRight
                          size={16}
                          className="text-gray-400 animate-pulse"
                        />
                      </div>
                      {sections[0].items}
                    </div>
                  </div>

                  {/* Account Section */}
                  <div className="w-full px-6 space-y-6 flex-shrink-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-4">
                        <ChevronLeft
                          size={16}
                          className="text-gray-400 animate-pulse"
                        />
                        <div className="w-1 h-6 bg-gradient-to-b from-secondary to-primary rounded-full"></div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                          Account
                        </h3>
                      </div>
                      {sections[1].items}
                    </div>
                  </div>
                </div>
              </div>

              {/* Swipe Hint */}
              <div className="text-center px-6 mt-4">
                <p className="text-xs text-gray-400">
                  Swipe left or right to navigate between sections
                </p>
              </div>
            </div>
          ) : (
            /* Login/Signup Section */
            <div className="px-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Welcome!
                </h3>
                <p className="text-gray-600">
                  Join our platform to get started
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full h-12 font-semibold border-2 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                  size={"default"}
                  variant={"outline"}
                >
                  Login
                </Button>
                <Button
                  className="w-full h-12 font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  size={"default"}
                  variant={"default"}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </DrawerHeader>

        <DrawerFooter className="px-6 py-4">
          <div className="text-center text-xs text-gray-500">
            <p>© 2024 Your Company. All rights reserved.</p>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SideBar;
