import React from 'react';
import { } from 'react-router-dom';
import IntroduccionHome from '../SectionHomePages/IntroduccionHome/IntroduccionHome';
import AboutUsHome from '../SectionHomePages/AboutUsHome/AboutUsHome';
import PriceMembershipHome from '../SectionHomePages/PriceMembreshipHome/PriceMembershipHome';
import ContactHome from '../SectionHomePages/ContactHome/ContactHome';


function Home() {



    return (
        <div>
            <IntroduccionHome />
            <AboutUsHome />
            <PriceMembershipHome />
            <ContactHome />
        </div>
    );
}

export default Home;