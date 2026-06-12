import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';
import { menuCategories } from '@/lib/menu-data';

export default function HomePage() {
  return (
    <>
      <SplashScreen />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        {menuCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </main>
      <Footer />
    </>
  );
}
