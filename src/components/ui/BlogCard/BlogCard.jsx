import React, { useEffect } from "react";
import classes from "./BlogCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Maven_Pro } from "next/font/google";
import Tag from "../Tag/Tag";
import DateAndViews from "../DateAndViews/DateAndViews";
import { useRouter } from "next/router";
import cheerio from "cheerio";

const parse = require("html-react-parser");
const MavenPro = Maven_Pro({ subsets: ["latin", "vietnamese"] });

const BlogCard = ({ data }) => {
  let firstImageSrc =""
  if (data) {
    // Kiểm tra xem item.content có tồn tại và có giá trị không
    const htmlContent = (data.content ?? "").toString();

    // Sử dụng cheerio để phân tích HTML
    const $ = cheerio.load(htmlContent);

    // Lấy đường dẫn của ảnh đầu tiên
    firstImageSrc = $("img").attr("src");
  }
  const post = data;
  const { locale } = useRouter();
  const isoDate = post.date;
  const tagCategory = data?.categories?.nodes;
  const idPost = post?.postId;
  const viewPost = (idPost % 41) + 10;
  const containerClasses = `${classes["blog-card"]} ${classes["blog-card-blog-page"]}`;
  //remove more link đọc thêm bài viết từ api
    useEffect(() => {
    const element = document.querySelector('a.more-link');
    if (element) {
      element.remove();
    }
  }, []);
  return (
    <>
      <div className={classes["blog-card-container"]}>
        <div className={containerClasses}>
          <div className={classes["blog-card__image"]}>
            <Link href={`${post.slug}`} locale={locale}>
              {post?.featuredImage ? (
                <Image
                  src={post.featuredImage?.node.sourceUrl}
                  fill
                  alt={post.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
              ) : (
                <Image
                  src={firstImageSrc}
                  fill
                  alt={post.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
              )}
            </Link>
          </div>
          <div className={classes["blog-card__content"]}>
            <Link
              href={`${post.slug}`}
              locale={locale}
              className={classes["blog-card__content--title-post"]}
            >
              {post.title}
            </Link>
            <div
              style={{ fontFamily: MavenPro.style.fontFamily }}
              className={classes["blog-card__content--text"]}
            >
                {post?.excerpt && parse(post.excerpt)}
            </div>
            <DateAndViews createDate={isoDate} views={viewPost} />
            <div className={classes["blog-card__content__tag"]}>
              {tagCategory &&
                tagCategory.map((item, index) => (
                  <Tag
                    key={index}
                    name={item.name}
                    href={item.slug}
                    backgroundColor={item.description}
                  />
                ))}
            </div>
            {/* <Link
              className={classes["blog-card__button"]}
              style={{ marginTop: "10px" }}
              href={`${basePath}/${post.slug}`}
              locale={locale}
            >
              <span>
                {textReadFull}
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
