"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const contactMethods = [
    {
        name: "Email",
        value: "syedraihanali65@gmail.com",
        icon: "mdi:email",
        href: "mailto:syedraihanali65@gmail.com",
    },
    {
        name: "GitHub",
        value: "@syedraihanali",
        icon: "mdi:github",
        href: "https://github.com/syedraihanali",
    },
    {
        name: "LinkedIn",
        value: "Syed Raihan Ali",
        icon: "mdi:linkedin",
        href: "https://www.linkedin.com/in/syedraihanali/",
    },
    {
        name: "Phone",
        value: "+880 1841-626387",
        icon: "mdi:phone",
        href: "tel:+8801841626387",
    },
];

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#f5f4f0]" ref={ref}>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="space-y-10 sm:space-y-12"
                >
                    {/* Section Header */}
                    <motion.div variants={fadeInUp} className="text-center space-y-3 sm:space-y-4">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
                            Get In Touch
                        </h2>
                        <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base">
                            I&apos;m always open to discussing new projects, opportunities, or partnerships.
                        </p>
                    </motion.div>

                    {/* Contact Cards */}
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={method.name}
                                href={method.href}
                                target={method.href.startsWith("http") ? "_blank" : undefined}
                                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1 }}
                                className="group p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="p-2.5 sm:p-3 rounded-xl bg-stone-100 group-hover:bg-stone-200 transition-colors">
                                        <Icon icon={method.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-stone-700" />
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-stone-500">{method.name}</p>
                                        <p className="font-medium text-stone-900 text-sm sm:text-base">{method.value}</p>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div variants={fadeInUp} className="text-center">
                        <a
                            href="mailto:syedraihanali65@gmail.com"
                            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 transition-all hover:-translate-y-0.5 text-sm sm:text-base"
                        >
                            <Icon icon="mdi:email" className="w-4 h-4 sm:w-5 sm:h-5" />
                            Send me an email
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
