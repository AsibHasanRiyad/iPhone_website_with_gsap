import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import watchImg from "../../public/assets/images/watch.svg";
import eventImg from "../../public/assets/images/right.svg";
import VideoCarousel from "./VideoCarousel";
import { ScrollTrigger } from "gsap/all";

const Highlights = () => {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    gsap.to("#title", {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: "#title",
        toggleActions: "play none none reverse",
      },
    });
    gsap.to(".link", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.25,
      scrollTrigger: {
        trigger: ".link",
        toggleActions: "play none none reverse",
      },
    });
  }, []);
  return (
    <section
      id="highlights"
      className="w-screen h-full overflow-hidden common-padding bg-zinc "
    >
      <div className=" screen-max-width">
        <div className="flex justify-between md:items-end">
          <h1 id="title" className=" section-heading">
            Get the highlights
          </h1>
          <div className="flex flex-wrap items-end justify-end gap-0 md:gap-5">
            <p className=" link">
              Watch the video
              <img className="ml-2 " src={watchImg} alt="" />
            </p>
            <p className=" link">
              Watch the events
              <img className="ml-2 " src={eventImg} alt="" />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
