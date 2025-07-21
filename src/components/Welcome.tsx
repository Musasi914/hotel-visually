"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

const WELCOME_TEXT =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus vitae quod hic reprehenderit accusantium nobis voluptatibus ullam labore voluptate voluptates cum esse sapiente perspiciatis ad, excepturi optio, illum adipisci! Non!";
const WELCOME_SUB_TEXT = "おかげさまで大盛況でございます。要ご予約のほどよろしくお願いいたします。";
const WELCOME_BUTTON_TEXT = ["予約する", "地図を見る"];

export default function Welcome({ title, sectionName }: { title: string; sectionName: string }) {
  useGSAP(() => {
    const text = SplitText.create(`.js-${sectionName}-title`, { type: "lines,words" });
    text.lines.forEach((line) => gsap.set(line, { overflow: "clip" }));
    text.words.forEach((word) => gsap.set(word, { yPercent: -105 }));
    gsap.to(text.words, {
      yPercent: 0,
      scrollTrigger: {
        trigger: `.js-${sectionName}-title`,
        start: "top 80%",
        end: "top 40%",
        scrub: 2,
      },
    });
  }, [`.js-${sectionName}`]);
  return (
    <section className={`js-${sectionName}`}>
      <div className="grid min-h-screen grid-cols-2 gap-x-20 content-center p-8">
        <p className="text-xs">What's new</p>
        <h2 className={`js-${sectionName}-title col-span-full text-[12vw] leading-[1.2] mb-10`}>{title}</h2>
        <p className="col-span-full md:col-span-1 text-primary opacity-50 text-2xl">{WELCOME_TEXT}</p>
        <div className="grid grid-cols-2 gap-x-6 content-start col-span-full md:col-span-1 mt-10 md:mt-0">
          <p className="col-span-full text-xs max-w-3xs mb-4 md:mb-10">{WELCOME_SUB_TEXT}</p>
          {WELCOME_BUTTON_TEXT.map((text) => (
            <button key={text} className="col-span-1 border border-primary rounded-full py-6 cursor-pointer" type="button">
              {text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
