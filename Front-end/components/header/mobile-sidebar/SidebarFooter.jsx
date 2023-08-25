import Link from "next/link";

const SidebarFooter = () => {
  const socialContent = [
    { id: 1, icon: "fa-facebook-f", link: "https://www.facebook.com/" },
    { id: 2, icon: "fa-twitter", link: "https://www.twitter.com/" },
    { id: 3, icon: "fa-instagram", link: "https://www.instagram.com/" },
    { id: 4, icon: "fa-linkedin-in", link: "https://www.linkedin.com/" },
  ];

  return (
    <>
    <div className="mm-add-listing mm-listitem pro-footer">
      <Link href="/business" className="theme-btn btn-style-one mm-listitem__text">
        Publica tu negocio
      </Link>
      {/* job post btn */}
      {/* End .mm-listitem__text */}
    </div>
    <div className="mm-add-listing mm-listitem pro-footer">
        <Link href="mailto:soporte@progps.com.do" className="theme-btn btn-style-one mm-listitem__text">
          Soporte
        </Link>
        {/* job post btn */}
        {/* End .mm-listitem__text */}
      </div>
    </>
  );
};

export default SidebarFooter;
