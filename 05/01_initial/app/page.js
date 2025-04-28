import ActionSection from "./components/homepage/ActionSection";
import FeaturesSection from "./components/homepage/FeaturesSection";
import Footer from "./components/homepage/Footer";
import Header from "./components/homepage/Header";
import IntroSection from "./components/homepage/IntroSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <IntroSection />
      <FeaturesSection />
      <ActionSection />
      <Footer />
    </>
  );
}
