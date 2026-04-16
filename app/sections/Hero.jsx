import { ArrowUpRight } from "lucide-react";

function Hero() {
  return (
    <div className="h-screen w-full hero overflow-hidden rounded-b-[64px]">
      {/* <div className="line absolute bg-mist-400 w-[0.5px] left-16 h-screen"></div>
      <div className="line absolute bg-mist-400 w-[0.5px] right-16 h-screen"></div> */}

      <div className="flex max-w-7xl w-full h-full m-auto px-4">
        <div className="right w-1/2 flex flex-col justify-end items-start gap-6 pb-36">
          <p className="text-lg flex gap-2 items-center">
            Hi, I’m Midul
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
            </span>
          </p>
          <h1 className="text-6xl aghraham leading-relaxed">
            A Full-Stack Developer
          </h1>
        </div>
        <div className="left w-1/2 flex flex-col justify-end items-center pb-36 gap-4">
          <p className="text-left w-full font-light">
            Open to exciting roles, freelance projects, and collaborations.
            Focused on building impactful digital experiences.
          </p>
          <div className="form flex justify-between bg-white w-full rounded-full overflow-hidden p-1">
            <input
              type="email"
              placeholder="user@email.com"
              className=" px-6 flex-1 text-neutral-500 focus-visible:outline-none text-lg"
            />
            <button className="glow rounded-full p-3 cursor-pointer">
              <ArrowUpRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
