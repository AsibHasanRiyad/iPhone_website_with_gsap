import React from "react";
import { chipImg, frameImg, frameVideo } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateWithGsap } from "../utils/animation";

const HowItWorks = () => {
  useGSAP(() => {
    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
        toggleActions: "play reverse play reverse",
        // markers: true,
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
    });
    animateWithGsap(".g_fadeIn", {
      opacity: 1,
      duration: 1,
      y: 0,
      ease: "power2.inOut",
    });
    animateWithGsap(
      "#hiw_video_container",
      {
        scale: 1,
        duration: 3,
      },
      {
        scrub: true,
        start: "top 95%",
        toggleActions: "restart reverse restart reverse",

        end: "bottom 60%",
      }
    );
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div id="chip" className="w-full my-20 flex-center">
          <img src={chipImg} alt="Chip" width={180} height={180} />
        </div>
        <div className="flex flex-col items-center ">
          <h1 className=" hiw-title">
            A17 Pro chip <br />A monster win for gaming
          </h1>
          <p className=" hiw-subtitle">
            {" "}
            It's here . The biggest redesign in the history of Apple GPUs
          </p>
        </div>
        <div id="hiw_video_container" className="mt-10 scale-0 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden ">
              <img
                src={frameImg}
                alt="Frame"
                className="relative z-10 bg-transparent "
              />
            </div>
            <div className=" hiw-video">
              <video
                className="pointer-events-none "
                autoPlay
                muted
                loop
                playsInline={true}
                key={frameVideo}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <p className="font-semibold text-center mt-14 text-gray">
            Honaki: Star Rail
          </p>
          <div className="mt-10  hiw-text-container">
            <div className="flex flex-col justify-center flex-1">
              <p className=" hiw-text g_fadeIn">
                A17 Pro is a new class of iPhone Chip , that perform good in all
                games.
                <span className="text-white ">
                  Best graphic performance so far
                </span>{" "}
              </p>
              <p className=" hiw-text g_fadeIn">
                Games
                <span className="text-white ">
                  will look and feel so immersive
                </span>{" "}
                with incredibly details environment and character
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
