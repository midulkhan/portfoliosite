import Image from "next/image";
import React from "react";

function About() {
  return (
    <div className="w-full h-full bg-white pt-30 pb-30">
      <div className="max-w-7xl m-auto flex gap-10">
       

    <div className="w-1/2 relative ">
        <Image src="/midul_potrait.png" fill className="rounded-2xl object-contain relative!" alt="Person Image"/>
    </div>
     <div className="w-1/2 h-full flex flex-col gap-6">
          <h2 className="poppins text-6xl font-semibold  text-neutral-800 leading-16 ">
            Shaping experience that make life simpler
          </h2>
          <p className="text-neutral-800 poppins">
            I’m Midul, a Full-Stack Developer with over 7 years of experience
            building modern, high-performing web applications and scalable
            digital solutions. From custom WordPress themes and plugins to
            full-stack applications built with Next.js, React, and modern
            backend technologies, I focus on creating products that are not only
            visually compelling but also fast, maintainable, and built to scale.
            I enjoy transforming complex ideas into seamless user experiences
            and bringing ambitious digital products to life through clean code
            and thoughtful design.
          </p>
          <div className="flex gap-4 justify-between mt-10">
            <div className="project flex flex-1 flex-col gap-2 justify-center items-center text-neutral-600 border-r border-neutral-300 pr-4">
                <h2 className="text-4xl font-bold">1700+</h2>
                <p className="text-sm">Project completed</p>
            </div>

            <div className="project flex flex-1 flex-col gap-2 justify-center items-center text-neutral-600 border-r border-neutral-300 pr-4">
                <h2 className="text-4xl font-bold">7+</h2>
                <p className="text-sm">Years Experience</p>
            </div>

            <div className="project flex flex-1 flex-col gap-2 justify-center items-center text-neutral-600 ">
                <h2 className="text-4xl font-bold">400+</h2>
                <p className="text-sm">Global Clients</p>
            </div>
        </div>
        </div>


      </div>
    </div>
  );
}

export default About;
