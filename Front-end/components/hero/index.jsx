import SearchForm3 from "../common/SearchForm3";
import Partner2 from "../common/partner/Partner2";

const index = () => {
  return (
    <section className="banner-section-four -type-16" style={{ backgroundImage: "url(images/wallpaper.webp)", backgroundPosition: "center" }}>

      <div className="auto-container">
        <div className="content-box">
          <div className="title-box" data-aso-delay="500" data-aos="fade-up">
            <h3>Contacta con las mejores empresas para oportunidades de negocio</h3>
          </div>

          <div
            className="job-search-form"
            data-aos-delay="700"
            data-aos="fade-up"
          >
            <SearchForm3/>
          </div>
          {/* <!-- Job Search Form --> */}

        </div>
        {/* <!-- content box --> */}

        <div className="title-box">
            <h4>Empresas</h4>
          </div>
      </div>
    </section>
  );
};

export default index;
