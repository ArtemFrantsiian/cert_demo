import React from "react";

import { Logo, Social } from "../index";
import "./style.scss";

const links = [
  {
    link: "https://t.me/remme",
    image: "https://uploads-ssl.webflow.com/59936b7137d7050001f9b748/5a17154bcc80bd0001ed9e58_telegram_white.svg",
  },
  {
    link: "https://www.reddit.com/r/remme/",
    image: "https://uploads-ssl.webflow.com/59936b7137d7050001f9b748/5a171835b1b09d0001925ca8_reddit_white.svg",
  },
  {
    link: "https://www.facebook.com/remme.io/",
    image: "https://uploads-ssl.webflow.com/59936b7137d7050001f9b748/5a17183545a0eb000185e0aa_fb_white.svg",
  },
  {
    link: "https://twitter.com/remme_io",
    image: "https://uploads-ssl.webflow.com/59936b7137d7050001f9b748/5a17183745a0eb000185e0ac_twitter_white.svg",
  },
  {
    link: "https://medium.com/remme",
    image: "https://uploads-ssl.webflow.com/59936b7137d7050001f9b748/5a1718c0f4308f0001d50991_medium_white.svg",
  },
  {
    link: "https://www.youtube.com/channel/UCeSQ8UosUXwII-6JOh7Fi3g",
    image: "https://uploads-ssl.webflow.com/59936b7137d7050001f9b748/5a1718376b2f3a0001d3bfaa_youtube_white.svg",
  },
  {
    link: "https://steemit.com/@remme",
    image: "https://uploads-ssl.webflow.com/59936b7137d7050001f9b748/5a171835ca1ffe0001610868_steemit_white.svg",
  },
  {
    link: "https://github.com/Remmeauth",
    image: "https://uploads-ssl.webflow.com/5b17b889f5c16285d8014a1f/5b17b889f5c16285de014b11_github-logo.svg",
  },
];

export default () => (
  <div className="footer-section">
    <div className="holder footer-layout">
      <div className="left-footer">
        <div className="logo footer-logo">
          <Logo/>
        </div>
        <div className="copyright-text">
          © 2016-{new Date().getFullYear()} REMME CAPITAL LTD. All rights reserved.
        </div>
      </div>
      <div className="social-media-2">
        {links.map(item => (
          <Social image={item.image} link={item.link} />
        ))}
      </div>
    </div>
  </div>
)
