function SkillsSlider() {
  const skills = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "PHP",
    "SQL",
    "WordPress",
    "React",
    "Next.js",
    "Wix",
    "Webflow",
  ];

  const loopSkills = [...skills, ...skills];

  return (
    <div className="w-full py-6">
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        
        {/* Left fade */}
        <div className="absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-white to-transparent pointer-events-none" />

        {/* Right fade */}
        <div className="absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-white to-transparent pointer-events-none" />

        {/* Slider */}
        <div className="flex w-max animate-marquee">
          {loopSkills.map((skill, index) => (
            <span
              key={index}
              className="mx-8 text-md md:text-md font-light uppercase tracking-[0.15em] text-black whitespace-nowrap"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
export default SkillsSlider