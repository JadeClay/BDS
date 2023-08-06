import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { useEffect } from "react";
import axios from "../../../lib/axios";
import { useState } from "react";
import { useRouter } from "next/router";

const GalleryBox = () => {
  const router = useRouter();
  const {id} = router.query;
  const [images,setImages] = useState([]);

  useEffect(() => {
    async function getData() {
      const imagesResponse = await axios.get(`/api/business/photos/${id}`).then(response => setImages(response.data)).catch(error => console.error(error));
    }
    getData();
  },[]);


  return (
    <>
      <Gallery>
        {images && images.map((singleItem) => (
          <div className="col-lg-3 col-md-3 col-sm-6" key={1}>
            <figure className="image" role="button">
              <Item
                original={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${singleItem}`}
                thumbnail={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${singleItem}`}
                width={190}
                height={167}
              >
                {({ ref, open }) => (
                  <div className="lightbox-image" ref={ref} onClick={open}>
                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${singleItem}`} alt="resource" />{" "}
                    <span className="icon flaticon-plus"></span>
                  </div>
                )}
              </Item>
            </figure>
          </div>
        ))}
      </Gallery>
    </>
  );
};

export default GalleryBox;
