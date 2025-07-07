import React from 'react';

import IntroduccionHome from '../IntroduccionHome/IntroduccionHome';
import AboutUsHome from '../AboutUsHome/AboutUsHome';
import PriceMembershipHome from '../PriceMembreshipHome/PriceMembershipHome';
import ContactHome from '../ContactHome/ContactHome';



function Home() {



    return (
        <div >
            <IntroduccionHome />
            <AboutUsHome />
            <PriceMembershipHome />
             <ContactHome />
        </div>
    );
}

export default Home;