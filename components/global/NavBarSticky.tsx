import React from "react";
import Footer from "./Footer";
import TopNavBar from "./TopNavBar";

const NavBarSticky = ({ children }: { children?: React.ReactNode }) => {
    return (
        <>
            <TopNavBar />
            {children}
            <Footer />
        </>
    );
};

export default NavBarSticky;
