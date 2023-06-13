import axios from "axios";
import React, { useEffect, useState } from "react";

const Advice = () => {
  const [advice, setAdvice] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    getAdvice();
    handleScreenSize();
    window.addEventListener("resize", handleScreenSize);
    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, []);

  const getAdvice = () => {
    axios.get("https://api.adviceslip.com/advice")
      .then((res) => setAdvice(res.data.slip));
  };

  const handleScreenSize = () => {
    setIsMobile(window.innerWidth < 644);
  };

  const handleClick = () => {
    getAdvice();
  };

  return (
    <div className="card">
      <p>advice #{advice && advice.id}</p>
      <h2>{advice.advice}</h2>
      <img
        className="after"
        src={isMobile ? "./images/pattern-divider-mobile.svg" : "./images/pattern-divider-desktop.svg"}
        alt=""
      />
      <div className="green">
        <img src="./images/icon-dice.svg" alt="" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Advice;