"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-[#faf9f7]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-5 sm:space-y-6"
            >
                {/* 404 Number */}
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-7xl sm:text-8xl lg:text-9xl font-bold text-stone-900"
                >
                    404
                </motion.div>

                {/* Message */}
                <div className="space-y-2">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900">
                        Page Not Found
                    </h1>
                    <p className="text-stone-600 max-w-md mx-auto text-sm sm:text-base">
                        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 transition-all hover:-translate-y-0.5 text-sm sm:text-base"
                    >
                        <Icon icon="mdi:home" className="w-4 h-4 sm:w-5 sm:h-5" />
                        Go Home
                    </Link>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-stone-300 text-stone-700 font-medium rounded-xl hover:border-stone-400 hover:bg-stone-50 transition-all text-sm sm:text-base"
                    >
                        <Icon icon="mdi:folder-multiple" className="w-4 h-4 sm:w-5 sm:h-5" />
                        View Projects
                    </Link>
                </div>

                {/* Decorative Elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 sm:pt-8"
                >
                    <Icon icon="mdi:compass-off" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-stone-300" />
                </motion.div>
            </motion.div>
        </div>
    );
}
