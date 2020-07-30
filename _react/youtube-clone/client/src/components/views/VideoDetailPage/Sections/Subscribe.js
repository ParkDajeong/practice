import React, { useEffect, useState } from "react";
import Axios from "axios";

function Subscribe(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;

  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const subscribeVariables = { userTo: userTo, userFrom: userFrom };
    Axios.post("/api/subscribe/subscribeNumber", subscribeVariables) //
      .then((response) => {
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert("Failed to get subscriber Number");
        }
      });

    Axios.post("/api/subscribe/subscribed", subscribeVariables) //
      .then((response) => {
        if (response.data.success) {
          setSubscribed(response.data.subcribed);
        } else {
          alert("Failed to get Subscribed Information");
        }
      });
  }, []);

  const onSubscribe = () => {
    const subscribeVariables = { userTo: userTo, userFrom: userFrom };

    if (Subscribed) {
      Axios.post("/api/subscribe/unSubscribe", subscribeVariables) //
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독 취소를 실패하였습니다.");
          }
        });
    } else {
      Axios.post("/api/subscribe/subscribe", subscribeVariables) //
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독을 실패하였습니다.");
          }
        });
    }
  };

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
