"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";
import { FaSearch, FaUserCheck, FaCalendarAlt, FaBullhorn, FaChartLine, FaChartBar, FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const iconMap: { [key: string]: React.ElementType } = {
  FaSearch,
  FaUserCheck,
  FaCalendarAlt,
  FaBullhorn,
  FaChartLine,
  FaChartBar,
  FaArrowRight
};

export const FloatingNav = ({ navItems }: { navItems: any[] }) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Lock to prevent scroll listener from overriding state during nav click
  const isNavigating = React.useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      // If we are programmatically scrolling, don't update state based on scroll position
      // This prevents the navbar from flickering or interrupting the scroll
      if (isNavigating.current) return;

      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    // If it's a hash link and we are on the home page, handle scroll manually
    if (link.startsWith("#")) {
      e.preventDefault();
      const targetId = link.substring(1);

      if (pathname === "/") {
        const element = document.getElementById(targetId);
        if (element) {
          // Lock scroll listener to prevent updates during auto-scroll
          isNavigating.current = true;

          // Perform scroll
          element.scrollIntoView({ behavior: "smooth" });

          setMobileMenuOpen(false);
          setActiveDropdown(null);

          // Release lock and sync state AFTER scroll completes
          // We don't force setScrolled(true) immediately to avoid layout thrashing during scroll start
          setTimeout(() => {
            isNavigating.current = false;
            // Manual sync after scroll is done
            setScrolled(window.scrollY > 50);
          }, 1000);
        }
      } else {
        // If not on home page, navigate to home with hash
        router.push("/" + link);
      }
    } else {
      // Normal navigation
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed z-[5000] transition-all duration-500 ease-in-out flex items-center justify-center",
          scrolled
            ? "top-4 lg:top-6 inset-x-2 lg:inset-x-4 max-w-[95%] lg:max-w-5xl mx-auto rounded-2xl lg:rounded-full py-2 px-4 lg:px-6"
            : "top-0 inset-x-0 w-full bg-transparent py-4 px-6 lg:px-8"
        )}
      >
        <motion.div
          className={cn(
            "absolute inset-0 w-full h-full rounded-2xl lg:rounded-full pointer-events-none z-0",
            scrolled
              ? "bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(0,3,25,0.4)] backdrop-blur-md shadow-xl border border-black/10 dark:border-white/[0.1]"
              : "bg-transparent border-b border-transparent"
          )}
          style={{
            backdropFilter: scrolled ? "blur(12px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(12px)" : "none"
          }}
        />

        <div className={cn(
          "relative z-10 w-full flex items-center justify-between transition-all duration-300",
          scrolled ? "max-w-full" : "max-w-7xl mx-auto"
        )}>
          {/* Brand */}
          <Link href="/" className="flex items-center space-x-2 group relative overflow-hidden flex-shrink-0">
            <div className="flex flex-col relative z-20">
              <span className="text-lg lg:text-xl font-bold shimmer-text">
                TalentArbor.AI
              </span>
              <AnimatePresence>
                {!scrolled && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[10px] lg:text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider"
                  >
                    by NexI
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((navItem, idx) => (
              <div
                key={idx}
                className="relative group flex items-center"
                onMouseEnter={() => navItem.subItems && setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={navItem.link}
                  onClick={(e) => handleNavClick(e, navItem.link)}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 relative rounded-full",
                    activeDropdown === idx
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-white/10"
                      : "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5"
                  )}
                >
                  {navItem.name}
                  {navItem.subItems && (
                    <HiChevronDown
                      className={cn("ml-1 w-4 h-4 transition-transform duration-200", activeDropdown === idx ? "rotate-180" : "")}
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <Link
              href="/demo"
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
          >
            {mobileMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenuAlt3 className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mega Menu Dropdown (Desktop) */}
        <AnimatePresence>
          {activeDropdown !== null && navItems[activeDropdown].subItems && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "absolute mx-auto overflow-hidden shadow-2xl z-40 hidden lg:block",
                scrolled
                  ? "top-[calc(100%+12px)] left-0 right-0 w-full rounded-2xl"
                  : "top-full left-0 w-full border-t rounded-b-2xl"
              )}
              onMouseEnter={() => setActiveDropdown(activeDropdown)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div
                className="absolute inset-0 z-0 bg-[rgba(255,255,255,0.6)] dark:bg-[rgba(0,3,25,0.65)] border border-gray-200 dark:border-white/10"
                style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
              />

              <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8">
                <div className="grid grid-cols-12 gap-8">
                  {/* Left Side - Overview */}
                  <div className="col-span-3 border-r border-gray-200 dark:border-white/10 pr-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {navItems[activeDropdown].name === "Solutions" ? "AI Solutions" : navItems[activeDropdown].name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                      Empower your hiring team with intelligent agents that automate engaging, screening, and scheduling candidates at scale.
                    </p>
                    <Link
                      href="/demo"
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      Explore Platform <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Right Side - Grid Items */}
                  <div className="col-span-9 grid grid-cols-3 gap-4">
                    {navItems[activeDropdown].subItems.map((sub: any, sIdx: number) => {
                      const Icon = iconMap[sub.icon] || FaSearch;
                      const isOnline = sub.status === "online";
                      return (
                        <Link
                          key={sIdx}
                          href={sub.link}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex flex-col p-4 rounded-xl border border-transparent hover:bg-gray-100 dark:hover:bg-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-all duration-200"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className={cn(
                              "flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full border text-[10px] font-semibold tracking-wide uppercase transition-colors",
                              isOnline
                                ? "bg-green-50/50 border-green-200 text-green-700 dark:bg-green-900/10 dark:border-green-800/30 dark:text-green-400"
                                : "bg-gray-50 border-gray-200 text-gray-500 dark:bg-white/5 dark:border-white/10 dark:text-gray-400"
                            )}>
                              <span className={cn(
                                "relative flex h-2 w-2",
                                isOnline && "animate-pulse" // Only pulse if online
                              )}>
                                <span className={cn(
                                  "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                                  isOnline ? "bg-green-400" : "hidden"
                                )}></span>
                                <span className={cn(
                                  "relative inline-flex rounded-full h-2 w-2",
                                  isOnline ? "bg-green-500" : "bg-gray-400"
                                )}></span>
                              </span>
                              {isOnline ? "Online" : "Offline"}
                            </div>
                          </div>

                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {sub.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300">
                            {sub.desc}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Improved Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[5001] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-[#0a0a0a] shadow-2xl flex flex-col h-full border-l border-white/10"
            >
              <div className="flex flex-col h-full overflow-y-auto">
                <div className="p-6 border-b border-gray-100 dark:border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-gray-900 via-purple-500 to-gray-900 dark:from-white dark:via-purple-400 dark:to-white bg-clip-text text-transparent">
                      TalentArbor.AI
                    </span>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      <HiX className="w-6 h-6" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider">
                    by NexI
                  </span>
                </div>

                <div className="flex-1 px-4 py-6 space-y-2">
                  {navItems.map((navItem, idx) => (
                    <div key={idx} className="space-y-1">
                      <Link
                        href={navItem.link}
                        onClick={(e) => handleNavClick(e, navItem.link)}
                        className="flex items-center justify-between px-4 py-3 text-base font-semibold text-gray-800 dark:text-gray-100 bg-gray-50/50 dark:bg-white/5 rounded-xl active:scale-98 transition-all"
                      >
                        {navItem.name}
                        {navItem.subItems && (
                          <HiChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </Link>

                      {navItem.subItems && (
                        <div className="pl-4 pr-2 space-y-1 mt-1">
                          {navItem.subItems.map((sub: any, sIdx: number) => (
                            <Link
                              key={sIdx}
                              href={sub.link}
                              onClick={() => setMobileMenuOpen(false)}
                              className="group flex items-center justify-between px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors border-l-2 border-transparent hover:border-blue-500"
                            >
                              <span className="font-medium">{sub.name}</span>
                              {sub.status && (
                                <span className={cn(
                                  "w-2 h-2 rounded-full",
                                  sub.status === "online" ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                                )} />
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
                  <Link
                    href="/demo"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-center items-center w-full px-5 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    Request Demo
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};