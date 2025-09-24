import { decrypt } from "@/actions/crypto";
import {
  User,
  ChevronDown,
  LogOut,
  Settings,
  UserCircle,
  Bell,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";

type AvatarSize = "small" | "default" | "large";

interface AvatarProps {
  username?: string;
  avatarUrl?: string | null;
  showDropdown?: boolean;
  size?: AvatarSize;
  onProfile?: () => void;
  onSettings?: () => void;
  onNotifications?: () => void;
}

const Avatar = ({
  username = "John Doe",
  avatarUrl = null,
  showDropdown = true,
  size = "default",
  onProfile = () => console.log("Profile clicked"),
  onSettings = () => console.log("Settings clicked"),
  onNotifications = () => console.log("Notifications clicked"),
}: AvatarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [email, setEmail] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const sizeClasses = {
    small: "w-[32px] h-[32px]",
    default: "w-[40px] h-[40px]",
    large: "w-[48px] h-[48px]",
  };

  const iconSizes = {
    small: 16,
    default: 20,
    large: 24,
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getEmail = () => {
      const encryptedEmail = Cookies.get("profileEmail");
      if (encryptedEmail) {
        const email = decrypt(encryptedEmail, process.env.SECRET_KEY || "");
        setEmail(email);
      }
    };
    getEmail();
  }, []);

  const toggleDropdown = () => {
    if (showDropdown) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleMenuItemClick = (path:string) => {
    router.push(path);
    setIsDropdownOpen(false);
  };

  const handleSignOut = () => {
    Cookies.remove("profileEmail");
    Cookies.remove("jwt");
    window.location.replace("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="lg:flex hidden items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
        onClick={toggleDropdown}
      >
        {/* Avatar Circle */}
        <div
          className={`${sizeClasses[size]} bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg ring-2 ring-white group-hover:ring-primary/20 transition-all duration-200`}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={username}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User
              size={iconSizes[size]}
              className="text-white drop-shadow-sm"
            />
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-800 truncate group-hover:text-primary transition-colors duration-200">
              {username}
            </h3>
            {showDropdown && (
              <ChevronDown
                size={14}
                className={`text-gray-400 group-hover:text-primary transition-all duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </div>
          <p className="text-xs text-gray-500 truncate group-hover:text-gray-600 transition-colors duration-200">
            {email}
          </p>
        </div>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">
              {username}
            </p>
            <p className="text-xs text-gray-500 truncate">{email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => handleMenuItemClick("/account")}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-150"
            >
              <UserCircle size={16} className="mr-3 text-gray-400" />
              View Profile
            </button>

            <button
              onClick={() => handleMenuItemClick("/settings")}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-150"
            >
              <Settings size={16} className="mr-3 text-gray-400" />
              Settings
            </button>

            <button
              onClick={() => handleMenuItemClick("/notifications")}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-150"
            >
              <Bell size={16} className="mr-3 text-gray-400" />
              Notifications
            </button>

            {/* Divider */}
            <div className="border-t border-gray-100 my-1"></div>

            {/* Logout */}
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
            >
              <LogOut size={16} className="mr-3 text-red-500" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
