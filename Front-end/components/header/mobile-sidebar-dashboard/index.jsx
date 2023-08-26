"use client";
import Link from "next/link";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
} from "react-pro-sidebar";

import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      {/* End pro-header */}

      <ProSidebarProvider>
        <Sidebar>
          <Menu>
            <MenuItem
              className={
                "menu-active-link"
              }
              routerLink={<Link href={"/dashboard"} />}
            >
              Empresas
            </MenuItem>
            <MenuItem
              className={
                "menu-active-link"
              }
              routerLink={<Link href={"/dashboard/categories"} />}
            >
              Categorías
            </MenuItem>
          </Menu>
        </Sidebar>
      </ProSidebarProvider>

    </div>
  );
};

export default Index;
