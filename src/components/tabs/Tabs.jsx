"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Tabs = ({
    tabs: propTabs,
    containerClassName,
    activeTabClassName,
    tabClassName,
    contentClassName,
}) => {
    const [active, setActive] = useState(propTabs[0]);
    const [tabs, setTabs] = useState(propTabs);
    const [hovering, setHovering] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const moveSelectedTabToTop = (idx) => {
        const newTabs = [...propTabs];
        const selectedTab = newTabs.splice(idx, 1);
        newTabs.unshift(selectedTab[0]);
        setTabs(newTabs);
        setActive(newTabs[0]);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false); // Close the menu
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <>
            <div className="flex items-center w-screen justify-between h-[5%] p-10">
                <div className="text-white font-serif font-extrabold text-5xl ">PGAGI</div>
                <div className="relative w-auto">
                    {/* Desktop View */}
                    <div
                        className={cn(
                            "hidden sm:flex flex-row items-end justify-end [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
                            containerClassName
                        )}
                    >
                        {propTabs.map((tab, idx) => (
                            <button
                                key={tab.title}
                                onClick={() => {
                                    moveSelectedTabToTop(idx);
                                }}
                                onMouseEnter={() => setHovering(true)}
                                onMouseLeave={() => setHovering(false)}
                                className={cn("relative px-4 py-2 rounded-full", tabClassName)}
                                style={{
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {active.value === tab.value && (
                                    <motion.div
                                        layoutId="clickedbutton"
                                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                        className={cn(
                                            "absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full",
                                            activeTabClassName
                                        )}
                                    />
                                )}

                                <span className="relative block text-black dark:text-white">
                                    {tab.title}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Mobile View - Hamburger Menu */}
                    <div className="sm:hidden flex flex-col items-end" ref={dropdownRef}>
                        {/* Hamburger Icon */}
                        <button
                            className="p-2 text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="flex flex-col w-full bg-black rounded-lg shadow-lg mt-2 text-white z-50">
                                {propTabs.map((tab, idx) => (
                                    <button
                                        key={tab.title}
                                        onClick={() => {
                                            moveSelectedTabToTop(idx);
                                            setIsMenuOpen(false); // Close menu on tab click
                                        }}
                                        className={cn(
                                            "px-4 py-2 text-left rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700",
                                            tabClassName
                                        )}
                                    >
                                        {tab.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="text-white"></div>
            </div>
            <FadeInDiv
                tabs={tabs}
                active={active}
                key={active.value}
                hovering={hovering}
                className={cn("mt-[2%]", contentClassName)}
            />
        </>
    );
};

const FadeInDiv = ({ className, tabs, active, hovering }) => {
    const isActive = (tab) => {
        return tab.value === tabs[0].value;
    };
    return (
        <div className="relative w-full h-full">
            {tabs.map((tab, idx) => (
                <motion.div
                    key={tab.value}
                    layoutId={tab.value}
                    style={{
                        scale: 1 - idx * 0.1,
                        top: hovering ? idx * -50 : 0,
                        zIndex: -idx,
                        opacity: idx < 3 ? 1 - idx * 0.1 : 0,
                    }}
                    animate={{
                        y: isActive(tab) ? [0, 40, 0] : 0,
                    }}
                    className={cn("w-full h-full absolute top-0 left-0", className)}
                >
                    {tab.content}
                </motion.div>
            ))}
        </div>
    );
};

export { Tabs, FadeInDiv };






















