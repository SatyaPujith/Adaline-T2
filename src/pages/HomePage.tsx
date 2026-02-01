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
      
      {/* Hero Section - Fixed background with mountains */}
      <main style={{ minHeight: '600vh' }}>
        <HeroSection />
      </main>
      
      {/* Sections appear AFTER hero section scrolling is complete */}
      {/* They are positioned absolutely so they don't interfere with hero section */}
      <div className="relative z-20 bg-[#f5f2eb]" style={{ marginTop: '500vh' }}>
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
