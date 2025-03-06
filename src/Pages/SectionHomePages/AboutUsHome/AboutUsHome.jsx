import React from 'react';
import WhyChooseUs from './WhyChooseUs';
import style from "../AboutUsHome/AboutUsHome.module.css"; 

function AboutUsHome() {
    return (
        <div className={style.aboutUs_container}>
              <WhyChooseUs />
        </div>
    );
}

export default AboutUsHome;