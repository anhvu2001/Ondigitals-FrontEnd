import { useEffect, useRef, useState } from "react";
import classes from "./SelectOptionLanguages.module.scss";
import {
  IconFlagChina,
  IconFlagEnglish,
  IconFlagJapan,
  IconFlagKorea,
  IconFlagVietnam,
  IconLanguages,
} from "../Icons/ListIcon";
import { useRouter } from "next/router";
import Link from "next/link";
import { localeLang } from "../../../../utils/languageSlug";

const SelectOptionLanguage = ({ isDark, color }) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const optionsRef = useRef(null);
  const { locales, locale: activeLocale } = useRouter();
  const otherLocales = locales.filter((locale) => locale !== activeLocale);

  const iconByLocale = {
    vi: IconFlagVietnam,
    en: IconFlagEnglish,
    zh: IconFlagChina,
    kr: IconFlagKorea,
    jp: IconFlagJapan,
  };

  const getFlagIcon = (locale) => {
    return iconByLocale[locale] || iconByLocale["en"];
  };
  if (!localeLang) {
    return <div>No data...</div>;
  }

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setDropdownIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={classes.select}>
      <div
        className={classes["select-wrapper"]}
        ref={optionsRef}
        onClick={() => {
          setDropdownIsOpen(true);
        }}
      >
        <div
          style={{ borderWidth: "1px", borderColor: color ? color : "black" }}
          className={classes["select-name"]}
        >
          <IconLanguages
            width={24}
            height={24}
            color={isMobile ? "white" : isDark ? "black" : "white"}
          />

          <div
            className={classes["select-name__content"]}
            style={{ color: isDark ? "black" : "white" }}
          >
            <span>{localeLang[activeLocale]}</span>
          </div>
        </div>
        <ul
          onMouseEnter={() => {
            setDropdownIsOpen(true);
          }}
          onMouseLeave={() => {
            setDropdownIsOpen(false);
          }}
          style={{ color: "black" }}
          className={`${classes["select-list"]} ${
            dropdownIsOpen ? classes.show : ""
          }`}
        >
          {otherLocales.map((locale, localeIndex) => {
            const FlagIcon = getFlagIcon(locale);
            const router = useRouter();
            const changeLanguage = (locale) => {
              router.push(router.pathname, router.asPath, { locale });
            };
            return (
              <li key={localeIndex} className={classes["select-list-item"]}>
                <a onClick={() => changeLanguage(locale)} locale={locale}>
                  {FlagIcon && <FlagIcon width={24} height={24} />}
                  <p>{localeLang[locale]}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SelectOptionLanguage;
