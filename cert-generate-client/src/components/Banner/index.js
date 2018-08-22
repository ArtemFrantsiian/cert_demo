import React from "react";

import "./style.scss";

export default ({ name }) => (
  <div className="banner-section">
    <div className="holder internal-pages-content-wrapper features-hero">
      <div className="text-content-wrapper">
        <h1 className="h1 white-title section-title">Hi {name}</h1>
        <h2 className="h2 white-title bold">
          We introduce you the
          <span className="product-name">
            <strong className="h-bold"> REMME TESTNETWORK.</strong>
          </span>
        </h2>
        <div className="paragraph small light-text">
          We propose you to easy way communication with
          REMChain<br/><br/>You can try our block explorer system and monitoring nodes system and send us your feedback.
        </div>
      </div>
      <div className="professor-image">
        <img src="https://uploads-ssl.webflow.com/5b17b889f5c16285d8014a1f/5b17b889f5c1625470014a3b_prof.svg"
             className="feature-section-image feature-hero-page professor-hero" width="485"
        />
      </div>
    </div>
  </div>
);