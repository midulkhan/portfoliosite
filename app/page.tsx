import Image from "next/image";
import Hero from "./sections/Hero"
import About from "./sections/About"
import SkillsSlider from "./sections/SkillsSlider"
import Project from "./sections/Project"
import {WaterWave} from 'react-water-wave';


export default function Home() {
  return (
    <div className="h-auto w-full">
      
        <WaterWave
    imageUrl={"/midul.png"}
  >
    {methods => (
     <Hero/>

    )}
  </WaterWave>

      
      <SkillsSlider/>
      <About/>
      <Project/>
    </div>
  );
}
