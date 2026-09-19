import HeroCanvas from "@/components/HeroCanvas";
import TrustedBySection from "@/components/TrustedBySection";
import RealitySection from "@/components/RealitySection";
import ProductExpressionsSection from "@/components/ProductExpressionsSection";
import WhyPrixtaraSection from "@/components/WhyPrixtaraSection";
import HowPrixtaraThinksSection from "@/components/HowPrixtaraThinksSection";
import RealOutcomesSection from "@/components/RealOutcomesSection";
import ProofAndMomentumSection from "@/components/ProofAndMomentumSection";
import PeopleAndFutureSection from "@/components/PeopleAndFutureSection";
import FinalCTASection from "@/components/FinalCTASection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <main id="main-content">
        <HeroCanvas />
        <TrustedBySection />
        <RealitySection />
        <ProductExpressionsSection />
        <WhyPrixtaraSection />
        <HowPrixtaraThinksSection />
        <RealOutcomesSection />
        <ProofAndMomentumSection />
        <PeopleAndFutureSection />
        <FinalCTASection />
      </main>
      <SiteFooter />
    </>
  );
}
