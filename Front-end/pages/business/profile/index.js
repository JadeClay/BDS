import dynamic from "next/dynamic";
import MobileMenu from "../../../components/header/MobileMenu";
import Seo from "../../../components/common/Seo";
import Profile from "../../../components/business-single-pages/profile";
import Header from "../../../components/Header";
import CopyrightFooter from "../../../components/footer/CopyrightFooter";

const CandidateSingleDynamicV1 = () => {

  return (
    <>
      <Seo pageTitle="Perfil Corporativo" />

      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <Header/>
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Profile/>
      {/* <!-- Job Detail Section --> */}

      <CopyrightFooter/>
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(CandidateSingleDynamicV1), {
  ssr: false,
});
