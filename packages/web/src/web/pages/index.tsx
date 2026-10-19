import { useEffect } from "react";
import { Nav } from "../components/sections/nav";
import { Hero } from "../components/sections/hero";
import { TrustBar } from "../components/sections/trust-bar";
import { LeadForm } from "../components/sections/lead-form";
import { Process } from "../components/sections/process";
import { Areas } from "../components/sections/areas";
import { Sourcing } from "../components/sections/sourcing";
import { Fears } from "../components/sections/fears";
import { Guide } from "../components/sections/guide";
import { About } from "../components/sections/about";
import { Testimonials } from "../components/sections/testimonials";
import { Faq } from "../components/sections/faq";
import { FinalCta } from "../components/sections/final-cta";
import { Footer } from "../components/sections/footer";
import { StickyCta } from "../components/sections/sticky-cta";
import { ExitIntent } from "../components/sections/exit-intent";
import { useSeo } from "../hooks/use-seo";

function Index() {
  // Restore the homepage metadata when arriving back from another route.
  useSeo({
    title: "Buyer's Agent Portugal | Lisbon, Cascais & Silver Coast — BleckTeam",
    description:
      "Independent buyer's agent for foreign investors in Portugal. Lisbon, Cascais and the Silver Coast, plus off-market sourcing in the Algarve, Alentejo and Porto.",
    path: "/",
  });

  // Support deep links like /#guide arriving from other routes.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    const raf = requestAnimationFrame(() => setTimeout(scroll, 220));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <TrustBar />
        <Fears />
        <LeadForm />
        <Process />
        <Areas />
        <Sourcing />
        <Guide />
        <About />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
      <ExitIntent />
    </>
  );
}

export default Index;
