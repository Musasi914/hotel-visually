import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import OurCases from "@/components/OurCases";
import Welcome from "@/components/Welcome";
import LenisProvider from "@/provider/LenisProvider";
import Cushion from "@/components/Cushion";
import Shuffle from "@/components/Shuffle";

export default function Home() {
  return (
    <LenisProvider>
      <main>
        <Hero />
        <OurCases />
        <Welcome title="What you see is what you get." sectionName="welcome" />
        <Gallery />
        <Cushion />
        <Shuffle />
        <Welcome title="Reserve your room" sectionName="reserve" />
      </main>
    </LenisProvider>
  );
}
