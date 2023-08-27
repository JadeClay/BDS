import MobileMenu from "../../header/MobileMenuDashboard";
import DashboardHeader from "../../DashboardHeader";
import BreadCrumb from "../BreadCrumb";
import CopyrightFooter from "../../footer/CopyrightFooter";
import { useState } from "react";
import CategoryListingsTable from "../components/CategoryListingsTable";

// Setting the options for the Pop-up alerts
const successAlertOptions = {
  title:"¡Éxito!",
  text:"Solicitud realizada con éxito",
  button:false,
  icon:"success"
}

const errorAlertOptions = {
  title:"¡Uops!",
  text:"Ha habido un error al realizar tu solicitud",
  button:false,
  icon:"error"
}

const Index = () => {
  // State used to trigger re-renderization when states changes in the table of businesses
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
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <CategoryListingsTable refreshPage={setReload} refresh={reload}/>
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