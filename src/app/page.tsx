import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import OurCases from "@/components/OurCases";
import Welcome from "@/components/Welcome";
import LenisProvider from "@/provider/LenisProvider";

export default function Home() {
  return (
    <LenisProvider>
      <main>
        <Hero />
        <OurCases />
        <Welcome />
        <Gallery />
        <section className="h-screen"></section>
      </main>
    </LenisProvider>
  );
}
