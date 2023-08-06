const BreadCrumb = ({ title = "" }) => {
  return (
    <div className="upper-title-box">
      <h3>{title}</h3>
      <div className="text">Panel de Control</div>
    </div>
  );
};

export default BreadCrumb;
