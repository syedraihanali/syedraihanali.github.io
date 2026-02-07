"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { projects } from "@/data/projects";

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#faf9f7]" ref={ref}>
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
                            Featured Projects
                        </h2>
                        <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base">
                            A collection of projects showcasing my skills in web and mobile development
                        </p>
                    </motion.div>

                    {/* Projects Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1 }}
                                className="group p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all"
                            >
                                {/* Icon */}
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-stone-100 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                                    <Icon icon={project.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-stone-700" />
                                </div>

                                {/* Content */}
                                <h3 className="text-base sm:text-lg font-semibold text-stone-900 mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-stone-600 text-xs sm:text-sm line-clamp-3 mb-3 sm:mb-4">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                    {project.techStack.slice(0, 4).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-stone-100 text-stone-700 rounded-md"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-3">
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-500 hover:text-stone-900 transition-colors"
                                    >
                                        <Icon icon="mdi:github" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        Code
                                    </a>
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-500 hover:text-stone-900 transition-colors"
                                        >
                                            <Icon icon="mdi:open-in-new" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            Live
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* More Projects Link */}
                    <motion.div variants={fadeInUp} className="text-center">
                        <a
                            href="https://github.com/syedraihanali"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors text-sm sm:text-base"
                        >
                            <span>View more on GitHub</span>
                            <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
