"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";

export default function Hero() {
    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-[#faf9f7] -z-10" />
            <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-stone-200/50 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-stone-100/50 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={slideInLeft}
                    className="space-y-5 sm:space-y-6 text-center md:text-left order-2 md:order-1"
                >
                    <motion.div variants={fadeInUp} className="space-y-2">
                        <span className="text-stone-500 font-medium text-sm sm:text-base">Hello, I&apos;m</span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-900">
                            Syed Raihan Ali
                        </h1>
                        <p className="text-xs sm:text-sm text-stone-500">
                            Also known as <span className="font-medium text-stone-700">Tahir Taim</span>
                        </p>
                        <h2 className="text-lg sm:text-xl lg:text-2xl text-stone-700 font-medium flex items-center justify-center md:justify-start gap-2">
                            <Icon icon="logos:flutter" className="w-5 h-5 sm:w-6 sm:h-6" />
                            Flutter Developer
                        </h2>
                    </motion.div>

                    <motion.p
                        variants={fadeInUp}
                        className="text-stone-600 text-base sm:text-lg max-w-lg mx-auto md:mx-0 leading-relaxed"
                    >
                        Crafting beautiful mobile experiences with Flutter and building
                        modern web applications. Specializing in clean architecture,
                        TypeScript, React.js, and Next.js.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 transition-all hover:-translate-y-0.5 text-sm sm:text-base"
                        >
                            <Icon icon="mdi:folder-multiple" className="w-4 h-4 sm:w-5 sm:h-5" />
                            View Projects
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-stone-300 text-stone-700 font-medium rounded-xl hover:border-stone-400 hover:bg-stone-50 transition-all text-sm sm:text-base"
                        >
                            <Icon icon="mdi:email-outline" className="w-4 h-4 sm:w-5 sm:h-5" />
                            Get In Touch
                        </Link>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div variants={fadeInUp} className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
                        <a
                            href="https://github.com/syedraihanali"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 sm:p-3 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-all"
                            aria-label="GitHub"
                        >
                            <Icon icon="mdi:github" className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/syedraihanali/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 sm:p-3 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-all"
                            aria-label="LinkedIn"
                        >
                            <Icon icon="mdi:linkedin" className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                        <a
                            href="mailto:syedraihanali65@gmail.com"
                            className="p-2.5 sm:p-3 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-all"
                            aria-label="Email"
                        >
                            <Icon icon="mdi:email" className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                    </motion.div>
                </motion.div>

                {/* Profile Image */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={slideInRight}
                    className="flex justify-center order-1 md:order-2"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-stone-300/30 rounded-full blur-2xl scale-110" />
                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-2 border-stone-200 shadow-xl">
                            <Image
                                src="/profile.jpg"
                                alt="Syed Raihan Ali - Flutter Developer"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 hidden sm:block"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-stone-300 flex justify-center pt-2 hover:border-stone-400 transition-colors cursor-pointer"
                >
                    <div className="w-1.5 h-3 bg-stone-400 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
