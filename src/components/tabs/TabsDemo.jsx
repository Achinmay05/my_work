import React, { useState, useRef } from "react";
import { Tabs } from "./Tabs";
import WeatherContent from "../weather/WeatherContext";
import NewsContext from "../news/NewsContext";
import StockContext from "../stock/StockContext";
import GitHubData from "../github/GitHubData";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../redux/feature/login/loginSlice";

export function TabsDemo() {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get user's email from Redux state (ensure you store it during login)
  const email = useSelector((state) => state.login.email);

  // Function to extract username from email
  const extractUsername = (email) => {
    if (!email) return "User";
    const emailPrefix = email.split("@")[0];
    return emailPrefix.replace(/[0-9]/g, ""); // Remove numbers if needed
  };

  const username = useSelector((state) => state.login.username);


  const handleLogout = () => {
    dispatch(logout());
  };

  const tabs = [
    {
      title: "Weather",
      value: "product",
      content: (
        <div className="w-full relative h-full rounded-2xl p-3 text-xl md:text-4xl font-bold text-white bg-black">
          <WeatherContent />
        </div>
      ),
    },
    {
      title: "News",
      value: "services",
      content: (
        <div className="w-full relative h-full rounded-2xl p-3 text-xl md:text-4xl font-bold text-white bg-black">
          <NewsContext />
        </div>
      ),
    },
    {
      title: "Stock",
      value: "playground",
      content: (
        <div className="w-full relative h-full rounded-2xl p-3 text-xl md:text-4xl font-bold text-white bg-black">
          <StockContext />
        </div>
      ),
    },
    {
      title: "Github",
      value: "new",
      content: (
        <div className="w-full relative h-full rounded-2xl p-3 text-xl md:text-4xl font-bold text-white bg-black overflow-auto">
          <GitHubData />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[100%] [perspective:1000px] relative p-1 flex flex-col w-full overflow-hidden">
      {/* Profile Avatar Dropdown */}
      <div className="absolute top-4 right-4" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <img
            src={"/imgs/male-avatar.png"} // Replace with dynamic avatar URL if needed
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className={`absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg py-2 transform transition-all duration-300 z-50 ${
            isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}>
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                Signed in as
              </p>
              <p className="text-sm font-medium text-white truncate">{username || "User"}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Tabs Section */}
      <Tabs tabs={tabs} />
    </div>
  );
}



