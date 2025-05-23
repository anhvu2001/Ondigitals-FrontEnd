import { request, gql } from "graphql-request";
import { endPointApi } from "./endpoint";

export const getDataForNewAndInsightsSection = async (language) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetPosts($language: LanguageCodeFilterEnum!) {
      posts(where: { language: $language }, first: 9) {
        nodes {
          id
          title
          date
          slug
          postId
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
          link
          categories {
            nodes {
              slug
              name
              description
              categoryId
            }
          }
        }
      }
    }
  `;
  const variables = { language };
  try {
    const data = await request(endpoint, query, variables);
    return data.posts.nodes;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

export const getDataPageBlog = async (language, first, before, after, last) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetPosts(
      $language: LanguageCodeFilterEnum!
      $after: String
      $before: String
      $first: Int
      $last: Int
    ) {
      posts(
        where: { language: $language }
        first: $first
        before: $before
        after: $after
        last: $last
      ) {
        nodes {
          id
          title
          date
          slug
          content
          excerpt
          postId
          featuredImage {
            node {
              sourceUrl
            }
          }
          link
          categories(where: { exclude: [1, 249, 215, 254, 7] }) {
            nodes {
              slug
              name
              description
              categoryId
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  `;
  const variables = { language, first, before, after, last };
  try {
    const data = await request(endpoint, query, variables);
    return data.posts;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

export const SearchPostsByKey = async (key, language) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetPosts($key: String!, $language: LanguageCodeFilterEnum!) {
      posts(where: { search: $key, language: $language }) {
        nodes {
          id
          title
          date
          excerpt
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
          link
        }
      }
    }
  `;
  const variables = { key, language };
  try {
    const data = await request(endpoint, query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return (data = await request(endpoint, query, variables));
  }
};

export const GetPostDetailBySlug = async (slug, language) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetPostDetailBySlug(
      $slug: String!
      $language: LanguageCodeFilterEnum!
    ) {
      postBy(slug: $slug) {
        addHeadPage {
          addContentHead
        }
        seo {
          fullHead
        }
        id
        title
        date
        postId
        slug
        excerpt
        content
        language {
          slug
        }
        translations {
          language {
            slug
            code
            locale
            name
          }
          uri
          slug
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        link
        categories {
          nodes {
            slug
            name
            description
            categoryId
          }
        }
      }
      allBlogsContent(where: { language: $language }) {
        nodes {
          textBlogandBlogDetail {
            titleTableOfContent
            titleNewestPosts
            textButtonBackToList
            titleShareThisPost
            breadcrumHome
            breadcrumPage
            breadcrumTitleBlogDetail
            textButton
            textReadMore
          }
        }
      }
    }
  `;
  const variables = { slug, language };
  try {
    const data = await request(endpoint, query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

export const GetListSlugPosts = async (after) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetListSlugPosts($after: String) {
      posts(
        where: { orderby: { field: DATE, order: DESC } }
        first: 100
        after: $after
      ) {
        nodes {
          slug
          postId
          language {
            locale
            code
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `;
  const variables = { after };
  try {
    const data = await request(endpoint, query, variables);
    return data.posts;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};
export const GetDataHomepage = async (id, languageCode) => {
  const endpoint = endPointApi;
  const query = gql`
    query getDataHomePage($id: Int!, $languageCode: LanguageCodeFilterEnum!) {
      pages(where: { id: $id }) {
        nodes {
          addHeadPage {
            addContentHead
          }
          slug
          pageId
          language {
            slug
            code
            name
          }
          seo {
            fullHead
          }
          homePageInputContent {
            caseStudySessionButtonText
            caseStudySessionTitle
            listTextCarousel {
              color
              textContent
            }
            introSectionLeftImage {
              altText
              sourceUrl
            }
            introSectionRightImage {
              altText
              sourceUrl
            }
            partnerSectionListImage {
              altText
              sourceUrl
            }
            introSectionTextDescription
            introSectionTextHello
            introSectionTextScrollDown1
            introSectionTextScrollDown2
            newSectionTextButton
            newSectionTextReadFull
            newSectionTitle
            newSectionTextDesc
            partnerSectionDesc
            partnerSectionGroupNumberClient {
              fieldGroupName
              number1
              number2
              number3
              text1
              text2
              text3
            }
            partnerSectionTitle
            partnerSectionTitleImage
            serviceSectionDesc
            serviceSectionTextButton
            serviceSectionTextButtonCard
            serviceSectionTitle
            partnerSectionTextButton
            contactFormDecs
            contactFormTextButton
            contactFormTextRequiredField
            contactFormTitle
            contentNoteError
            contentNoteSuccess
            textEmailContact
            linkPrivacyPolicy {
              url
              title
            }
            contentLabelForm {
              textLable
              textPlaceholder
            }
            imageSectionContact {
              altText
              sourceUrl
            }
          }
          translations {
            language {
              slug
              code
              name
            }
            pageId
          }
        }
      }
      serviceParents(
        where: { orderby: { order: ASC, field: DATE }, language: $languageCode }
      ) {
        nodes {
          slug
          title
          excerpt
          serviceHomepage {
            color
            secondaryColor
            name
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
      allCaseStudy(
        where: {
          orderby: { field: DATE, order: DESC }
          language: $languageCode
        }
        first: 3
      ) {
        nodes {
          case_studyId
          title
          slug
          content
          caseStudyHomepage {
            caseStudyTextButton
            caseStudyTextButtonItem
            logoImage {
              altText
              sourceUrl
            }
            backgroundColor
          }
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const variables = { id, languageCode };
  try {
    const data = await request(endpoint, query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

export const GetListSlugService = async () => {
  const endpoint = endPointApi;
  const query = gql`
    query GetListSlugService {
      services(first: 100) {
        nodes {
          slug
          serviceId
          language {
            locale
            code
          }
        }
      }
    }
  `;
  try {
    const data = await request(endpoint, query);
    return data.services.nodes;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

export const GetServiceDetailBySlug = async (slug, language) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetServiceDetailBySlug(
      $slug: String!
      $language: LanguageCodeFilterEnum!
    ) {
      serviceBy(slug: $slug) {
        addHeadPage {
          addContentHead
        }
        content
        title
        cta {
          title
          textButton
          content
          buttonColor
          backgroundColor
          textColor
        }
        seo {
          fullHead
        }
        translations {
          language {
            slug
            code
            locale
            name
          }
          uri
          slug
        }
        language {
          slug
        }
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        serviceHomepage {
          color
          name
          secondaryColor
          titleBelowTextHeadingPageServiceDetail
          titleHeadingSectionFaq
          sectionWho {
            backgroundColor
            color
            projectCardShort {
              listImageLogo {
                altText
                sourceUrl
              }
              mainImage {
                altText
                sourceUrl
              }
              textContent
              urlCard
            }
            textLeftHead
            textRightHead
          }
          sectionWhat {
            backgroundColor
            contentLeft
            contentRight
            textTitle
            mainImage {
              altText
              sourceUrl
            }
          }
          sectionWhy {
            backgroundColor
            color
            listCardWhy {
              cardContent
              cardTitle
              mainImage {
                altText
                sourceUrl
              }
            }
            textLeftHead
            textRightHead
          }
          sectionHow {
            cardStep {
              cardContent
              cardTitle
              titleStep
              iconCardStep
            }
            contentListSteps
            contentPlatform {
              contentTitle
              iconImage {
                altText
                sourceUrl
              }
              platformGlobal {
                content
                listIconImage {
                  altText
                  sourceUrl
                }
                name
              }
              platformVietnam {
                content
                fieldGroupName
                listSocialMedia {
                  sourceUrl
                  altText
                }
                name
              }
              textFooterPlatform
              title
            }
            textLeftHead
            textRightHead
            titleListSteps
            imageIcon {
              altText
              sourceUrl
            }
          }
          sectionWhich {
            backgroundColor
            textHeadingRight
            textHeadingLeft
            uselayout3card
            widthCard
            layoutContentSectionWhich {
              ... on Service_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutCard {
                textContent
                title
                urlCard
                imageCard {
                  altText
                  sourceUrl
                }
              }
              ... on Service_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutVideo {
                content
                title
                urlVideo
                videoDescription
                mainImageUpload {
                  altText
                  sourceUrl
                }
              }
              ... on Service_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutCardHasTitle {
                title
                backgroundCardColor
                uselayout3cards
                card {
                  title
                  textContent
                  urlCard
                  imageCard {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
          sectionContentDetail {
            ... on Service_Servicehomepage_SectionContentDetail_ContentNoImage {
              content
              title
            }
            ... on Service_Servicehomepage_SectionContentDetail_ContentWithImage {
              content
              image {
                altText
                sourceUrl
              }
              title
            }
          }
          layoutContentServiceDetail {
            ... on Service_Servicehomepage_LayoutContentServiceDetail_SectionIntro {
              backgroundColor
              color
              textLeft
              textRight
              textHeadTitle
              textTitle
              backgroundColorImage
              selectPositionImage
              imageSectionIntro {
                altText
                sourceUrl
              }
            }
          }
        }
      }
      serviceParents(
        where: { language: $language, orderby: { field: DATE, order: ASC } }
      ) {
        nodes {
          serviceHomepage {
            name
            secondaryColor
          }
          slug
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  `;
  const variables = { slug, language };
  try {
    const data = await request(endpoint, query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
export const GetPageService = async (id, languageCode) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetPageService($id: Int!, $languageCode: LanguageCodeFilterEnum!) {
      pageBy(pageId: $id) {
        addHeadPage {
          addContentHead
        }
        title
        content
        seo {
          fullHead
          title
        }
        cta {
          title
          textButton
          content
          buttonColor
          backgroundColor
          textColor
        }
        translations {
          language {
            slug
            code
            locale
            name
          }
          uri
          pageId
        }
        pageService {
          textScroll1
          textScroll2
          titleSectionIntro
          titleSectionListService
          sectionCaseStudy {
            textBelowButton
            textButton
            title
          }
          sectionListServices {
            textButtonLink
            title
          }
        }
      }
      serviceParents(
        where: { language: $languageCode, orderby: { field: DATE, order: ASC } }
      ) {
        nodes {
          excerpt
          title
          slug
          id
          serviceHomepage {
            color
            secondaryColor
            titleBelowTextHeadingPageServiceDetail
          }
          categories {
            nodes {
              categoryId
            }
          }
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  `;
  const variables = { id, languageCode };
  try {
    const data = await request(endpoint, query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
export const GetPageAboutUs = async (id, languageCode) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetPageAboutUs($id: Int!, $languageCode: LanguageCodeFilterEnum!) {
      pageBy(pageId: $id) {
        seo {
          fullHead
        }
        cta {
          title
          textButton
          content
          buttonColor
          backgroundColor
          textColor
        }
        pageAboutUs {
          backgroundImage {
            altText
            sourceUrl
          }
          imageLogo {
            altText
            sourceUrl
          }
          textDescription
          textHeading
          sectionBestDigitalmarketing {
            ... on Page_Pageaboutus_SectionBestDigitalmarketing_ContentSectionBestDigitalmarketing {
              titleSection
              textFooterSection
              listItem {
                imageIcon {
                  altText
                  sourceUrl
                }
                textContent
                titleItem
              }
            }
          }
          sectionIntroducingOndigitals {
            ... on Page_Pageaboutus_SectionIntroducingOndigitals_IntroducingOndigitals {
              textContent
              imageRight {
                altText
                sourceUrl
              }
              titleSection
            }
          }
          sectionOurTrustedPartner {
            ... on Page_Pageaboutus_SectionOurTrustedPartner_ContentOurTrustedPartner {
              titleSection
              metricList {
                number
                textContent
              }
              listImagePartners {
                altText
                sourceUrl
              }
            }
          }
          sectionStepDigitalMarketing {
            ... on Page_Pageaboutus_SectionStepDigitalMarketing_ContentStepDigitalMarketing {
              titleSection
              listSteps {
                stepsContent
                stepsNumber
                titleSteps
              }
            }
          }
          sectionExploreTheExperience {
            titleSection
            buttonLink {
              url
              title
            }
          }
        }
        translations {
          language {
            slug
            code
            locale
          }
          uri
          pageId
        }
      }
      allCardReviews(
        first: 9
        where: { orderby: { field: DATE, order: ASC }, language: $languageCode }
      ) {
        nodes {
          card_reviewId
          cardReview {
            contentCardReview {
              ... on Card_review_Cardreview_ContentCardReview_CardFront {
                contentProjectSummary
                contentReview
                titleService
                titleProjectSummary
                titleProjectInfo
                position
                name
                fieldGroupName
                detailProjectInfo {
                  numberTypeIcon
                  textContent
                }
                avatar {
                  altText
                  sourceUrl
                }
              }
              ... on Card_review_Cardreview_ContentCardReview_CardBack {
                feedbackContent
                feedbackTitle
                linkReadFull {
                  title
                  url
                }
                numberStart
                ratingDetails {
                  pointRating
                  textRating
                }
                textPointRating
              }
            }
          }
        }
      }
    }
  `;
  const variables = { id, languageCode };
  try {
    const data = await request(endpoint, query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
export const GetSeoAndContentBlogPage = async (id) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetSeoBlogPage($id: Int!) {
      pageBy(pageId: $id) {
        addHeadPage {
          addContentHead
        }
        seo {
          fullHead
          title
        }
        pageBlog {
          textDescription
          title
          textSortBy
          textFilterCategory
        }
        translations {
          pageId
          language {
            code
            name
          }
        }
      }
    }
  `;
  const variables = { id };
  try {
    const data = await request(endpoint, query, variables);
    return data.pageBy;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};
export const GetDataPageContact = async (id) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetDataPageContact($id: Int!) {
      pageBy(pageId: $id) {
        addHeadPage {
          addContentHead
        }
        seo {
          fullHead
        }
        pageContact {
          contactForm {
            contentForm {
              textLable
              textPlaceholder
            }
          }
          sectionMap {
            title
            contentInfo {
              textContent
              title
            }
          }
          sectionInstagram {
            titleLeft
            textRight
            textButton
            accessTokenIntagram
          }
          textButton
          textButtonSending
          textColumLeft
          title
          titleColumLeft
          contentNoteError
          contentNoteSuccess
          contentPrivacyPolicy
        }
        translations {
          language {
            slug
            code
            locale
          }
          uri
          pageId
        }
      }
    }
  `;
  const variables = { id };
  try {
    const data = await request(endpoint, query, variables);
    return data.pageBy;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};
export const GetListSlugServiceParent = async () => {
  const endpoint = endPointApi;
  const query = gql`
    query GetListSlugServiceParent {
      serviceParents(first: 100) {
        nodes {
          slug
          service_parentId
          language {
            locale
            code
          }
        }
      }
    }
  `;
  try {
    const data = await request(endpoint, query);
    return data.serviceParents.nodes;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};
export const GetServiceParentDetailBySlug = async (slug, language) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetServiceParentDetailBySlug(
      $slug: String!
      $language: LanguageCodeFilterEnum!
    ) {
      serviceParentBy(slug: $slug) {
        addHeadPage {
          addContentHead
        }
        content
        title
        cta {
          title
          textButton
          content
          buttonColor
          backgroundColor
          textColor
        }
        seo {
          fullHead
        }
        translations {
          language {
            slug
            code
            locale
            name
          }
          uri
          slug
        }
        language {
          slug
        }
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        serviceHomepage {
          color
          name
          secondaryColor
          titleBelowTextHeadingPageServiceDetail
          titleHeadingSectionFaq
          sectionWho {
            backgroundColor
            color
            projectCardShort {
              listImageLogo {
                altText
                sourceUrl
              }
              mainImage {
                altText
                sourceUrl
              }
              textContent
              urlCard
            }
            textLeftHead
            textRightHead
          }
          sectionWhat {
            backgroundColor
            contentLeft
            contentRight
            textTitle
            mainImage {
              altText
              sourceUrl
            }
          }
          sectionWhy {
            backgroundColor
            color
            listCardWhy {
              cardContent
              cardTitle
              mainImage {
                altText
                sourceUrl
              }
            }
            textLeftHead
            textRightHead
          }
          sectionHow {
            cardStep {
              cardContent
              cardTitle
              titleStep
              iconCardStep
            }
            contentListSteps
            contentPlatform {
              contentTitle
              iconImage {
                altText
                sourceUrl
              }
              platformGlobal {
                content
                listIconImage {
                  altText
                  sourceUrl
                }
                name
              }
              platformVietnam {
                content
                fieldGroupName
                listSocialMedia {
                  sourceUrl
                  altText
                }
                name
              }
              textFooterPlatform
              title
            }
            textLeftHead
            textRightHead
            titleListSteps
            imageIcon {
              altText
              sourceUrl
            }
          }
          sectionWhich {
            uselayout3card
            widthCard
            backgroundColor
            textHeadingRight
            textHeadingLeft
            layoutContentSectionWhich {
              ... on Service_parent_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutCard {
                textContent
                title
                urlCard
                imageCard {
                  altText
                  sourceUrl
                }
              }
              ... on Service_parent_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutVideo {
                content
                title
                urlVideo
                videoDescription
                mainImageUpload {
                  altText
                  sourceUrl
                }
              }
              ... on Service_parent_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutCardHasTitle {
                title
                backgroundCardColor
                uselayout3cards
                card {
                  title
                  textContent
                  urlCard
                  imageCard {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
          sectionContentDetail {
            ... on Service_parent_Servicehomepage_SectionContentDetail_ContentNoImage {
              content
              title
            }
            ... on Service_parent_Servicehomepage_SectionContentDetail_ContentWithImage {
              content
              image {
                altText
                sourceUrl
              }
              title
            }
          }
          layoutContentServiceDetail {
            ... on Service_parent_Servicehomepage_LayoutContentServiceDetail_SectionIntro {
              backgroundColor
              color
              textLeft
              textRight
              textHeadTitle
              textTitle
              backgroundColorImage
              selectPositionImage
              imageSectionIntro {
                altText
                sourceUrl
              }
            }
          }
        }
      }
      serviceParents(
        where: { language: $language, orderby: { field: DATE, order: ASC } }
      ) {
        nodes {
          serviceHomepage {
            name
            secondaryColor
          }
          slug
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  `;
  const variables = { slug, language };
  try {
    const data = await request(endpoint, query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
export const getDataPolicyAndCoEPage = async (id) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetSeoBlogPage($id: Int!) {
      pageBy(pageId: $id) {
        addHeadPage {
          addContentHead
        }
        content
        title
        cta {
          title
          textButton
          content
          buttonColor
          backgroundColor
          textColor
        }
        seo {
          fullHead
        }
        translations {
          language {
            slug
            code
            locale
          }
          slug
          uri
          pageId
        }
        language {
          slug
        }
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        serviceHomepage {
          color
          name
          secondaryColor
          titleBelowTextHeadingPageServiceDetail
          titleHeadingSectionFaq
          sectionWho {
            backgroundColor
            color
            projectCardShort {
              listImageLogo {
                altText
                sourceUrl
              }
              mainImage {
                altText
                sourceUrl
              }
              textContent
              urlCard
            }
            textLeftHead
            textRightHead
          }
          sectionWhat {
            backgroundColor
            contentLeft
            contentRight
            textTitle
            mainImage {
              altText
              sourceUrl
            }
          }
          sectionWhy {
            backgroundColor
            color
            listCardWhy {
              cardContent
              cardTitle
              mainImage {
                altText
                sourceUrl
              }
            }
            textLeftHead
            textRightHead
          }
          sectionHow {
            cardStep {
              cardContent
              cardTitle
              titleStep
              iconCardStep
            }
            contentListSteps
            contentPlatform {
              contentTitle
              iconImage {
                altText
                sourceUrl
              }
              platformGlobal {
                content
                listIconImage {
                  altText
                  sourceUrl
                }
                name
              }
              platformVietnam {
                content
                fieldGroupName
                listSocialMedia {
                  sourceUrl
                  altText
                }
                name
              }
              textFooterPlatform
              title
            }
            textLeftHead
            textRightHead
            titleListSteps
            imageIcon {
              altText
              sourceUrl
            }
          }
          sectionWhich {
            backgroundColor
            textHeadingRight
            textHeadingLeft
            uselayout3card
            widthCard
            layoutContentSectionWhich {
              ... on Page_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutCard {
                textContent
                title
                urlCard
                imageCard {
                  altText
                  sourceUrl
                }
              }
              ... on Page_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutVideo {
                content
                title
                urlVideo
                videoDescription
                mainImageUpload {
                  altText
                  sourceUrl
                }
              }
              ... on Page_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutCardHasTitle {
                title
                backgroundCardColor
                uselayout3cards
                card {
                  title
                  textContent
                  urlCard
                  imageCard {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
          sectionContentDetail {
            ... on Page_Servicehomepage_SectionContentDetail_ContentNoImage {
              content
              title
            }
            ... on Page_Servicehomepage_SectionContentDetail_ContentWithImage {
              content
              image {
                altText
                sourceUrl
              }
              title
            }
          }
          layoutContentServiceDetail {
            ... on Page_Servicehomepage_LayoutContentServiceDetail_SectionIntro {
              backgroundColor
              color
              textLeft
              textRight
              textHeadTitle
              textTitle
              backgroundColorImage
              imageSectionIntro {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;
  const variables = { id };
  try {
    const data = await request(endpoint, query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};
export const GetDataSchema = async (type, slug) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetDataSchema($slug: String!) {
      ${type}(uri: $slug) {
        seo {
          title
          description
          focusKeywords
        }
      }
    }
  `;
  const variables = { slug };
  try {
    const data = await request(endpoint, query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
export const GetPageIndustries = async (id, languageCode) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetPageIndustries($id: Int!, $languageCode: LanguageCodeFilterEnum!) {
      pageBy(pageId: $id) {
        addHeadPage {
          addContentHead
        }
        content
        seo {
          fullHead
          title
        }
        cta {
          backgroundColor
          buttonColor
          content
          title
          textButton
          textColor
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        translations {
          language {
            slug
            code
            locale
            name
          }
          uri
          pageId
        }
        pageIndustries {
          sectionContent {
            titleLeft
            titleRight
            textButtonCard
          }
          sectionhero {
            backgroundColor
            textColor
            textScroll1
            textScroll2
            title
          }
          sectionintro {
            backgroundcolor
            backgroundcolorimage
            textColor
            heading
            title
            imageItem {
              altText
              sourceUrl
            }
            textLeft
            textRight
          }
        }
      }
      industries(
        where: { language: $languageCode, orderby: { field: DATE, order: ASC } }
      ) {
        nodes {
          serviceHomepage {
            name
            color
          }
          excerpt
          slug
          id
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;
  const variables = { id, languageCode };
  try {
    const data = await request(endpoint, query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
export const GetIndustryDetailBySlug = async (slug) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetIndustryDetailBySlug($slug: String!) {
      industryBy(slug: $slug) {
        addHeadPage {
          addContentHead
        }
        content
        title
        cta {
          title
          textButton
          content
          buttonColor
          backgroundColor
          textColor
        }
        seo {
          fullHead
        }
        translations {
          language {
            slug
            code
            locale
            name
          }
          uri
          slug
        }
        language {
          slug
        }
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        serviceHomepage {
          color
          name
          secondaryColor
          titleBelowTextHeadingPageServiceDetail
          titleHeadingSectionFaq
          sectionWho {
            backgroundColor
            color
            projectCardShort {
              listImageLogo {
                altText
                sourceUrl
              }
              mainImage {
                altText
                sourceUrl
              }
              textContent
              urlCard
            }
            textLeftHead
            textRightHead
          }
          sectionWhat {
            backgroundColor
            contentLeft
            contentRight
            textTitle
            mainImage {
              altText
              sourceUrl
            }
          }
          sectionWhy {
            backgroundColor
            color
            listCardWhy {
              cardContent
              cardTitle
              mainImage {
                altText
                sourceUrl
              }
            }
            textLeftHead
            textRightHead
          }
          sectionHow {
            cardStep {
              cardContent
              cardTitle
              titleStep
              iconCardStep
            }
            contentListSteps
            contentPlatform {
              contentTitle
              iconImage {
                altText
                sourceUrl
              }
              platformGlobal {
                content
                listIconImage {
                  altText
                  sourceUrl
                }
                name
              }
              platformVietnam {
                content
                fieldGroupName
                listSocialMedia {
                  sourceUrl
                  altText
                }
                name
              }
              textFooterPlatform
              title
            }
            textLeftHead
            textRightHead
            titleListSteps
            imageIcon {
              altText
              sourceUrl
            }
          }
          sectionWhich {
            backgroundColor
            textHeadingRight
            textHeadingLeft
            uselayout3card
            widthCard
            layoutContentSectionWhich {
              ... on Industry_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutCard {
                textContent
                title
                urlCard
                imageCard {
                  altText
                  sourceUrl
                }
              }
              ... on Industry_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutVideo {
                content
                title
                urlVideo
                videoDescription
                mainImageUpload {
                  altText
                  sourceUrl
                }
              }
              ... on Industry_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutCardHasTitle {
                title
                backgroundCardColor
                uselayout3cards
                card {
                  title
                  textContent
                  urlCard
                  imageCard {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
          sectionContentDetail {
            ... on Industry_Servicehomepage_SectionContentDetail_ContentNoImage {
              content
              title
            }
            ... on Industry_Servicehomepage_SectionContentDetail_ContentWithImage {
              content
              image {
                altText
                sourceUrl
              }
              title
            }
          }
          layoutContentServiceDetail {
            ... on Industry_Servicehomepage_LayoutContentServiceDetail_SectionIntro {
              backgroundColor
              color
              textLeft
              textRight
              textHeadTitle
              textTitle
              backgroundColorImage
              selectPositionImage
              imageSectionIntro {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;
  const variables = { slug };
  try {
    const data = await request(endpoint, query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

export const GetListSlugIndustry = async () => {
  const endpoint = endPointApi;
  const query = gql`
    query GetListSlugIndustry {
      industries(first: 100) {
        nodes {
          slug
          industryId
          language {
            locale
            code
          }
        }
      }
    }
  `;
  try {
    const data = await request(endpoint, query);
    return data.industries.nodes;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};
export const getPostsForRSS = async () => {
  const endpoint = endPointApi;
  const query = gql`
    query GetPosts {
      posts(first: 10) {
        nodes {
          id
          title
          slug
          date
          excerpt
          uri
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
            }
          }
          language {
            locale
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  try {
    const data = await request(endpoint, query);
    return data.posts.nodes;
  } catch (error) {
    console.error("[RSS] Error fetching posts:", error);
    return [];
  }
};
export const GetListSlugCountry = async () => {
  const endpoint = endPointApi;
  const query = gql`
    query GetListSlugCountry {
      countries(first: 100) {
        nodes {
          slug
          countryId
          language {
            locale
            code
          }
        }
      }
    }
  `;
  try {
    const data = await request(endpoint, query);
    return data.countries.nodes;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};
export const GetCountryDetailBySlug = async (slug, language) => {
  const endpoint = endPointApi;
  const query = gql`
    query GetCountryDetailBySlug(
      $slug: String!
      $language: LanguageCodeFilterEnum!
    ) {
      countryBy(slug: $slug) {
        addHeadPage {
          addContentHead
        }
        content
        title
        cta {
          title
          textButton
          content
          buttonColor
          backgroundColor
          textColor
        }
        seo {
          fullHead
        }
        translations {
          language {
            slug
            code
            locale
            name
          }
          uri
          slug
        }
        language {
          slug
        }
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        serviceHomepage {
          color
          name
          secondaryColor
          titleBelowTextHeadingPageServiceDetail
          titleHeadingSectionFaq
          sectionWho {
            backgroundColor
            color
            projectCardShort {
              listImageLogo {
                altText
                sourceUrl
              }
              mainImage {
                altText
                sourceUrl
              }
              textContent
              urlCard
            }
            textLeftHead
            textRightHead
          }
          sectionWhat {
            backgroundColor
            contentLeft
            contentRight
            textTitle
            mainImage {
              altText
              sourceUrl
            }
          }
          sectionWhy {
            backgroundColor
            color
            listCardWhy {
              cardContent
              cardTitle
              mainImage {
                altText
                sourceUrl
              }
            }
            textLeftHead
            textRightHead
          }
          sectionHow {
            cardStep {
              cardContent
              cardTitle
              titleStep
              iconCardStep
            }
            contentListSteps
            contentPlatform {
              contentTitle
              iconImage {
                altText
                sourceUrl
              }
              platformGlobal {
                content
                listIconImage {
                  altText
                  sourceUrl
                }
                name
              }
              platformVietnam {
                content
                fieldGroupName
                listSocialMedia {
                  sourceUrl
                  altText
                }
                name
              }
              textFooterPlatform
              title
            }
            textLeftHead
            textRightHead
            titleListSteps
            imageIcon {
              altText
              sourceUrl
            }
          }
          sectionWhich {
            backgroundColor
            textHeadingRight
            textHeadingLeft
            uselayout3card
            widthCard
            layoutContentSectionWhich {
              ... on Country_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutCard {
                textContent
                title
                urlCard
                imageCard {
                  altText
                  sourceUrl
                }
              }
              ... on Country_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutVideo {
                content
                title
                urlVideo
                videoDescription
                mainImageUpload {
                  altText
                  sourceUrl
                }
              }
              ... on Country_Servicehomepage_SectionWhich_LayoutContentSectionWhich_LayoutCardHasTitle {
                title
                backgroundCardColor
                uselayout3cards
                card {
                  title
                  textContent
                  urlCard
                  imageCard {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
          sectionContentDetail {
            ... on Country_Servicehomepage_SectionContentDetail_ContentNoImage {
              content
              title
            }
            ... on Country_Servicehomepage_SectionContentDetail_ContentWithImage {
              content
              image {
                altText
                sourceUrl
              }
              title
            }
          }
          layoutContentServiceDetail {
            ... on Country_Servicehomepage_LayoutContentServiceDetail_SectionIntro {
              backgroundColor
              color
              textLeft
              textRight
              textHeadTitle
              textTitle
              backgroundColorImage
              selectPositionImage
              imageSectionIntro {
                altText
                sourceUrl
              }
            }
          }
        }
      }
      serviceParents(
        where: { language: $language, orderby: { field: DATE, order: ASC } }
      ) {
        nodes {
          serviceHomepage {
            name
            secondaryColor
          }
          slug
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  `;
  const variables = { slug, language };
  try {
    const data = await request(endpoint, query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
