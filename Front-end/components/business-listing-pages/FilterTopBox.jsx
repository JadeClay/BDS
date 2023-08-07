import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "../../lib/axios"
import { useRouter } from "next/router";
import { Pagination } from "react-laravel-paginex";
import BusinessListItem from "./BusinessListItem";

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

    // Getting the name of the province of the business
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
