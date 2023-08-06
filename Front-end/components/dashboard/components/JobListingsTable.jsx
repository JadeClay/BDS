import Link from "next/link";
import { useRouter } from "next/router.js";
import { useState, useEffect } from "react";
import axios from "../../../lib/axios.js";
import { Pagination } from "react-laravel-paginex";
import Cookies from "js-cookie";
import swal from "sweetalert";

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

const JobListingsTable = ({refreshPage, refresh}) => {
  const router = useRouter();
  const [page, setPage] = useState();
  const [status, setStatus] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [provinceLoaded, setProvinceLoaded] = useState(false);
  const [token, setToken] = useState();

  useEffect(() =>{
    async function getData(){
      const res = await axios.get("/api/business/list/" + status).then(response => {
      setPage(response.data);
    }).catch(error => console.error(error));

    const response = await axios.get("/api/provinces").then(response => {setProvinces(response.data); setProvinceLoaded(true)});
    setToken(Cookies.get('token'));
    }

    getData(); 
  },[refresh]);

  const statusFilter = (e) => {
    setStatus(e.target.value);
    axios.get(`/api/business/list/${e.target.value}?page=` + 1).then(response => (setPage(response.data)))
  }

  const getPage = data => {
    axios.get(`/api/business/list/${status}?page=` + data.page).then(response => (setPage(response.data)))
  }

  const getProvince = (id) => {
    const province = provinces[id-1];
    return province.name
  }

  const rejectBusiness = (id) => {
    const res = axios.post(`/api/business/reject/${id}`,{},{
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    }).then(() => swal(successAlertOptions)).catch(() => swal(errorAlertOptions))
    refreshPage(!refresh);
  }

  const approveBusiness = (id) => {
    const res = axios.post(`/api/business/approve/${id}`,{},{
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    }).then(() => swal(successAlertOptions)).catch(() => swal(errorAlertOptions))
    refreshPage(!refresh);
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Empresas</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select" onChange={statusFilter}>
            <option value={0}>Pendientes</option>
            <option value={1}>Aprobadas</option>
            <option value={2}>Rechazadas</option>
            <option value={3}>Todos</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {page && page.data.map((item) => (
                <tr key={item.id}>
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.logo}`} alt="logo" />
                          </span>
                          <h4>
                            <Link href={`${item.website}`} target="_blank" rel="noreferrer" passHref={true}>
                              {item.name}
                            </Link>
                          </h4>
                          <ul className="job-info">
                           {/* <li>
                              <span className="icon flaticon-briefcase"></span>
                              {getCategory(item.id)}
                            </li> */}
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                              {provinceLoaded && getProvince(item.province_id)}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={(item.status == 1) ? "status approved" : (item.status == 2) ? "status rejected" : "status"}>{(item.status == 0) ? "Pendiente" : (item.status == 1) ? "Aprobada" : "Rechazada"}</td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <button data-text="Información" onClick={() => router.push(`./dashboard/business?id=${item.id}`)}>
                            <span className="la la-eye"></span>
                          </button>
                        </li>
                        <li>
                            <button data-text="Aprobar" onClick={() => approveBusiness(item.id)}>
                              <span className="la la-check"></span>
                            </button>
                        </li>
                        <li>
                          <button data-text="Rechazar" onClick={() => rejectBusiness(item.id)}>
                            <span className="la la-times-circle"></span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination buttonIcons={true} data={page} changePage={getPage}/>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
