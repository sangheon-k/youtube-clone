import Axios from "axios";
import React, { useEffect, useState } from "react";

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo };

    Axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.data.success) {
        setSubscribeNumber(response.data.subscribeNumber);
      } else {
        alert("구독자 수 정보를 받아오는데 실패했습니다.");
      }
    });

    let subscribedVariable = { userTo: props.userTo, userFrom: props.userFrom };

    Axios.post("/api/subscribe/subscribed", subscribedVariable).then(
      (response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert("정보를 가져오는데 실패했습니다.");
        }
      }
    );
  }, []);

  const onSubscribe = () => {
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };

    // 구독중, Button클릭할 때 => 구독취소 하고싶을 때
    if (Subscribed) {
      Axios.post("/api/subscribe/unSubscribe", subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독 취소하는데 실패했습니다.");
          }
        }
      );

      // 구독하지 않은 상태, Button클릭할 때 => 구독 하고싶을 때
    } else {
      Axios.post("/api/subscribe/subscribe", subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독하는데 실패했습니다.");
          }
        }
      );
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          outline: "none",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
