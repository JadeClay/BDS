import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import EditBusiness from "../../../components/dashboard/edit-business/index";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Index = () => {
  const router = useRouter();
  const {id} = router.query;

  // Verifying that the user is authenticated, if not, redirecting to login
  useEffect(() =>{
    if(Cookies.get('token') == undefined){
      router.push("/login");
    }
  },[])

  return (
    <>
      <Seo pageTitle="Revisar Empresa" />
      <EditBusiness id={id}/>
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });