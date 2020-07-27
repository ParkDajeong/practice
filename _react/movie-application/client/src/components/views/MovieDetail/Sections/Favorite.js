import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "antd";

function Favorite(props) {
  const userFrom = props.userFrom;
  const movieId = props.movieId;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRuntime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRuntime,
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variables) //
      .then((response) => {
        if (response.data.success) {
          setFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert("숫자 정보를 가져오는데 실패 하였습니다.");
        }
      });

    Axios.post("/api/favorite/favorited", variables) //
      .then((response) => {
        if (response.data.success) {
          setFavorited(response.data.favorited);
        } else {
          alert("정보를 가져오는데 실패 하였습니다.");
        }
      });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variables) //
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Favorite 취소에 실패 하였습니다.");
          }
        });
    } else {
      Axios.post("/api/favorite/addToFavorite", variables) //
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber + 1);
            setFavorited(!Favorited);
          } else {
            alert("Favorite 등록에 실패 하였습니다.");
          }
        });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button onClick={onClickFavorite}>
        {Favorited ? "Not Favorite " : "Add to Favorite "}
        {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
