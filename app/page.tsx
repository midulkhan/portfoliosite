import Image from "next/image";
import Hero from "./sections/Hero"
import About from "./sections/About"
import SkillsSlider from "./sections/SkillsSlider"

export default function Home() {
  return (
    <div className="h-auto w-full">
      
      <Hero/>
      <SkillsSlider/>
      <About/>
    </div>
  );
}
