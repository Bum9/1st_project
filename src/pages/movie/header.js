import React, { Children } from "react";
import { Link } from "react-router-dom";
import Movie1 from "./movie1";
const Header = (props) => {
  return (
    <>
      <div className="container">
        <div className="inner_input">
          <Link to={"/"}>
            <h2 className="h2_text">Home</h2>
          </Link>
          <Link to={"/test"}>
            <h2 className="h2_text">영화 일간 순위(전날 기준 )</h2>
          </Link>
          <Link to={"/"}>
            <h2 className="h2_text">영화 주간 순위</h2>
          </Link>
          <Link to={"/"}></Link>
        </div>

        {props.children}
      </div>
    </>
  );
};

export default Header;
