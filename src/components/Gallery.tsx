"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = {
  id: string;
  title: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  itemClass: string;
  imageClass: string;
  headingClass: string;
  bgClass: string;
};

// 定数
const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Pattern01",
    imageSrc: "/hotel-2.webp",
    imageWidth: 1920,
    imageHeight: 1440,
    itemClass: "gallery__item1",
    imageClass: "image1",
    headingClass: "heading1",
    bgClass: "gallery__bg1",
  },
  {
    id: "2",
    title: "Pattern02",
    imageSrc: "/hotel-3.webp",
    imageWidth: 1920,
    imageHeight: 1272,
    itemClass: "gallery__item2",
    imageClass: "image2",
    headingClass: "heading2",
    bgClass: "gallery__bg2",
  },
  {
    id: "3",
    title: "Pattern03",
    imageSrc: "/hotel-4.webp",
    imageWidth: 1920,
    imageHeight: 1280,
    itemClass: "gallery__item3",
    imageClass: "image3",
    headingClass: "heading3",
    bgClass: "gallery__bg3",
  },
];

const GalleryInfiniteTitle = () => {
  return (
    <div className="w-full self-center overflow-hidden text-[8vw] font-semibold">
      <div className="js-gallery-title inline-flex contain-paint gap-x-10">
        <div className="flex w-screen gap-x-10">
          <div className="w-1/2 text-nowrap">Pearl Gallery</div>
          <div className="w-1/2 text-nowrap">Pearl Gallery</div>
        </div>
        <div className="flex w-screen gap-x-10">
          <div className="w-1/2 text-nowrap">Pearl Gallery</div>
          <div className="w-1/2 text-nowrap">Pearl Gallery</div>
        </div>
      </div>
    </div>
  );
};

const GalleryItem = ({ title, imageSrc, imageWidth, imageHeight, itemClass, imageClass, headingClass, bgClass }: GalleryItem) => {
  return (
    <section className={`${itemClass} absolute w-[99%] h-[98%] rounded-[60] overflow-hidden self-center`}>
      <div className="relative grid grid-rows-[1fr_auto_1fr] w-full h-full">
        <h3
          className={`gallary__item-heading ${headingClass} text-shadow-lg relative z-10 self-center row-start-2 col-start-1 p-8 text-6xl font-semibold`}
        >
          {title}
        </h3>
        <Image
          src={imageSrc}
          width={imageWidth}
          height={imageHeight}
          alt=""
          className={`gallery__image ${imageClass} col-span-full row-span-full h-full object-cover`}
        ></Image>
      </div>
      <div className={`${bgClass} bg-black opacity-0 absolute inset-0 z-50`}></div>
    </section>
  );
};

export default function Gallery() {
  useGSAP(() => {
    // 無限スクロール
    gsap.to(".js-gallery-title", {
      xPercent: -50,
      repeat: -1,
      ease: "none",
      duration: 10,
    });

    // セクションアニメーション
    // アニメーションの初期設定
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
        snap: "labels",
      },
    });
    // セクション1
    tl.add([
      gsap.to(".gallery__item1", { scale: 1, borderRadius: "50px" }),
      gsap.to(".image1", { scale: 1 }),
      gsap.to(".js-gallery-title", { autoAlpha: 0 }),
    ])
      .to(".heading1", { opacity: 1, duration: 0.2 })
      .to({}, { duration: 0.1 })
      .addLabel("section1");

    // セクション2
    tl.add([
      gsap.to(".gallery__item2", { yPercent: 0 }),
      gsap.to(".image2", { scale: 1 }),
      gsap.to(".gallery__item1", { scale: 0.9 }),
      gsap.to(".gallery__bg1", { opacity: 0.8 }),
    ])
      .to(".heading2", { opacity: 1, duration: 0.2 })
      .to({}, { duration: 0.1 })
      .addLabel("section2");

    // セクション3
    tl.add([
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
      <div className="sticky top-0 h-screen grid justify-items-center bg-gradient-to-b from-primary to-black/25">
        <GalleryInfiniteTitle />
        {GALLERY_ITEMS.map((item) => (
          <GalleryItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
