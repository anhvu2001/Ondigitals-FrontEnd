import Contact from "@/components/contact/Contact";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import { GetDataPageContact } from "../api/graphql";
import { getDataMenu, getTranslatedDataFooter } from "../api/graphqlHeaderFooter";
import Head from "next/head";

const parse = require("html-react-parser");

export default function ContactUs({ updatedData, dataFooter, dataHeader }) {
  if (!updatedData) {
    return <div>Loading...</div>;
  }
  const { pageContact, seo } = updatedData;
  return (
    <>
      <Head>{seo.fullHead && parse(seo.fullHead)}</Head>
      <Header data={dataHeader} />
      <Contact data={pageContact} />
      <Footer data={dataFooter} />
    </>
  );
}
export const getServerSideProps = async ({ locale }) => {
  const language = locale.toUpperCase();
  const idPage = 45407;
  const [dataPage, dataFooter, dataHeader] = await Promise.all([
    GetDataPageContact(idPage),
    getTranslatedDataFooter(language),
    getDataMenu(language),
  ]);

  const translation = dataPage.translations.find(
    (t) => t.language.code === language
  );
  const updatedData = translation
    ? await GetDataPageContact(translation.pageId)
    : dataPage;
  return {
    props: {
      updatedData,
      dataFooter,
      dataHeader,
    },
  };
};
