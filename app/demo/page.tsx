"use client";

import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { Button as MovingBorderButton } from "@/components/ui/MovingBorders";
import { Spotlight } from "@/components/ui/Spotlight";
import { navItems } from "@/data";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaArrowRight, FaClock, FaMagic, FaRocket } from "react-icons/fa";

const DemoPage = () => {
    const [formState, setFormState] = useState({
        email: "",
        company: "",
        name: "",
    });

    const benefits = [
        {
            icon: FaRocket,
            title: "Launch in Minutes",
            desc: "Deploy AI agents instantly. No complex setup or training required."
        },
        {
            icon: FaMagic,
            title: "Autonomous Sourcing",
            desc: "Agents find and engage perfect candidates while you sleep."
        },
        {
            icon: FaClock,
            title: "24/7 Availability",
            desc: "Never miss a candidate. Instant responses, anytime, anywhere."
        }
    ];

    return (
        <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
            <FloatingNav navItems={navItems} />

            {/* Premium Spotlights */}
            <div className="pointer-events-none">
                <Spotlight
                    className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
                    fill="white"
                />
                <Spotlight
                    className="h-[80vh] w-[50vw] top-10 left-full"
                    fill="indigo"
                />
                <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="purple" />
            </div>

            {/* Tech Grid Background */}
            <div
                className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center pointer-events-none"
            >
                <div
                    className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
                />
            </div>

            <div className="relative z-10 w-full max-w-7xl pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Content - Value Prop */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center h-full pt-10"
                    >
                        {/* Pill Label */}
                        <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            <span className="text-xs font-semibold text-purple-200 tracking-wide uppercase">
                                Book Your Private Tour
                            </span>
                        </div>

                        {/* Animated Headline */}
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                            Experience the <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                                Future of Hiring
                            </span>
                        </h1>

                        <p className="text-white/60 text-lg mb-12 leading-relaxed max-w-lg">
                            Stop drowning in resumes. Let our intelligent agents handle the grunt work so you can focus on closing top talent.
                        </p>

                        {/* Benefits Grid */}
                        <div className="space-y-8">
                            {benefits.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/5 group-hover:border-purple-500/30 transition-colors">
                                        <item.icon className="text-purple-400 text-lg group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                                        <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Form - Wrapped in Moving Border for Premium Feel */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full"
                    >
                        <MovingBorderButton
                            borderRadius="1.75rem"
                            className="bg-black-100/40 dark:bg-black-100/40 backdrop-blur-3xl text-white border-neutral-200 dark:border-slate-800"
                            duration={25000} // Significantly slower for calm premium feel
                            containerClassName="w-full h-auto p-1"
                            as="div"
                        >
                            <div className="w-full p-8 md:p-10 bg-grid-white/[0.02] relative overflow-hidden rounded-[1.5rem]">
                                {/* Inner Glow */}
                                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl opacity-50" />
                                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl opacity-50" />

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-white mb-2">Schedule a Demo</h3>
                                    <p className="text-white/50 text-sm mb-8">
                                        Join fast-growing companies hiring with TalentArbor.
                                    </p>

                                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                        <div>
                                            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 ml-1">Work Email</label>
                                            <input
                                                type="email"
                                                className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-white/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all hover:border-white/20"
                                                placeholder="name@company.com"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 ml-1">First Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-white/20 focus:border-purple-500 outline-none transition-all hover:border-white/20"
                                                    placeholder="Jane"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 ml-1">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-white/20 focus:border-purple-500 outline-none transition-all hover:border-white/20"
                                                    placeholder="Doe"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 ml-1">Company Name</label>
                                            <input
                                                type="text"
                                                className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-white/20 focus:border-purple-500 outline-none transition-all hover:border-white/20"
                                                placeholder="Acme Inc."
                                            />
                                        </div>

                                        <div className="pt-2">
                                            <button className="inline-flex h-14 w-full animate-shimmer items-center justify-center rounded-xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 group">
                                                Book Demo
                                                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform text-purple-500" />
                                            </button>
                                        </div>

                                        <p className="text-[10px] text-center text-white/30 mt-4 leading-tight">
                                            By booking, you agree to our Terms & Conditions. <br />
                                            We respect your inbox and never spam.
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </MovingBorderButton>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default DemoPage;
