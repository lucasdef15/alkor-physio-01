import About from '@/components/sections/about/About';

import ForWhom from '@/components/sections/for-whom/ForWhom';
import Hero from '@/components/sections/hero/Hero';

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <ForWhom />
      <About />
    </div>
  );
}
