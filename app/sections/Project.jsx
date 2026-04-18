"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Rocket } from "lucide-react";
import { motion } from "motion/react";

const projects = [
    {
    id: 3,
    badge: "React",
    title: "Travel & Tourism Platform",
    description:
      "Modern travel booking platform with stunning UI and seamless user experience.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    href: "#",
    image: "/projects/savannahs.png",
  },
  {
    id: 4,
    badge: "WordPress",
    title: "Nonprofit Organization Website",
    description:
      "Impact-driven website to raise awareness and collect donations online.",
    tags: ["WordPress", "Custom Plugin", "Payment Gateway"],
    href: "#",
    image: "/projects/crossflowss.png",
  },
  {
    id: 1,
    badge: "Next.js",
    title: "SaaS Dashboard",
    description:
      "A complete analytics dashboard with real-time data visualization and team collaboration features.",
    tags: ["Next.js", "React", "Tailwind", "Chart.js"],
    href: "#",
    image: "/projects/cyclone-bolt.png",
  },
  {
    id: 2,
    badge: "WordPress",
    title: "Fashion E-commerce",
    description:
      "Custom WordPress theme with WooCommerce integration and advanced filtering system.",
    tags: ["WordPress", "WooCommerce", "PHP", "ACF"],
    href: "#",
    image: "/projects/property-lens.png",
  },

];

function ProjectCard({
  badge,
  title,
  description,
  tags,
  href,
  image,
  index,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_80px_rgba(0,0,0,0.45)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,98,0,0.30),transparent_42%)] opacity-90" />
      <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/5" />

      <div className="relative p-5 pb-0">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6a00]" />
            {badge}
          </span>

          <Link
            href={href}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90 transition duration-300 hover:border-[#ff6a00]/50 hover:bg-[#ff6a00]/10 hover:text-[#ff8b3d]"
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-black/40">
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_center,rgba(255,106,0,0.22),transparent_58%)]" />
          <div className="relative aspect-16/10 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </div>

      <div className="relative -mt-6 rounded-3xl  px-6 pb-6 pt-7">
        <h3 className="text-[30px] font-semibold tracking-[-0.03em] text-white">
          {title}
        </h3>

        <p className="mt-3 max-w-[95%] text-[16px] leading-7 text-white/60">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80"
            >
              {tag}
            </span>
          ))}

          
        </div>
      </div>
    </motion.article>
  );
}

export default function Project() {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,98,0,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,98,0,0.08),transparent_25%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[#ff6a00]/20 bg-[#ff6a00]/10 px-4 py-2 text-sm font-medium text-[#ff8b3d]">
              Featured Projects
            </span>

            <h2 className="mt-6 max-w-4xl text-6xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-6xl">
              Work That Speaks
              <br />
              for <span className="text-[#ff6a00]">Itself</span>
            </h2>

            <p className="mt-6 max-w-2xl text-md leading-normal text-white/65">
              A selection of projects that showcase my passion for building
              high-performing, scalable, and user-focused digital experiences.
            </p>
          </div>

          
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>

    
      </div>
    </section>
  );
}