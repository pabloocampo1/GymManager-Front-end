import React from 'react';

import IntroduccionHome from '../SectionHomePages/IntroduccionHome/IntroduccionHome';
import AboutUsHome from '../SectionHomePages/AboutUsHome/AboutUsHome';
import PriceMembershipHome from '../SectionHomePages/PriceMembreshipHome/PriceMembershipHome';



function Home() {



    return (
        <div >
            <IntroduccionHome />
            <AboutUsHome />
            <PriceMembershipHome />
           
        </div>
    );
}

export default Home;