import Carousel from "@/components/Carousel";
import Navbar from "../components/Navbar";
import Collection from "../components/Collection";
import Popular from "@/components/Popular";
import FAQSection from "@/components/Faq";
import Features from "@/components/Features";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Carousel />
      <Collection />
      <Popular />
      <FAQSection />
      <Features />
      <Contact />
      <Footer />
    </main>

  );
}
