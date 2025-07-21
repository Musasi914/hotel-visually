"use client";

import Image from "next/image";
import styles from "@/styles/shuffle.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/provider/LenisProvider";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Shuffle() {
  const shuffleRef = useRef<HTMLDivElement>(null);
  const splitTextRef = useRef<HTMLDivElement>(null);

  const { start, stop } = useLenis();

  const isMobile = useIsMobile();

  useGSAP(() => {
    if (isMobile) return;
    if (window.matchMedia("(hover: none)").matches) return;
    // initSplitText
    const textEl = gsap.utils.toArray(splitTextRef.current?.querySelectorAll("h3, p") || []);

    for (const el of textEl) {
      const split = new SplitText(el as HTMLElement, {
        type: "lines, words",
      });
      split.lines.forEach((line) => gsap.set(line, { overflow: "hidden", className: "line" }));
      split.words.forEach((word) => gsap.set(word, { className: "word" }));
      gsap.set(".shuffle__text-content2 .word", { yPercent: -120 });
    }

    let currentPage = 0;
    let isAnimating = false;

    const shuffleAnim1 = [
      gsap.fromTo(
        ".shuffle__col1",
        {
          opacity: 1,
          scale: 1,
        },
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.75,
          paused: true,
          ease: "none",
        }
      ),
      gsap.fromTo(
        ".shuffle__col2",
        {
          x: "100%",
        },
        {
          x: "0%",
          duration: 0.75,
          paused: true,
          ease: "none",
        }
      ),
      gsap.fromTo(
        ".shuffle__col3",
        {
          y: "100%",
        },
        {
          y: "0%",
          duration: 0.75,
          paused: true,
          ease: "none",
        }
      ),
      gsap.fromTo(".shuffle__col2-img1 > div", { scale: 1 }, { scale: 1.25, duration: 0.75, paused: true }),
      gsap.fromTo(
        ".shuffle__col2-img2 > div",
        { clipPath: "polygon(0 0,100% 0,100% 0,0 0)", scale: 1.25 },
        { clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)", scale: 1, duration: 0.75, paused: true }
      ),
      gsap.fromTo(".shuffle__col2-img2 img", { scale: 1.25 }, { scale: 1, duration: 0.75, paused: true }),
    ];
    const shuffleAnim2 = [
      gsap.fromTo(
        ".shuffle__col2",
        {
          opacity: 1,
          scale: 1,
        },
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.75,
          paused: true,
          ease: "none",
        }
      ),
      gsap.fromTo(".shuffle__col3", { x: "100%" }, { x: "0%", duration: 0.75, paused: true }),
      gsap.fromTo(".shuffle__col4", { y: "100%" }, { y: "0%", duration: 0.75, paused: true }),
      gsap.fromTo(".shuffle__col2-img2 img", { scale: 1 }, { scale: 1.25, duration: 0.75, paused: true }),
      gsap.fromTo(".shuffle__text-content .word", { yPercent: 0 }, { yPercent: 100, duration: 0.75, paused: true }),
      gsap.fromTo(".shuffle__text-content2 .word", { yPercent: -120 }, { yPercent: 0, duration: 0.75, paused: true }),
      gsap.fromTo(".shuffle__col4 img", { scale: 1.25 }, { scale: 1, duration: 0.75, paused: true }),
    ];

    const observer = ScrollTrigger.observe({
      target: shuffleRef.current,
      type: "wheel,touch,scroll,pointer",
      preventDefault: true,
      onUp: () => {
        if (currentPage === 0) return;
        if (isAnimating) return;
        stop();
        isAnimating = true;
        if (currentPage === 3) {
          shuffleAnim2.forEach((anim) => anim.reverse());
          setTimeout(() => {
            currentPage = 2;
            isAnimating = false;
          }, 750);
        } else if (currentPage === 2) {
          shuffleAnim1.forEach((anim) => anim.reverse());
          setTimeout(() => {
            currentPage = 1;
            isAnimating = false;
          }, 750);
        } else if (currentPage === 1) {
          currentPage = 0;
          isAnimating = false;
          start();
        }
      },
      onDown: (aaaa) => {
        console.log(aaaa);
        if (isAnimating) return;
        if (currentPage === 3) return;
        stop();
        isAnimating = true;
        if (currentPage === 0) {
          shuffleAnim1.forEach((anim) => anim.play());
          setTimeout(() => {
            isAnimating = false;
            currentPage = 1;
          }, 750);
        } else if (currentPage === 1) {
          shuffleAnim2.forEach((anim) => anim.play());
          setTimeout(() => {
            isAnimating = false;
            currentPage = 2;
          }, 750);
        } else if (currentPage === 2) {
          currentPage = 3;
          isAnimating = false;
          start();
        }
      },
    });
    observer.disable();

    ScrollTrigger.create({
      trigger: shuffleRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onEnter: () => {
        observer.enable();
      },
      onLeave: () => {
        observer.disable();
        if (currentPage !== 3) {
          shuffleAnim2.forEach((anim) => anim.play());
          currentPage = 3;
        }
        isAnimating = false;
      },
      onEnterBack: () => {
        observer.enable();
      },
      onLeaveBack: () => {
        observer.disable();
        if (currentPage !== 0) {
          shuffleAnim1.forEach((anim) => anim.reverse());
          currentPage = 0;
        }
        isAnimating = false;
      },
    });
  }, [shuffleRef]);

  return (
    <section className={`${styles.shuffle}`} ref={shuffleRef}>
      <h2 className="sr-only">Introduce our cases</h2>
      <div className={styles.shuffle__wrapper}>
        <section className={`${styles.col} shuffle__col1`}>
          <div className={styles.col__content}>
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, error!</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum quos sed molestiae praesentium rem dolorem, omnis sapiente hic
              blanditiis similique?
            </p>
          </div>
        </section>
        <section className={`${styles.col} shuffle__col2`}>
          <div className={`${styles.col__img} shuffle__col2-img1`}>
            <div className={styles.col__img_wrapper}>
              <Image src="/hotel-7.webp" alt="" width={1280} height={960} />
            </div>
          </div>
          <div className={`${styles.col__img} shuffle__col2-img2 hidden md:block`}>
            <div className={`${styles.col__img_wrapper} [clip-path:polygon(0_0,100%_0,100%_0,0_0)] md:scale-125`}>
              <Image src="/hotel-8.webp" alt="" width={1280} height={960} className="scale-125" />
            </div>
          </div>
        </section>
        <section className={`${styles.col} shuffle__col3 top-0`} ref={splitTextRef}>
          <div className={`${styles.col__content} shuffle__text-content md:absolute w-full h-full top-0 left-0`}>
            <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam, molestias.</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae in fugit ullam repudiandae? Inventore nisi dolores, modi eum
              corporis quod.
            </p>
          </div>
          <div className={`${styles.col__content} shuffle__text-content2 absolute w-full h-full top-0 left-0 hidden md:block`}>
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, doloremque?</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab id suscipit harum aperiam reprehenderit atque ex placeat unde
              accusantium quas.
            </p>
          </div>
        </section>
        <section className={`${styles.col} shuffle__col4`}>
          <div className={styles.col__img}>
            <div className={styles.col__img_wrapper}>
              <Image src="/hotel-3.webp" alt="" width={1280} height={960} />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
