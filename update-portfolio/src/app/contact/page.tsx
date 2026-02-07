import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Contact",
    description: "Get in touch with Syed Raihan Ali - Flutter Developer & Full-Stack Engineer.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#faf9f7]">
            <Navbar />
            <div className="pt-20">
                <Contact />
            </div>
            <Footer />
        </main>
    );
}
