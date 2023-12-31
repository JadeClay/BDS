import Router from "next/router";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";

const SearchForm3 = () => {
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState(undefined);
  const [text, setText] = useState(undefined);

  useEffect(() => {
    axios.get('/api/categories').then(response => setCategories(response.data));
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const onCategoryChange = e => {
    console.log(e.target.value);
    setCategory(e.target.value);
    setText(undefined); // If setting a category, unsetting the text search
  }

  const onTextChange = e => {
    setText(e.target.value);
    setCategory(undefined);
  }

  return (
    <form onClick={handleSubmit}>
      <div className="row">
        {/* <!-- Form Group --> */}
        <div className="form-group col-lg-5 col-md-12 col-sm-12">
          <span className="icon flaticon-search-1"></span>
          <input
            type="text"
            name="text"
            placeholder="Por ejemplo, desarrollo web"
            value={text}
            onChange={onTextChange}
          />
        </div>

        {/* <!-- Form Group --> */}
        <div className="form-group col-lg-4 col-md-12 col-sm-12 category">
          <span className="icon flaticon-briefcase"></span>
          <select className="chosen-single form-select" onChange={onCategoryChange}>
            <option value={0}>Cualquier categoría</option>
            {
              categories && categories.map(opcion => {
                return <option key={opcion.id} value={opcion.id}>{opcion.name}</option>
              })
            }
          </select>
        </div>

        {/* <!-- Form Group --> */}
        <div className="form-group col-lg-2 col-md-12 col-sm-12 text-right">
          <button
            type="submit"
            className="theme-btn btn-style-one"
            onClick={() => Router.push(`/search-list?category=${category}&text=${text}`)}
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm3;
