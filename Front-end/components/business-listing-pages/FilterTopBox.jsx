import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "../../lib/axios"
import { useRouter } from "next/router";
import { Pagination } from "react-laravel-paginex";
import BusinessListItem from "./BusinessListItem";

const catOptions = [
    { value: 1, label: "Salud" },
    { value: 2, label: "Turismo" },
    { value: 3, label: "Deportes" },
    { value: 4, label: "Educación" },
    { value: 5, label: "Tecnología" },
    { value: 6, label: "Consultoría" },
    { value: 7, label: "Gastronomia" },
    { value: 8, label: "Construcción" },
    { value: 9, label: "Transportación" },
    { value: 10, label: "Sociedad y Cultura" },
    { value: 11, label: "Medios de comunicación" },
    { value: 12, label: "Artes y Entretenimiento" },
    { value: 13, label: "Venta de Productos y Servicios" },
    { value: 14, label: "Arquitectura"}
  ];

const FilterTopBox = () => {
    const router = useRouter();
    const {category, text} = router.query;
    const [page, setPage] = useState();
    const [provinces, setProvinces] = useState();

    useEffect(() =>{
        async function getData(){
            const provincesResponse = await axios.get(`/api/provinces`).then(response => setProvinces(response.data)).catch(error => console.error(error));
            
            // Doing the initial search with the arguments given by the user.
            if((text == "undefined" && category == "undefined") || (text == undefined && category == undefined)){
                const searchResponse = await axios.get(`/api/business/search/1`).then(response => setPage(response.data)).catch(error => console.error(error));
            } 
            else if((text != undefined && category == undefined) || (text != "undefined" && category == "undefined")){
                const searchResponse = await axios.get(`/api/business/search/${text}`).then(response => setPage(response.data)).catch(error => console.error(error));
            } 
            else if((category != undefined && text == undefined) || (category != "undefined" && text == "undefined")){
                const searchResponse = await axios.get(`/api/business/search/category/${category}`).then(response => setPage(response.data)).catch(error => console.error(error));
            }
        }
        getData();
    },[]);


    // Getting the data of the next page with the arguments given by the user.
    const getPage = data => {
        // If text and category are not defined. Do a general search.
        if((text == undefined && category == undefined) || (text == "undefined" && category == "undefined")){
            axios.get(`/api/business/search/1?page=` + data.page).then(response => setPage(response.data)).catch(error => console.log(error))
        } // If text is defined, do a search by text
        else if((category != undefined && text == undefined) || (category != "undefined" && text == "undefined")){
            axios.get(`/api/business/search/category/${category}?page=` + data.page).then(response => setPage(response)).catch(error => console.log(error))
        } // Else, do a search by category 
        else{
            axios.get(`/api/business/search/${text}?page=` + data.page).then(response => setPage(response)).catch(error => console.log(error))
        }
    }

    const getProvince = (id) => {
        const province = provinces[id-1];
        return province.name;
    }
    
    return (
        <>

            <div className="ls-switcher">
                <div className="showing-result">
                    {/* Collapsible sidebar button */}

                    <div className="text">
                        <strong>{page ? page.total : 0}</strong> empresas
                    </div>
                </div>
                {/* End showing-result */}

            </div>
            {/* End top filter bar box */}

            {page && page?.data.map((business) => (
                <BusinessListItem business={business} province={provinces && getProvince(business.province_id)} key={business.id} />
            ))}

                <div className="ls-show-more">
                    <Pagination buttonIcons={true} data={page} changePage={getPage}/>
                </div>
            {/* <!-- Listing Show More --> */}
        </>
    );
};

export default FilterTopBox;
