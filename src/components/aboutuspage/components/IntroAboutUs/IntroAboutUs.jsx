import { useEffect, useState } from "react";
import classes from "./IntroAboutUs.module.scss";
import backgroundImg from "../../../../../public/assets/images/backgrounds/about-us-bg.png";
import Image from "next/image";
import { Maven_Pro } from "next/font/google";

const MavenPro = Maven_Pro({ subsets: ["latin", "vietnamese"] });

const IntroAboutUs = () => {
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });

  useEffect(() => {
    //Xác định tọa độ y điểm trên cùng của section và tọa độ điểm
    //y cuối cùng của section để đảm bảo backdrop không chạy ra ngoài
    const handleMouseMove = (event) => {
      const xPoint = event.clientX;
      const yPoint = event.clientY;

      setMousePosition({ x: xPoint, y: yPoint });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={classes["about-us"]}>
      <div className={`${classes.intro} intro`}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${backgroundImg.src}`,
            backgroundSize: "cover",
            mixBlendMode: "hard-light",
            opacity: "0.2",
          }}
        ></div>
        <div
          className={classes["cursor-backdrop"]}
          style={{
            left: mousePosition.x + "px",
            top: mousePosition.y + "px",
          }}
        ></div>
      </div>
      <div className={classes["about-us-content-wrapper"]}>
        <div className="container">
          <p className={classes["about-us-top-heading"]}>We Are</p>
          <div className={classes["about-us-company-logo"]}>
            <Image
              fill
              src="/assets/images/ui/ondigitals.png"
              alt="brand_name"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <p
            className={classes["about-us-bottom-heading"]}
            style={{ fontFamily: MavenPro.style.fontFamily }}
          >
            Digital Marketing Agency based in Vietnam
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroAboutUs;