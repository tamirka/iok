import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { Services } from '../components/Services';
import { Capabilities } from '../components/Capabilities';
import { WhyUs } from '../components/WhyUs';
import { Process } from '../components/Process';
import { CTA } from '../components/CTA';

export function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Capabilities />
      <WhyUs />
      <Process />
      <CTA />
    </>
  );
}
