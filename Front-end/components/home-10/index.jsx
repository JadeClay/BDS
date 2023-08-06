import Header from "./Header";
import Footer from "../footer/CopyrightFooter";
import Hero10 from "../hero";
import Partner2 from "../common/partner/Partner2";
import MobileMenu from "../header/MobileMenu";

const index = () => {
  return (
    <>

      <Header />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Hero10 />
      {/* <!-- End Banner Section--> */}

      <section className="clients-section-two layout-pt-30 layout-pb-30">
        <div className="auto-container">
          <div className="sponsors-outer wow fadeInUp">
            <div className="sponsors-carousel">
              <Partner2 />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Partners Carousel --> */}

      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
