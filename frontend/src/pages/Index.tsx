import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import LunchBuffet from "@/components/LunchBuffet";
import Catering from "@/components/Catering";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FloatingBookingButton from "@/components/FloatingBookingButton";
import FloatingChatbot from "@/components/FloatingChatbot";

const Index = () => (
  <>
    <Navbar />
    <main id="main-content">
      <Hero />
      <MenuSection />
      <LunchBuffet />
      <Catering />
      <About />
      <Gallery />
      <Reviews />
      <Contact />
      <Booking />
    </main>
    <Footer />
    <BackToTop />
    <FloatingBookingButton />
    <FloatingChatbot />
  </>
);

export default Index;
