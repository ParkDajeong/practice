import React from "react";
import { Col } from "antd";

function GridCards(props) {
  if (props.landingPage) {
    return (
      <Col xl={4} lg={6} md={8} sm={12} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "auto" }} //
              src={props.image}
              alt={props.movieName}
            />
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col xl={4} lg={6} md={8} sm={12} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "auto" }} //
            src={props.image}
            alt={props.actor}
          />
        </div>
      </Col>
    );
  }
}

export default GridCards;
