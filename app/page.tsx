
import Footer            from "@/components/layout/Footer";
import { Hero } from "@/components/blocks/Hero";
import Ticker            from "@/components/sections/Ticker";
import TrustBanner       from "@/components/sections/TrustBanner";
import FeaturedProducts  from "@/components/sections/FeaturedProducts";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Ticker />
        <TrustBanner />
        <FeaturedProducts />
      </main>
      <Footer />
    </>
  );
}