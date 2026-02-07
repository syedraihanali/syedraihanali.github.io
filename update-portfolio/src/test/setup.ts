/// <reference types="vitest/globals" />
import "@testing-library/jest-dom/vitest";
import React from "react";

// Mock framer-motion
vi.mock("framer-motion", async () => {
    const actual = await vi.importActual("framer-motion");
    return {
        ...actual,
        motion: {
            div: React.forwardRef(function MockMotionDiv(
                props: React.ComponentProps<"div">,
                ref: React.Ref<HTMLDivElement>
            ) {
                return React.createElement("div", { ...props, ref });
            }),
            nav: React.forwardRef(function MockMotionNav(
                props: React.ComponentProps<"nav">,
                ref: React.Ref<HTMLElement>
            ) {
                return React.createElement("nav", { ...props, ref });
            }),
            section: React.forwardRef(function MockMotionSection(
                props: React.ComponentProps<"section">,
                ref: React.Ref<HTMLElement>
            ) {
                return React.createElement("section", { ...props, ref });
            }),
            p: React.forwardRef(function MockMotionP(
                props: React.ComponentProps<"p">,
                ref: React.Ref<HTMLParagraphElement>
            ) {
                return React.createElement("p", { ...props, ref });
            }),
            span: React.forwardRef(function MockMotionSpan(
                props: React.ComponentProps<"span">,
                ref: React.Ref<HTMLSpanElement>
            ) {
                return React.createElement("span", { ...props, ref });
            }),
            a: React.forwardRef(function MockMotionA(
                props: React.ComponentProps<"a">,
                ref: React.Ref<HTMLAnchorElement>
            ) {
                return React.createElement("a", { ...props, ref });
            }),
        },
        AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
        useInView: () => true,
    };
});

// Mock next/navigation
vi.mock("next/navigation", () => ({
    usePathname: () => "/",
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
    }),
}));

// Mock next/image
vi.mock("next/image", () => ({
    default: function MockImage({
        src,
        alt,
        ...props
    }: {
        src: string;
        alt: string;
        [key: string]: unknown;
    }) {
        // eslint-disable-next-line @next/next/no-img-element
        return React.createElement("img", { src, alt, ...props });
    },
}));

// Mock @iconify/react
vi.mock("@iconify/react", () => ({
    Icon: function MockIcon({ icon, ...props }: { icon: string;[key: string]: unknown }) {
        return React.createElement("span", { "data-icon": icon, ...props });
    },
}));
