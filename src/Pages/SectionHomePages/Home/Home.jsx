import React from 'react';

import IntroduccionHome from '../IntroduccionHome/IntroduccionHome';
import AboutUsHome from '../AboutUsHome/AboutUsHome';
import PriceMembershipHome from '../PriceMembreshipHome/PriceMembershipHome';
import ContactHome from '../ContactHome/ContactHome';
import StateSuscriptionSection from '../StateSuscriptionSection';
import SectionSummaryEvents from '../SectionSummaryEvents';



function Home() {
    return (
        <div >
            <IntroduccionHome />
            <AboutUsHome />
            <PriceMembershipHome />
            <StateSuscriptionSection />
            <SectionSummaryEvents />
             <ContactHome />
        </div>
    );
}

export default Home;