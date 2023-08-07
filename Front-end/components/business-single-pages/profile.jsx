import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Social from "./social/Social";
import axios from "../../lib/axios";
import GalleryBox from './shared-components/GalleryBox';

export default function Profile() {
    const router = useRouter();
    const [business, setBusiness] = useState();
    const [category, setCategory] = useState([]);
    const [categories, setCategories] = useState();
    const [provinces, setProvinces] = useState();
    const id = router.query.id;
  
    useEffect(() => {
      async function getData() {
        const businessResponse = await axios.get(`/api/business/${id}`).then(response => setBusiness(response.data)).catch(error => console.error(error));
        const provincesResponse = await axios.get(`/api/provinces`).then(response => setProvinces(response.data)).catch(error => console.error(error));
        const categoriesResponse = await axios.get(`/api/business/category/${id}`).then(response => setCategories(response.data)).catch(error => console.error(error));
        const resCategories = await axios.get("/api/categories").then(response => setCategory(response.data));
      }
      getData();
    }, [id]);
  
    const getProvince = (id) => {
      const province = provinces[id-1];
      return province.name;
    }
  
    const setCategoriesSelected = () => {
      let categoriesSelected = categories.map(item => item.category_id);
      let total = [];
      
      // Running all categories that are selected for the business and retrieving the respective data from the array of categories
      categoriesSelected.forEach((cat) =>{
        console.log(cat);
        total.push(category.find(element => element.id == cat))
      })
  
      return total
    }

  return (
    <section className="candidate-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="candidate-block-five">
              <div className="inner-box">
                <div className="content">
                  <figure className="image">
                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${business?.logo}`} alt="avatar" />
                  </figure>
                  <h4 className="name">{business?.name}</h4>

                  <ul className="candidate-info">
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {provinces && getProvince(business?.province_id)}
                    </li>
                  </ul>

                  <ul className="post-tags">
                    {category && categories && setCategoriesSelected().map(category => <li key={category?.id}>{category?.name}</li>)}
                  </ul>
                </div>

                <div className="btn-box">
                  <a
                    className="theme-btn btn-style-one"
                    href={business?.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ir a la página web
                  </a>
                </div>
              </div>
            </div>
            {/*  <!-- Candidate block Five --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">

            <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon fa fa-briefcase"></i>
                          <h5>Encargado:</h5>
                          <span>{business?.owner}</span>
                        </li>

                        <li>
                          <i className="icon fa fa-map-marked"></i>
                          <h5>Dirección:</h5>
                          <span>{business?.direction}</span>
                        </li>

                        <li>
                          <i className="icon fa fa-phone"></i>
                          <h5>Teléfono:</h5>
                          <span>{business?.telephone}</span>
                          <h5>Celular:</h5>
                          <span>{business?.cellphone}</span>
                        </li>

                        <li>
                          <i className="icon fa fa-mail-bulk"></i>
                          <h5>Correo Electrónico:</h5>
                          <span>{business?.email}</span>
                        </li>

                        <li>
                          <i className="icon fa fa-globe"></i>
                          <a href={business?.website} target="_blank" rel="noreferrer"><h5>Ir a la página web</h5></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget conadidate overview */}

                  <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Redes Sociales</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        <Social facebook={business?.facebook} instagram={business?.instagram}/>
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget social-media-widget */}

                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}

              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                    <h4>Sobre la empresa</h4>

                  <p style={{whiteSpace: "normal", textAlign: "justify"}}>
                    {business?.description}
                  </p>

                  {/* <!-- Portfolio --> */}
                  <div className="portfolio-outer">
                    <div className="row">
                      <GalleryBox id={business?.id} />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .content-column */}

            </div>

            
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
  )
}
