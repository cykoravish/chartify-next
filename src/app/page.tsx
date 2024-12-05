import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
}
