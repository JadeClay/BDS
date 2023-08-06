import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from '../../lib/axios';

export default function BusinessListItem({business, province}) {
    const [categories, setCategories] = useState();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        async function getData(){
            const categoriesResponse = await axios.get(`/api/business/category/${business.id}`).then(response => setCategories(response.data));
            const categoryResponse = await axios.get('/api/categories').then(response => setCategory(response.data));
        }
        getData();
    },[]);

    const setCategoriesSelected = () => {
        let categoriesSelected = categories.map(item => item.category_id);
        let total = [];
        
        // Running all categories that are selected for the business and retrieving the respective data from the array of categories
        categoriesSelected.forEach((cat) =>{
            total.push(category.find(element => element.id == cat));
        })

        return total
      }
    

  return (
    <div className="candidate-block-three" key={business.id}>
                <div className="inner-box">
                    <div className="content">
                        <figure className="image">
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${business.logo}`} alt="Logo" />
                        </figure>
                        <h4 className="name">
                            <a
                                href={`${business.website}`}
                                target={'_blank'}
                                rel={'noreferrer'}
                            >
                                {business.name}
                            </a>
                        </h4>

                        <ul className="candidate-info">
                            <li className="designation">
                                <strong>TEL: </strong> {business.telephone}
                            </li>
                            <li className="designation">
                                <strong> CEL: </strong> {business.cellphone}
                            </li>
                            <li style={{maxHeight: 40, paddingLeft: 0, paddingBottom: 1, paddingTop: 0, width: '100%', overflow: 'hidden'}}>
                                {business.description}
                            </li>
                        </ul>

                        <ul className="candidate-info">
                            <li>
                                <span className="icon flaticon-map-locator" style={{maxWidth: "50px"}}></span>
                                {province && province}
                            </li>
                            <li>
                                <a href={business.facebook} target="_blank" rel="noreferrer" className="business link"><span className="fab fa-facebook-f business" style={{marginRight: 5}}></span>Facebook</a>
                                <a href={business.instagram} target="_blank" rel="noreferrer" className="business link"><span className="fab fa-instagram business" style={{marginLeft: 15, marginRight: 5}}></span>Instagram</a>
                                <a href={business.website} target="_blank" rel="noreferrer" className="business link"><span className="fa fa-globe business" style={{marginLeft: 15, marginRight: 5}}></span>Ir a la web</a>
                            </li>
                        </ul>
                        {/* End candidate-info */}

                        <ul className="post-tags">
                            {
                               categories && category && setCategoriesSelected().map(category => <li key={category?.id}>{category?.name}</li>)
                            }
                        </ul>
                    </div>
                    {/* End content */}

                    <div className="btn-box">
                        <Link
                            href={`/business/profile?id=${business.id}`}
                            className="theme-btn btn-style-three"
                        >
                            <span className="btn-title">Ver perfil</span>
                        </Link>
                    </div>
                    {/* End btn-box */}
                </div>
            </div>
  )
}
