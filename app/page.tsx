import Navbar            from "@/components/layout/Navbar";
import Footer            from "@/components/layout/Footer";
import { HeroSection }   from "@/components/blocks/galaxy-interactive-hero-section";
import Ticker            from "@/components/sections/Ticker";
import TrustBanner       from "@/components/sections/TrustBanner";
import FeaturedProducts  from "@/components/sections/FeaturedProducts";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Ticker />
        <TrustBanner />
        <FeaturedProducts />
      </main>
      <Footer />
    </>
  );
}