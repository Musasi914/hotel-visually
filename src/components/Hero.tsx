"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

// アニメーション用定数
const HERO_TITLE = "Pearl";
const HERO_SUBTITLE = "Hotel";
const HERO_DESCRIPTION = "安らぎの空間で、\nあなたの心を癒す。";
const HERO_PARAGRAPH = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.";
const HERO_IMAGE = "/hero.webp";
const HERO_IMAGE_ALT = "ホテルのイメージ画像";

// GSAPプラグイン登録（1回のみ）
gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero() {
  useGSAP(() => {
    // テキストアニメーション
    const text = new SplitText(".js-hero-text-anim", {
      type: "lines,chars",
    });
    gsap.set(text.lines, { overflow: "hidden" });
    gsap.set(text.chars, { yPercent: -100 });
    gsap.set(".js-hero-text-anim", { opacity: 1 });
    gsap.to(text.chars, {
      yPercent: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    // 画像アニメーション
    gsap.to(".js-hero-image", {
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: ".js-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="js-hero h-screen p-2" aria-labelledby="hero-title">
      <div className="relative h-full overflow-hidden rounded-4xl">
        <div className="md:h-full p-0 md:p-4 grid grid-rows-[auto_1fr_auto]">
          <h1 id="hero-title" className="text-9xl md:text-[20vw] leading-tight font-bold">
            {HERO_TITLE}
            <span className="text-sm">{HERO_SUBTITLE}</span>
          </h1>
          <section className="row-start-3 flex flex-col md:flex-row md:justify-between md:items-end">
            <h2 className="js-hero-text-anim opacity-0 text-2xl font-bold whitespace-pre-line">
              {HERO_DESCRIPTION.split("\n").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="js-hero-text-anim opacity-0 text-xs max-w-3xs font-bold">{HERO_PARAGRAPH}</p>
          </section>
        </div>
        <div className="overflow-hidden rounded-2xl mt-6 md:mt-0 md:rounded-none md:absolute md:w-full md:h-full top-0 left-0 -z-1">
          <Image src={HERO_IMAGE} width={1920} height={1280} alt={HERO_IMAGE_ALT} priority className="js-hero-image object-cover h-full" />
        </div>
      </div>
    </section>
  );
}
