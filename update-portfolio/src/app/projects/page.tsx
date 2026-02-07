import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Projects",
    description: "Featured projects by Syed Raihan Ali - Flutter apps, web applications, and more.",
};

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-[#faf9f7]">
            <Navbar />
            <div className="pt-20">
                <Projects />
            </div>
            <Footer />
        </main>
    );
}
