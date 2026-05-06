import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/HeroSection/HeroSection";
import IntroSection from "../components/IntroSection/IntroSection";
import Footer from "../components/Footer/Footer";
import HowItWorks from "../components/HowItWorks/HowItWorks";
// import LeafAnimation from "../components/LeafAnimation/LeafAnimation";

function Dashboard() {

  
  return (  
    <div>
      {/* <LeafAnimation /> */}
      <Navbar />
      <HeroSection />
      <IntroSection />
      {/* <Cards /> */}
      <HowItWorks />
      <Footer />

    </div>
  );
}

export default Dashboard;