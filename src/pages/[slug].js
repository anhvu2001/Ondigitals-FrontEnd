import React, { useEffect } from "react";
import {
  GetListSlugService,
  GetServiceDetailBySlug,
  GetListSlugPosts,
  GetPostDetailBySlug,
  getDataForNewAndInsightsSection,
  GetListSlugServiceParent,
  GetServiceParentDetailBySlug,
} from "./api/graphql";
import Head from "next/head";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import ServiceDetail from "@/components/servicedetailpage/ServiceDetail";
import BlogDetail from "@/components/blogdetailpage/BlogDetail";
import { useRouter } from "next/router";
import {
  getDataMenu,
  getTranslatedDataFooter,
} from "./api/graphqlHeaderFooter";
import replaceUrlsHead from "../../utils/replaceUrlsHead";
import {
  GetCaseStudyDetailBySlug,
  GetListSlugCaseStudy,
} from "./api/graphqlCaseStudy";
import CaseStudyDetail from "@/components/casestudydetailpage/CaseStudyDetail";
import SchemaODS from "../../utils/schema";
const parse = require("html-react-parser");

export default function DynamicDetailPage({
  serviceData,
  serviceParentsData,
  caseStudyData,
  blogData,
  relatedPosts,
  dataFooter,
  dataHeader,
}) {
  if (serviceData) {
    const dataHead = replaceUrlsHead(serviceData.serviceBy.seo.fullHead);
    return (
      <>
        <Header data={dataHeader} />
        <Head>{dataHead && parse(dataHead)}</Head>
        <SchemaODS type="serviceBy" />
        <ServiceDetail dataServiceDetail={serviceData} />
        <Footer data={dataFooter} />
      </>
    );
  }
  if (blogData) {
    const dataHead = replaceUrlsHead(blogData.postBy.seo.fullHead);
    return (
      <>
        <Head>{dataHead && parse(dataHead)}</Head>
        <Header data={dataHeader} />
        <SchemaODS type="postBy" />
        <BlogDetail postDetail={blogData} relatedPosts={relatedPosts} />
        <Footer data={dataFooter} />
      </>
    );
  }
  if (serviceParentsData) {
    const dataHead = replaceUrlsHead(
      serviceParentsData.serviceParentBy.seo.fullHead
    );
    return (
      <>
        <Header data={dataHeader} />
        <Head>{dataHead && parse(dataHead)}</Head>
        <SchemaODS type="serviceParentBy" />
        <ServiceDetail dataServiceDetail={serviceParentsData} />
        <Footer data={dataFooter} />
      </>
    );
  }
  if (caseStudyData) {
    const dataHead = replaceUrlsHead(caseStudyData.caseStudyBy.seo.fullHead);
    return (
      <>
        <Header data={dataHeader} />
        <Head>{dataHead && parse(dataHead)}</Head>
        <h1 style={{ display: "none" }}>
          {caseStudyData?.caseStudyBy?.seo?.title}
        </h1>
        <SchemaODS type="caseStudyBy" />
        <CaseStudyDetail data={caseStudyData} />
        <Footer data={dataFooter} />
      </>
    );
  }
}

export async function getStaticPaths() {
  const listServices = await GetListSlugService();
  const allPostsPaths = [];
  let hasNextPage = true;
  let after = "";
  while (hasNextPage) {
    const posts = await GetListSlugPosts(after);
    const pathsPost = posts.nodes.map((post) => ({
      params: {
        slug: post.slug,
      },
      locale: post.language.code.toLowerCase(),
    }));
    allPostsPaths.push(...pathsPost);
    hasNextPage = posts.pageInfo?.hasNextPage;
    after = hasNextPage ? posts.pageInfo?.endCursor : "";
  }

  const servicePaths = listServices.map((service) => ({
    params: {
      slug: service.slug,
    },
    locale: service.language.code.toLowerCase(),
  }));
  const listServicesParent = await GetListSlugServiceParent();
  const pathsServiceParent = listServicesParent.map((service) => ({
    params: {
      slug: service.slug,
    },
    locale: service.language.code.toLowerCase(),
  }));
  const listCaseStudy = await GetListSlugCaseStudy();
  const pathsCaseStudy = listCaseStudy.map((caseStudy) => ({
    params: {
      slug: caseStudy.slug,
    },
    locale: caseStudy.language.code.toLowerCase(),
  }));
  const paths = servicePaths
    .concat(allPostsPaths)
    .concat(pathsServiceParent)
    .concat(pathsCaseStudy);
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params, locale } = context;
  const language = locale.toUpperCase();

  // Thực hiện các cuộc gọi async song song
  const [
    serviceData,
    blogData,
    serviceParentsData,
    caseStudyData,
    dataFooter,
    dataHeader,
  ] = await Promise.all([
    GetServiceDetailBySlug(params.slug),
    GetPostDetailBySlug(params.slug, language),
    GetServiceParentDetailBySlug(params.slug),
    GetCaseStudyDetailBySlug(params.slug),
    getTranslatedDataFooter(language),
    getDataMenu(language),
  ]);
  // const notFound = true;
  if (serviceData && serviceData.serviceBy) {
    return {
      props: {
        serviceData,
        dataFooter,
        dataHeader,
      },
      revalidate: 3600,
    };
  } else if (blogData && blogData.postBy) {
    const relatedPosts = await getDataForNewAndInsightsSection(language);
    return {
      props: {
        blogData,
        relatedPosts,
        dataFooter,
        dataHeader,
      },
      revalidate: 3600,
    };
  }
  if (serviceParentsData && serviceParentsData.serviceParentBy) {
    return {
      props: {
        serviceParentsData,
        dataFooter,
        dataHeader,
      },
      revalidate: 3600,
    };
  } else if (caseStudyData && caseStudyData.caseStudyBy) {
    return {
      props: {
        caseStudyData,
        dataFooter,
        dataHeader,
      },
      revalidate: 3600,
    };
  } else {
    return {
      notFound: true,
    };
  }
}
