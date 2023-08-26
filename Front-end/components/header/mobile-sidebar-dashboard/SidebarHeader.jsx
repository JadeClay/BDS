import Link from "next/link";
import Image from "next/image";

const SidebarHeader = () => {
  return (
    <div className="pro-header">
      <Link href="/">
        <Image src="/images/logo2.png" alt="brand" height={40} width={45}/>
      </Link>
      {/* End logo */}

      <div className="fix-icon" data-bs-dismiss="offcanvas" aria-label="Close">
        <span className="flaticon-close"></span>
      </div>
      {/* icon close */}
    </div>
  );
};

export default SidebarHeader;
