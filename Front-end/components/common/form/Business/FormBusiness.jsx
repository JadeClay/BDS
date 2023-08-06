import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "../../../../lib/axios";
import Link from "next/link";
import Image from "next/image";
import swal from "sweetalert";
import { useRouter } from "next/router";
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const successAlertOptions = {
  title:"¡Hemos recibido tu solicitud correctamente!",
  text:"Trabajaremos en su evaluación a la mayor brevedad posible para su posterior publicación.",
  button:"Enviar solicitud",
  icon:"success"
}

const errorAlertOptions = {
  title:"¡Ha habido un error con tu solicitud!",
  text:"Verifica el formulario e intentalo de nuevo.",
  button:"OK.",
  icon:"error"
}

const FormBusiness = () => {
  const router = useRouter();
  let formData = new FormData();
  const [categories, setCategories] = useState([]);
  const [category,setCategory] = useState();
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
  const [images,setImages] = useState([]);
  const [cantImages,setCantImages] = useState();

  useEffect(() => {
    async function getData(){
      const res = await axios.get("/api/provinces").then(response => setProvinces(response.data));
      const resCategories = await axios.get("/api/categories").then(response => response.data.forEach(cat => {
        categories.push({
          value: cat.id,
          label: cat.name
        })
      }));
    }
    getData();
  },[])

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
    setLogo(e.target.files[0])
  }

  const onImageChange = (e) => {
    setCantImages(e.length);

    let aux = [];
    for(let i = 0; i < e.length; i++){
      aux.push(e[i].file);
    }

    setImages(aux);
  }

  const onProvinceChange = (e) => {
    setProvince(e.target.value);
  }

  const onCategorieChange = (e) => {
    let options = [];
    e.forEach(element => {
      options.push(element.value)
    });
    setCategory(options);
  }

  const onSubmit = (e) => {
    e.preventDefault();
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
    // Adding the images and the number of images to the formData
    images.forEach((file, i) => {
      formData.append(`image-${i}`, file, file.name);
    });
    formData.append('images',cantImages);

    axios.post('/api/business/new',formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => swal(successAlertOptions).then(response => router.push("/"))).catch(error => swal(errorAlertOptions));
  }

  return (
    <div className="widget-content">
      <div className="uploading-outer">
        <div className="uploadButton">
          <input
            className="uploadButton-input"
            type="file"
            name="attachments[]"
            accept="image/*"
            id="upload"
            required
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
            logo && <Image src={URL.createObjectURL(logo)} width={100} height={140}/>
          }
        </div>
      </div>

      <form action="#" className="default-form" onSubmit={onSubmit}>
        <div className="row">
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Nombre/Empresa *</label>
            <input type="text" name="name" id="name" placeholder="Empresa SA" required onChange={onNameChange}/>
          </div>

          {/* <!-- Search Select --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Categoria de Negocio *</label>
            <Select
              isMulti
              name="categories"
              options={categories}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={onCategorieChange}
              required
            />
          </div>

          {/* <!-- About Company --> */}
          <div className="form-group col-lg-12 col-md-12">
            <label>Descripción de la Empresa *</label>
            <textarea onChange={onDescriptionChange} placeholder="Describa aquí de manera detallada la empresa y sus actividades..."></textarea>
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-3 col-md-12">
            <label>Provincia *</label>
            <select className="chosen-single form-select" required onChange={onProvinceChange}>
              <option>Seleccionar...</option>
              {provinces && provinces.map(province => <option value={province.id} key={province.id}>{province.name}</option>) }
            </select>
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-5 col-md-12">
            <label>Direccion *</label>
            <input type="text" name="direction" onChange={onDirectionChange} placeholder="Sector, Calle y número de edificio" required />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-4 col-md-12">
            <label>Link Ubicacion *</label>
            <input type="text" name="location_link" onChange={onLocationLinkChange} placeholder="Link de la oficina en Google Maps" />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Encargado *</label>
            <input type="text" name="owner" onChange={onOwnerChange} placeholder="El nombre del encargado de la empresa" required />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Telefono *</label>
            <input
              type="text"
              name="telephone"
              placeholder="(809) 000 - 0000"
              required
              onChange={onTelephoneChange}
            />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Celular *</label>
            <input type="text" name="name" placeholder="(809) 000 - 0000" required onChange={onCellphoneChange} />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Correo Electronico *</label>
            <input
              type="text"
              name="name"
              placeholder="ejemplo@gmail.com"
              required
              onChange={onEmailChange}
            />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-12 col-md-12">
            <label>Pagina web</label>
            <input
              type="text"
              name="name"
              placeholder="www.tuempresa.com"
              onChange={onWebsiteChange}
            />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Link de Instagram</label>
            <input type="text" name="name" placeholder="El link del perfil de Instagram" onChange={onInstagramChange}/>
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Link de Facebook</label>
            <input type="text" name="name" placeholder="El link del perfil de Facebook" onChange={onFacebookChange}/>
          </div>
            <FilePond
              files={images}
              onupdatefiles={onImageChange}
              allowMultiple={true}
              maxFiles={3}
              storeAsFile={true}
              credits={false}
              required
              labelIdle={"Agregar hasta 3 imágenes"}
            />
          
          {/* <!-- Input --> */}
          <div className="form-group col-lg-2 col-md-12">
            <Link
              href="/"
              className="theme-btn btn-style-five"
            >
              Atrás
            </Link>
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-2 col-md-12">
            <button type="submit" className="theme-btn btn-style-one">
              Crear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormBusiness;
