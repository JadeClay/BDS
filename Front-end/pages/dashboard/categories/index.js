import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import DashboadHome from "../../../components/dashboard/edit-category";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Index = () => {
  const router = useRouter();

  // Verifying that the user is authenticated, if not, redirecting to login
  useEffect(() =>{
    if(Cookies.get('token') == undefined){
      router.push("/login");
    }
  },[])

  return (
    <>
      <Seo pageTitle="Dashboard" />
      <DashboadHome />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });