import React from "react";

import "./style.scss";

export default ({ link, image, svg }) => (
  <a href={link} target="_blank" className="sm-link-2 header blue-icon w-inline-block">
    {svg ? image : (
      <img
        src={image}
        className="sm-icon-new"
      />
    )}
  </a>
)