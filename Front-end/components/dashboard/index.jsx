import MobileMenu from "../header/MobileMenu";
import DashboardHeader from "../DashboardHeader";
import BreadCrumb from "./BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
import JobListingsTable from "./components/JobListingsTable";
import CopyrightFooter from "../footer/CopyrightFooter";
import { useState } from "react";

const Index = () => {
  const [reload, setReload] = useState(0);

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Bienvenido, administrador." />
          {/* breadCrumb */}

          <div className="row">
            <TopCardBlock refresh={reload}/>
          </div>
          {/* End .row top card block */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <JobListingsTable refreshPage={setReload} refresh={reload}/>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default Index;
