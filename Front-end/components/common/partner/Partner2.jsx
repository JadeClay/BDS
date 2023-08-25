import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import axios from "../../../lib/axios";

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

  const sliderGallery = [
    { id: 1, link: "#", imgNumber: "1" },
    { id: 2, link: "#", imgNumber: "2" },
    { id: 3, link: "#", imgNumber: "3" },
    { id: 4, link: "#", imgNumber: "4" },
    { id: 5, link: "#", imgNumber: "5" },
    { id: 6, link: "#", imgNumber: "6" },
    { id: 7, link: "#", imgNumber: "7" },
    { id: 8, link: "#", imgNumber: "5" },
  ];

  return (
    <>
      <Slider {...settings} arrows={false} style={{width: '100%'}}>
        {logos && logos.map((item) => (
          item.logo && (
            <li className="slide-item" key={item.id}>
              <figure className="image-box">
                <a href={item.link}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item?.logo}`}
                    alt="brand"
                  />
                </a>
              </figure>
            </li>
          )
        ))}
      </Slider>
    </>
  );
};

export default Partner2;
