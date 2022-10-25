import React, { useState, useEffect } from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./index.less";

const LoginToHome = () => {
  useEffect(() => {}, []);

  const getParam = (name, defaultValue) => {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] === name) {
        return pair[1];
      }
    }
    return defaultValue === undefined ? null : defaultValue;
  };

  return (
    <div className="loader">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default LoginToHome;
