"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Ryan Mitchell",
    role: "CEO, TravelEase",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    review:
      "Working with Midul was an outstanding experience. He brought clarity, speed, and a strong eye for detail to our platform. The final result looked premium and performed even better than we expected.",
  },
  {
    name: "Sarah Thompson",
    role: "Marketing Director, HealthNet",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    review:
      "Midul translated our vision into a polished, high-converting product with remarkable precision. His communication was excellent throughout, and the execution quality was truly top-tier.",
  },
  {
    name: "James Carter",
    role: "Founder, CarterSolutions",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    review:
      "From design refinement to development delivery, everything was handled with professionalism. The site feels fast, modern, and intentional. I would absolutely work with him again.",
  },
  {
    name: "Emma Richardson",
    role: "Operations Lead, Nova Studio",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    review:
      "Midul has that rare ability to combine visual taste with real technical depth. He improved both the user experience and the backend workflow, which made a huge difference for our team.",
  },
];

function wrap(index, length) {
  return (index + length) % length;
}

function getShortestOffset(index, active, length) {
  let diff = index - active;

  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;

  return diff;
}

function getCardClasses(offset) {
  if (offset === 0) {
    return {
      className: "active z-30 opacity-100 pointer-events-auto",
      style: {
        transform: "translateX(-50%) translateY(0px) scale(1)",
      },
    };
  }

  if (offset === -1) {
    return {
      className: "z-20 opacity-75 pointer-events-none",
      style: {
        transform: "translateX(calc(-50% - 405px)) translateY(18px) scale(0.92)",
      },
    };
  }

  if (offset === 1) {
    return {
      className: "z-20 opacity-75 pointer-events-none",
      style: {
        transform: "translateX(calc(-50% + 405px)) translateY(18px) scale(0.92)",
      },
    };
  }

  if (offset === -2) {
    return {
      className: "z-10 opacity-0 pointer-events-none hidden md:block",
      style: {
        transform: "translateX(calc(-50% - 810px)) translateY(30px) scale(0.92)",
      },
    };
  }

  if (offset === 2) {
    return {
      className: "z-10 opacity-0 pointer-events-none hidden md:block",
      style: {
        transform: "translateX(calc(-50% + 810px)) translateY(30px) scale(0.92)",
      },
    };
  }

  return {
    className: "z-0 opacity-0 pointer-events-none",
    style: {
      transform: "translateX(-50%) translateY(40px) scale(0.92)",
    },
  };
}

export default function ClientReviewsSection() {
  const [active, setActive] = useState(1);

  const prev = () => setActive((p) => wrap(p - 1, reviews.length));
  const next = () => setActive((p) => wrap(p + 1, reviews.length));

  const cards = useMemo(() => {
    return reviews.map((item, index) => {
      const offset = getShortestOffset(index, active, reviews.length);
      const cardState = getCardClasses(offset);

      return {
        ...item,
        index,
        offset,
        isCenter: offset === 0,
        cardClassName: cardState.className,
        cardStyle: cardState.style,
      };
    });
  }, [active]);

  return (
    <section className="relative overflow-hidden bg-black py-28 text-white">
      <div className="absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-400 blur-[120px]" />
      <div className="absolute bottom-20 left-1/2 h-60 w-[40rem] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-200 backdrop-blur-md">
            Feedback
          </span>

          <h2 className="mt-6 text-5xl font-medium tracking-tight text-white sm:text-6xl">
            <span className="poppins">Client Reviews</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-md">
            Words of satisfaction from my clients and collaborators,
            reflecting the quality and impact of my work.
          </p>
        </div>

        <div className="relative mt-20">
          <button
            onClick={prev}
            className="absolute left-0 top-[42%] z-40 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition hover:border-orange-400/40 hover:bg-orange-500/10 md:flex"
            aria-label="Previous review"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-[42%] z-40 hidden h-14 w-14 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition hover:border-orange-400/40 hover:bg-orange-500/10 md:flex"
            aria-label="Next review"
          >
            <ChevronRight size={22} />
          </button>

          <div className="relative mx-auto h-[650px] w-full max-w-[1260px] overflow-hidden md:auto">
            {cards.map((item) => (
              <article
                key={item.name}
                className={[
                  "absolute left-1/2 top-0 w-full max-w-[330px] rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl transition-[transform,opacity,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:max-w-[370px]",
                  item.isCenter
                    ? "border-orange-400/20 bg-[radial-gradient(circle_at_top,rgba(255,121,27,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] shadow-[0_0_80px_rgba(255,115,0,0.15)]"
                    : "",
                  item.cardClassName,
                ].join(" ")}
                style={item.cardStyle}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,115,0,0.12),transparent_40%)] opacity-80" />
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:18px_18px]" />

                <div className="relative z-10">
                  <div className="mx-auto flex w-fit items-center justify-center rounded-full bg-orange-500/20 p-[2px] shadow-[0_0_30px_rgba(255,115,0,0.25)]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-full object-cover ring-4 ring-black/40"
                    />
                  </div>

                  <div className="mt-5 text-center">
                    <h3 className="text-3xl font-semibold tracking-tight text-white">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-base text-white/65">{item.role}</p>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-1 text-orange-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>

                  <p className="mt-6 min-h-[168px] text-center text-base leading-8 text-white/82">
                    “{item.review}”
                  </p>

                  <div className="mt-7 text-center">
                    <div className="text-2xl font-semibold text-white">{item.name}</div>
                    <div className="mt-1 text-sm text-white/60">{item.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            {reviews.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setActive(dotIndex)}
                aria-label={`Go to review ${dotIndex + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  dotIndex === active
                    ? "w-8 bg-orange-400 shadow-[0_0_16px_rgba(251,146,60,0.7)]"
                    : "w-2.5 bg-white/20 hover:bg-white/45"
                }`}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 md:hidden">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition hover:border-orange-400/40 hover:bg-orange-500/10"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition hover:border-orange-400/40 hover:bg-orange-500/10"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 border-t border-white/10 pt-10 text-center sm:grid-cols-3">
          <div>
            <div className="text-5xl font-semibold tracking-tight text-white">+4.9</div>
            <p className="mt-2 text-lg text-white/60">average rating</p>
          </div>

          <div className="sm:border-x sm:border-white/10">
            <div className="text-5xl font-semibold tracking-tight text-white">1700+</div>
            <p className="mt-2 text-lg text-white/60">projects completed</p>
          </div>

          <div>
            <div className="text-5xl font-semibold tracking-tight text-white">400+</div>
            <p className="mt-2 text-lg text-white/60">happy clients</p>
          </div>
        </div>
      </div>
    </section>
  );
}