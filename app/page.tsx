import Hero from "./sections/Hero"
import About from "./sections/About"
import SkillsSlider from "./sections/SkillsSlider"
import Project from "./sections/Project"
import WaterRipple from "./components/WaterRipple"
import Reviews from "./sections/Reviews"

export default function Home() {
  return (
    <div className="h-auto w-full">

      <WaterRipple/>
      <Hero/>
      <SkillsSlider/>
      <About/>
      <Project/>
      <Reviews/>
    </div>
  );
}
