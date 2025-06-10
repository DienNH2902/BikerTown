import React, { useRef } from "react";
import "./Slider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const images = [
  {
    url: "https://a-static.besthdwallpaper.com/aespa-all-members-in-drama-album-the-scene-vers-shoot-wallpaper-3440x1440-123363_15.jpg",
    name: "Adventure Awaits",
    description:
      "Take the scenic route. Explore the city or the countryside, one pedal at a time.",
  },
  {
    url: "https://rare-gallery.com/mocahbig/5427427-aespa-kpop-better-things-karina-winter-ningning.jpg",
    name: "BikerTown",
    description:
      "Discover the freedom of two wheels with BikeTown — where every ride is an adventure waiting to happen.",
  },
  {
    url: "https://rare-gallery.com/mocahbig/5427428-aespa-kpop-better-things-winter-ningning-karina.jpg",
    name: "Ride More",
    description:
      "Experience the road like never before. Fast, smooth, and eco-friendly transportation at your fingertips.",
  },
  {
    url: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/7/27/1073590/Fyvqmlpuiaa1ii3-01.jfif",
    name: "Urban Escape",
    description:
      "Escape the hustle. Find serenity and speed on two wheels wherever you go.",
  },
  {
    url: "https://wallpapercat.com/w/full/7/0/8/1005382-3840x2160-desktop-4k-aespa-k-pop-wallpaper.jpg",
    name: "Eco Friendly",
    description: "Go green. Go clean. Make an impact while riding in style.",
  },
  {
    url: "https://wallpaperswide.com/download/aespa_hot_mess-wallpaper-3840x2160.jpg",
    name: "Ride with Style",
    description:
      "Unleash your inner rebel with bikes that match your attitude.",
  },
];

const Slider = () => {
  const slideRef = useRef(null);
  const navigate = useNavigate();

  const handleNext = () => {
    const list = slideRef.current.querySelectorAll(".item");
    slideRef.current.appendChild(list[0]);
  };

  const handlePrev = () => {
    const list = slideRef.current.querySelectorAll(".item");
    slideRef.current.prepend(list[list.length - 1]);
  };

  return (
    <div className="container">
      <div id="slide" ref={slideRef}>
        {images.map((img, index) => (
          <div
            className="item"
            key={index}
            style={{ backgroundImage: `url(${img.url})` }}
          >
            <div className="content">
              <div className="name">{img.name}</div>
              <div className="des">{img.description}</div>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/register")}>Register</button>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button id="prev" onClick={handlePrev}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button id="next" onClick={handleNext}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default Slider;
