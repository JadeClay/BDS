import dynamic from "next/dynamic";
import Link from "next/link";
import Seo from "../components/common/Seo";

const index = () => {
  return (
    <>
      <Seo pageTitle="404" />
      <div
        className="error-page-wrapper "
        style={{
          backgroundImage: `url(/images/404.jpg)`,
        }}
        data-aos="fade"
      >
        <div className="content">
          <div className="logo">
            <Link href="/">
              <img src="/images/logo.svg" alt="brand" />
            </Link>
          </div>
          {/* End logo */}

          <h1>404!</h1>
          <p>La página o el recurso que estás buscando no ha podido ser encontrado.</p>

          <Link className="theme-btn btn-style-three call-modal" href="/">
            VOLVER AL INICIO
          </Link>
        </div>
        {/* End .content */}
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
