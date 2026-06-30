
// app/page.tsx
import Footer from "@/components/layout/Footer";
import { Hero } from "@/components/blocks/Hero";
import Ticker from "@/components/sections/Ticker";
import TrustBanner from "@/components/sections/TrustBanner";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import SkillsShowcase from "@/components/sections/PrecisionInMotion";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <>
     <Navbar />
      <main>
        <Hero />
        <Ticker />
        <TrustBanner />
        <FeaturedProducts />
        <SkillsShowcase />
      </main>
      <Footer />
    </>
  );
}