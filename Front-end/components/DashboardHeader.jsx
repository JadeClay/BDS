import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./header/HeaderNavContent";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const LogOut = () => {
    Cookies.remove('token');
    router.push("/");
  }

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
                  <img src="/images/logo.png" alt="brand" height={"auto"} width={45}/>
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <div className="btn-box">
              <button
                className="theme-btn btn-style-five"
                onClick={LogOut}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
