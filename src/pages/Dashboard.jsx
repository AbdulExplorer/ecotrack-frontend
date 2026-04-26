import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/HeroSection/HeroSection";
import IntroSection from "../components/IntroSection/IntroSection";
import Footer from "../components/Footer/footer";
import HowItWorks from "../components/HowItWorks/howItWorks";
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
      <h1>Dashboard</h1>
      <Footer />

    </div>
  );
}

export default Dashboard;