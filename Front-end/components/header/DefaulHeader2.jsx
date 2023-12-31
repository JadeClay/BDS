import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from"./HeaderNavContent";
import Image from "next/image";

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-style-four fixed-header`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image src="/images/logo.png" alt="brand" height={40} width={50}/>
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <HeaderNavContent />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <div className="btn-box">
              <Link
                href="/business"
                className="theme-btn btn-style-five"
              >
                Publica tu negocio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
