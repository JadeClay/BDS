import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import BusinessList from "../components/business-listing-pages";

const index = () => {

    return (
        <>
            <Seo pageTitle="Empresas" />
            <BusinessList />
        </>
    );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
