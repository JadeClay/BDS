import FooterDefault from "../footer/CopyrightFooter";
import Breadcrumb from "../common/Breadcrumb";
import DefaulHeader2 from "../header/DefaulHeader2";
import MobileMenu from "../header/MobileMenu";
import FilterTopBox from "./FilterTopBox";

const Index = () => {
    return (
        <>
            {/* <!-- Header Span --> */}
            <span className="header-span"></span>

            <DefaulHeader2 />
            {/* End Header with upload cv btn */}

            <MobileMenu />
            {/* End MobileMenu */}

            <Breadcrumb title="Empresas" meta="Empresas" />
            {/* <!--End Breadcrumb Start--> */}

            <section className="ls-section business">
                <div className="auto-container">
                    <div className="row">
                        <div className="content-column col-lg-10 col-md-12 col-sm-12">
                            <div className="ls-outer">
                                <FilterTopBox />
                                {/* <!-- ls Switcher --> */}
                            </div>
                        </div>
                        {/* <!-- End Content Column --> */}
                    </div>
                    {/* End row */}
                </div>
                {/* End container */}
            </section>
            {/* <!--End Listing Page Section --> */}

            <FooterDefault/>
            {/* <!-- End Main Footer --> */}
        </>
    );
};

export default Index;
