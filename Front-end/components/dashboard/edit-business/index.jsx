import MobileMenu from "../../header/MobileMenu";
import DashboardHeader from "../../DashboardHeader";
import BreadCrumb from "../BreadCrumb";
import CopyrightFooter from "../../footer/CopyrightFooter";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "../../../lib/axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import swal from "sweetalert";
import Cookies from "js-cookie";
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

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

const index = (id) => {
  const router = useRouter();
  const [category,setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategories,setSelectedCategories] = useState();
  const [province,setProvince] = useState("");
  const [provinces,setProvinces] = useState([]);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [direction, setDirection] = useState("");
  const [location_link, setLocationLink] = useState("");
  const [owner,setOwner] = useState("");
  const [telephone,setTelephone] = useState("");
  const [cellphone,setCellphone] = useState("");
  const [email,setEmail] = useState("");
  const [website,setWebsite] = useState("");
  const [facebook,setFacebook] = useState("");
  const [instagram,setInstagram] = useState("");
  const [logo,setLogo] = useState();
  const [images, setImages] = useState([]);
  const [cantImages, setCantImages] = useState(0);

  // RETRIEVED UNCHANGEABLE DATA FROM THE BACKEND
  const [token, setToken] = useState();
  const [uploadedLogo, setUploadedLogo] = useState();
  const [uploadedImages, setUploadedImages] = useState();


  // Retrieving and setting the data in the form
  
  useEffect(() => {
    
    async function getData(){
      // Getting the token to authenticate the request.
      setToken(Cookies.get("token")); 

      // Getting all the existent information in the database
      const res = await axios.get(`/api/business/${id.id}`).then(response => (
        setName(response.data.name),
        setDescription(response.data.description),
        setOwner(response.data.owner),
        setWebsite(response.data.website),
        setProvince(response.data.province_id),
        setTelephone(response.data.telephone),
        setEmail(response.data.email),
        setDirection(response.data.direction),
        setLocationLink(response.data.location_link),
        setFacebook(response.data.facebook),
        setInstagram(response.data.instagram),
        setCellphone(response.data.cellphone),
        setImagesArray(response.data.id),
        setUploadedLogo(response.data.logo)
      ));
      // Getting all the provinces and categories possible
      const response = await axios.get(`/api/provinces`).then(response => setProvinces(response.data));
      let aux = []
      axios.get("/api/categories").then(response => response.data.forEach(cat => {
        aux.push({
          value: cat.id,
          label: cat.name
        })
      }));

      // Setting the possible categories
      setCategories(aux);
      const categories = await axios.get(`/api/business/category/${id.id}`).then(response => setSelectedCategories(response.data));
    }
    getData();
  },[])

  // Insert all photos uploaded to the server of that business
  const setImagesArray = async (id) => {
    const response = await axios.get(`/api/business/photos/${id}`).then(response => {
      let auxImages = [];
      response.data.forEach((image) => auxImages.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${image}`));
      setUploadedImages(auxImages);
    }).catch(error => console.error(error));
  }

  // Retrieve all the selected categories of that business
  const setCategoriesSelected = () => {
    let categoriesSelected = selectedCategories.map(item => item.category_id);
    let total = [];
    let string = "";
    
    // Running all categories that are selected for the business and retrieving the respective data from the array of categories
    categoriesSelected.forEach((cat) =>{
      total.push(categories.find(element => element.value == cat));
    })

    total.forEach((data)=>{
      string += data.label;
      string += " ";
    })
    
    return string;
  }

  // Important events handlers (submit, approve, an reject)
  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('category',category);
    formData.append('logo',logo);
    formData.append('name', name);
    formData.append('description',description);
    formData.append('direction',direction);
    formData.append('location_link',location_link);
    formData.append('owner',owner);
    formData.append('telephone',telephone);
    formData.append('cellphone',cellphone);
    formData.append('email',email);
    formData.append('website',website);
    formData.append('facebook',facebook);
    formData.append('instagram',instagram);
    formData.append('province_id',province);
    formData.append('images',cantImages);

    if(images.length > 0){
      // Adding the images and the number of images to the formData
      images.forEach((file, i) => {
        formData.append(`image-${i}`, file, file.name);
      });
    }
    
    axios.post(`/api/business/edit/${id.id}`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": 'Bearer ' + token,
      }
    }).then((response) => swal(successAlertOptions).then(() => router.push('/dashboard'))).catch((response) => console.log(response));
  }

  /*
    FUNCTIONS TO MANAGE THE STATUS OF THE BUSINESSES
  */
  const approveBusiness = (e) => {
    e.preventDefault()
    axios.post(`/api/business/approve/${id.id}`,{},{
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    }).then(() => swal(successAlertOptions).then(() => router.push('/dashboard'))).catch((error) => console.log(error));
  }

  const rejectBusiness = (e) => {
    e.preventDefault()
    axios.post(`/api/business/reject/${id.id}`,{},{
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    }).then(() => swal(successAlertOptions).then(() => router.push('/dashboard'))).catch(() => swal(errorAlertOptions));
  }

  // onChange Handlers
  const onNameChange = (e) => {
    setName(e.target.value);
  }

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const onDirectionChange = (e) => {
    setDirection(e.target.value);
  }

  const onLocationLinkChange = (e) => {
    setLocationLink(e.target.value);
  }

  const onOwnerChange = (e) => {
    setOwner(e.target.value);
  }

  const onTelephoneChange = (e) => {
    setTelephone(e.target.value);
  }

  const onCellphoneChange = (e) => {
    setCellphone(e.target.value);
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onWebsiteChange = (e) => {
    setWebsite(e.target.value);
  }

  const onFacebookChange = (e) => {
    setFacebook(e.target.value);
  }

  const onInstagramChange = (e) => {
    setInstagram(e.target.value);
  }
  
  const onLogoChange = (e) => {
    setLogo(e.target.files[0]);
    setUploadedLogo();
  }

  const onProvinceChange = (e) => {
    setProvince(e.target.value);
  }

  const onCategoryChange = (e) => {
    let options = [];
    e.forEach(element => {
      options.push(element.value)
    });
    setCategory(options);
  }

  const onImageChange = (e) => {
    setCantImages(e.length);

    let aux = [];
    for(let i = 0; i < e.length; i++){
      aux.push(e[i].file);
    }

    setImages(aux);
  }

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
          <BreadCrumb title="Revisa el negocio" />
          {/* breadCrumb */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Datos del formulario</h4>
                  </div>

                  <div className="widget-content">
                  <div className="widget-content">
                  <div className="uploading-outer">
                    <div className="uploadButton">
                      <input
                        className="uploadButton-input"
                        type="file"
                        name="attachments[]"
                        accept="image/*"
                        id="upload"
                        onChange={onLogoChange}
                      />
                      <label
                        className="uploadButton-button ripple-effect"
                        htmlFor="upload"
                      >
                        {"Subir Logo"}
                      </label>
                        <span className="uploadButton-file-name"></span>
                    </div>
                    <div className="text">
                    {
                      uploadedLogo && !logo && <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${uploadedLogo}`} width={100} height={140}/>  
                    }
                    {
                      logo && !uploadedLogo && <Image src={URL.createObjectURL(logo)} width={100} height={140}/>
                    }
                    </div>
                  </div>

                  <form action="#" className="default-form" onSubmit={onSubmit}>
                    <div className="row">
                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-6 col-md-12">
                        <label>Nombre/Empresa</label>
                        <input type="text" name="name" id="name" defaultValue={name} required onChange={onNameChange}/>
                      </div>

                      {/* <!-- Search Select --> */}
                      <div className="form-group col-lg-6 col-md-12">
                        <label>Categoria de Negocio </label>
                        <Select
                          isMulti
                          name="categories"
                          options={categories}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={onCategoryChange}
                          placeholder={selectedCategories && setCategoriesSelected()}
                        />
                      </div>

                      {/* <!-- About Company --> */}
                      <div className="form-group col-lg-12 col-md-12">
                        <label>Descripción de la Empresa</label>
                        <textarea onChange={onDescriptionChange} defaultValue={description}></textarea>
                      </div>

                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-3 col-md-12">
                        <label>Provincia</label>
                        <select className="chosen-single form-select" required onChange={onProvinceChange} value={province}>
                          <option>Seleccionar...</option>
                          {provinces && provinces.map(province => <option value={province.id} key={province.id}>{province.name}</option>) }
                        </select>
                      </div>

                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-5 col-md-12">
                        <label>Direccion</label>
                        <input type="text" name="name" onChange={onDirectionChange} placeholder="UI Designer" required defaultValue={direction}/>
                      </div>

                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-4 col-md-12">
                        <label>Link Ubicacion</label>
                        <input type="text" name="name" onChange={onLocationLinkChange} placeholder="UI Designer" defaultValue={location_link}/>
                      </div>

                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-6 col-md-12">
                        <label>Encargado</label>
                        <input type="text" name="name" onChange={onOwnerChange} placeholder="UI Designer" required defaultValue={owner}/>
                      </div>

                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-6 col-md-12">
                        <label>Telefono</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="0 123 456 7890"
                          required
                          onChange={onTelephoneChange}
                          defaultValue={telephone}
                        />
                      </div>

                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-6 col-md-12">
                        <label>Celular</label>
                        <input type="text" name="name" placeholder="5-10 Years" required onChange={onCellphoneChange} defaultValue={cellphone}/>
                      </div>

                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-6 col-md-12">
                        <label>Correo Electronico</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="creativelayers"
                          required
                          onChange={onEmailChange}
                          defaultValue={email}
                        />
                      </div>

                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-12 col-md-12">
                        <label>Pagina web</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="www.jerome.com"
                          onChange={onWebsiteChange}
                          defaultValue={website}
                        />
                      </div>

                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-6 col-md-12">
                        <label>Link de Instagram</label>
                        <input type="text" name="name" placeholder="5-10 Years" onChange={onInstagramChange} defaultValue={instagram}/>
                      </div>

                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-6 col-md-12">
                        <label>Link de Facebook</label>
                        <input type="text" name="name" placeholder="5-10 Years" onChange={onFacebookChange} defaultValue={facebook}/>
                      </div>

                      <div className="form-group col-lg-12">
                        <label>Imágenes subidas</label><br/>
                        {
                          uploadedImages && uploadedImages.map(image => <img src={image} width={100} height={140}/>)
                        }
                      </div>

                      <FilePond
                        files={images}
                        onupdatefiles={onImageChange}
                        allowMultiple={true}
                        maxFiles={3}
                        storeAsFile={true}
                        credits={false}
                        labelIdle={"Cambiar las imagenes"}
                      />

                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-2 col-md-12">
                        <Link
                          href="/dashboard"
                          className="theme-btn btn-style-five"
                        >
                          Atrás
                        </Link>
                      </div>

                      <div className="form-group col-lg-2 col-md-12">
                        <button className="theme-btn btn-style-three" onClick={rejectBusiness}>
                          Rechazar
                        </button>
                      </div>

                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-2 col-md-12">
                        <button type="submit" className="theme-btn btn-style-two">
                          Editar
                        </button>
                      </div>

                      {/* <!-- Input --> */}
                      <div className="form-group col-lg-2 col-md-12">
                        <button className="theme-btn btn-style-four" onClick={approveBusiness}>
                          Aprobar
                        </button>
                      </div>
                      
                    </div>
                  </form>
                </div>
                    {/* End post box form */}
                  </div>
                </div>
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

export default index;
