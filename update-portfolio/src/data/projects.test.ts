import { describe, it, expect } from "vitest";
import { projects, skills } from "@/data/projects";

describe("Projects Data", () => {
    it("has at least 5 projects", () => {
        expect(projects.length).toBeGreaterThanOrEqual(5);
    });

    it("all projects have required fields", () => {
        projects.forEach((project) => {
            expect(project.id).toBeDefined();
            expect(project.title).toBeTruthy();
            expect(project.description).toBeTruthy();
            expect(project.techStack.length).toBeGreaterThan(0);
            expect(project.githubUrl).toMatch(/^https:\/\/github\.com\//);
            expect(project.icon).toBeTruthy();
        });
    });

    it("has Flutter projects", () => {
        const flutterProjects = projects.filter((p) =>
            p.techStack.some((t) => t.toLowerCase().includes("flutter"))
        );
        expect(flutterProjects.length).toBeGreaterThan(0);
    });

    it("has Next.js projects", () => {
        const nextProjects = projects.filter((p) =>
            p.techStack.some((t) => t.toLowerCase().includes("next"))
        );
        expect(nextProjects.length).toBeGreaterThan(0);
    });
});

describe("Skills Data", () => {
    it("has at least 10 skills", () => {
        expect(skills.length).toBeGreaterThanOrEqual(10);
    });

    it("all skills have name and icon", () => {
        skills.forEach((skill) => {
            expect(skill.name).toBeTruthy();
            expect(skill.icon).toBeTruthy();
        });
    });

    it("includes Flutter as a skill", () => {
        const hasFlutter = skills.some(
            (s) => s.name.toLowerCase() === "flutter"
        );
        expect(hasFlutter).toBe(true);
    });

    it("includes Dart as a skill", () => {
        const hasDart = skills.some((s) => s.name.toLowerCase() === "dart");
        expect(hasDart).toBe(true);
    });

    it("includes TypeScript as a skill", () => {
        const hasTypeScript = skills.some(
            (s) => s.name.toLowerCase() === "typescript"
        );
        expect(hasTypeScript).toBe(true);
    });
});
