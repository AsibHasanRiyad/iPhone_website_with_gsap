import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants/index";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const [video, setVideo] = useState({
    isPlaying: false,
    videoId: 0,
    isLastVideo: false,
    isEnd: false,
    startPlay: false,
  });
  const [loadedData, setLoadedData] = useState([]);

  const { isPlaying, videoId, isLastVideo, isEnd, startPlay } = video;
  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [isPlaying, startPlay, videoId, loadedData]);
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;
    if (span[videoId]) {
      // animate
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress != currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });
      if (videoId === 0) {
        anim.restart();
      }
      const animeUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };
      if (isPlaying) {
        gsap.ticker.add(animeUpdate);
      } else {
        gsap.ticker.remove(animeUpdate);
      }
    }
  }, [videoId, startPlay, isPlaying]);
  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  const handelLoadedMetadata = (i, e) => setLoadedData((pre) => [...pre, e]);

  return (
    <>
      <div className="flex items-center mt-10 ">
        {hightlightsSlides.map((item, index) => (
          <div key={item.id} id="slider" className="pr-10 sm:pr-20">
            <div className="text-white relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
              <div className="w-full h-full overflow-hidden bg-black rounded-3xl flex-center">
                <video
                  ref={(el) => (videoRef.current[index] = el)}
                  preload="auto"
                  muted
                  id="video"
                  playsInline={true}
                  onEnded={() =>
                    index !== 3
                      ? handleProcess("video-end", index)
                      : handleProcess("video-last")
                  }
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(e) => handelLoadedMetadata(index, e)}
                >
                  <source src={item.video} />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] ">
                {item.textLists.map((item) => (
                  <p className="text-xl md:text-2xl" key={item}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-10 flex-center">
        <div className="py-5 bg-gray-300 rounded-full px-7 flex-center backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              ref={(el) => (videoDivRef.current[i] = el)}
              className="relative w-3 h-3 mx-2 bg-gray-200 rounded-full cursor-pointer"
              key={i}
            >
              <span
                ref={(el) => (videoSpanRef.current[i] = el)}
                className="absolute w-full h-full rounded-full"
              ></span>
            </span>
          ))}
        </div>
        <button className=" control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "Replay" : isPlaying ? "Pause" : "Play"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : isPlaying
                ? () => handleProcess("pause")
                : () => handleProcess("play")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
