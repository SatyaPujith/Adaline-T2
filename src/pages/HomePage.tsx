import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../sections/HeroSection';
import FeaturesSection from '../sections/FeaturesSection';
import StatsSection from '../sections/StatsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import LibrarySection from '../sections/LibrarySection';
import CTASection from '../sections/CTASection';

const HomePage = () => {
  return (
    <div className="bg-background">
      <Navbar />

      {/* Hero Section - Standard Layout */}
      <main>
        <HeroSection />
      </main>

      {/* Sections appear naturally after hero */}
      <div className="relative bg-[#f5f2eb]">
        <div className="transition-all duration-500 ease-out">
          <FeaturesSection />
        </div>
        <div className="transition-all duration-500 ease-out">
          <StatsSection />
        </div>
        <div className="transition-all duration-500 ease-out">
          <TestimonialsSection />
        </div>
        <div className="transition-all duration-500 ease-out">
          <LibrarySection />
        </div>
        <div className="transition-all duration-500 ease-out">
          <CTASection />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
