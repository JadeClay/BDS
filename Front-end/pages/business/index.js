import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
import FormBusiness from "../../components/common/form/Business/FormBusiness";
import CopyrightFooter from "../../components/footer/CopyrightFooter";
import MobileMenu from "../../components/header/MobileMenu";
import DashboardCandidatesHeader from "../../components/Header";

const index = () => {
  return (
    <>
      <Seo pageTitle="Proponer mi negocio" />
      <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Business Form --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Proponer mi empresa</h4>
                  </div>
                  <FormBusiness />
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* End dashboard */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    </>
    // End page-wrapper
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
