import Link from "next/link";
import { useRouter } from "next/router.js";
import { useState, useEffect } from "react";
import axios from "../../../lib/axios.js";
import { Pagination } from "react-laravel-paginex";
import Cookies from "js-cookie";
import swal from "sweetalert";

// Setting the popup alerts options
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

const CategoryListingsTable = () => {
  const [page, setPage] = useState();
  const [token, setToken] = useState();

  useEffect(() =>{
    async function getData(){
      // Retrieve the businesses
      const res = await axios.get("/api/categories/dashboard").then(response => {
        setPage(response.data);
      }).catch(error => console.error(error));

      setToken(Cookies.get('token'));
    }

    getData(); 
  },[]);

  // Handles the pagination, goes changing the data
  const getPage = data => {
    axios.get(`/api/categories/dashboard?page=` + data.page).then(response => (setPage(response.data)))
  }

  /*
    FUNCTIONS TO MANAGE THE CATEGORIES
  */
  const createCategory = async () => {
    const catName = await swal({
      title: 'Ingrese el nombre de la categoría',
      content: 'input',
    }).then(value => value);
      
    const response = axios.post("/api/categories/new",{
      name: catName
    }, {
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    }).then(response => swal(successAlertOptions)).catch(error => swal(errorAlertOptions));
        
  }

  const editCategory = async (id, name) => {

    const catName = await swal({
      title: 'Editando ' + name,
      content: 'input'
    }).then(value => value);

    if(catName == null){
      swal(errorAlertOptions);
      throw null;
    } else{
      const res = await axios.post(`/api/categories/edit/${id}`,{
        name: catName
      },{
        headers: {
          "Authorization": 'Bearer ' + token,
        }
      }).then(() => swal(successAlertOptions)).catch(() => swal(errorAlertOptions))
    }

  }

  const deleteCategory = (id) => {
    const res = axios.post(`/api/categories/delete/${id}`,{},{
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    }).then(() => swal(successAlertOptions)).catch(() => swal(errorAlertOptions))
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Categorías</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <button
            className="theme-btn btn-style-three"
            onClick={createCategory}         
          >
            Crear
          </button>
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
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {page && page.data.map((item) => (
                <tr key={item?.id}>
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <h6>
                        {item?.name}
                      </h6>
                    </div>
                  </td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <button data-text="Editar" onClick={() => editCategory(item?.id, item?.name)}>
                            <span className="la la-pencil-ruler"></span>
                          </button>
                        </li>
                        <li>
                            <button data-text="Borrar" onClick={() => deleteCategory(item?.id)}>
                              <span className="la la-trash"></span>
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
        {<Pagination buttonIcons={true} data={page} changePage={getPage}/>}
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default CategoryListingsTable;
