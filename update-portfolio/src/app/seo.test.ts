import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import type { MetadataRoute } from "next";

// Helper type for robots rules
type RobotsRule = MetadataRoute.Robots["rules"] extends (infer R)[] | infer R
    ? R
    : never;

describe("SEO Configuration", () => {
    describe("Sitemap", () => {
        it("returns an array of URLs", () => {
            const result = sitemap();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });

        it("includes all main pages", () => {
            const result = sitemap();
            const urls = result.map((item) => item.url);

            expect(urls).toContain("https://tahirtaim.dev");
            expect(urls).toContain("https://tahirtaim.dev/projects");
            expect(urls).toContain("https://tahirtaim.dev/contact");
        });

        it("has correct priority for homepage", () => {
            const result = sitemap();
            const homepage = result.find(
                (item) => item.url === "https://tahirtaim.dev"
            );

            expect(homepage?.priority).toBe(1);
        });

        it("all entries have lastModified", () => {
            const result = sitemap();
            result.forEach((item) => {
                expect(item.lastModified).toBeDefined();
            });
        });
    });

    describe("Robots", () => {
        it("allows all user agents", () => {
            const result = robots();
            expect(result.rules).toBeDefined();

            // rules can be array or single object
            const rules = Array.isArray(result.rules)
                ? result.rules
                : [result.rules];
            const generalRule = rules.find(
                (r: RobotsRule) => r?.userAgent === "*"
            );
            expect(generalRule?.allow).toBe("/");
        });

        it("includes sitemap URL", () => {
            const result = robots();

            expect(result.sitemap).toBe("https://tahirtaim.dev/sitemap.xml");
        });

        it("disallows internal routes", () => {
            const result = robots();

            // rules can be array or single object
            const rules = Array.isArray(result.rules)
                ? result.rules
                : [result.rules];
            const generalRule = rules.find(
                (r: RobotsRule) => r?.userAgent === "*"
            );
            expect(generalRule?.disallow).toContain("/api/");
        });
    });
});
