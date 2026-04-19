import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Game from "@/components/Game";
import About from "@/components/About";
import Careers from "@/components/Careers";
import Contact from "@/components/Contact";
import SectionSlider from "@/components/SectionSlider";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Loader />
      <SectionSlider>
        <Hero />
        <Game />
        <About />
        <Careers />
        <Contact />
      </SectionSlider>
    </main>
  );
}
