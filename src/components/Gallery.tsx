"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  useGSAP(() => {
    const titleInfinite = gsap.to(".js-gallery-title", {
      xPercent: -50,
      repeat: -1,
      ease: "none",
      duration: 10,
    });

    gsap.set(".gallery__item1", {
      scale: 0.5,
      borderRadius: "200px",
    });
    gsap.set(".gallery__item2", { yPercent: 104 });
    gsap.set(".gallery__item3", { yPercent: 104 });
    gsap.set(".gallery__image", { scale: 1.4 });
    gsap.set(".gallary__item-heading", { opacity: 0 });

    const tl = gsap.timeline({
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".gallery",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      },
    });
    tl.add([
      gsap.to(".gallery__item1", { scale: 1, borderRadius: "50px" }),
      gsap.to(".image1", { scale: 1 }),
      gsap.to(".js-gallery-title", { autoAlpha: 0 }),
    ])
      .to(".heading1", { opacity: 1, duration: 0.2 })
      .to({}, { duration: 0.4 })
      .addLabel("section1")
      .add([
        gsap.to(".gallery__item2", { yPercent: 0 }),
        gsap.to(".image2", { scale: 1 }),
        gsap.to(".gallery__item1", { scale: 0.9 }),
        gsap.to(".gallery__bg1", { opacity: 0.8 }),
      ])
      .to(".heading2", { opacity: 1, duration: 0.2 })
      .to({}, { duration: 0.4 })
      .addLabel("section2")
      .add([
        gsap.to(".gallery__item3", { yPercent: 0 }),
        gsap.to(".image3", { scale: 1 }),
        gsap.to(".gallery__item2", { scale: 0.9 }),
        gsap.to(".gallery__bg2", { opacity: 0.8 }),
      ])
      .to(".heading3", { opacity: 1, duration: 0.2 })
      .addLabel("section3")
      .to({}, { duraiton: 1 });
  }, [".gallery"]);
  return (
    <section className="gallery relative h-[600vh]">
      <h2 className="sr-only">Pearl Gallery</h2>
      <div className="sticky top-0 h-screen grid justify-items-center">
        <div className="w-full self-center overflow-hidden">
          <div className="js-gallery-title inline-flex contain-paint gap-x-10">
            <div className="flex text-9xl font-semibold w-screen gap-x-10">
              <div className="w-1/2 text-nowrap">Pearl Gallery</div>
              <div className="w-1/2 text-nowrap">Pearl Gallery</div>
            </div>
            <div className="flex text-9xl font-semibold w-screen gap-x-10">
              <div className="w-1/2 text-nowrap">Pearl Gallery</div>
              <div className="w-1/2 text-nowrap">Pearl Gallery</div>
            </div>
          </div>
        </div>
        <section className="gallery__item1 absolute w-[99%] h-[98%] rounded-[60] overflow-hidden self-center">
          <div className="relative grid grid-rows-[1fr_auto_1fr] w-full h-full">
            <h3 className="gallary__item-heading heading1 relative z-10 self-center row-start-2 col-start-1 p-8 text-8xl font-semibold">
              Pattern01
            </h3>
            <Image
              src={"/hotel-2.webp"}
              width={1920}
              height={1440}
              alt=""
              className="gallery__image image1 col-span-full row-span-full "
            ></Image>
          </div>
          <div className="gallery__bg1 bg-black opacity-0 absolute inset-0 z-50"></div>
        </section>
        <section className="gallery__item2 absolute w-[99%] h-[98%] rounded-[60] overflow-hidden self-center">
          <div className="relative grid grid-rows-[1fr_auto_1fr] w-full h-full">
            <h3 className="gallary__item-heading heading2 relative z-10 self-center row-start-2 col-start-1 p-8 text-8xl font-semibold">
              Pattern02
            </h3>
            <Image
              src={"/hotel-3.webp"}
              width={1920}
              height={1272}
              alt=""
              className="gallery__image image2 col-span-full row-span-full"
            ></Image>
          </div>
          <div className="gallery__bg2 bg-black opacity-0 absolute inset-0 z-50"></div>
        </section>
        <section className="gallery__item3 absolute w-[99%] h-[98%] rounded-[60] overflow-hidden self-center">
          <div className="relative grid grid-rows-[1fr_auto_1fr] w-full h-full">
            <h3 className="gallary__item-heading heading3 relative z-10 self-center row-start-2 col-start-1 p-8 text-8xl font-semibold">
              Pattern03
            </h3>
            <Image
              src={"/hotel-4.webp"}
              width={1920}
              height={1280}
              alt=""
              className="gallery__image image3 col-span-full row-span-full"
            ></Image>
          </div>
          <div className="gallery__bg3 bg-black opacity-0 absolute inset-0 z-50"></div>
        </section>
      </div>
    </section>
  );
}
