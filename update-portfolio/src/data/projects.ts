export interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl?: string;
    icon: string; // Iconify icon name
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Loop IT Blogs",
        description: "A modern blog website built with Next.js, TypeScript, Tailwind CSS, and Prisma. Features user authentication, post management, and a clean, responsive UI for sharing articles.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
        githubUrl: "https://github.com/syedraihanali/loop-it-main",
        liveUrl: "https://loop-it-main.vercel.app",
        icon: "mdi:post-outline"
    },
    {
        id: 2,
        title: "Code Info",
        description: "A modern blog platform built with Next.js 13, Sanity CMS, and TypeScript. Features dynamic content management, SEO optimization, and responsive design for coding tutorials.",
        techStack: ["Next.js 13", "TypeScript", "Sanity CMS", "Tailwind CSS"],
        githubUrl: "https://github.com/syedraihanali/code-info",
        liveUrl: "https://code-info.vercel.app",
        icon: "mdi:blog"
    },
    {
        id: 3,
        title: "School Management System",
        description: "A comprehensive school management system built with Next.js and TypeScript. Provides features for managing students, teachers, classes, attendance with an intuitive admin dashboard.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MySQL"],
        githubUrl: "https://github.com/syedraihanali/school-management-system",
        liveUrl: "https://school-management-system-alpha-umber.vercel.app/admin",
        icon: "mdi:school"
    },
    {
        id: 4,
        title: "Price Table React",
        description: "A customizable pricing table component built with React and TailwindCSS. Easily integrates into any project to display pricing plans with modern, responsive design.",
        techStack: ["React", "TailwindCSS", "JavaScript"],
        githubUrl: "https://github.com/syedraihanali/Pricing-table-react",
        icon: "mdi:table-large"
    },
    {
        id: 5,
        title: "Netflix Clone",
        description: "A full-featured Netflix clone built with Next.js, TypeScript, and Prisma. Features user authentication, video streaming, responsive UI, and a beautiful dark interface.",
        techStack: ["Next.js", "TailwindCSS", "Prisma"],
        githubUrl: "https://github.com/syedraihanali/simple-movie-site",
        icon: "mdi:movie-open"
    },
    {
        id: 6,
        title: "Dhaka Environment Logger",
        description: "Automated weather and air quality tracking system for Dhaka. Logs environmental data hourly with detailed analytics and historical data visualization.",
        techStack: ["Python", "Automation", "API"],
        githubUrl: "https://github.com/syedraihanali/dhaka-environment-logger",
        icon: "mdi:weather-cloudy"
    },
    {
        id: 7,
        title: "Hospital Management",
        description: "A comprehensive hospital management system built with TypeScript. Features patient records, appointment scheduling, and staff management with modern UI.",
        techStack: ["TypeScript", "Node.js", "Database"],
        githubUrl: "https://github.com/syedraihanali/hospital",
        icon: "mdi:hospital-building"
    },
    {
        id: 8,
        title: "Flutter Template",
        description: "A production-ready Flutter template with clean architecture, RxDart state management, and GetIt dependency injection. Perfect starting point for any Flutter project.",
        techStack: ["Flutter", "Dart", "Clean Architecture"],
        githubUrl: "https://github.com/syedraihanali/flutter-template",
        icon: "logos:flutter"
    },
    {
        id: 9,
        title: "Wakey",
        description: "A smart alarm and wake-up application built with Flutter. Features customizable alarms, sleep tracking, and beautiful UI for a better morning routine.",
        techStack: ["Flutter", "Dart", "Mobile"],
        githubUrl: "https://github.com/syedraihanali/wakey",
        icon: "mdi:alarm"
    }
];

export const skills = [
    { name: "TypeScript", icon: "logos:typescript-icon" },
    { name: "React.js", icon: "logos:react" },
    { name: "Next.js", icon: "logos:nextjs-icon" },
    { name: "JavaScript", icon: "logos:javascript" },
    { name: "Node.js", icon: "logos:nodejs-icon" },
    { name: "Flutter", icon: "logos:flutter" },
    { name: "Dart", icon: "logos:dart" },
    { name: "Python", icon: "logos:python" },
    { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
    { name: "Prisma", icon: "logos:prisma" },
    { name: "MySQL", icon: "logos:mysql" },
    { name: "Git", icon: "logos:git-icon" },
];
