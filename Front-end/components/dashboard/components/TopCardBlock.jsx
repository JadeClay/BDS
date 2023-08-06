import axios from "../../../lib/axios";
import { useState,useEffect } from "react";

const TopCardBlock = ({refresh}) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() =>{
        async function getData(){
            const res = await axios.get("/api/business").then(response => {
              setData(response.data);
              setTotal(response.data.length);
            }).catch(error => console.error(error));
        }
        getData(); 

    },[refresh]);

  const getPending = () => {
    let pending = 0;
    data.forEach((business) => (business.status == 0) ? pending++ : pending)
    
    return pending;
  }

  const getApproved = () => {
    let approved = 0;
    data.forEach((business) =>(business.status == 1) ? approved++ : approved)

    return approved;
  }

  const getRejected = () => {
    let rejected = 0;
    data.forEach((business) =>(business.status == 2) ? rejected++ : rejected);

    return rejected;
  }

  const cardContent = [
    {
      id: 1,
      icon: "la la-check",
      countNumber: getApproved(),
      metaName: "Aprobadas",
      uiClass: "ui-green",
    },
    {
      id: 2,
      icon: "fa fa-question-circle",
      countNumber: getPending(),
      metaName: "Pendientes",
      uiClass: "ui-yellow",
    },
    {
      id: 3,
      icon: "la la-times-circle",
      countNumber: getRejected(),
      metaName: "Rechazados",
      uiClass: "ui-red",
    },
    {
      id: 4,
      icon: "la la-file-invoice",
      countNumber: total,
      metaName: "Total",
      uiClass: "ui-black",
    },
  ];

  return (
    <>
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className={`ui-item ${item.uiClass}`}>
            <div className="left">
              <i className={`icon ${item.icon}`}></i>
            </div>
            <div className="right">
              <h4>{item.countNumber}</h4>
              <p>{item.metaName}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
