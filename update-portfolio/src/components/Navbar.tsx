"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-[#faf9f7]/80 backdrop-blur-xl border-b border-stone-200"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                        <span className="text-xl sm:text-2xl">💻</span>
                        <span className="text-lg sm:text-xl font-bold text-stone-900">
                            Raihan
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative text-sm font-medium transition-colors ${pathname === link.href
                                    ? "text-stone-900"
                                    : "text-stone-500 hover:text-stone-900"
                                    }`}
                            >
                                {link.name}
                                {pathname === link.href && (
                                    <motion.span
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-stone-900"
                                    />
                                )}
                            </Link>
                        ))}

                        {/* Resume Button */}
                        <a
                            href="/CV_Syed_Raihan_Ali.pdf"
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-all"
                        >
                            <Icon icon="mdi:download" className="w-4 h-4" />
                            Resume
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span
                                className={`h-0.5 w-full bg-stone-700 transition-transform ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                                    }`}
                            />
                            <span
                                className={`h-0.5 w-full bg-stone-700 transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""
                                    }`}
                            />
                            <span
                                className={`h-0.5 w-full bg-stone-700 transition-transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                                    }`}
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#faf9f7]/95 backdrop-blur-xl border-b border-stone-200"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                        ? "bg-stone-100 text-stone-900"
                                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <a
                                href="/CV_Syed_Raihan_Ali.pdf"
                                target="_blank"
                                className="block px-4 py-3 text-center bg-stone-900 text-white text-sm font-medium rounded-lg"
                            >
                                Download Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
