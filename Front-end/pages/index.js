import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import Home10 from "../components/home-10";

const index = () => {
    return (
        <>
            <Seo pageTitle="Inicio" />
            <Home10 />
        </>
    );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
