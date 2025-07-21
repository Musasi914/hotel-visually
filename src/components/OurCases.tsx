"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { hotelList } from "@/constants/ourcases";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const OUR_CASES_TITLE = "Interior Design";
const OUR_CASES_TEXT = [
  "ようこそ、いらっしゃいませ。",
  "今年創業したホテルです。",
  "お客様のご要望に合わせて、",
  "お部屋をご提案いたします。",
];

// 型定義
type Hotel = {
  id: number;
  title: string;
  image: string;
};

// クラス名生成ロジックを関数化
const getHotelItemClass = (hotel: Hotel) => {
  const rowStart = hotel.id < 5 ? 1 : 3;
  const flexDir = hotel.id < 5 ? "flex-col-reverse" : "flex-col-reverse md:flex-col";
  return `js-hotel-item flex-[1_1_40%] mt-10 md:mt-0 col-span-6 md:col-span-3 row-start-${rowStart} flex gap-2 ${flexDir}`;
};

export default function OurCases() {
  const isMobile = useIsMobile();
  useGSAP(() => {
    if (isMobile) return;
    gsap.set(".js-hotel-item", { y: `${window.innerHeight}px` });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".js-our-cases",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    tl.to({}, { duration: 0.3 });
    tl.to(".js-our-cases-text", {
      opacity: 0,
      yPercent: 100,
    })
      .add([
        gsap.to(".js-bg", { opacity: 1 }),
        gsap.from(".js-our-cases-title", {
          opacity: 0,
          yPercent: -100,
        }),
        gsap.to(".js-hotel-item", {
          y: 0,
          stagger: 0.1,
          ease: "power2.inOut",
        }),
      ])
      .to({}, { duration: 0.4 })
      .to(".js-bg", { yPercent: 20, duration: 0.7 });
  }, [".js-our-cases"]);

  return (
    <section className="md:h-[400vh] js-our-cases relative overflow-clip mb-20 md:mb-0">
      <div className="md:sticky js-our-cases-container top-0 md:h-screen">
        <div className="relative h-full overflow-hidden">
          <h2 className="md:abs-center text-4xl font-bold uppercase overflow-hidden">
            <span className="js-our-cases-title block sr-only md:not-sr-only">{OUR_CASES_TITLE}</span>
          </h2>
          <p className="md:abs-center p-2 md:p-0 overflow-hidden font-bold text-2xl md:text-4xl leading-relaxed">
            {OUR_CASES_TEXT.map((text, index) => (
              <span className="overflow-hidden block" key={index}>
                <span className="js-our-cases-text block text-nowrap">{text}</span>
              </span>
            ))}
          </p>
          <div className="h-full p-2">
            <ol className="h-full p-2 flex flex-wrap  md:grid grid-cols-12 gap-x-[8vw] grid-rows-[auto_1fr_auto]">
              {hotelList.map((hotel: Hotel) => (
                <li key={hotel.id} className={getHotelItemClass(hotel)}>
                  <p className="flex items-center gap-4 text-sm justify-center font-mono font-bold">
                    <span>{`00${hotel.id}`}</span>
                    <span>{hotel.title}</span>
                  </p>
                  <Image src={hotel.image} alt="" width={1920} height={1280} className="aspect-square object-cover rounded-2xl" />
                </li>
              ))}
            </ol>
          </div>
          <div className="js-bg opacity-0 absolute top-0 left-0 w-full h-full -z-1 brightness-40 p-2">
            <Image src="/hotel-4.webp" alt="" width={1920} height={1280} className="h-full w-full object-cover rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
