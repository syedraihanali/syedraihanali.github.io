import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";

describe("Hero Component", () => {
    it("renders the main heading with correct name", () => {
        render(<Hero />);

        expect(screen.getByText("Syed Raihan Ali")).toBeInTheDocument();
    });

    it("displays Flutter Developer as primary role", () => {
        render(<Hero />);

        expect(screen.getByText("Flutter Developer")).toBeInTheDocument();
    });

    it("shows Tahir Taim as alternate name", () => {
        render(<Hero />);

        expect(screen.getByText("Tahir Taim")).toBeInTheDocument();
    });

    it("has a link to projects page", () => {
        render(<Hero />);

        const projectsLink = screen.getByRole("link", { name: /view projects/i });
        expect(projectsLink).toHaveAttribute("href", "/projects");
    });

    it("has a link to contact page", () => {
        render(<Hero />);

        const contactLink = screen.getByRole("link", { name: /get in touch/i });
        expect(contactLink).toHaveAttribute("href", "/contact");
    });

    it("displays social links", () => {
        render(<Hero />);

        expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
        expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("has correct GitHub link", () => {
        render(<Hero />);

        const githubLink = screen.getByLabelText("GitHub");
        expect(githubLink).toHaveAttribute(
            "href",
            "https://github.com/syedraihanali"
        );
    });
});
