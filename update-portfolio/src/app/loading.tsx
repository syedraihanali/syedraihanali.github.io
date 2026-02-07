"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#faf9f7]">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
            >
                {/* Animated Logo */}
                <motion.div
                    className="relative w-16 h-16 sm:w-20 sm:h-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute inset-0 rounded-full bg-stone-200/50 blur-xl" />
                    <div className="relative w-full h-full rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                        <span className="text-2xl sm:text-3xl">💻</span>
                    </div>
                </motion.div>

                {/* Loading Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-stone-500 font-medium text-sm sm:text-base"
                >
                    Loading...
                </motion.p>

                {/* Progress Bar */}
                <div className="w-40 sm:w-48 h-1 bg-stone-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        className="h-full w-1/2 bg-stone-400 rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    );
}
