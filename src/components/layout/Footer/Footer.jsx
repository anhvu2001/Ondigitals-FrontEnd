import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import classes from "./Footer.module.scss";
import { Maven_Pro } from "next/font/google";
import { IconZalo, LogoFooter } from "@/components/ui/Icons/ListIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import {
  languagePathsIndustries,
  languagePathsService,
} from "../../../../utils/languageSlug";

const parse = require("html-react-parser");
const MavenPro = Maven_Pro({ subsets: ["latin", "vietnamese"] });
const iconFont = {
  facebook: faFacebook,
  instagram: faInstagram,
  linkedinIn: faLinkedinIn,
};
export default function Footer({ data }) {
  const { locale } = useRouter();
  if (!data) {
    return <div>Loading.....</div>;
  }
  const { footerods, content } = data[0];
  const { title, columExplore, columFollowUs, columService, columIndustries } =
    footerods;

  return (
    <footer className={classes["footer"]}>
      <div className="container">
        <div className={classes["footer__row"]}>
          <div className={classes["colum-1"]}>
            <div className={classes["image-logo-footer"]}>
              <Link
                onClick={() => {
                  window.location.href = "/";
                }}
                href="/"
              >
                <LogoFooter width={160} height={100} color={"#FFF"} />
              </Link>
            </div>
            <div>
              <p
                style={{ fontFamily: MavenPro.style.fontFamily }}
                className={classes["title__company__footer"]}
              >
                {title && title}
              </p>
              {content && parse(content)}
            </div>
          </div>
          <div className={classes["colum-2"]}>
            <Link
              style={{
                textDecoration: "none",
              }}
              href={languagePathsService[locale]}
            >
              <p className={classes["colum__title"]}>
                {columService?.titleServices}
              </p>
            </Link>
            <div className={classes["row__services"]}>
              {columService?.services &&
                columService.services.map((item, index) => (
                  <div
                    key={index}
                    style={{ fontFamily: MavenPro.style.fontFamily }}
                    className={classes["row__services__detail"]}
                  >
                    <Link
                      href={item?.linkservice || "/"}
                      className={classes["row__services__detail__title"]}
                    >
                      {item?.title}
                    </Link>
                    {item.listServices && parse(item.listServices)}
                  </div>
                ))}
            </div>
          </div>
          <div className={classes["colum-3"]}>
            <div>
              <Link
                style={{
                  textDecoration: "none",
                }}
                href={languagePathsIndustries[locale]}
              >
                <p className={classes["colum__title"]}>
                  {columIndustries?.titleIndustries}
                </p>
              </Link>
              {columIndustries.listIndustries &&
                parse(columIndustries.listIndustries)}
            </div>
          </div>
          <div className={classes["colum-4"]}>
            <div>
              <p className={classes["colum__title"]}>{columExplore?.title}</p>
              {columExplore.listExplore && parse(columExplore.listExplore)}
            </div>
            <p className={classes["colum-title-media"]}>
              {columFollowUs?.title}
            </p>
            <div className={classes["icon__homepage--social"]}>
              {columFollowUs.listIcon &&
                columFollowUs.listIcon.map((item, index) => (
                  <Link href={item.linkIcon} key={index}>
                    <FontAwesomeIcon
                      icon={iconFont[item?.nameIconFortawesome]}
                    />
                  </Link>
                ))}
              <Link href={columFollowUs?.linkZalo}>
                <IconZalo width={52} height={18} color={"#FFF"} />
              </Link>
            </div>
            <div style={{ marginTop: "10px" }}>
              {/* {columFollowUs?.inputDmca && parse(columFollowUs.inputDmca)} */}
              <Link
                href="https://www.dmca.com/Protection/Status.aspx?ID=6950ddd2-dee7-4269-bb55-98e4f776a325&refurl=https://ondigitals.com/"
                title="DMCA.com Protection Status"
                className="dmca-badge"
                target="_blank"
                rel="nofollow"
              >
                <Image
                  src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=244fa5c9-fa77-485b-9407-b294e1446b88"
                  alt="DMCA.com Protection Status"
                  width={122}
                  height={25}
                />
              </Link>
              <Script
                strategy="lazyOnload"
                src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classes["btn-contact"]}>
        <Link href={`/${locale}/contact`}>Contact Us</Link>
      </div>
    </footer>
  );
}
