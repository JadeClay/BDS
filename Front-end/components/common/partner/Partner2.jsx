import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import axios from "../../../lib/axios";
import Link from "next/link";

const Partner2 = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    async function getData() {
      const businessResponse = await axios.get(`/api/business/public`).then(response => setLogos(response.data)).catch(error => console.error(error));
    }
    getData();
  },[]);
  
  const settings = {
    dots: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1200,

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings} arrows={false} style={{width: '100%'}}>
        {logos && logos.map((item) => (
          item.logo && (
            <li className="slide-item" key={item.id}>
              <figure className="image-box">
                <Link href={`/business/profile?id=${item.id}`}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item?.logo}`}
                    alt="brand"
                  />
                </Link>
              </figure>
            </li>
          )
        ))}
      </Slider>
    </>
  );
};

export default Partner2;
