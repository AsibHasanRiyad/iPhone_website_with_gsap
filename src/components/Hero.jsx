/* eslint-disable react-hooks/exhaustive-deps */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { heroVideo, smallHeroVideo } from "../utils";
import { useEffect, useState } from "react";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );
  const handelVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(videoSrc);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handelVideoSrcSet);
    return () => window.addEventListener("resize", handelVideoSrcSet);
  }, [handelVideoSrcSet]);
  useGSAP(() => {
    gsap.to(".hero-title", {
      opacity: 1,
      delay: 2,
      ease: "bounce.inOut",
    });
    gsap.to("#cta", {
      opacity: 1,
      delay: 2,
      y: -50,
      ease: "power1",
    });
  }, []);
  return (
    <section className=" relative nav-height bg-black w-full">
      <div className=" h-5/6 text-white flex-col flex-center">
        <h1 className=" hero-title">Apple Iphone 15pro</h1>
        <div className=" w-9/12 md:10/12 mx-auto">
          <video
            className=" pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        className=" opacity-0  translate-y-20 flex flex-col items-center justify-center"
        id="cta"
      >
        <a className="btn" href="#highlights">
          Buy
        </a>
        <p className=" font-normal text-xl">From $99/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
