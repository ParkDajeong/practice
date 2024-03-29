import React, { useEffect, useState } from "react";
import { IMAGE_BASE_URL, API_URL, API_KEY } from "../../Config";
import MainImage from "../LandingPage/Section/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";
import Favorite from "./Sections/Favorite";
import { Row } from "antd";

function MovieDetail(props) {
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Cast, setCast] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`;
    const endpointCast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    fetch(endpointInfo) //
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setMovie(response);
      });

    fetch(endpointCast) //
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.cast);
        setCast(response.cast);
      });
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* Header */}
      <MainImage //
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.title}
        text={Movie.overview}
      />

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Favorite userFrom={localStorage.getItem("userId")} movieInfo={Movie} movieId={movieId} />
        <MovieInfo movie={Movie} />

        <br />

        <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
          <button onClick={toggleActorView}>Toggle Actor View</button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Cast &&
              Cast.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards //
                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                    actor={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
