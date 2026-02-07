"use client";

import { Icon } from "@iconify/react";

const socialLinks = [
    { icon: "mdi:github", href: "https://github.com/syedraihanali", label: "GitHub" },
    { icon: "mdi:linkedin", href: "https://www.linkedin.com/in/syedraihanali/", label: "LinkedIn" },
    { icon: "mdi:email", href: "mailto:syedraihanali65@gmail.com", label: "Email" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#faf9f7] border-t border-stone-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                    {/* Logo & Copyright */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <span className="text-xl sm:text-2xl">💻</span>
                        <p className="text-stone-500 text-xs sm:text-sm">
                            © {currentYear} Syed Raihan Ali. All rights reserved.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                                aria-label={link.label}
                            >
                                <Icon icon={link.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                        ))}
                    </div>

                    {/* Built With */}
                    <p className="text-stone-400 text-xs sm:text-sm">
                        Built with{" "}
                        <span className="text-stone-600">Next.js</span> &{" "}
                        <span className="text-stone-600">Tailwind</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
