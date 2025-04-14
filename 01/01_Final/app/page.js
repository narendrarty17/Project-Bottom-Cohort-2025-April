import ActionSection from "./components/HomePage/ActionSection";
import FeaturesSection from "./components/HomePage/FeaturesSection";
import Footer from "./components/HomePage/Footer";
import Header from "./components/HomePage/Header";
import IntroSection from "./components/HomePage/IntroSection";

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
