"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { skills } from "@/data/projects";

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#f5f4f0]" ref={ref}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="space-y-12 sm:space-y-16"
                >
                    {/* Section Header */}
                    <motion.div variants={fadeInUp} className="text-center space-y-3 sm:space-y-4">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
                            About Me
                        </h2>
                        <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base">
                            Flutter Developer & Full-Stack Engineer crafting beautiful digital experiences
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* About Content */}
                        <motion.div variants={fadeInUp} className="space-y-4 sm:space-y-6">
                            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
                                <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-3 sm:mb-4 flex items-center gap-2">
                                    <Icon icon="mdi:account" className="w-5 h-5 sm:w-6 sm:h-6 text-stone-500" />
                                    Who I Am
                                </h3>
                                <div className="space-y-3 sm:space-y-4 text-stone-600 text-sm sm:text-base">
                                    <p>
                                        I&apos;m <span className="font-semibold text-stone-900">Syed Raihan Ali</span>,
                                        also known as <span className="font-semibold text-stone-700">Tahir Taim</span> or
                                        simply <span className="font-semibold text-stone-700">Tahir</span>.
                                        A passionate Flutter Developer from Bangladesh with expertise in
                                        building beautiful mobile and web applications.
                                    </p>
                                    <p>
                                        I specialize in Flutter with clean architecture, RxDart for state management,
                                        and GetIt for dependency injection. On the web side, I work with
                                        TypeScript, React.js, and Next.js.
                                    </p>
                                    <p>
                                        I believe in writing clean, maintainable code and creating
                                        seamless user experiences that delight users.
                                    </p>
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                <div className="p-3 sm:p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
                                    <Icon icon="logos:flutter" className="w-7 h-7 sm:w-8 sm:h-8 mb-2" />
                                    <p className="text-xs sm:text-sm text-stone-500">Primary</p>
                                    <p className="font-semibold text-stone-900 text-sm sm:text-base">Flutter Developer</p>
                                </div>
                                <div className="p-3 sm:p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
                                    <Icon icon="mdi:map-marker" className="w-7 h-7 sm:w-8 sm:h-8 text-stone-500 mb-2" />
                                    <p className="text-xs sm:text-sm text-stone-500">Based in</p>
                                    <p className="font-semibold text-stone-900 text-sm sm:text-base">Bangladesh</p>
                                </div>
                            </div>

                            {/* Name Aliases */}
                            <div className="p-3 sm:p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
                                <p className="text-xs sm:text-sm text-stone-500 mb-2">Also known as</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2.5 sm:px-3 py-1 bg-stone-100 text-stone-700 text-xs sm:text-sm font-medium rounded-full">
                                        Tahir Taim
                                    </span>
                                    <span className="px-2.5 sm:px-3 py-1 bg-stone-100 text-stone-700 text-xs sm:text-sm font-medium rounded-full">
                                        Tahir
                                    </span>
                                    <span className="px-2.5 sm:px-3 py-1 bg-stone-100 text-stone-700 text-xs sm:text-sm font-medium rounded-full">
                                        Raihan
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Skills */}
                        <motion.div variants={fadeInUp}>
                            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
                                <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-4 sm:mb-6 flex items-center gap-2">
                                    <Icon icon="mdi:code-tags" className="w-5 h-5 sm:w-6 sm:h-6 text-stone-500" />
                                    Skills & Technologies
                                </h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                                    {skills.map((skill, index) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ delay: index * 0.05 }}
                                            className="group flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl hover:bg-stone-50 transition-colors"
                                        >
                                            <Icon
                                                icon={skill.icon}
                                                className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform"
                                            />
                                            <span className="text-[10px] sm:text-xs text-stone-600 text-center">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
